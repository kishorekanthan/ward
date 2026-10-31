import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { mediaSplit, ruleBodyIn } from "../test-css";

const here = dirname(fileURLToPath(import.meta.url));
const PHONE = "(max-width: 767.98px)";
const HALF_TAP = "min(0%, calc(50% - var(--ward-height-touch) / 2))";
const TAP = `content: "";\nposition: absolute;\ninset-block: ${HALF_TAP};\ninset-inline: ${HALF_TAP}`;
const css = (file: string) => mediaSplit(join(here, file), PHONE);

// A thumb on a phone gets 44px each way around a tab, a header action or a header button; a bigger box keeps its own edge.
describe("phone tap area", () => {
  it("gives a tab and More a tap over the panel below the strip, on a phone only", () => {
    const { inside, outside } = css("Tabs.module.css");
    expect(ruleBodyIn(inside, ":where(.tab, .strip .more)")).toBe("position: relative");
    expect(ruleBodyIn(inside, ".tab::after,\n  .strip .more::after")).toBe(TAP + ";\nz-index: 1");
    expect(outside).not.toMatch(/::after|z-index/);
  });

  it("gives each header action a whole tap that no consumer clip cuts, on a phone only", () => {
    const { inside, outside } = css("PageHeader.module.css");
    expect(ruleBodyIn(inside, ":where(.actions :is(button, a))")).toBe("position: relative");
    expect(ruleBodyIn(inside, ".actions :is(button, a)")).toBe("overflow: visible");
    expect(ruleBodyIn(inside, ".actions :is(button, a)::after")).toBe(TAP);
    expect(ruleBodyIn(inside, ".actionsWrap")).toContain("overflow: visible");
    expect(outside).toMatch(/\.actionsWrap \{[^}]*overflow: hidden/);
    expect(outside).not.toContain("::after");
  });

  it("gives the header's Menu and action buttons a whole tap, on a phone only", () => {
    const { inside, outside } = css("../layout/AppShell.module.css");
    expect(ruleBodyIn(inside, ":where(.sidebarToggle, .headerAction) :is(button, a)")).toBe("position: relative");
    expect(ruleBodyIn(inside, ".sidebarToggle :is(button, a),\n  .headerAction :is(button, a)")).toBe("overflow: visible");
    expect(ruleBodyIn(inside, ".sidebarToggle :is(button, a)::after,\n  .headerAction :is(button, a)::after")).toBe(TAP);
    expect(outside).not.toMatch(/(sidebarToggle|headerAction)[^{]*::after/);
  });

  it("leaves a plain Btn and a menu trigger as drawn: their taps come from the strip or header that holds them", () => {
    expect(css("Btn.module.css").inside).toBe("");
    expect(css("Menu.module.css").inside).toBe("");
  });
});
