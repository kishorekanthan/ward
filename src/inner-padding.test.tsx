import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkCard } from "./composites/board/WorkCard";
import cardClasses from "./composites/board/WorkCard.module.css";
import type { BoardItem } from "./composites/board/types";
import { RecordSection } from "./layout/RecordSection";
import layoutClasses from "./layout/layout.module.css";
import { Btn } from "./primitives/Btn";
import btnClasses from "./primitives/Btn.module.css";
import { Callout } from "./primitives/Callout";
import calloutClasses from "./primitives/Callout.module.css";

type Side = "top" | "right" | "bottom" | "left";
type Rule = { file: string; selector: string; body: string };
type Pad = Record<Side, number>;

const SRC = "src";
const SIDES: Side[] = ["top", "right", "bottom", "left"];
// paddedBy: a frame or variant whose text sits in a named child or base class, which must pad every side it paints.
// highlight: a hover or current tint on the words of a link, which has no box of its own.
const golden = JSON.parse(readFileSync("src/goldens/inner-padding.json", "utf8")) as { paddedBy: Record<string, string>; highlight: string[] };
const wardCss = readFileSync("src/ward.css", "utf8");
const rootBlock = wardCss.slice(wardCss.indexOf(":root {"), wardCss.indexOf("}", wardCss.indexOf(":root {")));
const tokens = new Map(Array.from(rootBlock.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2].trim()]));

function moduleFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name);
    if (e.isDirectory()) return moduleFiles(path);
    return e.name.endsWith(".module.css") ? [path] : [];
  });
}

// Each innermost rule, one per comma-separated selector, so a selector list is checked part by part.
function rules(file: string): Rule[] {
  const css = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  return Array.from(css.matchAll(/([^{}]+)\{([^{}]*)\}/g)).flatMap(([, sel, body]) =>
    sel.trim().startsWith("@") ? [] : sel.split(/,(?![^(]*\))/).map((s) => ({ file: relative(SRC, file), selector: s.trim().replace(/\s+/g, " "), body })),
  );
}

const ALL = moduleFiles(SRC).flatMap(rules);

function resolve(raw: string): string {
  const once = raw.replace(/var\((--ward-[\w-]+)(?:,[^)]*)?\)/g, (whole, name: string) => tokens.get(name) ?? whole);
  return once === raw ? raw : resolve(once);
}

const declarations = (body: string, pattern: RegExp) => body.split(";").map((d) => d.trim()).filter((d) => pattern.test(d));
const valueOf = (decl: string) => decl.slice(decl.indexOf(":") + 1).trim();
const isClear = (value: string) => /^(none|0|0px|transparent|inherit|unset|initial)\b/.test(value);
const split = (value: string) => value.trim().split(/\s+(?![^(]*\))/);

// One length as px; a calc() or max() counts as space when it holds any non-zero length.
function px(part: string): number {
  const plain = part.replace(/px$/, "");
  if (/^-?[\d.]+$/.test(plain)) return Number(plain);
  return /[1-9]/.test(part) ? 1 : 0;
}

const BORDER_SIDES: [RegExp, Side[]][] = [
  [/^(background(-color)?|border)\s*:/, SIDES],
  [/^border-(top|block-start)\s*:/, ["top"]],
  [/^border-(bottom|block-end)\s*:/, ["bottom"]],
  [/^border-(left|inline-start)\s*:/, ["left"]],
  [/^border-(right|inline-end)\s*:/, ["right"]],
  [/^border-block\s*:/, ["top", "bottom"]],
  [/^border-inline\s*:/, ["left", "right"]],
];

// An outer shadow pushed one way paints that side; an inset one paints the opposite side.
const offsetSide = (offset: number, inset: boolean, [plus, minus]: [Side, Side]): Side[] => (offset === 0 ? [] : [(offset > 0) !== inset ? plus : minus]);

// A blurred or ring shadow paints all round; a hard offset paints the one or two sides it is pushed to.
function shadowSides(shadow: string): Side[] {
  const inset = /\binset\b/.test(shadow);
  const [x, y, blur] = [...split(resolve(shadow)).filter((p) => /^-?[\d.]+(px)?$/.test(p)).map(px), 0, 0, 0];
  if (blur > 0 || (x === 0 && y === 0)) return SIDES;
  return [...offsetSide(y, inset, ["bottom", "top"]), ...offsetSide(x, inset, ["right", "left"])];
}

function declSides(decl: string): Side[] {
  const value = valueOf(decl);
  if (isClear(value)) return [];
  if (/^box-shadow\s*:/.test(decl)) return value.split(/,(?![^(]*\))/).flatMap(shadowSides);
  return BORDER_SIDES.find(([re]) => re.test(decl))?.[1] ?? [];
}

function paintedSides(body: string): Set<Side> {
  return new Set(declarations(body, /^(background|box-shadow|border)/).flatMap(declSides));
}

const BOX: Record<number, (p: string[]) => string[]> = { 1: (p) => [p[0], p[0], p[0], p[0]], 2: (p) => [p[0], p[1], p[0], p[1]], 3: (p) => [p[0], p[1], p[2], p[1]], 4: (p) => p };
const LONGHAND: Record<string, Side[]> = { "padding-top": ["top"], "padding-right": ["right"], "padding-bottom": ["bottom"], "padding-left": ["left"], "padding-block-start": ["top"], "padding-block-end": ["bottom"], "padding-inline-start": ["left"], "padding-inline-end": ["right"] };

const SHORTHAND: Record<string, (pad: Pad, parts: string[]) => void> = {
  padding: (pad, parts) => BOX[parts.length](parts).forEach((p, i) => (pad[SIDES[i]] = px(p))),
  "padding-block": (pad, parts) => void ([pad.top, pad.bottom] = [px(parts[0]), px(parts[1] ?? parts[0])]),
  "padding-inline": (pad, parts) => void ([pad.left, pad.right] = [px(parts[0]), px(parts[1] ?? parts[0])]),
};

function applyPadding(pad: Pad, decl: string): void {
  const prop = decl.slice(0, decl.indexOf(":")).trim();
  const parts = split(resolve(valueOf(decl)));
  SHORTHAND[prop]?.(pad, parts);
  LONGHAND[prop]?.forEach((s) => (pad[s] = px(parts[0])));
}

// A fixed or minimum height taller than the type centres one line clear of the top and bottom edges.
function applyHeight(pad: Pad, decl: string): void {
  if (px(resolve(valueOf(decl))) > 0) [pad.top, pad.bottom] = [Math.max(pad.top, 1), Math.max(pad.bottom, 1)];
}

// The rules a state or variant builds on: .tab for .strip .tab[aria-selected], .panel for .panel.drawer.
function baseSelectors(selector: string): string[] {
  const stateless = selector.replace(/::?[\w-]+(\([^)]*\))?/g, "").trim();
  const bare = stateless.replace(/\[[^\]]*\]/g, "").trim();
  const last = bare.split(/[\s>+~]+/).pop() ?? bare;
  const head = (s: string) => s.replace(/^(\.[\w-]+)\..*$/, "$1");
  return [...new Set([head(last), last, head(bare), bare, stateless, selector])];
}

function paddingOf(file: string, selector: string): Pad {
  const pad: Pad = { top: 0, right: 0, bottom: 0, left: 0 };
  const chain = baseSelectors(selector).flatMap((sel) => ALL.filter((r) => r.file === file && r.selector === sel));
  chain.forEach((r) => declarations(r.body, /^padding/).forEach((d) => applyPadding(pad, d)));
  chain.forEach((r) => declarations(r.body, /^(min-)?height\s*:/).forEach((d) => applyHeight(pad, d)));
  return pad;
}

const key = (rule: Rule) => `${rule.file} ${rule.selector}`;
// A focus ring sits outside the box, so it never meets the text inside.
const isFocusRing = (rule: Rule) => /:focus/.test(rule.selector);
// Marks with no text in them: dots, bars, swatches, tracks, thumbs, scrims, rules, carets and images.
const NO_TEXT = /\.(\w*[dD]ot|\w*[bB]ar|bar\w*|swatch|mark\w*|\w*Mark|thumb|track|scrim|separator|caret|avatar|media|hollow|skeleton|preview|empty|frame|webFrame|railItem|move|identity|overflow|close)\b[^\s]*$| input$|::?-(webkit|moz)-|\[data-step="\d"\]$|::after$|^\.prose :not\(pre\) > code$/;
const isNoText = (rule: Rule) => NO_TEXT.test(rule.selector);

// Padders are " | "-separated; one named with its own file lives in another module, as a StatStrip cell in a rail.
function paddersOf(rule: Rule): [string, string][] {
  const named = golden.paddedBy[key(rule)] ?? rule.selector;
  return named.split(" | ").map((one) => {
    const cross = one.match(/^(\S+\.module\.css) (.+)$/);
    return cross ? [cross[1], cross[2]] : [rule.file, one];
  });
}

// Each side takes the most any padder gives it: a first cell pads the left, a last cell the right.
function paddingFor(rule: Rule): Pad {
  const pads = paddersOf(rule).map(([file, selector]) => paddingOf(file, selector));
  return Object.fromEntries(SIDES.map((s) => [s, Math.max(...pads.map((p) => p[s]))])) as Pad;
}

function bareSides(rule: Rule): string[] {
  const child = golden.paddedBy[key(rule)];
  const pad = paddingFor(rule);
  return [...paintedSides(rule.body)].filter((s) => pad[s] <= 0).map((s) => `${key(rule)}${child ? ` (child ${child})` : ""}: ${s}`);
}

describe("inner padding: no text touches a painted edge with no consumer padding (#324)", () => {
  it("pads every side a surface paints, from Ward spacing tokens", () => {
    const bare = ALL.filter((r) => !isFocusRing(r) && !isNoText(r) && !golden.highlight.includes(key(r))).flatMap(bareSides);
    expect([...new Set(bare)]).toEqual([]);
  });

  it("takes every padding from a token, never a hard-coded length", () => {
    const literal = ALL.flatMap((r) => declarations(r.body, /^padding/).filter((d) => /(^|[\s(:])-?\d*\.?\d+(px|rem|em)\b|:\s*[1-9]/.test(d.replace(/var\([^)]*\)/g, ""))).map((d) => `${key(r)}: ${d}`));
    expect(literal).toEqual([]);
  });

  it("names only frames and children that exist, so the list cannot rot", () => {
    const present = new Set(ALL.map(key));
    const padders = Object.keys(golden.paddedBy).flatMap((frame) => paddersOf(ALL.find((r) => key(r) === frame) ?? { file: frame, selector: frame, body: "" }).map((p) => p.join(" ")));
    const missing = [...Object.keys(golden.paddedBy), ...padders, ...golden.highlight].filter((k) => !present.has(k));
    expect(missing).toEqual([]);
  });
});

// jsdom drops var(), so each sheet is injected with its tokens resolved, under the hashed names vitest gives its classes.
function injectResolved(path: string, classes: Record<string, string>): () => void {
  const css = resolve(readFileSync(path, "utf8")).replace(/\.([A-Za-z][\w-]*)/g, (whole, name: string) => (typeof classes[name] === "string" ? `.${classes[name]}` : whole));
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);
  return () => style.remove();
}

type Bare = [string, string, Record<string, string>, string, () => ReactElement];
const item: BoardItem = { key: "A-1", title: "Late shipments", stage: "review", timeInStage: 60_000, waitsOn: "J. Rao", streamStep: 1, changedAt: "2026-09-06T02:14:00Z" };
const BARE: Bare[] = [
  ["WorkCard", "src/composites/board/WorkCard.module.css", cardClasses, "card", () => <WorkCard item={item} />],
  ["Callout", "src/primitives/Callout.module.css", calloutClasses, "root", () => <Callout ticket="FL-118">Counted, not shown.</Callout>],
  ["RecordSection card", "src/layout/layout.module.css", layoutClasses, "record", () => <RecordSection title="Approvals" surface="card"><p>Two reviewers.</p></RecordSection>],
  ["Btn secondary", "src/primitives/Btn.module.css", btnClasses, "btn", () => <Btn variant="secondary">Save board</Btn>],
];

describe("inner padding, rendered in a bare container with no padding or margin (#324)", () => {
  it.each(BARE)("%s keeps its text off every edge", (_, path, classes, surface, make) => {
    const off = injectResolved(path, classes);
    const { container } = render(<div style={{ padding: 0, margin: 0 }}>{make()}</div>);
    const style = getComputedStyle(container.querySelector(`.${classes[surface]}`) as Element);
    const fixed = (parseFloat(style.height) || parseFloat(style.minHeight) || 0) > 0;
    const [top, right, bottom, left] = [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft].map((v) => parseFloat(v) || 0);
    off();
    expect({ top: top > 0 || fixed, right: right > 0, bottom: bottom > 0 || fixed, left: left > 0 }).toEqual({ top: true, right: true, bottom: true, left: true });
  });
});
