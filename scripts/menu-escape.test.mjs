// @vitest-environment node
import { describe, expect, it } from "vitest";
import { escapeDiffs } from "./menu-escape.mjs";

const box = (x, y, w, h) => ({ x, y, w, h });
const controls = [box(500, 111, 94, 28), box(602, 111, 113, 28)];
const facts = (over = {}) => ({
  controls,
  trigger: box(927, 111, 130.72, 28),
  menu: box(927, 143, 130.72, 82),
  topLayer: true,
  allShown: true,
  view: { w: 1280, h: 900 },
  clip: box(492, 103, 776, 44),
  sideways: false,
  focused: false,
  ...over,
});
const keys = { escaped: { closed: true, focused: true }, reopened: true, picked: { closed: true, focused: true, value: "Integration" } };
const golden = { "toolbar:light@1280": { dx: 0, dy: 4, w: 130.72, h: 82 } };
const run = (open = {}, closed = {}, k = keys) => ({ "toolbar:light@1280": { closed: facts({ menu: null, ...closed }), open: facts(open), keys: k } });

describe("escapeDiffs", () => {
  it("passes a menu 4px under its trigger, whole, in the top layer, with the controls in place", () => {
    expect(escapeDiffs(run(), golden)).toEqual([]);
  });

  it("names a control that moved and a menu left in the page flow", () => {
    expect(escapeDiffs(run({ controls: [controls[0], box(602, 140, 113, 28)], topLayer: false }), golden)).toEqual([
      "toolbar:light@1280: controls moved when the menu opened",
      "toolbar:light@1280: menu is not in the top layer",
    ]);
  });

  it("names a menu its box still holds, a covered row and a sideways scroll", () => {
    expect(escapeDiffs(run({ clip: box(492, 103, 776, 200), allShown: false, sideways: true }), golden)).toEqual([
      "toolbar:light@1280: some menu rows are hidden or covered",
      "toolbar:light@1280: menu stays inside the box it should escape",
      "toolbar:light@1280: the box scrolls sideways",
    ]);
  });

  it("names a menu off the golden and past the viewport", () => {
    expect(escapeDiffs(run({ menu: box(927, 870, 130.72, 82) }), golden)).toEqual([
      "toolbar:light@1280 menu.dy: got 731, want 4",
      "toolbar:light@1280: menu runs past the viewport",
    ]);
  });

  it("names keys that leave focus behind or pick the wrong option", () => {
    const lost = { escaped: { closed: true, focused: false }, reopened: false, picked: { closed: true, focused: true, value: "Data Engineering" } };
    expect(escapeDiffs(run({}, {}, lost), golden)).toEqual([
      "toolbar:light@1280: Escape did not close the menu back to its trigger",
      "toolbar:light@1280: ArrowDown did not open the menu",
      "toolbar:light@1280: ArrowDown then Enter did not pick Integration",
    ]);
  });
});
