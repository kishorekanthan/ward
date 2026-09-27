import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = dirname(fileURLToPath(import.meta.url));
const expected = JSON.parse(readFileSync(join(root, "..", "goldens", "layout.json"), "utf8")) as {
  subjectRail: { dryrun: string; preview: string; border: string };
  drawer: { width: string; border: string; shadow: string };
  board: { colFloor: string; laneFloor: string; tracks: string; overflowX: string; columnMinWidth: string };
};
const layoutCss = readFileSync(join(root, "layout.module.css"), "utf8");
const overlayCss = readFileSync(join(root, "..", "primitives", "Overlay.module.css"), "utf8");
const wardCss = readFileSync(join(root, "..", "ward.css"), "utf8");
const columnCss = readFileSync(join(root, "..", "composites", "board", "BoardColumn.module.css"), "utf8");

function declaration(source: string, selector: string, property: string): string {
  const block = source.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
  return block.match(new RegExp(`${property}\\s*:\\s*([^;]+)`))?.[1].trim() ?? "";
}

describe("shared rail geometry goldens", () => {
  it("keeps the subject rails at the recorded widths and 1px rule", () => {
    expect(declaration(layoutCss, "\\.subjectRail\\[data-ward-subject-rail=\\\"dryrun\\\"\\]", "--ward-subject-rail-width")).toBe(expected.subjectRail.dryrun);
    expect(declaration(layoutCss, "\\.subjectRail(?!\\[)", "--ward-subject-rail-width")).toBe(expected.subjectRail.preview);
    expect(declaration(layoutCss, "\\.rail(?!\\w)", "border-left")).toBe(expected.subjectRail.border);
  });

  it("keeps the drawer at 430px with its rule and overlay shadow", () => {
    expect(declaration(overlayCss, "\\.panel\\.drawer", "width")).toBe(expected.drawer.width);
    expect(declaration(overlayCss, "\\.panel\\.drawer", "border-left")).toBe(expected.drawer.border);
    expect(declaration(overlayCss, "\\.panel(?!\\.)", "box-shadow")).toBe(expected.drawer.shadow);
  });

  it("shares the board width between lanes, 176px to 240px each, and scrolls overflow inside the board region", () => {
    expect(wardCss.match(/--ward-width-colFloor\s*:\s*([^;]+);/)?.[1].trim()).toBe(expected.board.colFloor);
    expect(wardCss.match(/--ward-width-stageColumn\s*:\s*([^;]+);/)?.[1].trim()).toBe(expected.board.laneFloor);
    expect(declaration(layoutCss, "\\.scroller", "grid-auto-columns")).toBe(expected.board.tracks);
    expect(declaration(layoutCss, "\\.scroller", "overflow-x")).toBe(expected.board.overflowX);
    expect(declaration(layoutCss, "\\.scroller", "min-width")).toBe("0");
    expect(declaration(columnCss, "\\.column", "min-width")).toBe(expected.board.columnMinWidth);
  });
});
