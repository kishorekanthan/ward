import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const read = (...parts: string[]) => readFileSync(join(here, ...parts), "utf8");
const golden = JSON.parse(read("..", "..", "goldens", "board.json")) as Record<string, Record<string, string>>;
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

describe("board geometry against Studio 4b", () => {
  it("draws the head row with the comp padding, title and rollup type", () => {
    const { head } = golden;
    expect(value("BoardHeader.module.css", "\\.head", "padding")).toBe(head.padding);
    expect(value("BoardHeader.module.css", "\\.title", "font")).toMatch(new RegExp(`^${head.title},`));
    expect(value("BoardHeader.module.css", "\\.title", "letter-spacing")).toBe(head.tracking);
    expect(value("BoardHeader.module.css", "\\.rollup", "font")).toMatch(new RegExp(`^${head.rollup},`));
  });

  it("rules the column grid off the head with no gutter between columns", () => {
    expect(value("../../layout/layout.module.css", '\\.frame\\[data-inset="board"\\] \\.scroller', "border-top")).toBe(golden.grid.borderTop);
    expect(value("../../layout/layout.module.css", "\\.scroller", "gap")).toBe(golden.grid.gap);
  });

  it("pads, rules and sets type in each column as the comp does", () => {
    const { column } = golden;
    expect(value("BoardColumn.module.css", "\\.column", "padding")).toBe(column.padding);
    expect(value("BoardColumn.module.css", "\\.column", "gap")).toBe(column.gap);
    expect(value("BoardColumn.module.css", "\\.column", "border-right")).toBe(column.rule);
    expect(value("BoardColumn.module.css", "\\.column:last-child", "border-right")).toBe("none");
    expect(value("BoardColumn.module.css", "\\.label", "font")).toMatch(new RegExp(`^${column.label},`));
    expect(value("BoardColumn.module.css", "\\.count", "font")).toMatch(new RegExp(`^${column.count},`));
  });

  it("frames each card and its over-cap note with the comp rhythm", () => {
    const { card } = golden;
    expect(value("WorkCard.module.css", "\\.card", "padding")).toBe(card.padding);
    expect(value("WorkCard.module.css", "\\.card", "gap")).toBe(card.gap);
    expect(value("WorkCard.module.css", "\\.card", "min-height")).toBe(card.minHeight);
    expect(value("WorkCard.module.css", "\\.card", "box-shadow")).toBe(card.frame);
    expect(value("WorkCard.module.css", "\\.title", "font")).toMatch(new RegExp(`^${card.title},`));
    expect(value("OverCapNote.module.css", "\\.note", "font")).toMatch(new RegExp(`^${golden.overCapNote.font},`));
  });

  it("closes the board with the ruled footer strip", () => {
    const { footer } = golden;
    expect(value("BoardFootnote.module.css", "\\.foot", "padding")).toBe(footer.padding);
    expect(value("BoardFootnote.module.css", "\\.foot", "border-top")).toBe(footer.borderTop);
    expect(value("BoardFootnote.module.css", "\\.foot", "background")).toBe(footer.background);
    expect(value("BoardFootnote.module.css", "\\.foot", "gap")).toBe(footer.gap);
    expect(value("BoardFootnote.module.css", "\\.note", "font")).toMatch(new RegExp(`^${footer.note},`));
    expect(value("BoardFootnote.module.css", "\\.link", "font")).toMatch(new RegExp(`^${footer.link},`));
    expect(value("BoardFootnote.module.css", "\\.link", "color")).toBe(footer.linkColor);
  });
});
