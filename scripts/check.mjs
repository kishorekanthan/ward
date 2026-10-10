import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { accentPairs, belowFloor, contrast, derivedDarkPairs, edgePairs, graphicPairs, roleInkPairs, textPairs, describeFailures, sweepRenderedContrast } from "./contrast.mjs";
import { buildFresh, distDrift } from "./dist-fresh.mjs";
import { sweepConsoleTheme } from "./console-theme.mjs";
import { sweepPhoneWidth } from "./phone-width.mjs";
import { sweepFocusTargets } from "./focus-targets.mjs";
import { sweepBoardHeight } from "./board-height.mjs";
import { sweepBoardToolbar } from "./board-toolbar.mjs";
import { sweepMenuEscape } from "./menu-escape.mjs";
import { sweepStudioFrame } from "./studio-frame.mjs";
import { sweepHeaderGeometry } from "./header-geometry.mjs";
import { sweepPolicyRow } from "./policy-row.mjs";
import { sweepAffordance } from "./affordance.mjs";
import { workflowFindings } from "./workflows.mjs";
import { NAME, OLD_NAME, OLD_TARBALL, oldNameFiles } from "./old-name.mjs";
import { FAMILY_OF, breakpoints, buildCss, buildTokens, containerBreakpoints, declaredFaces, palette, readTokens } from "./gen-css.mjs";

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

// 1b. committed dist/ is byte-identical to a fresh build, so a hand-edited or stale dist/ cannot ship
try {
  const drift = distDrift(buildFresh(root), join(root, "dist"));
  if (drift.length === 0) pass("dist fresh", "dist/ byte-identical to a fresh vite build");
  else fail("dist fresh", `run npm run build and commit dist/; differs: ${drift.slice(0, 10).join(", ")}${drift.length > 10 ? ` (+${drift.length - 10})` : ""}`);
} catch (e) {
  fail("dist fresh", "fresh build failed: " + ((e.stderr?.toString() ?? "") + (e.stdout?.toString() ?? "") || e.message).slice(-1500));
}

// 1c. CI token is read-only, actions are pinned by commit sha, and push runs only on main
const workflowProblems = workflowFindings(join(root, ".github", "workflows"));
if (workflowProblems.length === 0) pass("workflow hardening", "contents: read, actions sha-pinned, push on main or tags only");
else fail("workflow hardening", workflowProblems.join("; "));

// 1d. no file outside tickets/ names the package's pre-#60 name (#137)
try {
  const stale = oldNameFiles();
  if (stale.length === 0) pass("package name", `no file outside tickets/ names ${OLD_NAME} or ${OLD_TARBALL}`);
  else fail("package name", `${stale.join(", ")} still name ${OLD_NAME} or ${OLD_TARBALL}; Ward is ${NAME}`);
} catch (e) {
  fail("package name", e.message);
}

// 2. contrast, computed from tokens.json so a broken token fails here
const NEED = 4.5;
const pairs = [...textPairs(tokens), ...roleInkPairs(tokens)];
for (const [theme, colors, chips] of [
  ["light", palette(tokens, "color"), tokens.chip],
  ["dark", palette(tokens, "dark"), tokens.chipDark],
]) {
  // A destructive Btn sets surface ink on a danger fill; the console has its own inks on its own ground.
  pairs.push([colors.surface, colors.danger, `${theme} surface/danger`, NEED]);
  for (const line of ["consoleInk", "consoleInfo", "consoleOk", "consoleWarn", "consoleDim", "consoleFaint"]) {
    pairs.push([colors[line], colors.console, `${theme} ${line}/console`, NEED]);
  }
  for (const [role, p] of Object.entries(chips)) {
    const bg = p.bg === "transparent" ? colors.surface : p.bg;
    pairs.push([p.fg, bg, `${theme} chip ${role}`, NEED]);
  }
}
for (const s of tokens.stream.steps) {
  pairs.push([s.chipText, s.chip, `light stream-${s.step} chip`, NEED]);
  if (s.darkChip) pairs.push([s.darkChipText, s.darkChip, `dark stream-${s.step} chip`, NEED]);
}
const low = belowFloor(pairs);
if (low.length === 0) pass("token contrast", `${pairs.length} pairs >= ${NEED}:1, both themes, computed from tokens.json`);
else fail("token contrast", low.join("; "));

// 2'. the focus ring, chart marks and sage and peach marks are graphics: 3:1 on every neutral ground (TRELLIS-422)
const graphicLow = belowFloor(graphicPairs(tokens));
if (graphicLow.length === 0) pass("graphic contrast", `${graphicPairs(tokens).length} pairs >= 3:1, both themes`);
else fail("graphic contrast", graphicLow.join("; "));

// 2''. every accent preset holds the sage role's pairs in both themes: ink and text on its tint 4.5:1, its mark 3:1 (#221)
const accentLow = belowFloor(accentPairs(tokens));
if (accentLow.length === 0) pass("accent contrast", `${accentPairs(tokens).length} pairs, ${Object.keys(tokens.accent).length} presets, both themes`);
else fail("accent contrast", accentLow.join("; "));

// 2a. the derived dark ramp is held to AA before dark ships
const derivedLow = belowFloor(derivedDarkPairs(tokens.dark));
if (derivedLow.length === 0) pass("derived dark contrast", `${derivedDarkPairs(tokens.dark).length} pairs: ink2, surface3 at 4.5:1, line3 at 3:1`);
else fail("derived dark contrast", derivedLow.join("; "));

// 2a'. an edged control's boundary is 3:1 on its ground (WCAG 1.4.11)
const edgeLow = belowFloor(edgePairs(tokens));
if (edgeLow.length === 0) pass("edge contrast", `${edgePairs(tokens).length} pairs: edge on every neutral ground at 3:1, both themes`);
else fail("edge contrast", edgeLow.join("; "));

// 2b. chart series are graphics, so they need the 3:1 non-text floor on both grounds in each theme
const GRAPHIC = 3;
const seriesPairs = [];
for (const [theme, colors] of [["light", tokens.color], ["dark", tokens.dark]]) {
  for (const key of Object.keys(colors).filter((k) => /^series\d$/.test(k))) {
    for (const ground of ["surface", "surface2"]) seriesPairs.push([colors[key], colors[ground], `${theme} ${key}/${ground}`]);
  }
}
const faintSeries = seriesPairs.filter(([fg, bg]) => contrast(fg, bg) < GRAPHIC);
if (seriesPairs.length === 24 && faintSeries.length === 0) pass("series contrast", `${seriesPairs.length} pairs >= ${GRAPHIC}:1`);
else fail("series contrast", `${seriesPairs.length} pairs; ` + faintSeries.map((p) => p[2]).join("; "));

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

// 7. phone width: Tabs, PageHeader chips, wide actions, link actions and a long title, StatStrip labels, StageGrid, the top-bar tools, the top-bar Primary nav's fades and current link (and no fade at 1280px), the section kicker, a short kicker row unchanged (also at 320px), a long kicker wrapping, a long note beside it and the activity console at 375px against src/goldens/phone-width.json
const phoneDiffs = await sweepPhoneWidth();
if (phoneDiffs.length === 0) pass("phone width", "Tabs, PageHeader chips, wide actions, link actions and a long title, StatStrip labels, StageGrid, the top-bar tools, the top-bar Primary nav's fades and current link (and no fade at 1280px), the section kicker, a short kicker row unchanged (also at 320px), a long kicker wrapping, a long note beside it keeping 12 characters a line, the activity console, the console foot and the long titles on WorkCard, SessionRow and the case header at 375 and 1280px match the golden");
else fail("phone width", phoneDiffs.join("; "));

// 8. console theme: the light theme gets a light panel, dark keeps the comp's block, against src/goldens/console-theme.json
const consoleDiffs = await sweepConsoleTheme();
if (consoleDiffs.length === 0) pass("console theme", "light panel and dark block, ground, rail-card inset and inks match the golden");
else fail("console theme", consoleDiffs.join("; "));

// 9. focus and targets: Tab through every small link in both themes; each paints a ring on four sides and answers across 24px; row links open from anywhere (src/goldens/focus-targets.json)
const focusDiffs = await sweepFocusTargets();
if (focusDiffs.length === 0) pass("focus and targets", "every small link shows its focus ring in both themes and has a 24px target; edged controls, the off Switch thumb and the 375px TopBar select meet 3:1; whole-row links open from anywhere on the row");
else fail("focus and targets", focusDiffs.join("; "));

// 10. board height: the full-page board fills the viewport and its lanes scroll, not the page; the right-edge fade and lane count follow overflow (src/goldens/board-height.json)
const boardDiffs = await sweepBoardHeight();
if (boardDiffs.length === 0) pass("board height", "at 1024x768 and 375x667 the page never scrolls, the long lane does, and the fade and lane count show only on overflow");
else fail("board height", boardDiffs.join("; "));

// 11. header geometry: every RecordSection header rect at 320, 375 and 1280px within 0.5px of src/goldens/header-geometry.json (#143)
const headerDiffs = await sweepHeaderGeometry();
if (headerDiffs.length === 0) pass("header geometry", "7 RecordSection stories, both themes, root and each child at 320, 375 and 1280px match the golden within 0.5px");
else fail("header geometry", headerDiffs.join("; "));

// 12. policy row: at 1280px each web PolicyRow control ends before its chip (#185); at 375px setting, control and chip never overlap and the setting text is never clipped (#189).
//     Every box edge is within 0.5px of src/goldens/policy-row.json.
const policyDiffs = await sweepPolicyRow();
if (policyDiffs.length === 0) pass("policy row", "5 web rows, both themes: at 1280px narrow controls keep the 150px column and a wide segment ends before the chip; at 375px the setting stacks above control and chip, unclipped");
else fail("policy row", policyDiffs.join("; "));

// 13. affordance: every story, both themes; no link underlines at rest or on hover, every control is marked, answers hover and shows a whole focus ring (#191)
const affordance = await sweepAffordance();
if (affordance.failures.length === 0) pass("affordance", `${affordance.stories} stories, ${affordance.controls} controls, ${affordance.hovered} hovered, ${affordance.focused} focused: no underline, no plain-text control, no missing hover ground or focus ring`);
else fail("affordance", affordance.failures.join("; "));

// 14. studio frame: the sidebar shell is the viewport tall at 1280x720; at 640 and 375px it folds the sidebar into a drawer with no sideways scroll (src/goldens/studio-frame.json, #209)
const studioDiffs = await sweepStudioFrame();
if (studioDiffs.length === 0) pass("studio frame", "at 1280x720 the document never scrolls and the sidebar and page scroll inside; at 640x360 and 375x667 nothing scrolls sideways and the drawer opens labelled, traps Tab and closes on Escape back to its toggle");
else fail("studio frame", studioDiffs.join("; "));

const toolbarDiffs = await sweepBoardToolbar();
if (toolbarDiffs.length === 0) pass("board toolbar", "crowded consumer controls in both themes at 1280 and 375px: equal heights, aligned centers, complete labels and no sideways scroll");
else fail("board toolbar", toolbarDiffs.join("; "));

// 16. menu escape: open Select and Menu popups sit in the top layer against their trigger, leave the toolbar's controls in place and
//     keep keys, focus return and their own scroll, on the board toolbar, a board page, a dialog and a clipping box (src/goldens/menu-escape.json, #225)
const menuDiffs = await sweepMenuEscape();
if (menuDiffs.length === 0) pass("menu escape", "toolbar and board page at 1280 and 375px in both themes, a dialog and a clipping box: menus open whole above every box, controls stay put, the toolbar never scrolls sideways, Escape and Enter return focus to the trigger, and a squeezed menu keeps its scroll");
else fail("menu escape", menuDiffs.join("; "));

console.log(failures === 0 ? "check: green" : `check: ${failures} failure(s)`);
process.exitCode = failures === 0 ? 0 : 1;
