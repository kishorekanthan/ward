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
  { file: "PageHeader.module.css", selector: ".action > a" },
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

// The panel under a tab strip is often positioned, so a tab's tap, More's too, is lifted over it.
it("lifts each tab's tap, and More's, over the panel below the strip", () => {
  const { inside, outside } = mediaSplit(join(here, "Tabs.module.css"), PHONE);
  expect(ruleBodyIn(inside, ".tab::after,\n  .strip .more::after")).toBe("z-index: 1");
  expect(outside).not.toContain("z-index");
});

// Actions that do not fit wait in More, so on a phone the wrap no longer clips the buttons' taps; wider, it still clips.
it("lets the header actions' taps out of their wrap on a phone only", () => {
  const { inside, outside } = mediaSplit(join(here, "PageHeader.module.css"), PHONE);
  expect(ruleBodyIn(inside, ".actionsWrap")).toContain("overflow: visible");
  expect(outside).toMatch(/\.actionsWrap \{[^}]*overflow: hidden/);
});

describe("mediaSplit", () => {
  it("cuts each block for the query whole, nested braces and all, and leaves other queries outside", () => {
    const { inside, outside } = mediaSplit(join(here, "Btn.module.css"), "(max-width: 1px)");
    expect(inside).toBe("");
    expect(outside).toContain(`@media ${PHONE} {`);
  });
});
