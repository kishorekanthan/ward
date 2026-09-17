import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { count } from "./count";
import { clock } from "./clock";
import { duration } from "./duration";
import { elapsed } from "./elapsed";
import { money } from "./money";
import { ratio } from "./ratio";
import { stamp } from "./stamp";

const dir = join(dirname(fileURLToPath(import.meta.url)), "goldens");
const golden = (name: string) => JSON.parse(readFileSync(join(dir, name + ".json"), "utf8"));

const cases: Record<string, (...args: never[]) => string> = {
  duration,
  elapsed,
  stamp,
  money,
  count,
  ratio,
  clock,
};

for (const [name, fn] of Object.entries(cases)) {
  describe(`fmt/${name}`, () => {
    it("matches the hand-computed golden file", () => {
      for (const { in: input, out } of golden(name) as { in: never[]; out: string }[]) {
        expect(fn(...input), `${name}(${JSON.stringify(input)})`).toBe(out);
      }
    });
  });
}
