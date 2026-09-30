// @vitest-environment node
import { cpSync, existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildFresh, distDrift } from "./dist-fresh.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function tree(files) {
  const root = mkdtempSync(join(tmpdir(), "dist-drift-"));
  for (const [name, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, name)), { recursive: true });
    writeFileSync(join(root, name), body);
  }
  return root;
}

const BUILD = { "index.js": "export const a = 1;\n", "index.css": ".a{}", "primitives/Button.d.ts": "export {};\n" };

describe("distDrift", () => {
  it("finds nothing when every file matches byte for byte", () => {
    expect(distDrift(tree(BUILD), tree(BUILD))).toEqual([]);
  });

  it("names a file that differs by one byte", () => {
    expect(distDrift(tree(BUILD), tree({ ...BUILD, "index.js": "export const a = 2;\n" }))).toEqual(["index.js"]);
  });

  it("names a file only the build has and a file only dist/ has", () => {
    const { "index.css": _css, ...withoutCss } = BUILD;
    const dist = tree({ ...withoutCss, "stale/Old.d.ts": "export {};\n" });
    expect(distDrift(tree(BUILD), dist)).toEqual(["index.css", "stale/Old.d.ts"]);
  });

  it("compares nested paths, not just top-level names", () => {
    expect(distDrift(tree(BUILD), tree({ ...BUILD, "primitives/Button.d.ts": "export {} ;\n" }))).toEqual(["primitives/Button.d.ts"]);
  });
});

describe("buildFresh", () => {
  it("rebuilds outside dist/, emptying what the last run left, and a one-byte edit to that build is drift", () => {
    const out = join(ROOT, "node_modules", ".cache", "ward-dist-fresh");
    mkdirSync(out, { recursive: true });
    writeFileSync(join(out, "left-over.txt"), "stale");
    const built = buildFresh(ROOT);
    expect(built).not.toBe(join(ROOT, "dist"));
    expect(existsSync(join(built, "left-over.txt"))).toBe(false);
    const edited = mkdtempSync(join(tmpdir(), "dist-edit-"));
    cpSync(built, edited, { recursive: true });
    writeFileSync(join(edited, "index.js"), " ", { flag: "a" });
    expect(distDrift(built, edited)).toEqual(["index.js"]);
  }, 60_000);
});
