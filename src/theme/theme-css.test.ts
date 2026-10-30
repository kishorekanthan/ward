import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ruleBody } from "../test-css";

const src = join(dirname(fileURLToPath(import.meta.url)), "..");
const wardCss = join(src, "ward.css");
const css = readFileSync(wardCss, "utf8");

// Every custom property one generated block declares, as name to value.
const declared = (selector: string) =>
  Object.fromEntries(ruleBody(wardCss, selector).split(";\n").map((d) => d.split(": ")));

// Typed by hand from tokens.json accent; accentPill is the alias of sageTint and must follow it.
const PRESETS = {
  blue: { light: ["#5784B7", "#D3E1F0", "#244366"], dark: ["#6189B8", "#212F40", "#A8C5E6"] },
  violet: { light: ["#9074B4", "#E5DCF2", "#482E6B"], dark: ["#9778BF", "#312541", "#CEB8EA"] },
  orange: { light: ["#BC7024", "#F8E0C3", "#773F0D"], dark: ["#C88541", "#3B2B1C", "#E9C296"] },
  rose: { light: ["#BA5E74", "#F4D7DE", "#6F2A3A"], dark: ["#BF697D", "#3F2229", "#EAB8C4"] },
};
const sageRole = ([sage, tint, ink]: string[]) => ({
  "--ward-color-sage": sage,
  "--ward-color-sageTint": tint,
  "--ward-color-sageInk": ink,
  "--ward-color-accentPill": tint,
});

// Recorded :root values and their compact twins, one 4px space step less on every padded side and gap.
const COMFORTABLE = {
  "--ward-pad-card": "10px 12px",
  "--ward-pad-workCard": "11px",
  "--ward-pad-row": "11px 0",
  "--ward-pad-gridCell": "8px 12px",
  "--ward-gap-row": "8px",
  "--ward-gap-boardColumn": "10px",
  "--ward-gap-lane": "12px",
};
const COMPACT = {
  "--ward-pad-card": "6px 8px",
  "--ward-pad-workCard": "7px",
  "--ward-pad-row": "7px 0",
  "--ward-pad-gridCell": "4px 8px",
  "--ward-gap-row": "4px",
  "--ward-gap-boardColumn": "6px",
  "--ward-gap-lane": "8px",
};

describe("accent presets", () => {
  it.each(Object.entries(PRESETS))("%s restates only the sage role and accentPill, light and dark", (name, values) => {
    expect(declared(`[data-accent="${name}"], [data-accent="${name}"] [data-theme="light"]`)).toEqual(sageRole(values.light));
    expect(declared(`[data-theme="dark"][data-accent="${name}"], [data-accent="${name}"] [data-theme="dark"]`)).toEqual(sageRole(values.dark));
  });

  it("gives Trellis green no block, and no other rule names an accent", () => {
    const selectors = [...css.matchAll(/^([^\n{]*data-accent[^\n{]*) \{$/gm)].map((m) => m[1]);
    expect(selectors.filter((s) => !s.includes("data-contrast"))).toHaveLength(8);
    expect(selectors.filter((s) => s.includes("data-contrast"))).toHaveLength(8);
    expect(css).not.toContain('data-accent="green"');
    expect(css.match(/data-accent/g)).toHaveLength(32);
  });
});

describe("density", () => {
  it("keeps the comfortable lengths on the root", () => {
    const root = declared(":root");
    expect(Object.fromEntries(Object.keys(COMFORTABLE).map((k) => [k, root[k]]))).toEqual(COMFORTABLE);
  });

  it("shortens card padding, row padding and gaps by one step under compact, and nothing else", () => {
    expect(declared('[data-density="compact"]')).toEqual(COMPACT);
    expect(css.match(/data-density/g)).toHaveLength(1);
  });

  // A compact length reaches a component only if its rule names the variable.
  it.each([
    ["primitives/Grid.module.css", ".th,\n.td", "padding: var(--ward-pad-gridCell)"],
    ["composites/board/WorkCard.module.css", ".card", "padding: var(--ward-pad-card)"],
    ["composites/board/WorkCard.module.css", ".card", "gap: var(--ward-gap-row)"],
    ["layout/layout.module.css", ".scroller", "gap: var(--ward-gap-lane)"],
  ])("%s %s reads %s", (file, selector, decl) => {
    expect(ruleBody(join(src, file), selector)).toContain(decl);
  });
});

// Typed by hand: a 40% scrim in light dims the page behind a drawer enough to read which layer is live (#266).
describe("scrim", () => {
  it("is 40% in light and 55% in dark", () => {
    const scrimOf = (selector: string) => declared(selector)["--ward-color-scrim"];
    expect([scrimOf(":root"), scrimOf('[data-theme="light"]'), scrimOf('[data-theme="dark"]')]).toEqual(["rgba(25,25,24,0.40)", "rgba(25,25,24,0.40)", "rgba(0,0,0,0.55)"]);
  });
});

describe("high contrast (#338)", () => {
  const LIGHT = ':root[data-contrast="more"], [data-contrast="more"] [data-theme="light"]';
  const DARK = ':root[data-contrast="more"][data-theme="dark"], [data-contrast="more"] [data-theme="dark"]';
  const colourOnly = (selector: string) => Object.keys(declared(selector)).filter((k) => !/^--ward-(color|chip|stream)-/.test(k));

  it("restates colour, chip and stream tokens only, light and dark", () => {
    expect(colourOnly(LIGHT)).toEqual([]);
    expect(colourOnly(DARK)).toEqual([]);
  });

  it("carries the AAA text, focus ring, edge and callout line, with aliases following their role", () => {
    const light = declared(LIGHT);
    const dark = declared(DARK);
    expect([light["--ward-color-text"], light["--ward-color-focus"], light["--ward-color-edge"], light["--ward-color-warnLine"]]).toEqual(["#0D0D0C", "#0A55B8", "#4B4741", "#77683E"]);
    expect([dark["--ward-color-text"], dark["--ward-color-focus"], dark["--ward-color-edge"], dark["--ward-color-warnLine"]]).toEqual(["#FFFFFF", "#8DBBF2", "#B3AEA2", "#968C70"]);
    expect(light["--ward-color-accentPill"]).toBe(light["--ward-color-sageTint"]);
    expect([light["--ward-chip-gate-bg"], light["--ward-stream-3-chip"], dark["--ward-stream-4-chip"]]).toEqual(["#1C1B18", "#8A3C0C", "#15548C"]);
  });

  it("restates only the sage role and accentPill for each preset, after the theme blocks", () => {
    const blue = declared('[data-contrast="more"][data-accent="blue"], [data-contrast="more"][data-accent="blue"] [data-theme="light"]');
    expect(blue).toEqual(sageRole(["#436D9D", "#E1EAF5", "#27486D"]));
    const darkBlue = declared('[data-contrast="more"][data-accent="blue"][data-theme="dark"], [data-contrast="more"][data-accent="blue"] [data-theme="dark"]');
    expect(darkBlue).toEqual(sageRole(["#6B91BD", "#151E28", "#98BAE1"]));
    expect(css.indexOf('[data-contrast="more"][data-accent="blue"]')).toBeGreaterThan(css.indexOf(DARK));
    expect(css.indexOf(LIGHT)).toBeGreaterThan(css.indexOf('\n[data-accent="rose"], [data-accent="rose"] [data-theme="light"] {'));
  });
});

