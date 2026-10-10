import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { accentPairs, belowFloor } from "./contrast.mjs";
import { readTokens } from "./gen-css.mjs";
import { ACCENT_PRESETS } from "../src/tokens.ts";

// check.mjs as it runs: a step commented out, by line or by block, is not run.
const checkCode = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "check.mjs"), "utf8")
  .replace(/^\s*\/\*[\s\S]*?\*\//gm, "")
  .split("\n")
  .filter((line) => !line.trim().startsWith("//"))
  .join("\n");

const tokens = readTokens();
const withBlueTint = (sageTint) => ({ ...tokens, accent: { ...tokens.accent, blue: { ...tokens.accent.blue, color: { ...tokens.accent.blue.color, sageTint } } } });

describe("check.mjs gates accent contrast (#232, TRELLIS-473)", () => {
  it("runs the accent step on the full tokens, and its failure fails the check", () => {
    expect(checkCode).toMatch(/const (\w+) = belowFloor\(accentPairs\(tokens\)\);\s*if \(\1\.length === 0\) pass\("accent contrast"[^\n]*\);\s*else fail\("accent contrast", \1\.join\("; "\)\);/);
    expect(checkCode.match(/\btokens(\.\w+|\[[^\]]+\])*\s*=(?!=)|\bdelete\s+tokens\b/g)).toEqual(["tokens ="]);
    expect(checkCode).toMatch(/const tokens = readTokens\(\);/);
    expect(checkCode).toMatch(/function fail\([^)]*\) \{\s*failures \+= 1;/);
    expect(checkCode).toMatch(/process\.exitCode = failures === 0 \? 0 : 1;/);
  });

  it("measures every preset Ward ships in both themes", () => {
    const measured = new Set(accentPairs(tokens).map(([, , label]) => label.split(" ").slice(0, 2).join(" ")));
    expect([...measured].sort()).toEqual(ACCENT_PRESETS.flatMap(({ name }) => [`dark ${name}`, `light ${name}`]).sort());
  });

  // The pill is the active destination: body text on accentPill, which is the preset's sageTint.
  it("fails a preset whose text on its pill is below 4.5:1", () => {
    expect(tokens.alias.accentPill).toBe("sageTint");
    const low = belowFloor(accentPairs(withBlueTint("#5C7EA8")));
    expect(low.filter((line) => line.includes(" text/sageTint "))).toEqual(["light blue text/sageTint #191918 on #5C7EA8 = 4.19 (needs 4.5:1)"]);
  });

  it("passes the same pill at 5.13:1", () => {
    expect(belowFloor(accentPairs(withBlueTint("#6E8DB3"))).filter((line) => line.includes(" text/sageTint "))).toEqual([]);
  });
});
