import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { mediaSplit, ruleBodyIn } from "../test-css";

const here = dirname(fileURLToPath(import.meta.url));
const PHONE = "(max-width: 767.98px)";
const HALF_TAP = "min(0%, calc(50% - var(--ward-height-touch) / 2))";
const TAP = `content: "";\nposition: absolute;\ninset-block: ${HALF_TAP};\ninset-inline: ${HALF_TAP}`;
const TOUCH = "min-height: var(--ward-height-touch)";
const BOX = "min-height: var(--ward-touch-box, var(--ward-height-touch))";
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

  // A real 44px box, not an invisible tap: two stacked rows can never take each other's taps (#350).
  it("lays every Btn out 44px tall and an icon Btn 44px wide, on a phone only", () => {
    const { inside, outside } = css("Btn.module.css");
    expect(ruleBodyIn(inside, ".btn")).toBe(BOX);
    expect(ruleBodyIn(inside, ".overflow")).toBe("min-width: var(--ward-touch-box, var(--ward-height-touch))");
    expect(outside).not.toContain("--ward-height-touch");
  });

  it("lays a Select trigger, its find box and each option out 44px tall, on a phone only", () => {
    const { inside, outside } = css("Select.module.css");
    expect(ruleBodyIn(inside, ".trigger")).toBe(BOX);
    expect(ruleBodyIn(inside, ".find,\n  .option")).toBe(TOUCH);
    expect(outside).not.toContain("--ward-height-touch");
  });

  it("lays a plain, form or toolbar input out 44px tall, and no inline, reply or tag text, on a phone only", () => {
    const { inside, outside } = css("Field.module.css");
    expect(ruleBodyIn(inside, '.field:where(:not([data-variant]), [data-variant="form"], [data-variant="toolbar"]) .control')).toBe(BOX);
    expect(inside).not.toMatch(/inline|reply|tag/);
    expect(outside).not.toContain("--ward-height-touch");
  });

  // auto, not 0: a flex item keeps its content floor, and a control's own min-height elsewhere is left alone.
  it("keeps each header control and the tab strip at their drawn size, so the header and strip keep their height", () => {
    expect(ruleBodyIn(css("PageHeader.module.css").inside, ".actions")).toContain("--ward-touch-box: auto");
    expect(ruleBodyIn(css("../layout/AppShell.module.css").inside, ".sidebarToggle,\n  .headerAction")).toBe("--ward-touch-box: auto");
    expect(ruleBodyIn(css("Tabs.module.css").inside, ".strip")).toBe("--ward-touch-box: auto");
    for (const file of ["PageHeader.module.css", "../layout/AppShell.module.css", "Tabs.module.css"]) expect(css(file).inside).not.toMatch(/min-(height|width): auto/);
  });

  it("draws every menu row and the trigger 44px tall on a phone, beating large, and keeps rows flush with no tap of their own", () => {
    const { inside, outside } = css("Menu.module.css");
    expect(ruleBodyIn(inside, ".panel .item")).toBe(TOUCH);
    expect(ruleBodyIn(inside, ".trigger")).toBe(BOX);
    expect(ruleBodyIn(outside, ".item")).toContain("min-height: calc(var(--ward-height-target) + var(--ward-space-1))");
    expect(ruleBodyIn(outside, ".large .item")).toBe("min-height: calc(var(--ward-height-target) + var(--ward-space-3))");
  });
});
