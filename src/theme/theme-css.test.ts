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
    expect(selectors).toHaveLength(8);
    expect(css).not.toContain('data-accent="green"');
    expect(css.match(/data-accent/g)).toHaveLength(16);
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
