import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { belowFloor, derivedDarkPairs } from "./contrast.mjs";

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
