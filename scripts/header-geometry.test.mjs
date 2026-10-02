// @vitest-environment node
import { describe, expect, it } from "vitest";
import { geometryDiffs } from "./header-geometry.mjs";

const rect = (el, x, y, w, h) => ({ el, x, y, w, h });
const golden = { "kicker@320": [[rect("root", 0, 0, 248, 64), rect("0:h2", 18, 13, 78, 19.5)]] };

describe("geometryDiffs", () => {
  it("passes a header within half a pixel on every edge", () => {
    const got = { "kicker@320": [[rect("root", 0.5, 0, 248, 63.5), rect("0:h2", 18, 13.4, 77.6, 19.5)]] };
    expect(geometryDiffs(got, golden)).toEqual([]);
  });

  it("names each rect value that moved by more than half a pixel", () => {
    const got = { "kicker@320": [[rect("root", 0, 0, 248, 64), rect("0:h2", 18, 13, 85.3, 18.9)]] };
    expect(geometryDiffs(got, golden)).toEqual(["kicker@320 copy 0 0:h2.w: got 85.3, want 78", "kicker@320 copy 0 0:h2.h: got 18.9, want 19.5"]);
  });

  it("fails a child added, a child lost and a themed copy lost", () => {
    const added = { "kicker@320": [[...golden["kicker@320"][0], rect("1:span", 100, 15, 40, 18)]] };
    const lost = { "kicker@320": [[rect("root", 0, 0, 248, 64)]] };
    expect(geometryDiffs(added, golden)).toEqual(["kicker@320 copy 0: 1 rect(s) not in the golden"]);
    expect(geometryDiffs(lost, golden)).toEqual(["kicker@320 copy 0: missing, want 0:h2"]);
    expect(geometryDiffs({ "kicker@320": [] }, golden)).toEqual(["kicker@320 copy 0: missing, want root", "kicker@320 copy 0: missing, want 0:h2"]);
  });

  it("fails a themed copy the golden lacks", () => {
    const twice = { "kicker@320": [golden["kicker@320"][0], golden["kicker@320"][0]] };
    expect(geometryDiffs(twice, golden)).toEqual(["kicker@320 copy 1: 2 rect(s) not in the golden"]);
  });

  it("fails a child that changed element at the same place, and a story the golden lacks", () => {
    const swapped = { "kicker@320": [[rect("root", 0, 0, 248, 64), rect("0:span", 18, 13, 78, 19.5)]] };
    expect(geometryDiffs(swapped, golden)).toEqual(["kicker@320 copy 0: got 0:span, want 0:h2"]);
    expect(geometryDiffs({ ...golden, "new@375": [[rect("root", 0, 0, 1, 1)]] }, golden)).toEqual(["new@375 copy 0: 1 rect(s) not in the golden"]);
  });
});
