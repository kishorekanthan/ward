// @vitest-environment node
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { devNull, tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { parse } from "yaml";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ENV = {
  ...process.env,
  GIT_CONFIG_GLOBAL: devNull,
  GIT_CONFIG_NOSYSTEM: "1",
  GIT_AUTHOR_NAME: "Owner",
  GIT_AUTHOR_EMAIL: "owner@example.com",
  GIT_COMMITTER_NAME: "Owner",
  GIT_COMMITTER_EMAIL: "owner@example.com",
};
const workflow = parse(readFileSync(join(ROOT, ".github/workflows/tag-signature.yml"), "utf8"));
const step = workflow.jobs["verify-tag"].steps.find((s) => s.run);

let root;
let origin;
let owner;
const git = (args, cwd) => execFileSync("git", args, { cwd, env: ENV, stdio: "pipe" });

function signedTag(cwd, name) {
  git(["-c", "gpg.format=ssh", "-c", `user.signingkey=${owner}`, "tag", "-s", name, "-m", name], cwd);
}

// A runner checkout: an empty repo that fetched only the pushed tag, with the repo's scripts beside it.
function runner(tag) {
  const dir = mkdtempSync(join(root, "runner-"));
  git(["init", "--quiet", "-b", "main"], dir);
  git(["remote", "add", "origin", `file://${origin}`], dir);
  git(["fetch", "--quiet", "--depth=1", "origin", `+refs/tags/${tag}:refs/tags/${tag}`], dir);
  git(["checkout", "--quiet", "--detach", tag], dir);
  return dir;
}

// Runs the workflow's own step as the runner would: bash -e, TAG and RUNNER_TEMP set.
function runStep(tag) {
  const cwd = runner(tag);
  const temp = mkdtempSync(join(root, "temp-"));
  return spawnSync("bash", ["-e", "-c", step.run], { cwd, env: { ...ENV, TAG: tag, RUNNER_TEMP: temp }, encoding: "utf8" });
}

beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), "ward-tag-signature-"));
  origin = join(root, "origin.git");
  const seed = join(root, "seed");
  mkdirSync(seed);
  owner = join(root, "owner");
  execFileSync("ssh-keygen", ["-q", "-t", "ed25519", "-N", "", "-C", "owner", "-f", owner]);
  const [type, key] = readFileSync(`${owner}.pub`, "utf8").split(" ");
  git(["init", "--quiet", "--bare", "-b", "main", origin], root);
  git(["init", "--quiet", "-b", "main"], seed);
  git(["remote", "add", "origin", `file://${origin}`], seed);
  mkdirSync(join(seed, ".github"));
  mkdirSync(join(seed, "scripts"));
  writeFileSync(join(seed, ".github/allowed_signers"), `owner@example.com namespaces="git" ${type} ${key}\n`);
  writeFileSync(join(seed, "scripts/verify-tag.mjs"), readFileSync(join(ROOT, "scripts/verify-tag.mjs")));
  git(["add", ".github/allowed_signers", "scripts/verify-tag.mjs"], seed);
  git(["commit", "--quiet", "-m", "main"], seed);
  git(["push", "--quiet", "origin", "main"], seed);
  signedTag(seed, "v0.0.1");
  signedTag(seed, "signature-test-1");
  git(["update-ref", "refs/tags/v0.0.9", "refs/tags/v0.0.1"], seed);
  git(["tag", "-a", "v0.0.3", "-m", "v0.0.3"], seed);
  git(["push", "--quiet", "origin", "--tags"], seed);
}, 30_000);

afterAll(() => {
  rmSync(root, { recursive: true });
});

describe("tag signature workflow step", () => {
  it("passes a signed v* tag named as it was signed", () => {
    expect(runStep("v0.0.1").status).toBe(0);
  });

  it("passes a signed signature-test-* tag", () => {
    expect(runStep("signature-test-1").status).toBe(0);
  });

  it("fails a signed tag pushed under another version's name", () => {
    const result = runStep("v0.0.9");
    expect(result.stderr).toContain("tag v0.0.9 was signed as v0.0.1");
    expect(result.status).not.toBe(0);
  });

  it("fails an unsigned annotated tag", () => {
    expect(runStep("v0.0.3").status).not.toBe(0);
  });
});
