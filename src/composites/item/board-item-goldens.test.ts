import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const read = (...parts: string[]) => readFileSync(join(here, ...parts), "utf8");
const golden = JSON.parse(read("..", "..", "goldens", "board-item.json")) as Record<string, Record<string, string>>;
const wardCss = read("..", "..", "ward.css");
const rootBlock = wardCss.slice(wardCss.indexOf(":root {"), wardCss.indexOf("}", wardCss.indexOf(":root {")));
const rootVars = new Map(Array.from(rootBlock.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2]]));

// Tokens are substituted so the stylesheet is compared against the comp's literal values.
function value(file: string, selector: string, property: string): string {
  const source = read(...file.split("/"));
  const block = source.match(new RegExp(`(?:^|\\n)${selector}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
  const raw = block.match(new RegExp(`(?:^|[;\\s])${property}\\s*:\\s*([^;]+)`))?.[1].trim() ?? "";
  return raw.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => rootVars.get(name) ?? whole);
}

const font = (literal: string) => new RegExp(`^${literal},`);
const LAYOUT = "../../layout/layout.module.css";
const HEADER = "../../primitives/PageHeader.module.css";
const SECTION = "../../primitives/SectionHeader.module.css";

describe("case file geometry against Board Item 8b", () => {
  it("sets the case head padding and title", () => {
    expect(value(HEADER, '\\.root\\[data-density="record"\\]', "padding")).toBe(golden.head.padding);
    expect(value(HEADER, '\\.root\\[data-density="record"\\] \\.title', "font")).toMatch(font(golden.head.title));
    expect(value(HEADER, '\\.root\\[data-density="record"\\] \\.title', "letter-spacing")).toBe(golden.head.tracking);
  });

  it("rules the record and rail full-bleed under one line", () => {
    expect(value(LAYOUT, '\\.subjectRail\\[data-ruled="true"\\]', "border-top")).toBe(golden.grid.rule);
    expect(value(LAYOUT, "\\.rail", "border-left")).toBe(golden.grid.rule);
  });

  it("draws each key band with the comp label and note", () => {
    const { sec } = golden;
    expect(value(SECTION, "\\.root", "padding")).toBe(sec.padding);
    expect(value(SECTION, "\\.root", "gap")).toBe(sec.gap);
    expect(value(SECTION, '\\.root\\[data-kind="key"\\] \\.head', "font")).toMatch(font(sec.key));
    expect(value(SECTION, '\\.root\\[data-kind="key"\\] \\.head', "letter-spacing")).toBe(sec.keyTracking);
    expect(value(SECTION, "\\.note", "font")).toMatch(font(sec.note));
  });

  it("pads each record block as its comp column does", () => {
    const { blocks } = golden;
    expect(value(LAYOUT, "\\.recordBody", "padding")).toBe(blocks.block);
    expect(value(LAYOUT, "\\.recordBody", "gap")).toBe(blocks.gap);
    expect(value(LAYOUT, '\\.recordBody\\[data-pad="criteria"\\]', "padding")).toBe(blocks.criteria);
    expect(value(LAYOUT, '\\.recordBody\\[data-pad="history"\\]', "padding")).toBe(blocks.history);
    expect(value(LAYOUT, '\\.recordBody\\[data-pad="rail"\\]', "padding")).toBe(blocks.rail);
    expect(value(LAYOUT, '\\.recordBody\\[data-pad="railList"\\]', "padding")).toBe(blocks.railList);
    expect(value(LAYOUT, '\\.recordBody\\[data-pad="cost"\\]', "gap")).toBe(blocks.costGap);
  });

  it("rows each criterion like `.ac`", () => {
    const { criterion } = golden;
    expect(value("CriteriaList.module.css", "\\.item", "padding")).toBe(criterion.padding);
    expect(value("CriteriaList.module.css", "\\.item", "gap")).toBe(criterion.gap);
    expect(value("CriteriaList.module.css", "\\.item:last-child", "border-bottom")).toBe("0");
    expect(value("CriteriaList.module.css", '\\.item > \\[data-testid="marker"\\]', "margin-top")).toBe(criterion.markTop);
    expect(value("CriteriaList.module.css", "\\.body", "gap")).toBe(criterion.bodyGap);
    expect(value("CriteriaList.module.css", "\\.evidence", "font")).toMatch(font(criterion.evidence));
    expect(value("CriteriaList.module.css", '\\.item\\[data-met="false"\\] \\.evidence', "color")).toBe(criterion.unmetEvidence);
    expect(value("CriteriaList.module.css", "\\.consequence", "font")).toMatch(font(criterion.rule));
  });

  it("rows each history entry like `.tl`", () => {
    const { entry } = golden;
    expect(value("StageHistory.module.css", "\\.item", "padding")).toBe(entry.padding);
    expect(value("StageHistory.module.css", "\\.item", "gap")).toBe(entry.gap);
    expect(value("StageHistory.module.css", "\\.node", "margin-top")).toBe(entry.nodeTop);
    expect(value("StageHistory.module.css", "\\.stage", "font")).toMatch(font(entry.stage));
    expect(value("StageHistory.module.css", "\\.sentence", "font")).toMatch(font(entry.sentence));
    expect(value("StageHistory.module.css", "\\.meta", "font")).toMatch(font(entry.meta));
  });

  it("rows each gate with a fixed tag and actor column", () => {
    const { gate } = golden;
    expect(value("GateLadder.module.css", "\\.rung", "padding")).toBe(gate.padding);
    expect(value("GateLadder.module.css", "\\.rung", "gap")).toBe(gate.gap);
    expect(value("GateLadder.module.css", "\\.rung:last-child", "border-bottom")).toBe("0");
    expect(value("GateLadder.module.css", "\\.rung \\[data-ward-chip\\]", "width")).toBe(gate.tag);
    expect(value("GateLadder.module.css", "\\.actor", "width")).toBe(gate.actor);
    expect(value("GateLadder.module.css", "\\.actor", "font")).toMatch(font(gate.actorType));
  });

  it("sets the cost total, ceiling, bar and breakdown", () => {
    const { cost } = golden;
    const meter = "../../primitives/CostMeter.module.css";
    expect(value(meter, "\\.figure", "font")).toMatch(font(cost.total));
    expect(value(meter, "\\.of", "font")).toMatch(font(cost.ceiling));
    expect(value(meter, "\\.bar", "height")).toBe(cost.bar);
    expect(value(meter, "\\.root", "gap")).toBe(cost.gap);
    expect(value(meter, "\\.amount", "font")).toMatch(font(cost.amount));
  });
});
