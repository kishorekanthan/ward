import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BoardColumn } from "./composites/board/BoardColumn";
import columnClasses from "./composites/board/BoardColumn.module.css";
import cardClasses from "./composites/board/WorkCard.module.css";
import type { BoardItem } from "./composites/board/types";
import { borders, edge, injectModuleCss, oneSideEdges, ruleBody } from "./test-css";

type Theme = "light" | "dark";
const golden = JSON.parse(readFileSync("src/goldens/soft-surfaces.json", "utf8"));
const wardCss = readFileSync("src/ward.css", "utf8");
const block = (selector: string) => wardCss.slice(wardCss.indexOf(`${selector} {`), wardCss.indexOf("}", wardCss.indexOf(`${selector} {`)));
const varsOf = (css: string) => new Map(Array.from(css.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2]]));
const themeVars = { light: varsOf(block(":root")), dark: new Map([...varsOf(block(":root")), ...varsOf(block('[data-theme="dark"]'))]) };

// Tokens resolve in the theme's own block, so the stylesheet is compared against the mock's literal values.
function resolve(raw: string, theme: Theme): string {
  const once = raw.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => themeVars[theme].get(name) ?? whole);
  return once === raw ? raw : resolve(once, theme);
}

function value(path: string, selector: string, property: string, theme: Theme = "light"): string {
  const line = ruleBody(path, selector).split(";\n").find((d) => d.startsWith(`${property}:`));
  return line === undefined ? "" : resolve(line.slice(property.length + 1).trim(), theme);
}

const CARD = "src/composites/board/WorkCard.module.css";
const COLUMN = "src/composites/board/BoardColumn.module.css";
const LAYOUT = "src/layout/layout.module.css";
const GRID = "src/primitives/Grid.module.css";
const STREAMS = "src/composites/studio/StreamRow.module.css";
const STAT = "src/primitives/StatStrip.module.css";
const AGENT = "src/composites/studio/AgentCard.module.css";
const OVERLAY = "src/primitives/Overlay.module.css";
const STAGE = "src/composites/studio/StageColumn.module.css";
const RAIL = "src/composites/board/PreviewRail.module.css";
const APPEARANCE = "src/composites/admin/AppearanceStrip.module.css";
const THEMES: Theme[] = ["light", "dark"];

const item = (key: string): BoardItem => ({ key, title: `Item ${key}`, stage: "review", timeInStage: 60_000, waitsOn: "J. Rao", streamStep: 1, changedAt: "2026-09-06T02:14:00Z" });

describe("soft surfaces against the chosen look (#217)", () => {
  it("restores the light card shadow inside a dark theme", () => {
    expect(varsOf(block('[data-theme="light"]')).get("--ward-shadow-card")).toBe(golden.card.light.shadow);
  });

  it.each(THEMES)("floats the board card on its shadow with no border, and rings it on hover (%s)", (theme) => {
    const want = golden.card[theme];
    expect(value(CARD, ".card", "border-radius", theme)).toBe(golden.card.radius);
    expect(value(CARD, ".card", "padding", theme)).toBe(golden.card.padding);
    expect(value(CARD, ".card", "background", theme)).toBe(want.ground);
    expect(value(CARD, ".card", "box-shadow", theme)).toBe(want.shadow);
    expect(value(CARD, ".card:hover", "background", theme)).toBe(want.hoverGround);
    expect(value(CARD, ".card:hover", "box-shadow", theme)).toBe(want.hoverShadow);
  });

  it.each(THEMES)("draws each lane as a tinted rounded panel, the gate lane in the waiting tint (%s)", (theme) => {
    expect(value(COLUMN, ".column", "border-radius", theme)).toBe(golden.lane.radius);
    expect(value(COLUMN, ".column", "background", theme)).toBe(golden.lane[theme].ground);
    expect(value(COLUMN, '.column[data-gate="true"]', "background", theme)).toBe(golden.lane[theme].gate);
    expect(value(LAYOUT, ".scroller", "gap", theme)).toBe(golden.lane.gap);
  });

  it.each(THEMES)("sets every card shown off the board on a lane's tint: studio stages and the card previews (%s)", (theme) => {
    expect(value(STAGE, ".column", "background", theme)).toBe(golden.lane[theme].ground);
    expect(value(STAGE, '.column[data-kind="gate"]', "background", theme)).toBe(golden.lane[theme].gate);
    for (const [path, selector] of [[STAGE, ".column"], [RAIL, ".card"], [APPEARANCE, ".well"]]) {
      expect(value(path, selector, "border-radius", theme), path).toBe(golden.lane.radius);
      expect(value(path, selector, "background", theme), path).toBe(golden.lane[theme].ground);
      expect(ruleBody(path, selector), path).not.toMatch(/(^|\n)(border(?!-radius)|box-shadow)/);
    }
  });

  it.each(THEMES)("keeps the table's row rules and gives it no outer box (%s)", (theme) => {
    expect(value(GRID, ".th,\n.td", "border-bottom", theme)).toBe(golden.table[theme].rowRule);
    expect(value(STREAMS, ".row", "border-bottom", theme)).toBe(golden.table[theme].rowRule);
    for (const [path, selector] of [[GRID, ".frame"], [GRID, ".table"], [STREAMS, ".frame"]]) {
      expect(ruleBody(path, selector), `${path} ${selector}`).not.toMatch(/(^|\n)(border(?!-collapse)|box-shadow|outline)/);
    }
  });

  it("gives stat blocks and agent cards the card shadow and ring, and drawers the panel radius", () => {
    for (const path of [STAT, AGENT]) {
      const rest = path === STAT ? ".link" : ".card";
      const hover = path === STAT ? ".link:hover" : '.card:not([data-selected="true"]):hover';
      expect(value(path, rest, "box-shadow"), path).toBe(golden.card.light.shadow);
      expect(value(path, hover, "box-shadow"), path).toBe(golden.card.light.hoverShadow);
    }
    expect(value(OVERLAY, ".panel.modal", "border-radius")).toBe(golden.panel.radius);
  });

  it("puts no outer border on a card or a lane and no column rule between lanes, whatever rule draws them", () => {
    expect(borders(CARD)).toEqual([]);
    expect(borders(COLUMN)).toEqual([]);
    expect(borders(GRID)).toEqual(["border-bottom: var(--ward-border) solid var(--ward-color-line)"]);
    for (const selector of [".scroller", '.frame[data-inset="board"] .scroller', '.frame[data-inset="board"] .scroller > *']) {
      expect(ruleBody(LAYOUT, selector), selector).not.toMatch(/(^|\n)(border(?!-radius)|box-shadow|column-rule)/);
    }
  });

  it("never draws a one-side edge or stripe on a card, lane, stat block or agent card", () => {
    for (const path of [CARD, COLUMN, LAYOUT]) expect(oneSideEdges(readFileSync(path, "utf8")), path).toEqual([]);
    const rules = (path: string, selectors: string[]) => selectors.map((sel) => ruleBody(path, sel)).join(";\n");
    expect(oneSideEdges(rules(STAT, [".link", ".link:hover"]))).toEqual([]);
    expect(oneSideEdges(rules(AGENT, [".card", '.card:not([data-selected="true"]):hover', '.card[data-selected="true"]']))).toEqual([]);
  });

  it("renders the lane ground and the card shadow through the cascade, with no edge added by any other rule", () => {
    const removeColumn = injectModuleCss(COLUMN, columnClasses);
    const removeCard = injectModuleCss(CARD, cardClasses);
    render(
      <>
        <BoardColumn column={{ id: "build", label: "Build", gate: false }} items={[item("FL-1")]} sort="oldest" onOpen={() => {}} />
        <BoardColumn column={{ id: "review", label: "Review", gate: true }} items={[item("FL-2")]} sort="oldest" onOpen={() => {}} />
      </>,
    );
    const [lane, gate] = ["Build", "Review"].map((label) => edge(screen.getByText(label).closest(`.${columnClasses.column}`)!));
    const card = edge(screen.getByText("Item FL-1").closest(`.${cardClasses.card}`)!);
    removeCard();
    removeColumn();
    expect(lane).toEqual({ shadow: "", ground: "var(--ward-color-lanetint)" });
    expect(gate).toEqual({ shadow: "", ground: "var(--ward-color-gatelanetint)" });
    expect(card).toEqual({ shadow: "var(--ward-shadow-card)", ground: "var(--ward-color-surface)" });
  });
});
