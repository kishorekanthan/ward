// @vitest-environment node
import { spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HOOKS = join(ROOT, "githooks");
const FIXTURES = join(HOOKS, "fixtures");
const TRAILER = "Co-Authored-By: Claude <noreply@anthropic.com>";
const GENERATED = "\u{1f916} Generated with [Claude Code](https://claude.com/claude-code)";
const roots = [];
const tempRoot = (name) => {
  const root = realpathSync(mkdtempSync(join(tmpdir(), name)));
  roots.push(root);
  return root;
};

afterEach(() => roots.splice(0).forEach((root) => rmSync(root, { recursive: true })));

// A repo using this checkout's githooks, with a global config of its own, not the owner's.
function scratch(globalHooks) {
  const root = tempRoot("attribution-");
  const config = join(root, "global.gitconfig");
  writeFileSync(config, globalHooks ? `[core]\n\thooksPath = ${globalHooks}\n` : "");
  const env = { ...process.env, GIT_CONFIG_GLOBAL: config };
  const git = (...args) => spawnSync("git", ["-C", join(root, "r"), ...args], { encoding: "utf8", env });
  mkdirSync(join(root, "r"));
  git("init", "-q");
  git("config", "user.email", "t@test");
  git("config", "user.name", "t");
  git("config", "core.hooksPath", HOOKS);
  const commit = (message, ...flags) => {
    writeFileSync(join(root, "msg.txt"), message);
    return git("commit", "--allow-empty", "-F", join(root, "msg.txt"), ...flags);
  };
  return { git, commit };
}

function fixtures(kind) {
  const found = readdirSync(join(FIXTURES, kind)).filter((name) => name.endsWith(".txt")).sort();
  expect(found.length).toBeGreaterThanOrEqual(6);
  return found.map((name) => readFileSync(join(FIXTURES, kind, name), "utf8"));
}

// `gh` on PATH answering `pr view N --json ...` with only the fields asked for, as GitHub does.
function prCheck(pr) {
  const bin = tempRoot("fake-gh-");
  writeFileSync(join(bin, "pr.json"), JSON.stringify(pr));
  const fake = [
    "#!/usr/bin/env node",
    'const { readFileSync } = require("node:fs");',
    "const args = process.argv.slice(2);",
    'if (args[0] !== "pr" || args[1] !== "view") { console.error("unexpected gh call", args); process.exit(2); }',
    `const pr = JSON.parse(readFileSync(${JSON.stringify(join(bin, "pr.json"))}, "utf8"));`,
    'const fields = args[args.indexOf("--json") + 1].split(",");',
    "console.log(JSON.stringify(Object.fromEntries(fields.map((f) => [f, pr[f]]))));",
  ].join("\n");
  writeFileSync(join(bin, "gh"), fake);
  chmodSync(join(bin, "gh"), 0o755);
  const env = { ...process.env, PATH: `${bin}${delimiter}${process.env.PATH}` };
  const script = join(ROOT, "scripts", "attribution.mjs");
  return spawnSync("node", [script, "pr", String(pr.number)], { encoding: "utf8", env });
}

const clean = { number: 50, title: "Refuse AI attribution (#49)", body: "Closes #49\n", commits: [] };

describe("commit-msg hook", () => {
  it("refuses every refuse fixture and names the line", () => {
    const repo = scratch();
    for (const message of fixtures("refuse")) {
      const done = repo.commit(message);
      expect(done.status, message).not.toBe(0);
      expect(done.stderr).toContain(`  ${message.trim().split("\n").pop().trim()}\n`);
      expect(done.stderr).toContain("Delete those lines and commit again");
    }
    expect(repo.git("rev-parse", "-q", "--verify", "HEAD").stdout).toBe("");
  });

  it("accepts every pass fixture", () => {
    const repo = scratch();
    const passing = fixtures("pass");
    for (const message of passing) {
      expect(repo.commit(message).stderr).toBe("");
    }
    expect(repo.git("rev-list", "--count", "HEAD").stdout.trim()).toBe(String(passing.length));
  });

  // git strips comment lines before recording the message, so a commented-out trailer is not attribution.
  it("ignores lines git strips", () => {
    const done = scratch().commit(`Add the board (#9)\n\n# ${TRAILER}\n`, "--cleanup=strip");
    expect(done.status, done.stderr).toBe(0);
  });

  // A repo-level core.hooksPath shadows the owner's global hooks folder, so githooks/ runs it too.
  it("still runs the global hooks", () => {
    const own = tempRoot("global-hooks-");
    const ran = join(own, "ran.txt");
    for (const hook of ["commit-msg", "pre-commit"]) {
      writeFileSync(join(own, hook), `#!/bin/sh\necho ${hook} >> ${ran}\n`);
      chmodSync(join(own, hook), 0o755);
    }
    const repo = scratch(own);
    const ranHooks = () => readFileSync(ran, "utf8").split(/\s+/).filter(Boolean);
    expect(repo.commit("Add the board (#9)\n").status).toBe(0);
    expect(ranHooks()).toEqual(["pre-commit", "commit-msg"]);
    expect(repo.commit(`Add the board (#9)\n\n${TRAILER}\n`).status).not.toBe(0);
    expect(ranHooks()).toEqual(["pre-commit", "commit-msg", "pre-commit"]);
  });
});

describe("make pr-check", () => {
  it("refuses a PR whose body has a Generated with line, and names it", () => {
    const done = prCheck({ ...clean, body: `Closes #49\n\n${GENERATED}\n` });
    expect(done.status, done.stderr).toBe(1);
    expect(done.stdout).toContain(`PR #50 title or body carries AI attribution: ${GENERATED}`);
  });

  it("refuses a PR carrying an attributed commit, and names the commit", () => {
    const commit = { oid: "abc1234def5678", messageHeadline: "Add the hook (#49)", messageBody: TRAILER };
    const done = prCheck({ ...clean, commits: [commit] });
    expect(done.status, done.stderr).toBe(1);
    expect(done.stdout).toContain(`commit abc1234 carries AI attribution: ${TRAILER}`);
  });

  it("passes a clean PR", () => {
    const done = prCheck(clean);
    expect(done.status, done.stderr + done.stdout).toBe(0);
    expect(done.stdout).toContain("PR #50: no AI attribution");
  });
});
