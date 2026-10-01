// @vitest-environment node
import { execFileSync, spawnSync } from "node:child_process";
import { appendFileSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { devNull, tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { beforeAll, describe, expect, it } from "vitest";

const SCRIPT = fileURLToPath(new URL("./verify-tags.mjs", import.meta.url));
const ROOT = join(dirname(SCRIPT), "..");
const WRONG_SHA = "0123456789abcdef0123456789abcdef01234567";
const ENV = {
  ...process.env,
  GIT_CONFIG_GLOBAL: devNull,
  GIT_CONFIG_NOSYSTEM: "1",
  GIT_AUTHOR_NAME: "Owner",
  GIT_AUTHOR_EMAIL: "owner@example.com",
  GIT_COMMITTER_NAME: "Owner",
  GIT_COMMITTER_EMAIL: "owner@example.com",
};

let keys;
const git = (args, cwd) => execFileSync("git", args, { cwd, env: ENV, encoding: "utf8", stdio: "pipe" });
const sweep = (cwd) => spawnSync("node", [SCRIPT], { cwd, env: ENV, encoding: "utf8" });

function keypair(name) {
  const path = join(keys, name);
  execFileSync("ssh-keygen", ["-q", "-t", "ed25519", "-N", "", "-C", name, "-f", path]);
  const [type, key] = readFileSync(`${path}.pub`, "utf8").split(" ");
  return { path, signer: `owner@example.com namespaces="git" ${type} ${key}\n` };
}

const signedTag = (cwd, name, key) => git(["-c", "gpg.format=ssh", "-c", `user.signingkey=${key.path}`, "tag", "-s", name, "-m", name], cwd);

// main lists the owner's key and grandfathers v0.0.0 at its commit and v0.0.5 at a sha it never had;
// the checked-out branch adds a second key, which the sweep must not trust.
function repo(name, owner, intruder) {
  const root = mkdtempSync(join(tmpdir(), `ward-verify-tags-${name}-`));
  const work = join(root, "work");
  mkdirSync(join(work, ".github"), { recursive: true });
  git(["init", "--quiet", "--bare", "-b", "main", join(root, "origin.git")], root);
  git(["init", "--quiet", "-b", "main"], work);
  git(["remote", "add", "origin", join(root, "origin.git")], work);
  writeFileSync(join(work, ".github/allowed_signers"), owner.signer);
  git(["add", ".github/allowed_signers"], work);
  git(["commit", "--quiet", "-m", "owner key"], work);
  const head = git(["rev-parse", "HEAD"], work).trim();
  writeFileSync(join(work, ".github/unsigned_tags"), `v0.0.0 ${head}\nv0.0.5 ${WRONG_SHA}\n`);
  git(["add", ".github/unsigned_tags"], work);
  git(["commit", "--quiet", "-m", "grandfathered tags"], work);
  git(["push", "--quiet", "origin", "main"], work);
  git(["checkout", "--quiet", "-b", "add-key"], work);
  appendFileSync(join(work, ".github/allowed_signers"), intruder.signer);
  git(["commit", "--quiet", "-am", "second key"], work);
  git(["tag", "v0.0.0", head], work);
  return work;
}

let mixed;
let clean;
let noRelease;

beforeAll(() => {
  keys = mkdtempSync(join(tmpdir(), "ward-verify-tags-keys-"));
  const owner = keypair("owner");
  const intruder = keypair("intruder");
  mixed = repo("mixed", owner, intruder);
  signedTag(mixed, "v0.0.1", owner);
  signedTag(mixed, "v0.0.2", intruder);
  git(["tag", "-a", "v0.0.3", "-m", "unsigned annotated"], mixed);
  git(["tag", "v0.0.4"], mixed);
  git(["tag", "v0.0.5"], mixed);
  git(["tag", "signature-test-unsigned"], mixed);
  git(["tag", "other-unsigned"], mixed);
  clean = repo("clean", owner, intruder);
  signedTag(clean, "v0.0.1", owner);
  signedTag(clean, "signature-test-good", owner);
  noRelease = repo("none", owner, intruder);
  git(["tag", "-d", "v0.0.0"], noRelease);
  signedTag(noRelease, "signature-test-good", owner);
}, 30_000);

describe("verify-tags", () => {
  it("names every v* and signature-test-* tag that fails, and nothing else", () => {
    const result = sweep(mixed);
    expect(result.status).toBe(1);
    expect(result.stderr.trim().split("\n")).toEqual([
      "unverified tag: signature-test-unsigned",
      "unverified tag: v0.0.2",
      "unverified tag: v0.0.3",
      "unverified tag: v0.0.4",
      "unverified tag: v0.0.5",
    ]);
  });

  it("passes when every tag verifies against main or is grandfathered at its own sha", () => {
    const result = sweep(clean);
    expect(result.stderr).toBe("");
    expect(result.status).toBe(0);
  });

  it("fails when there is no v* tag to verify, so a run without fetched tags is not green", () => {
    const result = sweep(noRelease);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("no v* tags found; fetch tags first");
  });
});

describe("tag sweep workflow", () => {
  const workflow = parse(readFileSync(join(ROOT, ".github/workflows/tag-sweep.yml"), "utf8"));
  const steps = workflow.jobs["verify-tags"].steps;

  it("runs on a schedule and on signature-test-* pushes", () => {
    expect(workflow.on.schedule.length).toBeGreaterThan(0);
    expect(workflow.on.push).toEqual({ tags: ["signature-test-*"] });
  });

  it("checks out every tag, re-fetches the tag objects, then runs the sweep", () => {
    expect(steps[0].with["fetch-depth"]).toBe(0);
    const runs = steps.map((s) => s.run);
    const fetch = runs.indexOf('git fetch --force --no-tags origin "+refs/tags/*:refs/tags/*"');
    expect(fetch).toBeGreaterThan(0);
    expect(runs.indexOf("node scripts/verify-tags.mjs")).toBe(fetch + 1);
  });
});
