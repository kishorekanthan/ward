// @vitest-environment node
import { describe, expect, it } from "vitest";
import { policyRowDiffs } from "./policy-row.mjs";

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
