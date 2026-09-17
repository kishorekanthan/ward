import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { contrast, describeFailures, sweepRenderedContrast } from "./contrast.mjs";
import { FAMILY_OF, breakpoints, buildCss, buildTokens, containerBreakpoints, declaredFaces, readTokens } from "./gen-css.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
let failures = 0;

function pass(name, detail) {
  console.log("PASS  " + name + (detail ? " — " + detail : ""));
}
function fail(name, detail) {
  failures += 1;
  console.log("FAIL  " + name + (detail ? " — " + detail : ""));
}
function run(name, cmd, args) {
  try {
    execFileSync(cmd, args, { cwd: root, stdio: "pipe" });
    pass(name);
  } catch (e) {
    const out = (e.stdout?.toString() ?? "") + (e.stderr?.toString() ?? "");
    fail(name, out.slice(-1500) || "violations found");
  }
}
function walk(dir, out) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const tokens = readTokens();

// 1. generated output is fresh
const cssFresh = readFileSync(join(src, "ward.css"), "utf8") === buildCss(tokens);
const tsFresh = readFileSync(join(src, "tokens.ts"), "utf8") === buildTokens(tokens);
if (cssFresh && tsFresh) pass("generated output fresh", "ward.css + tokens.ts byte-identical to generator");
else fail("generated output fresh", "run npm run gen");

// 2. contrast, computed from tokens.json so a broken token fails here
const NEED = 4.5;
const pairs = [];
for (const [theme, colors, chips] of [
  ["light", tokens.color, tokens.chip],
  ["dark", tokens.dark, tokens.chipDark],
]) {
  pairs.push([colors.text, colors.bg, `${theme} text/bg`], [colors.text, colors.surface, `${theme} text/surface`]);
  pairs.push([colors.muted, colors.bg, `${theme} muted/bg`], [colors.muted, colors.surface, `${theme} muted/surface`]);
  pairs.push([colors.blue, colors.surface, `${theme} blue/surface`], [colors.warnInk, colors.warnSurface, `${theme} warnInk/warnSurface`]);
  // Red is set as text for blocked reasons on cards and over-cap notes on columns.
  pairs.push([colors.red, colors.surface, `${theme} red/surface`], [colors.red, colors.surface2, `${theme} red/surface2`]);
  // Faint labels sit on every light ground and on a selected or warned row; the console has its own dim ink.
  for (const ground of ["bg", "surface", "surface2", "blueSoft", "warnSurface"]) pairs.push([colors.faint, colors[ground], `${theme} faint/${ground}`]);
  pairs.push([colors.consoleFaint, colors.console, `${theme} consoleFaint/console`]);
  for (const line of ["consoleInfo", "consoleOk", "consoleWarn", "consoleDim"]) {
    pairs.push([colors[line], colors.console, `${theme} ${line}/console`]);
  }
  for (const [role, p] of Object.entries(chips)) {
    const bg = p.bg === "transparent" ? colors.surface : p.bg;
    pairs.push([p.fg, bg, `${theme} chip ${role}`]);
  }
}
for (const s of tokens.stream.steps) {
  pairs.push([s.chipText, s.chip, `light stream-${s.step} chip`]);
  if (s.darkChip) pairs.push([s.darkChipText, s.darkChip, `dark stream-${s.step} chip`]);
}
const low = pairs.filter(([fg, bg]) => !fg.startsWith("rgba") && contrast(fg, bg) < NEED);
if (low.length === 0) pass("token contrast", `${pairs.length} pairs >= ${NEED}:1, both themes, computed from tokens.json`);
else fail("token contrast", low.map((p) => `${p[2]} ${p[0]} on ${p[1]} = ${contrast(p[0], p[1]).toFixed(2)}`).join("; "));

// 3. no hex outside the generated files; comments are stripped so naming a value in a reason does not trip it
const files = walk(src, []);
const modules = files.filter((f) => f.endsWith(".module.css"));
const decls = (f) => readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const hexHits = modules.filter((f) => /#[0-9a-fA-F]{3,8}\b/.test(decls(f)));
if (hexHits.length === 0) pass("no-hex in components", `${modules.length} module.css files scanned`);
else fail("no-hex in components", hexHits.join(", "));

// 3b. every length is a token; @media/@container literals and the visually-hidden idiom are the only exemptions
const PX_OK = new Set(["1px", "-1px", "-9999px"]);
const pxHits = [];
for (const f of modules) {
  decls(f)
    .split("\n")
    .forEach((line, i) => {
      if (/@media|@container/.test(line)) return;
      for (const m of line.matchAll(/-?\d*\.?\d+px/g)) {
        if (!PX_OK.has(m[0])) pxHits.push(`${relative(src, f)}:${i + 1} ${m[0]}`);
      }
    });
}
if (pxHits.length === 0) pass("no raw px in components", `${modules.length} module.css files scanned`);
else fail("no raw px in components", pxHits.join(", "));

// 4. banned motion outside ward.css
const motionFiles = files.filter((f) => f !== join(src, "ward.css") && /\.(css|tsx?)$/.test(f));
const banned = motionFiles.filter((f) => {
  const body = readFileSync(f, "utf8");
  return (
    /transition\s*:[^;{}]*(transform|width|height|top|left|\ball\b)/i.test(body) ||
    /@(keyframes|property)/i.test(body) ||
    /animation\s*:[^;{}]*infinite/i.test(body)
  );
});
if (banned.length === 0) pass("banned motion", `${motionFiles.length} source files scanned`);
else fail("banned motion", banned.join(", "));

// 4b. every component has a story
const components = files.filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx") && !f.endsWith(".stories.tsx"));
const storyless = components.filter((f) => !files.includes(f.replace(/\.tsx$/, ".stories.tsx")));
if (storyless.length === 0) pass("story coverage", `${components.length} components, one story file each`);
else fail("story coverage", storyless.join(", "));

// 4c. every weight a type token asks for has an @font-face; CSS substitutes the nearest weight silently otherwise
const faces = declaredFaces();
const unserved = new Map();
for (const [name, t] of Object.entries(tokens.type)) {
  const family = FAMILY_OF[t.family];
  const key = family ? `${family}/${t.weight}` : `unknown family '${t.family}'`;
  if (family && faces.has(key)) continue;
  if (!unserved.has(key)) unserved.set(key, []);
  unserved.get(key).push(name);
}
if (unserved.size === 0) {
  pass("font weights served", `${faces.size} faces cover every weight ${Object.keys(tokens.type).length} type tokens ask for`);
} else {
  fail("font weights served", [...unserved].map(([k, names]) => `${k} wanted by type.${names.join(", type.")}`).join("; "));
}

// 4d. every module.css states on line one whether its values mirror a named comp or are not established
const noProvenance = modules.filter((f) => !readFileSync(f, "utf8").startsWith("/* Provenance:"));
const unestablished = modules.filter((f) => /^\/\* Provenance: not established/.test(readFileSync(f, "utf8")));
if (noProvenance.length === 0) {
  pass("provenance declared", `${modules.length} module.css files: ${modules.length - unestablished.length} name a comp, ${unestablished.length} not established`);
} else {
  fail("provenance declared", `no line-one marker: ${noProvenance.map((f) => relative(src, f)).join(", ")}`);
}

// 4e. every @media/@container width is on its declared scale, in the (breakpoint - 0.02) form
const SCALES = [
  { label: "@media", re: /@media\s*\((?:max|min)-width:\s*(-?[\d.]+)px\)/g, values: breakpoints(tokens) },
  { label: "@container", re: /@container\s*(?:[\w-]+\s+)?\((?:max|min)-width:\s*(-?[\d.]+)px\)/g, values: containerBreakpoints(tokens) },
];
const offScale = [];
const declaredScales = [];
for (const { label, re, values } of SCALES) {
  const allowed = new Map(values.map((b) => [b.below.toFixed(2), b.name]));
  declaredScales.push(`${label} ${allowed.size}: ${[...allowed].map(([v, n]) => `${n} ${v}`).join(", ")}`);
  for (const f of modules) {
    decls(f)
      .split("\n")
      .forEach((line, i) => {
        for (const m of line.matchAll(re)) {
          if (!allowed.has(Number(m[1]).toFixed(2))) offScale.push(`${relative(src, f)}:${i + 1} ${label} ${m[1]}px`);
        }
      });
  }
}
if (offScale.length === 0) {
  pass("one breakpoint scale", declaredScales.join(" | "));
} else {
  fail("one breakpoint scale", `not on the scale: ${offScale.join(", ")}`);
}

// 5. toolchain gates
run("tsc strict", "npx", ["--no-install", "tsc", "--noEmit", "-p", "tsconfig.json"]);
run("eslint (complexity <= 5)", "npx", ["--no-install", "eslint", "."]);
run("stylelint no-hex", "npx", ["--no-install", "stylelint", "src/**/*.module.css"]);
run("vitest", "npx", ["--no-install", "vitest", "run"]);

// 6. rendered contrast: every story in a real browser, both themes; last because it rebuilds storybook when inputs change
const rendered = await sweepRenderedContrast();
const exempt = Object.entries(rendered.exempt).map(([k, n]) => `${k} ${n}`).join(", ") || "none";
const detail = `${rendered.stories} stories, ${rendered.measured} text nodes (${rendered.large} large), exempt: ${exempt}, ${rendered.seconds}s, ${rendered.build}`;
if (rendered.broken.length) fail("stories render", rendered.broken.join(" | "));
else pass("stories render", `${rendered.stories} stories, no empty root and no console errors`);
if (rendered.failures.length === 0) pass("rendered contrast", detail);
else fail("rendered contrast", describeFailures(rendered.failures));

console.log(failures === 0 ? "check: green" : `check: ${failures} failure(s)`);
process.exitCode = failures === 0 ? 0 : 1;
