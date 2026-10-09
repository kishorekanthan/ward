import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { belowFloor, contrastProblems, derivedDarkPairs, edgePairs, graphicPairs, roleInkPairs, textPairs } from "./contrast.mjs";

const tokens = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "tokens.json"), "utf8"));

describe("derived dark contrast", () => {
  it("passes the shipped dark ramp", () => {
    expect(belowFloor(derivedDarkPairs(tokens.dark))).toEqual([]);
  });

  // #4E5868 is the pre-#67 dark line3; on the #203 dark surface it is 2.29:1.
  it("fails the old line3 track at 2.29:1 against its 3:1 floor", () => {
    expect(belowFloor(derivedDarkPairs({ ...tokens.dark, line3: "#4E5868" }))).toEqual(["dark line3/surface #4E5868 on #1F1F1F = 2.29 (needs 3:1)"]);
  });

  it("fails ink2 dropped to the dark line2 grey on every ground it sits on", () => {
    const low = belowFloor(derivedDarkPairs({ ...tokens.dark, ink2: "#434039" }));
    expect(low.map((l) => l.split(" ")[1])).toEqual(["ink2/surface", "ink2/surface2", "ink2/surface3"]);
  });

  it("fails a surface3 lifted until faint text on it drops below 4.5:1", () => {
    const low = belowFloor(derivedDarkPairs({ ...tokens.dark, surface3: "#5A5A5A" }));
    expect(low).toEqual(["dark muted/surface3 #A5A29C on #5A5A5A = 2.71 (needs 4.5:1)", "dark faint/surface3 #A09D97 on #5A5A5A = 2.55 (needs 4.5:1)"]);
  });
});

describe("edge contrast", () => {
  it("passes the shipped edge on every ground, both themes", () => {
    expect(belowFloor(edgePairs(tokens))).toEqual([]);
  });

  // #C9C6C0 is the prototype's checkbox edge, 1.70:1 on white (TRELLIS-422).
  it("fails the prototype checkbox edge as the light edge on every neutral ground", () => {
    const low = belowFloor(edgePairs({ ...tokens, color: { ...tokens.color, edge: "#C9C6C0" } }));
    expect(low).toEqual([
      "light edge/bg #C9C6C0 on #F9F9F8 = 1.62 (needs 3:1)",
      "light edge/surface #C9C6C0 on #FFFFFF = 1.70 (needs 3:1)",
      "light edge/surface2 #C9C6C0 on #F1F1EF = 1.51 (needs 3:1)",
      "light edge/surface3 #C9C6C0 on #FCFCFB = 1.66 (needs 3:1)",
      "light edge/selected #C9C6C0 on #F3F3F1 = 1.53 (needs 3:1)",
      "light edge/accentTint #C9C6C0 on #EBEBE9 = 1.43 (needs 3:1)",
      "light edge/laneTint #C9C6C0 on #EEF1EC = 1.50 (needs 3:1)",
      "light edge/gateLaneTint #C9C6C0 on #FBF3DF = 1.54 (needs 3:1)",
      "light edge/hover #C9C6C0 on #F6F6F3 = 1.57 (needs 3:1)",
    ]);
  });

  it("fails dark line2 as the dark edge on every neutral ground", () => {
    const low = belowFloor(edgePairs({ ...tokens, dark: { ...tokens.dark, edge: "#434039" } }));
    expect(low.map((l) => l.split(" ")[1])).toEqual(["edge/bg", "edge/surface", "edge/surface2", "edge/surface3", "edge/selected", "edge/accentTint", "edge/laneTint", "edge/gateLaneTint", "edge/hover"]);
  });

  it("fails a dark surface3 lifted until the edge on it drops below 3:1", () => {
    const low = belowFloor(edgePairs({ ...tokens, dark: { ...tokens.dark, surface3: "#3A3A3A" } }));
    expect(low).toEqual(["dark edge/surface3 #7D796C on #3A3A3A = 2.61 (needs 3:1)"]);
  });
});

const grounds = ["bg", "surface", "surface2", "surface3", "selected", "accentTint", "laneTint", "gateLaneTint", "hover", "sageTint", "peachTint", "runningTint", "waitingTint", "doneTint", "dangerTint"];

describe("text contrast on every surface (TRELLIS-422)", () => {
  it("holds text, ink2, muted and faint to 4.5:1 on all fifteen grounds, both themes", () => {
    expect(textPairs(tokens)).toHaveLength(120);
    expect(belowFloor(textPairs(tokens))).toEqual([]);
  });

  // #A5A29C is the prototype's light faint: 2.55:1 on white and lower on every tint.
  it("fails the prototype light faint on every ground", () => {
    const low = belowFloor(textPairs({ ...tokens, color: { ...tokens.color, faint: "#A5A29C" } }));
    expect(low.map((l) => l.split(" ")[1])).toEqual(grounds.map((g) => `faint/${g}`));
    expect(low[1]).toBe("light faint/surface #A5A29C on #FFFFFF = 2.55 (needs 4.5:1)");
  });

  // #6B6963 passes on white (5.49:1) but not on three tints, which is why light muted went one step darker.
  it("fails the ticket's light muted on the sage, peach and danger tints", () => {
    const low = belowFloor(textPairs({ ...tokens, color: { ...tokens.color, muted: "#6B6963" } }));
    expect(low).toEqual([
      "light muted/sageTint #6B6963 on #C9E2D2 = 4.00 (needs 4.5:1)",
      "light muted/peachTint #6B6963 on #FBE3D2 = 4.45 (needs 4.5:1)",
      "light muted/dangerTint #6B6963 on #F7DFE3 = 4.34 (needs 4.5:1)",
    ]);
  });

  // #6F6E69 is the prototype's dark faint: 3.44:1 on the dark page.
  it("fails the prototype dark faint on every ground", () => {
    const low = belowFloor(textPairs({ ...tokens, dark: { ...tokens.dark, faint: "#6F6E69" } }));
    expect(low.map((l) => l.split(" ")[1])).toEqual(grounds.map((g) => `faint/${g}`));
    expect(low[0]).toBe("dark faint/bg #6F6E69 on #191919 = 3.44 (needs 4.5:1)");
  });

  // The prototype's dark sage tint #264532 leaves dark faint at 3.92:1, so the shipped tint is one step darker.
  it("fails dark faint on the prototype's dark sage tint", () => {
    expect(belowFloor(textPairs({ ...tokens, dark: { ...tokens.dark, sageTint: "#264532" } })).filter((l) => l.includes("faint"))).toEqual([
      "dark faint/sageTint #A09D97 on #264532 = 3.92 (needs 4.5:1)",
    ]);
  });

  // A dark lane lifted to #4A4A40 still holds text but drops muted and faint, the lane's counts and notes.
  it("fails muted and faint on a dark lane tint lifted too far", () => {
    expect(belowFloor(textPairs({ ...tokens, dark: { ...tokens.dark, laneTint: "#4A4A40" } }))).toEqual([
      "dark muted/laneTint #A5A29C on #4A4A40 = 3.52 (needs 4.5:1)",
      "dark faint/laneTint #A09D97 on #4A4A40 = 3.31 (needs 4.5:1)",
    ]);
  });
});

describe("role ink contrast (TRELLIS-422)", () => {
  it("holds every role ink to 4.5:1 on each neutral ground and its own tint, both themes", () => {
    expect(roleInkPairs(tokens)).toHaveLength(138);
    expect(belowFloor(roleInkPairs(tokens))).toEqual([]);
  });

  // #B5610B is the prototype's peach text, 4.49:1 on white.
  it("fails the prototype peach text on white and every ground under it", () => {
    const low = belowFloor(roleInkPairs({ ...tokens, color: { ...tokens.color, peachInk: "#B5610B" } }));
    expect(low).toHaveLength(10);
    expect(low[1]).toBe("light peachInk/surface #B5610B on #FFFFFF = 4.49 (needs 4.5:1)");
    expect(low[9]).toBe("light peachInk/peachTint #B5610B on #FBE3D2 = 3.64 (needs 4.5:1)");
  });
});

describe("graphic contrast (TRELLIS-422)", () => {
  it("holds the focus ring, chart marks, sage and peach to 3:1 on every neutral ground, both themes", () => {
    expect(graphicPairs(tokens)).toHaveLength(108);
    expect(belowFloor(graphicPairs(tokens))).toEqual([]);
  });

  // #A7C7EC is the prototype's chart bar and focus outline blue, 1.75:1 on white.
  it("fails the prototype chart bar and focus blue", () => {
    const low = belowFloor(graphicPairs({ ...tokens, color: { ...tokens.color, chartBar: "#A7C7EC", focus: "#A7C7EC" } }));
    expect(low.map((l) => l.split(" ")[1])).toEqual([...["focus", "chartBar"].flatMap((m) => grounds.slice(0, 9).map((g) => `${m}/${g}`))]);
    expect(low[1]).toBe("light focus/surface #A7C7EC on #FFFFFF = 1.75 (needs 3:1)");
  });

  it("fails the prototype's light sage and peach marks", () => {
    const low = belowFloor(graphicPairs({ ...tokens, color: { ...tokens.color, sage: "#7FB394", peach: "#F2B48A" } }));
    expect(low.filter((l) => l.includes("/surface "))).toEqual([
      "light sage/surface #7FB394 on #FFFFFF = 2.39 (needs 3:1)",
      "light peach/surface #F2B48A on #FFFFFF = 1.80 (needs 3:1)",
    ]);
  });
});

describe("check:contrast exit", () => {
  const clean = { broken: [], failures: [] };

  it("counts a derived dark pair below its floor even when every story sweeps clean", () => {
    const derived = belowFloor(derivedDarkPairs({ ...tokens.dark, ink2: "#434039" }));
    expect(contrastProblems(derived, clean)).toBe(3);
  });

  it("counts broken stories and rendered failures alongside derived pairs", () => {
    expect(contrastProblems([], clean)).toBe(0);
    expect(contrastProblems(["d"], { broken: ["b1", "b2"], failures: [{}] })).toBe(4);
  });
});
