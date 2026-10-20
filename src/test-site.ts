import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ruleBody } from "./test-css";

const here = dirname(fileURLToPath(import.meta.url));
const wardCss = readFileSync(join(here, "ward.css"), "utf8");
const varsOf = (css: string) => new Map(Array.from(css.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2].trim()]));
const block = (selector: string) => wardCss.slice(wardCss.indexOf(`${selector} {`), wardCss.indexOf("}", wardCss.indexOf(`${selector} {`)));
const rootVars = varsOf(block(":root"));
const themes = { light: rootVars, dark: new Map([...rootVars, ...varsOf(block('[data-theme="dark"]'))]) };

export type Theme = keyof typeof themes;

// A value with every var() replaced from ward.css, in the given theme.
export function resolve(raw: string, theme: Theme = "light"): string {
  const once = raw.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => themes[theme].get(name) ?? whole);
  return once === raw ? raw.trim() : resolve(once, theme);
}

// The raw value of one declaration in one rule of a stylesheet beside this file.
export function declared(file: string, selector: string, property: string): string {
  const line = ruleBody(join(here, "site", file), selector).split(";\n").find((d) => d.startsWith(`${property}:`));
  return line === undefined ? "" : line.slice(property.length + 1).trim();
}

export function sheet(file: string): string {
  return readFileSync(join(here, "site", file), "utf8");
}
