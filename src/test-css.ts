import { readFileSync } from "node:fs";

// jsdom never sees CSS modules; inject one under the hashed names vitest gives its classes, so getComputedStyle reads it.
export function injectModuleCss(path: string, classes: Record<string, string>): () => void {
  const css = readFileSync(path, "utf8").replace(/\.([A-Za-z][\w-]*)/g, (whole, name: string) => (typeof classes[name] === "string" ? `.${classes[name]}` : whole));
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);
  return () => style.remove();
}
