import { describe, expect, it } from "vitest";
import { placeMenu, type Edges } from "./anchorMenu";

const view = { width: 1024, height: 768 };
const at = (left: number, top: number, width = 160, height = 32): Edges => ({ left, top, right: left + width, bottom: top + height });

describe("placeMenu", () => {
  it("hangs the menu 4px under the trigger on its start edge when it fits", () => {
    expect(placeMenu(at(50, 100), { width: 160, height: 120 }, view, "start")).toEqual({ top: 136, left: 50, maxHeight: 628 });
  });

  it("flips above a trigger near the bottom of the viewport", () => {
    expect(placeMenu(at(100, 700), { width: 160, height: 120 }, view, "start")).toEqual({ top: 576, left: 100, maxHeight: 692 });
  });

  it("stays below, capped to the room there, when below has more room than above", () => {
    expect(placeMenu(at(100, 300), { width: 160, height: 600 }, view, "start")).toEqual({ top: 336, left: 100, maxHeight: 428 });
  });

  it("goes above, capped to the room there, when above has more room", () => {
    expect(placeMenu(at(100, 500), { width: 160, height: 600 }, view, "start")).toEqual({ top: 4, left: 100, maxHeight: 492 });
  });

  it("moves a start menu to the trigger's end edge at the right of the viewport", () => {
    expect(placeMenu(at(950, 100, 60), { width: 160, height: 120 }, view, "start").left).toBe(850);
  });

  it("moves an end menu to the trigger's start edge at the left of the viewport", () => {
    expect(placeMenu(at(10, 100, 60), { width: 160, height: 120 }, view, "end").left).toBe(10);
  });

  it("keeps an end menu on the end edge when it fits", () => {
    expect(placeMenu(at(600, 100, 100), { width: 160, height: 120 }, view, "end").left).toBe(540);
  });

  it("holds a menu wider than the viewport against its left edge", () => {
    expect(placeMenu(at(10, 100, 60), { width: 1100, height: 120 }, view, "start").left).toBe(0);
  });

  it("flips on a phone-width viewport", () => {
    expect(placeMenu(at(300, 100, 60), { width: 200, height: 120 }, { width: 375, height: 667 }, "start").left).toBe(160);
  });
});
