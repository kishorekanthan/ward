import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const SRC = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(SRC, "..", "tokens.json"), "utf8"));

type Reason = "mainAction" | "currentPage" | "owed";

// TRELLIS-422: sage marks only the main action and the current page, peach only what is owed. Anything added names one reason.
const ROLE_USES: Record<Reason, string[]> = {
  mainAction: ["primitives/Btn.module.css .primary sageTint", "primitives/Btn.module.css .primary sageInk"],
  currentPage: [
    "primitives/Tabs.module.css .tab[aria-selected=\"true\"] sageTint",
    "primitives/Tabs.module.css .tab[aria-selected=\"true\"] sageInk",
    "primitives/Tabs.module.css .tab[aria-current=\"page\"] sageTint",
    "primitives/Tabs.module.css .tab[aria-current=\"page\"] sageInk",
    "primitives/TopBar.module.css .dest[aria-current=\"page\"] sageTint",
    "primitives/TopBar.module.css .dest[aria-current=\"page\"] sageInk",
    "layout/AppShell.module.css .nav a[aria-current=\"page\"] sageTint",
    "layout/AppShell.module.css .nav a[aria-current=\"page\"] sageInk",
    "layout/Sidebar.module.css .navItem[aria-current=\"page\"] sageTint",
    "layout/Sidebar.module.css .navItem[aria-current=\"page\"] sageInk",
    "layout/Sidebar.module.css .agent[aria-current=\"page\"], .root nav a[aria-current=\"page\"] sageTint",
    "layout/Sidebar.module.css .agent[aria-current=\"page\"] .agentName sageInk",
    "layout/Sidebar.module.css .root nav a[aria-current=\"page\"] .label sageInk",
    "layout/AppShell.module.css .railItem[aria-current=\"page\"] sageTint",
    "layout/AppShell.module.css .railItem[aria-current=\"page\"] sageInk",
  ],
  owed: ["primitives/Marker.tsx owed: \"var(--ward-color-peach)\", peach"],
};

const ROLE = /var\(--ward-color-(sage|sageTint|sageInk|peach|peachTint|peachInk)\)|v\.color\.(sage|sageTint|sageInk|peach|peachTint|peachInk)\b/g;

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });
}

const components = () => sourceFiles(SRC).filter((path) => !/\.(test|stories)\.tsx?$/.test(path) && !path.endsWith("tokens.ts"));

function tokensIn(text: string, pattern: RegExp): string[] {
  return [...new Set([...text.matchAll(pattern)].map((match) => match[1] ?? match[2]))];
}

function cssUses(path: string, pattern: RegExp): string[] {
  const css = readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].flatMap(([, selector, body]) =>
    tokensIn(body, pattern).map((token) => `${relative(SRC, path)} ${selector.trim().replace(/\s+/g, " ")} ${token}`),
  );
}

function scriptUses(path: string, pattern: RegExp): string[] {
  return readFileSync(path, "utf8")
    .split("\n")
    .flatMap((line) => tokensIn(line, pattern).map((token) => `${relative(SRC, path)} ${line.trim()} ${token}`));
}

function uses(pattern: RegExp): string[] {
  const files = components();
  const css = files.filter((path) => path.endsWith(".css")).flatMap((path) => cssUses(path, pattern));
  const scripts = files.filter((path) => /\.tsx?$/.test(path)).flatMap((path) => scriptUses(path, pattern));
  return [...css, ...scripts].sort();
}

describe("sage marks the main action and the current page, peach marks what is owed", () => {
  it("applies the sage and peach tokens exactly where a named reason allows", () => {
    expect(uses(ROLE)).toEqual(Object.values(ROLE_USES).flat().sort());
  });

  // A role spelled as a hex value would slip past the selector scan, so no other token may take a sage or peach value.
  it("gives no other colour, chip or stream token a sage or peach value", () => {
    const owned = ["sage", "sageTint", "sageInk", "peach", "peachTint", "peachInk"];
    const clashes = (theme: string, colors: Record<string, string>, chips: Record<string, Record<string, string>>, stream: string[]) => {
      const values = new Set(owned.map((key) => colors[key]));
      const others = Object.entries(colors).filter(([key]) => !owned.includes(key));
      const chipParts = Object.entries(chips)
        .filter(([role]) => role !== "owed")
        .flatMap(([role, pair]) => Object.entries(pair).map(([part, value]): [string, string] => [`chip ${role} ${part}`, value]));
      const streamParts = stream.map((value, i): [string, string] => [`stream ${i}`, value]);
      return [...others, ...chipParts, ...streamParts].filter(([, value]) => values.has(value)).map(([key]) => `${theme} ${key}`);
    };
    const steps = tokens.stream.steps as Array<Record<string, string>>;
    const light = steps.flatMap((s) => [s.id, s.chip, s.chipText]);
    const dark = steps.flatMap((s) => [s.id, s.darkChip, s.darkChipText]).filter(Boolean);
    expect([...clashes("light", tokens.color, tokens.chip, light), ...clashes("dark", tokens.dark, tokens.chipDark, dark)]).toEqual([]);
  });

  it("has no Ward component name an old colour alias", () => {
    const names = Object.keys(tokens.alias).join("|");
    expect(uses(new RegExp(`var\\(--ward-color-(${names})\\)|v\\.color\\.(${names})\\b`, "g"))).toEqual([]);
  });
});
