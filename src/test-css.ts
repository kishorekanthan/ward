import { readFileSync } from "node:fs";

// jsdom never sees CSS modules; inject one under the hashed names vitest gives its classes, so getComputedStyle reads it.
export function injectModuleCss(path: string, classes: Record<string, string>): () => void {
  const css = readFileSync(path, "utf8").replace(/\.([A-Za-z][\w-]*)/g, (whole, name: string) => (typeof classes[name] === "string" ? `.${classes[name]}` : whole));
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);
  return () => style.remove();
}

// The declarations of the one rule whose selector is exactly `selector`, one per line, for a CSS golden.
export function ruleBody(path: string, selector: string): string {
  const blocks = readFileSync(path, "utf8").split("}").map((b) => b.split("{"));
  const match = blocks.filter(([sel]) => sel.replace(/\/\*[\s\S]*?\*\//g, "").trim() === selector);
  if (match.length !== 1) throw new Error(`ruleBody: ${match.length} rules match ${selector} in ${path}`);
  return match[0][1].split(";").map((d) => d.trim()).filter(Boolean).join(";\n");
}

// jsdom drops var() inside border shorthands, so a left border is found in the source instead.
export function leftBorders(path: string): string[] {
  return readFileSync(path, "utf8").match(/border-(?:left|inline-start)[\w-]*\s*:[^;]*/g) ?? [];
}

// The cascaded edge and ground of a rendered element, so a stripe added by any other rule shows up. jsdom lowercases both.
export function edge(el: Element): { shadow: string; ground: string } {
  const style = getComputedStyle(el);
  return { shadow: style.boxShadow, ground: style.getPropertyValue("background") };
}
