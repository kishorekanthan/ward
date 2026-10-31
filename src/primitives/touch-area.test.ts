import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { mediaSplit, ruleBodyIn } from "../test-css";

const here = dirname(fileURLToPath(import.meta.url));
const PHONE = "(max-width: 767.98px)";
const HALF_TAP = "min(0%, calc(50% - var(--ward-height-touch) / 2))";
const CONTROLS = [
  { file: "Btn.module.css", selector: ".btn" },
  { file: "Tabs.module.css", selector: ".tab" },
  { file: "Menu.module.css", selector: ".trigger" },
];

// A thumb on a phone gets 44px each way around the control's centre; a box taller or wider keeps its own edge.
describe("phone tap area", () => {
  for (const { file, selector } of CONTROLS) {
    it(`${selector} in ${file} grows its tap to 44px on a phone, and only there`, () => {
      const { inside, outside } = mediaSplit(join(here, file), PHONE);
      expect(ruleBodyIn(inside, `:where(${selector})`)).toBe("position: relative");
      expect(ruleBodyIn(inside, `${selector}::after`)).toBe(
        `content: "";\nposition: absolute;\ninset-block: ${HALF_TAP};\ninset-inline: ${HALF_TAP}`,
      );
      expect(outside).not.toContain(`${selector}::after`);
      expect(outside).not.toContain(`:where(${selector})`);
    });
  }
});

describe("mediaSplit", () => {
  it("cuts each block for the query whole, nested braces and all, and leaves other queries outside", () => {
    const { inside, outside } = mediaSplit(join(here, "Btn.module.css"), "(max-width: 1px)");
    expect(inside).toBe("");
    expect(outside).toContain(`@media ${PHONE} {`);
  });
});
