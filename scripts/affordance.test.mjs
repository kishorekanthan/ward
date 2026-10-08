// @vitest-environment node
import { describe, expect, it } from "vitest";
import { edged, filled, judgeControl, judgeFocus, judgeHover, shows } from "./affordance.mjs";

const WHITE = "rgb(255, 255, 255)";
const BLUE = "rgb(0, 102, 245)";
const INK = "rgb(20, 24, 31)";
const CLEAR = "rgba(0, 0, 0, 0)";
const noSides = [0, 0, 0, 0].map((w) => ({ w, c: INK }));
const bare = { sides: noSides, shadow: "none", bg: CLEAR, image: "none", ground: WHITE };
const control = (over = {}) => ({ tag: "button", box: bare, frame: null, color: INK, parentColor: INK, accent: BLUE, deco: [], chevron: false, ...over });
const hover = (over = {}) => ({ deco: [], own: CLEAR, ground: WHITE, rest: [CLEAR, CLEAR], hover: [CLEAR, CLEAR], cursor: "pointer", ...over });
const focus = (over = {}) => ({ focusVisible: true, outline: { style: "solid", width: 1, color: BLUE }, ground: WHITE, clippedBy: null, ...over });

describe("shows", () => {
  it("is false for a clear colour and for a colour equal to its ground", () => {
    expect(shows("transparent", WHITE)).toBe(false);
    expect(shows(CLEAR, WHITE)).toBe(false);
    expect(shows(WHITE, WHITE)).toBe(false);
    expect(shows(BLUE, WHITE)).toBe(true);
  });
});

describe("edged and filled", () => {
  it("counts a 1px inset shadow or border that differs from the ground, and nothing thinner", () => {
    expect(edged({ ...bare, shadow: `${INK} 0px 0px 0px 1px inset` })).toBe(true);
    expect(edged({ ...bare, shadow: `${INK} 0px 0px 0px 0px inset` })).toBe(false);
    expect(edged({ ...bare, shadow: `${WHITE} 0px 0px 0px 1px inset` })).toBe(false);
    expect(edged({ ...bare, shadow: `${INK} 0px 0px 0px 1px` })).toBe(false);
    expect(edged({ ...bare, sides: [{ w: 1, c: INK }, ...noSides.slice(1)] })).toBe(true);
  });

  it("counts a painted background colour or image as a fill", () => {
    expect(filled(bare)).toBe(false);
    expect(filled({ ...bare, bg: BLUE })).toBe(true);
    expect(filled({ ...bare, bg: WHITE })).toBe(false);
    expect(filled({ ...bare, image: "linear-gradient(red, blue)" })).toBe(true);
  });
});

describe("judgeControl", () => {
  it("flags a bare button in its parent's ink as plain text", () => {
    expect(judgeControl(control())).toEqual(["reads as plain text: no border, no background, no accent and its parent's colour"]);
  });

  it("accepts an edge, a fill, a framing row, the accent ink or an ink of its own", () => {
    expect(judgeControl(control({ box: { ...bare, shadow: `${INK} 0px 0px 0px 1px inset` } }))).toEqual([]);
    expect(judgeControl(control({ box: { ...bare, bg: BLUE } }))).toEqual([]);
    expect(judgeControl(control({ frame: { ...bare, bg: "rgb(244, 245, 247)" } }))).toEqual([]);
    expect(judgeControl(control({ color: BLUE }))).toEqual([]);
    expect(judgeControl(control({ color: "rgb(90, 99, 112)" }))).toEqual([]);
  });

  it("flags an underline at rest", () => {
    expect(judgeControl(control({ tag: "a", color: BLUE, deco: ["underline"] }))).toEqual(["underlined at rest (underline)"]);
  });

  it("flags a select with no edge or fill, and one with no chevron", () => {
    expect(judgeControl(control({ tag: "select", color: BLUE }))).toEqual(["no control border or fill", "no chevron"]);
    expect(judgeControl(control({ tag: "select", box: { ...bare, bg: BLUE }, chevron: true }))).toEqual([]);
  });

  it("holds a listbox trigger button to the select's frame and chevron, and a plain button to neither", () => {
    expect(judgeControl(control({ tag: "button", popup: true, color: BLUE }))).toEqual(["no control border or fill", "no chevron"]);
    expect(judgeControl(control({ tag: "button", popup: true, box: { ...bare, bg: BLUE }, chevron: true }))).toEqual([]);
    expect(judgeControl(control({ tag: "button", popup: false, color: BLUE }))).toEqual([]);
  });
});

describe("judgeHover", () => {
  it("flags an underline on hover, an unchanged ground and a non-pointer cursor", () => {
    expect(judgeHover(hover({ deco: ["underline"], cursor: "auto" }))).toEqual(["underlined on hover (underline)", "no hover ground", "cursor auto on hover"]);
  });

  it("accepts a painted own ground or a changed row ground", () => {
    expect(judgeHover(hover({ own: "rgb(240, 245, 255)" }))).toEqual([]);
    expect(judgeHover(hover({ hover: [CLEAR, "rgb(244, 245, 247)"] }))).toEqual([]);
  });
});

describe("judgeFocus", () => {
  it("accepts a visible ring that nothing clips", () => {
    expect(judgeFocus(focus())).toEqual([]);
  });

  it("flags a missing, hidden or ground-coloured ring and a clipped one", () => {
    expect(judgeFocus(focus({ outline: { style: "none", width: 1, color: BLUE } }))).toEqual(["no focus ring"]);
    expect(judgeFocus(focus({ outline: { style: "solid", width: 1, color: CLEAR } }))).toEqual(["no focus ring"]);
    expect(judgeFocus(focus({ outline: { style: "solid", width: 0, color: BLUE } }))).toEqual(["no focus ring"]);
    expect(judgeFocus(focus({ clippedBy: 'div._strip_1 ""' }))).toEqual(['focus ring clipped by div._strip_1 ""']);
    expect(judgeFocus(focus({ focusVisible: false }))).toEqual(["not :focus-visible under keyboard focus"]);
  });
});
