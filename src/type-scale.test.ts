import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const src = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(src, "..", "tokens.json"), "utf8"));
const wardCss = readFileSync(join(src, "ward.css"), "utf8");
const typeVars = Array.from(wardCss.matchAll(/--ward-type-(\w+): \d+ ([\d.]+)px\/[^ ]+ ([^;]+);/g), (m) => ({ name: m[1], size: Number(m[2]), family: m[3] }));

// Comments may quote a comp's old sizes; only declarations count.
const uncommented = (text: string) => text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
const SIZE_PATTERNS = [/font-size\s*:\s*([\d.]+)px/g, /\bfont\s*:[^;"'`}]*?([\d.]+)px/g, /fontSize\s*:\s*["'`]?([\d.]+)/g];
const sources = readdirSync(src, { recursive: true, encoding: "utf8" }).filter((f) => /\.(css|tsx?)$/.test(f) && !/\.test\.tsx?$/.test(f));

describe("one UI family and a type scale (#215)", () => {
  it("declares @font-face for Figtree 400 to 700 and IBM Plex Mono only", () => {
    const faces = Array.from(wardCss.matchAll(/@font-face \{\s*font-family: '([^']+)';\s*font-style: normal;\s*font-weight: (\d+);/g), (m) => `${m[1]} ${m[2]}`);
    expect(faces).toEqual(["Figtree 400", "Figtree 500", "Figtree 600", "Figtree 700", "IBM Plex Mono 400", "IBM Plex Mono 500", "IBM Plex Mono 600", "IBM Plex Mono 700"]);
  });

  it("puts every type token on the scale 12, 13, 14, 15, 18, 22, 26, so none is under 12px", () => {
    expect(tokens.typeScale).toEqual([12, 13, 14, 15, 18, 22, 26]);
    const offScale = Object.entries(tokens.type as Record<string, { size: number }>).filter(([, t]) => ![12, 13, 14, 15, 18, 22, 26].includes(t.size));
    expect(offScale.map(([name, t]) => `${name} ${t.size}`)).toEqual([]);
  });

  it("generates every --ward-type size at 12px or more, in Figtree or IBM Plex Mono", () => {
    expect(typeVars.length).toBe(Object.keys(tokens.type).length);
    expect(typeVars.filter((t) => t.size < 12).map((t) => `${t.name} ${t.size}px`)).toEqual([]);
    expect(new Set(typeVars.map((t) => t.family))).toEqual(new Set(["Figtree, system-ui, sans-serif", "'IBM Plex Mono', ui-monospace, Menlo, monospace"]));
  });

  it("sets body at 15px and both page titles at 700 26px with -0.01em tracking", () => {
    expect(wardCss).toContain("--ward-type-body: 400 15px/1.55 Figtree, system-ui, sans-serif;");
    for (const title of ["pageTitle", "boardTitle"]) {
      expect(wardCss).toContain(`--ward-type-${title}: 700 26px/1.2 Figtree, system-ui, sans-serif;`);
      expect(wardCss).toContain(`--ward-type-${title}-tracking: -0.01em;`);
    }
  });

  it("finds no hard-coded font size under 12px in component source", () => {
    expect(sources.length).toBeGreaterThan(250);
    const tiny = sources.flatMap((f) => {
      const body = uncommented(readFileSync(join(src, f), "utf8"));
      return SIZE_PATTERNS.flatMap((re) => Array.from(body.matchAll(re), (m) => Number(m[1])).filter((n) => n < 12).map((n) => `${f} ${n}px`));
    });
    expect(tiny).toEqual([]);
  });
});
