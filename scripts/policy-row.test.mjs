// @vitest-environment node
import { describe, expect, it } from "vitest";
import { phonePolicyRowDiffs, policyRowDiffs } from "./policy-row.mjs";

const row = (name, cx, cw, chipX = 1089) => ({ row: name, control: { x: cx, w: cw }, chip: { x: chipX, w: 104 } });
const golden = [row("Switch", 928, 151), row("Wide", 897.63, 181.38)];

describe("policyRowDiffs", () => {
  it("passes rows within half a pixel whose controls end before their chips", () => {
    expect(policyRowDiffs([row("Switch", 928.4, 151), row("Wide", 897.63, 181.7)], golden)).toEqual([]);
  });

  it("names a control that runs past its chip, as the fixed 150px column drew it", () => {
    expect(policyRowDiffs([row("Switch", 928, 151), row("Wide", 929, 181.38)], golden)).toEqual([
      "Wide: control ends at 1110.38, past the chip at 1089",
      "Wide control.x: got 929, want 897.63",
    ]);
  });

  it("names a narrow control or chip that moved", () => {
    expect(policyRowDiffs([row("Switch", 928, 160, 1095), golden[1]], golden)).toEqual([
      "Switch control.w: got 160, want 151",
      "Switch chip.x: got 1095, want 1089",
    ]);
  });

  it("fails a row lost and a row the golden lacks", () => {
    expect(policyRowDiffs([golden[0]], golden)).toEqual(["Wide: missing"]);
    expect(policyRowDiffs([...golden, golden[0]], golden)).toEqual(["1 row(s) not in the golden"]);
  });
});

// Hand-measured 375px rows: a stacked segment row, its chip on a third line, and main's row before #189, its setting squeezed to 0px.
const box = (x, y, w, h) => ({ x, y, w, h });
const stacked = (name) => ({ row: name, setting: box(15, 13, 273, 41.95), control: box(15, 64.95, 181.38, 26), chip: box(184, 100.95, 104, 17.5), overflow: 0 });
const phoneGolden = [stacked("Rejected"), stacked("Label")];

describe("phonePolicyRowDiffs", () => {
  it("passes rows whose setting sits above a control and chip that keep apart", () => {
    expect(phonePolicyRowDiffs([stacked("Rejected"), { ...stacked("Label"), chip: box(184.4, 101.2, 104, 17.5) }], phoneGolden)).toEqual([]);
  });

  it("names a setting squeezed to nothing whose text runs under the control", () => {
    const squeezed = { ...stacked("Rejected"), setting: box(15, 13, 0, 231.72), control: box(25, 13, 181.38, 26), chip: box(216.38, 13, 104, 17.5), overflow: 48 };
    expect(phonePolicyRowDiffs([squeezed, phoneGolden[1]], phoneGolden)).toEqual([
      "Rejected @375: setting is 0px wide",
      "Rejected @375: setting text runs 48px past its box",
      "Rejected @375 setting.w: got 0, want 273",
      "Rejected @375 setting.h: got 231.72, want 41.95",
      "Rejected @375 control.x: got 25, want 15",
      "Rejected @375 control.y: got 13, want 64.95",
      "Rejected @375 chip.x: got 216.38, want 184",
      "Rejected @375 chip.y: got 13, want 100.95",
    ]);
  });

  it("names a control drawn over the setting text and a chip drawn over the control", () => {
    const over = { ...stacked("Rejected"), control: box(15, 40, 181.38, 26), chip: box(150, 50, 104, 17.5) };
    expect(phonePolicyRowDiffs([over, phoneGolden[1]], phoneGolden)).toEqual([
      "Rejected @375: setting overlaps control",
      "Rejected @375: setting overlaps chip",
      "Rejected @375: control overlaps chip",
      "Rejected @375 control.y: got 40, want 64.95",
      "Rejected @375 chip.x: got 150, want 184",
      "Rejected @375 chip.y: got 50, want 100.95",
    ]);
  });

  it("allows boxes that touch by half a pixel or less", () => {
    const touching = { ...stacked("Rejected"), control: box(15, 54.5, 181.38, 26), chip: box(196, 64.95, 104, 17.5) };
    expect(phonePolicyRowDiffs([touching], [touching])).toEqual([]);
  });

  it("names text wider than a setting box that kept its width", () => {
    expect(phonePolicyRowDiffs([{ ...stacked("Rejected"), overflow: 12 }], [stacked("Rejected")])).toEqual(["Rejected @375: setting text runs 12px past its box"]);
  });

  it("fails a row lost and a row the golden lacks", () => {
    expect(phonePolicyRowDiffs([phoneGolden[0]], phoneGolden)).toEqual(["Label @375: missing"]);
    expect(phonePolicyRowDiffs([...phoneGolden, phoneGolden[0]], phoneGolden)).toEqual(["375px: 1 row(s) not in the golden"]);
  });
});
