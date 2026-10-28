import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const SRC = dirname(fileURLToPath(import.meta.url));
// An em dash with a word or value on either side is prose; a lone "—" stands in for an empty value.
const PROSE_DASH = /[^\s—]\s*—\s*[^\s—]/;
const SLOT = "X";
// Words that name Ward's or Trellis's insides; a first-time user reads none of them on screen.
const INTERNAL_WORD = /\b(gate[sd]?|gating|mount(s|ed|ing)?|chains?|route[sd]?|routing|slice[sd]?|adapters?|evidence|advisors?|terminal|tenants?|req_hash|sdk|k8s)\b/i;
// A lone lower-case token is a key, a class, a kind or a path in code, not a word the product shows.
const CODE_TOKEN = /^[a-z0-9_./:-]*$|^var\(|\bward-[\w-]+/;
// Unless it fills a slot that is always shown, as a select option or a chip label is.
const SHOWN_SLOT = /^(label|title|legend|sentence|placeholder|aria-label|aria-description|alt|consequence|note|reason|hint|text|name|description|helper|error|message|heading|caption|tooltip|summary|kicker|empty)$/;
// A named constant of copy (const OUTSIDE = "...") is shown wherever it is used.
const COPY_CONSTANT = /^[A-Z][A-Z0-9_]*$/;

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

// Module paths and type-only literals are code, never shown.
function isCodeOnly(node: ts.Node): boolean {
  return ts.isImportDeclaration(node) || ts.isExportDeclaration(node) || ts.isLiteralTypeNode(node);
}

function slotName(node: ts.Node): string {
  const parent = node.parent;
  return parent && (ts.isPropertyAssignment(parent) || ts.isJsxAttribute(parent) || ts.isVariableDeclaration(parent)) ? parent.name.getText() : "";
}

// JSX text is always on screen; a string literal is code only when it is a lone token outside a shown slot.
function isCode(text: string, node: ts.Node): boolean {
  if (ts.isJsxElement(node) || ts.isJsxFragment(node)) return false;
  const slot = slotName(node);
  return CODE_TOKEN.test(text) && !SHOWN_SLOT.test(slot) && !COPY_CONSTANT.test(slot);
}

function shownStrings(path: string, fails: (text: string, node: ts.Node) => boolean): string[] {
  const source = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (isThrown(node) || isCodeOnly(node)) return;
    const text = shownText(node);
    if (text !== undefined && fails(text, node)) found.push(`${relative(SRC, path)}:${source.getLineAndCharacterOfPosition(node.getStart()).line + 1}: ${text.trim()}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

const proseDashes = (path: string) => shownStrings(path, (text) => PROSE_DASH.test(text));
const internalWords = (path: string) => shownStrings(path, (text, node) => !isCode(text, node) && INTERNAL_WORD.test(text));

describe("Ward's own copy", () => {
  it("joins no clauses with an em dash", () => {
    expect(shippedSources(SRC).flatMap(proseDashes)).toEqual([]);
  });

  it("names none of the product's insides", () => {
    expect(shippedSources(SRC).flatMap(internalWords)).toEqual([]);
  });
});
