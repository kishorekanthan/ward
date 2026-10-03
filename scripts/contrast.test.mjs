import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { belowFloor, contrastProblems, derivedDarkPairs, edgePairs } from "./contrast.mjs";

const tokens = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "tokens.json"), "utf8"));

describe("derived dark contrast", () => {
  it("passes the shipped dark ramp", () => {
    expect(belowFloor(derivedDarkPairs(tokens.dark))).toEqual([]);
  });

  // 2.42:1 is the pre-#67 dark line3 against dark surface, recorded in the tokens meta.
  it("fails the old line3 track at 2.42:1 against its 3:1 floor", () => {
    expect(belowFloor(derivedDarkPairs({ ...tokens.dark, line3: "#4E5868" }))).toEqual(["dark line3/surface #4E5868 on #151A24 = 2.42 (needs 3:1)"]);
  });

  it("fails ink2 dropped to the dark line2 grey on every ground it sits on", () => {
    const low = belowFloor(derivedDarkPairs({ ...tokens.dark, ink2: "#3A4453" }));
    expect(low.map((l) => l.split(" ")[1])).toEqual(["ink2/surface", "ink2/surface2", "ink2/surface3"]);
  });

  it("fails a surface3 lifted until faint text on it drops below 4.5:1", () => {
    const low = belowFloor(derivedDarkPairs({ ...tokens.dark, surface3: "#4E5868" }));
    expect(low.map((l) => l.split(" ")[1])).toEqual(["ink2/surface3", "muted/surface3", "faint/surface3"]);
  });
});

describe("edge contrast", () => {
  it("passes the shipped edge on every ground, both themes", () => {
    expect(belowFloor(edgePairs(tokens))).toEqual([]);
  });

  // 1.34:1 is light line2 on surface2, the edge secondary Btn drew before #146.
  it("fails line2 as the light edge on every ground", () => {
    const low = belowFloor(edgePairs({ ...tokens, color: { ...tokens.color, edge: "#C9D2DE" } }));
    expect(low).toEqual(["light edge/bg #C9D2DE on #F7F8FA = 1.44 (needs 3:1)", "light edge/surface #C9D2DE on #FFFFFF = 1.53 (needs 3:1)", "light edge/surface2 #C9D2DE on #EDF0F4 = 1.34 (needs 3:1)", "light edge/surface3 #C9D2DE on #FCFCFD = 1.49 (needs 3:1)"]);
  });

  it("fails dark line2 as the dark edge on every ground", () => {
    const low = belowFloor(edgePairs({ ...tokens, dark: { ...tokens.dark, edge: "#3A4453" } }));
    expect(low.map((l) => l.split(" ")[1])).toEqual(["edge/bg", "edge/surface", "edge/surface2", "edge/surface3"]);
  });

  it("fails a dark surface3 lifted until the edge on it drops below 3:1", () => {
    const low = belowFloor(edgePairs({ ...tokens, dark: { ...tokens.dark, surface3: "#2A3140" } }));
    expect(low).toEqual(["dark edge/surface3 #67717F on #2A3140 = 2.63 (needs 3:1)"]);
  });
});

describe("check:contrast exit", () => {
  const clean = { broken: [], failures: [] };

  it("counts a derived dark pair below its floor even when every story sweeps clean", () => {
    const derived = belowFloor(derivedDarkPairs({ ...tokens.dark, ink2: "#3A4453" }));
    expect(contrastProblems(derived, clean)).toBe(3);
  });

  it("counts broken stories and rendered failures alongside derived pairs", () => {
    expect(contrastProblems([], clean)).toBe(0);
    expect(contrastProblems(["d"], { broken: ["b1", "b2"], failures: [{}] })).toBe(4);
  });
});
