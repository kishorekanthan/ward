import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(root, "src", "ward.css"), "utf8");
const tokens = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

const blockOf = (selector) => {
  const start = css.indexOf(`\n${selector} {\n`);
  return css.slice(start, css.indexOf("\n}\n", start));
};
const colours = (selector) => Object.fromEntries([...blockOf(selector).matchAll(/--ward-color-(\w+): ([^;]+);/g)].map((m) => [m[1], m[2]]));

// Typed by hand from the TRELLIS-422 role values, so an alias left on its pre-#203 value or pointed at the wrong role fails.
const LIGHT_ALIASES = {
  blue: "#2D5A86", blueSoft: "#F3F3F1", accentPill: "#C9E2D2",
  green: "#2F6B47", greenFill: "#2F6B47",
  orange: "#7A5D14", orangeFill: "#7A5D14", amber: "#7A5D14", warning: "#7A5D14", warnInk: "#7A5D14",
  warnSurface: "#FBF3DC", warnLine: "#E6D5A9",
  red: "#8A3040", destructive: "#8A3040", deep: "#37352F",
};
const DARK_ALIASES = {
  blue: "#9CBDDE", blueSoft: "#262626", accentPill: "#213B2B",
  green: "#ADDBBF", greenFill: "#ADDBBF",
  orange: "#E6D5A9", orangeFill: "#E6D5A9", amber: "#E6D5A9", warning: "#E6D5A9", warnInk: "#E6D5A9",
  warnSurface: "#38311E", warnLine: "#4F4426",
  red: "#DC99A5", destructive: "#DC99A5", deep: "#D4D4D1",
};
const pick = (all, keys) => Object.fromEntries(keys.map((k) => [k, all[k]]));

describe("old colour names stay one release as aliases to the role values", () => {
  it("resolves every alias to its role value in the light root, the light pin and the dark theme", () => {
    const names = Object.keys(LIGHT_ALIASES);
    expect(Object.keys(tokens.alias).sort()).toEqual([...names].sort());
    expect(pick(colours(":root"), names)).toEqual(LIGHT_ALIASES);
    expect(pick(colours('[data-theme="light"]'), names)).toEqual(LIGHT_ALIASES);
    expect(pick(colours('[data-theme="dark"]'), names)).toEqual(DARK_ALIASES);
  });
});

function moduleCss(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) moduleCss(path, out);
    else if (path.endsWith(".css")) out.push(readFileSync(path, "utf8"));
  }
  return out;
}

describe("one running duration, stopped under reduced motion", () => {
  const reduced = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));

  it("declares one running duration token and nothing else named for running motion", () => {
    expect(Object.keys(tokens.motion).filter((k) => /running/i.test(k) && !k.endsWith("Ms"))).toEqual(["running"]);
    expect([...css.matchAll(/--ward-motion-running: ([^;]+);/g)].map((m) => m[1])).toEqual(["1.6s", "0s"]);
  });

  it("drives every looping animation in Ward from that one token", () => {
    const loops = moduleCss(join(root, "src")).flatMap((file) => [...file.matchAll(/animation:[^;{}]*infinite[^;{}]*;/g)].map((m) => m[0]));
    expect(loops).toEqual(["animation: ward-running var(--ward-motion-running) ease-in-out infinite;"]);
  });

  it("zeroes the duration and stops the running animation under prefers-reduced-motion", () => {
    expect(reduced).toContain(":root { --ward-motion-running: 0s; }");
    expect(reduced).toContain(".ward-running { animation: none; }");
  });
});
