import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ruleBody } from "../test-css";

const WARD = "src/ward.css";
const css = readFileSync(WARD, "utf8");
const keyframes = /keyframes ward-flash \{\n([\s\S]*?)\n\}/.exec(css)?.[1] ?? "";
const frames = Array.from(keyframes.matchAll(/^\s*([\w%, ]+?)\s*\{([^}]*)\}/gm), (m) => ({ at: m[1], body: m[2].trim() }));
const reduced = /@media \(prefers-reduced-motion: reduce\) \{\n([\s\S]*?)\n\}/.exec(css)?.[1] ?? "";

// The flash is jsdom-invisible, so these read the stylesheet; scripts/flash-ring.mjs reads the painted ring in Chromium.
describe("the live flash ring (#231)", () => {
  it("animates only the outline colour, so no box, border or shadow moves", () => {
    expect(frames).toEqual([{ at: "from", body: "outline-color: var(--ward-flash-colour, var(--ward-color-running));" }]);
  });

  it("rests on a 2px transparent ring, so the first frame paints the flash colour and the last fades it out", () => {
    expect(ruleBody(WARD, ".ward-border-flash:not(:focus-visible)")).toBe("outline: var(--ward-underline) solid transparent");
    expect(/--ward-underline: ([^;]+);/.exec(css)?.[1]).toBe("2px");
  });

  it("runs no flash under reduced motion", () => {
    expect(reduced).toContain("*, *::before, *::after { animation: none !important;");
  });
});
