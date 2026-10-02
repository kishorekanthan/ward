import { describe, expect, it } from "vitest";
import { diffFacts } from "./focus-targets.mjs";

const want = [{ name: "Studio", wardRing: true, hit24: true }, { name: "ledger", hit24: true }];

describe("focus targets diff", () => {
  it("is empty when every golden fact matches, extra facts ignored", () => {
    expect(diffFacts(want, [{ name: "ledger", hit24: true }, { name: "Studio", wardRing: true, hit24: true, height: 20 }], "light ")).toEqual([]);
  });

  it("names each differing fact, the last one included, each against its own target", () => {
    expect(diffFacts(want, [{ name: "ledger", hit24: false }, { name: "Studio", wardRing: false, hit24: false }], "dark ")).toEqual([
      "dark Studio.wardRing: got false, want true",
      "dark Studio.hit24: got false, want true",
      "dark ledger.hit24: got false, want true",
    ]);
  });

  it("reports every fact of a target the page never reached", () => {
    expect(diffFacts(want.slice(1), [], "row link ")).toEqual([
      'row link ledger.name: got undefined, want "ledger"',
      "row link ledger.hit24: got undefined, want true",
    ]);
  });
});
