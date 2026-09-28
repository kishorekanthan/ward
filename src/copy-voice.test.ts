import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const SRC = dirname(fileURLToPath(import.meta.url));
// An em dash with a word or value on either side is prose; a lone "—" stands in for an empty value.
const PROSE_DASH = /[^\s—]\s*—\s*[^\s—]/;
const SLOT = "X";

function shippedSources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return shippedSources(path);
    return /\.tsx?$/.test(entry.name) && !/\.(test|stories)\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

// JSX text resolves entities the way React renders them; the sweep only needs the em dash forms.
function jsxText(node: ts.JsxText): string {
  return node.text.replace(/&mdash;|&#8212;|&#x2014;/gi, "—");
}

function templateText(node: ts.TemplateExpression): string {
  return node.head.text + node.templateSpans.map((span) => SLOT + span.literal.text).join("");
}

function childrenText(node: ts.JsxElement | ts.JsxFragment): string {
  return node.children.map((child) => (ts.isJsxText(child) ? jsxText(child) : SLOT)).join("");
}

// A string that opens or closes on a spaced dash is concatenated, so the dash joins it to its neighbour.
function literalText(text: string): string {
  return /^\s+—|—\s+$/.test(text) ? SLOT + text + SLOT : text;
}

// Each string, template or run of JSX children as the product shows it, expressions standing in as a slot.
const SHOWN: [(node: ts.Node) => boolean, (node: never) => string][] = [
  [ts.isStringLiteral, (node: ts.StringLiteral) => literalText(node.text)],
  [ts.isNoSubstitutionTemplateLiteral, (node: ts.NoSubstitutionTemplateLiteral) => literalText(node.text)],
  [ts.isTemplateExpression, templateText],
  [ts.isJsxElement, childrenText],
  [ts.isJsxFragment, childrenText],
];

function shownText(node: ts.Node): string | undefined {
  const shown = SHOWN.find(([matches]) => matches(node));
  return shown?.[1](node as never);
}

// Thrown errors speak to developers, so only the words a product shows are swept.
function isThrown(node: ts.Node): boolean {
  return ts.isThrowStatement(node) || (ts.isNewExpression(node) && /Error$/.test(node.expression.getText()));
}

function proseDashes(path: string): string[] {
  const source = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (isThrown(node)) return;
    const text = shownText(node);
    if (text !== undefined && PROSE_DASH.test(text)) found.push(`${relative(SRC, path)}:${source.getLineAndCharacterOfPosition(node.getStart()).line + 1}: ${text.trim()}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

describe("Ward's own copy", () => {
  it("joins no clauses with an em dash", () => {
    expect(shippedSources(SRC).flatMap(proseDashes)).toEqual([]);
  });
});
