// @vitest-environment node
import { execFileSync, spawnSync } from "node:child_process";
import { appendFileSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { devNull, tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";

const SCRIPT = fileURLToPath(new URL("./verify-tag.mjs", import.meta.url));
const ENV = {
  ...process.env,
  GIT_CONFIG_GLOBAL: devNull,
  GIT_CONFIG_NOSYSTEM: "1",
  GIT_AUTHOR_NAME: "Owner",
  GIT_AUTHOR_EMAIL: "owner@example.com",
  GIT_COMMITTER_NAME: "Owner",
  GIT_COMMITTER_EMAIL: "owner@example.com",
};

let work;
let keys;
const git = (args, cwd = work) => execFileSync("git", args, { cwd, env: ENV, stdio: "pipe" });
const run = (cmd, args) => spawnSync(cmd, args, { cwd: work, env: ENV, encoding: "utf8" });

function keypair(name) {
  const path = join(keys, name);
  execFileSync("ssh-keygen", ["-q", "-t", "ed25519", "-N", "", "-C", name, "-f", path]);
  const [type, key] = readFileSync(`${path}.pub`, "utf8").split(" ");
  return { path, signer: `owner@example.com namespaces="git" ${type} ${key}\n` };
}

function signedTag(name, key) {
  git(["-c", "gpg.format=ssh", "-c", `user.signingkey=${key.path}`, "tag", "-s", name, "-m", name]);
}

// main lists the owner's key; a branch adds a second key under the same email and checks it out.
beforeAll(() => {
  const root = mkdtempSync(join(tmpdir(), "ward-verify-tag-"));
  keys = join(root, "keys");
  work = join(root, "work");
  mkdirSync(keys);
  mkdirSync(join(work, ".github"), { recursive: true });
  const owner = keypair("owner");
  const intruder = keypair("intruder");
  git(["init", "--quiet", "--bare", "-b", "main", join(root, "origin.git")], root);
  git(["init", "--quiet", "-b", "main"]);
  git(["remote", "add", "origin", join(root, "origin.git")]);
  writeFileSync(join(work, ".github/allowed_signers"), owner.signer);
  git(["add", ".github/allowed_signers"]);
  git(["commit", "--quiet", "-m", "owner key"]);
  git(["push", "--quiet", "origin", "main"]);
  git(["checkout", "--quiet", "-b", "add-key"]);
  appendFileSync(join(work, ".github/allowed_signers"), intruder.signer);
  git(["commit", "--quiet", "-am", "second key"]);
  signedTag("v0.0.1", owner);
  signedTag("v0.0.2", intruder);
}, 30_000);

describe("verify-tag", () => {
  it("fails a tag signed with a key only the checked-out branch lists", () => {
    const result = run("node", [SCRIPT, "v0.0.2"]);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/No principal matched/);
  });

  it("verifies a tag signed with a key main lists", () => {
    const result = run("node", [SCRIPT, "v0.0.1"]);
    expect(result.status).toBe(0);
    expect(result.stderr).toMatch(/Good "git" signature for owner@example.com/);
  });

  it("the same forged tag passes against the working tree's file, the hole #100 closes", () => {
    const result = run("git", ["-c", "gpg.ssh.allowedSignersFile=.github/allowed_signers", "verify-tag", "v0.0.2"]);
    expect(result.status).toBe(0);
  });
});
