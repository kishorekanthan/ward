// @vitest-environment node
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { OLD_NAME, oldNameFiles } from "./old-name.mjs";

const roots = [];
afterEach(() => roots.splice(0).forEach((root) => rmSync(root, { recursive: true })));

function repo(tracked, untracked = {}) {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "ward-old-name-")));
  roots.push(root);
  const write = (files) => Object.entries(files).forEach(([name, body]) => {
    mkdirSync(dirname(join(root, name)), { recursive: true });
    writeFileSync(join(root, name), body);
  });
  execFileSync("git", ["init", "-q"], { cwd: root });
  write(tracked);
  execFileSync("git", ["add", "."], { cwd: root });
  write(untracked);
  return root;
}

const LOCK = (name) => JSON.stringify({ name, packages: { "": { name } } }, null, 2) + "\n";

describe("oldNameFiles", () => {
  it("finds nothing when only the new name and tickets/ history appear", () => {
    const root = repo({ "package-lock.json": LOCK("@kishorekanthan/ward"), "tickets/T-1.md": `Was \`${OLD_NAME}\`.\n` });
    expect(oldNameFiles(root)).toEqual([]);
  });

  it("names a lockfile set back to the old root name and a README import", () => {
    const root = repo({
      "package-lock.json": LOCK(OLD_NAME),
      "README.md": `import { Btn } from "${OLD_NAME}";\n`,
      "src/ok.ts": 'export {};\n',
    });
    expect(oldNameFiles(root).sort()).toEqual(["README.md", "package-lock.json"]);
  });

  it("names a nested file and a new file not yet added, but not an ignored one", () => {
    const root = repo({ ".gitignore": "out/\n" }, { "docs/a/b.md": `${OLD_NAME}/styles.css\n`, "new.mjs": `// ${OLD_NAME}\n`, "out/x.js": OLD_NAME });
    expect(oldNameFiles(root).sort()).toEqual(["docs/a/b.md", "new.mjs"]);
  });

  it("names a folder that only starts with tickets", () => {
    const root = repo({ "tickets-old/x.md": OLD_NAME });
    expect(oldNameFiles(root)).toEqual(["tickets-old/x.md"]);
  });

  it("throws rather than passing when the folder is not a git repository", () => {
    const root = realpathSync(mkdtempSync(join(tmpdir(), "ward-old-name-")));
    roots.push(root);
    writeFileSync(join(root, "README.md"), OLD_NAME);
    expect(() => oldNameFiles(root)).toThrow(/git grep failed: .*not a git repository/);
  });
});
