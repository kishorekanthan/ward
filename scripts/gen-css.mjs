import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export function readTokens() {
  return JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));
}

// One face per (family, weight) a type token asks for; check.mjs gates the correspondence because CSS substitutes silently.
// Files are the Fontsource 5.3.0 latin subsets (@fontsource/figtree, @fontsource/ibm-plex-mono), OFL, licences beside them.
const FONTS = [
  { family: "Figtree", weight: 400, file: "figtree-400.woff2", local: ["Figtree", "Figtree-Regular"] },
  { family: "Figtree", weight: 500, file: "figtree-500.woff2", local: ["Figtree Medium", "Figtree-Medium"] },
  { family: "Figtree", weight: 600, file: "figtree-600.woff2", local: ["Figtree SemiBold", "Figtree-SemiBold"] },
  { family: "Figtree", weight: 700, file: "figtree-700.woff2", local: ["Figtree Bold", "Figtree-Bold"] },
  { family: "IBM Plex Mono", weight: 400, file: "ibm-plex-mono-400.woff2", local: ["IBM Plex Mono", "IBMPlexMono"] },
  { family: "IBM Plex Mono", weight: 500, file: "ibm-plex-mono-500.woff2", local: ["IBM Plex Mono Medium", "IBMPlexMono-Medium"] },
  { family: "IBM Plex Mono", weight: 600, file: "ibm-plex-mono-600.woff2", local: ["IBM Plex Mono SemiBold", "IBMPlexMono-SemiBold"] },
  { family: "IBM Plex Mono", weight: 700, file: "ibm-plex-mono-700.woff2", local: ["IBM Plex Mono Bold", "IBMPlexMono-Bold"] },
];

// named and prose are both Figtree now; the two keys stay so consumers reading tokens.json do not break.
export const FAMILY_OF = { named: "Figtree", prose: "Figtree", mono: "IBM Plex Mono" };

// @media cannot read a custom property, so the scale is exported for check.mjs to hold every literal to it.
const scaleOf = (group) => Object.entries(group).map(([name, min]) => ({ name, min, below: min - 0.02 }));

export const breakpoints = (tokens) => scaleOf(tokens.breakpoint);
export const containerBreakpoints = (tokens) => scaleOf(tokens.containerBreakpoint);

export function declaredFaces() {
  return new Set(FONTS.map((f) => `${f.family}/${f.weight}`));
}

const block = (lines) => lines.join("\n");
const rule = (selector, decls) => block([selector + " {", ...decls.map((d) => "  " + d), "}"]);
const px = (n) => (typeof n === "number" ? n + "px" : n);

// ?no-inline: library builds otherwise inline every asset as base64; the files ship in dist/assets instead.
function fontFaces() {
  return FONTS.map((f) =>
    rule("@font-face", [
      `font-family: '${f.family}';`,
      "font-style: normal;",
      `font-weight: ${f.weight};`,
      "font-display: swap;",
      `src: url('./fonts/${f.file}?no-inline') format('woff2'), ${f.local.map((l) => `local('${l}')`).join(", ")};`,
    ]),
  ).join("\n\n");
}

// An alias names a role key in the same theme and is emitted as that role's value, so old names keep resolving one release.
export function palette(tokens, theme) {
  const colors = tokens[theme];
  const aliases = Object.entries(tokens.alias).map(([name, role]) => [name, colors[role]]);
  return { ...colors, ...Object.fromEntries(aliases) };
}

function colorVars(colors) {
  return Object.entries(colors).map(([k, val]) => `--ward-color-${k}: ${val};`);
}

// A preset restates the sage role and every alias of it, so accentPill follows; no other colour moves with the accent.
function accentVars(tokens, values) {
  const aliases = Object.entries(tokens.alias).filter(([, role]) => role in values).map(([name, role]) => [name, values[role]]);
  return colorVars({ ...values, ...Object.fromEntries(aliases) });
}

// Green is the base palette and has no block. Dark wins where it shares the accent's element or pins a subtree under it.
export function accentRules(tokens) {
  return Object.entries(tokens.accent)
    .filter(([, preset]) => preset.color)
    .flatMap(([name, preset]) => {
      const on = `[data-accent="${name}"]`;
      return [
        rule(`[data-theme="dark"]${on}, ${on} [data-theme="dark"]`, accentVars(tokens, preset.dark)),
        rule(`${on}, ${on} [data-theme="light"]`, accentVars(tokens, preset.color)),
      ];
    });
}

// Comfortable is the :root lengths; a denser setting restates only the pads and gaps it shortens.
export function densityRules(tokens) {
  return Object.entries(tokens.density)
    .filter(([, d]) => d.pad)
    .map(([name, d]) =>
      rule(
        `[data-density="${name}"]`,
        ["pad", "gap"].flatMap((group) => Object.entries(d[group]).map(([k, val]) => `--ward-${group}-${k}: ${px(val)};`)),
      ),
    );
}

function chipVars(chip) {
  return Object.entries(chip).flatMap(([role, pair]) =>
    ["bg", "fg", "line"].map((part) => `--ward-chip-${role}-${part}: ${pair[part]};`),
  );
}

function streamVars(tokens, dark) {
  return tokens.stream.steps.flatMap((s) => {
    const vars = [`--ward-stream-${s.step}-id: ${s.id};`];
    const chip = dark ? s.darkChip : s.chip;
    const text = dark ? s.darkChipText : s.chipText;
    if (chip) vars.push(`--ward-stream-${s.step}-chip: ${chip};`);
    if (text) vars.push(`--ward-stream-${s.step}-chipText: ${text};`);
    return vars;
  });
}

function layoutVars(tokens) {
  const space = Object.entries(tokens.space).flatMap(([k, v]) => {
    const base = `--ward-space-${k}: ${px(v)};`;
    return /^\d+$/.test(k) ? [base, `--ward-space-s${k}: var(--ward-space-${k});`] : [base];
  });
  const pad = Object.entries(tokens.pad).map(([k, v]) => `--ward-pad-${k}: ${v};`);
  const gap = Object.entries(tokens.gap).map(([k, v]) => `--ward-gap-${k}: ${px(v)};`);
  const width = Object.entries(tokens.width).map(([k, v]) => `--ward-width-${k}: ${px(v)};`);
  const height = Object.entries(tokens.height).map(([k, v]) => `--ward-height-${k}: ${px(v)};`);
  const size = tokens.marker.sizes.map((n) => `--ward-size-marker${n}: ${px(n)};`);
  return [
    ...space,
    ...pad,
    ...gap,
    ...width,
    ...height,
    ...size,
    `--ward-radius: ${px(tokens.radius)};`,
    `--ward-radius-chip: ${px(tokens.radiusChip)};`,
    `--ward-radius-card: ${px(tokens.radiusCard)};`,
    `--ward-radius-panel: ${px(tokens.radiusPanel)};`,
    `--ward-border: ${px(tokens.border)};`,
    `--ward-underline: ${px(tokens.underline)};`,
    `--ward-focus-offset: ${px(tokens.focusOffset)};`,
    `--ward-focus-ring: ${px(tokens.focusRing)};`,
  ];
}

// A shadow named in shadowDark is themed: dark sets its twin and the light pin restores the light value.
function shadowVars(shadow, only = shadow) {
  return Object.keys(only).map((k) => `--ward-shadow-${k}: ${shadow[k]};`);
}

function typeVars(tokens) {
  return Object.entries(tokens.type).flatMap(([name, t]) => {
    const main = `${t.weight} ${px(t.size)}/${t.leading} ${tokens.font[t.family]}`;
    const vars = [`--ward-type-${name}: ${main};`];
    for (const key of ["tracking", "numeric", "transform"]) {
      if (t[key]) vars.push(`--ward-type-${name}-${key}: ${t[key]};`);
    }
    return vars;
  });
}

function motionVars(tokens) {
  return Object.entries(tokens.motion)
    .filter(([k]) => !k.endsWith("Ms"))
    .map(([k, val]) => `--ward-motion-${k}: ${val};`)
    .concat([
      `--ward-live-heartbeat: ${tokens.live.heartbeat};`,
      `--ward-live-poll: ${tokens.live.poll};`,
      `--ward-live-reconnectMax: ${tokens.live.reconnectMax};`,
      `--ward-live-staleAfter: ${tokens.live.staleAfterPolls * tokens.live.pollMs}ms;`,
    ]);
}

export function buildCss(tokens) {
  return (
    block([
      "/* Generated from tokens.json by scripts/gen-css.mjs — edit tokens.json, never this file. */",
      "",
      fontFaces(),
      "",
      rule(":root", [
        ...colorVars(palette(tokens, "color")),
        ...chipVars(tokens.chip),
        ...streamVars(tokens, false),
        ...layoutVars(tokens),
        ...shadowVars(tokens.shadow),
        ...typeVars(tokens),
        ...motionVars(tokens),
      ]),
      "",
      rule('[data-theme="dark"]', [
        ...colorVars(palette(tokens, "dark")),
        ...chipVars(tokens.chipDark),
        ...streamVars(tokens, true),
        ...shadowVars(tokens.shadowDark),
      ]),
      "",
      // :root cannot be re-asserted inside a dark subtree, so light needs its own pin for side-by-side themes.
      rule('[data-theme="light"]', [
        ...colorVars(palette(tokens, "color")),
        ...chipVars(tokens.chip),
        ...streamVars(tokens, false),
        ...shadowVars(tokens.shadow, tokens.shadowDark),
      ]),
      "",
      ...accentRules(tokens),
      "",
      ...densityRules(tokens),
      "",
      rule("*, *::before, *::after", ["box-sizing: border-box;"]),
      rule("*", ["margin: 0;", "padding: 0;"]),
      rule("html", ["background: var(--ward-color-bg);"]),
      rule("body", ["min-width: 0;", "background: var(--ward-color-bg);", "color: var(--ward-color-text);", "font: var(--ward-type-body);"]),
      rule("button, input, select, textarea", ["font: inherit;", "color: inherit;", "border: none;"]),
      rule("button", ["background: none;", "cursor: pointer;", "text-align: left;"]),
      // Affordance rule (#191): a link never underlines; colour and weight mark it, and a hover ground answers the pointer.
      rule("a", ["color: var(--ward-color-link);", "font-weight: 500;", "text-decoration: none;", "border-radius: var(--ward-radius-chip);"]),
      // Zero specificity, so any component's own hover wins; a whole-row link takes its row's ground instead.
      rule(":where(a[href]:not(.ward-rowlink)):hover", ["background-color: var(--ward-color-accentTint);"]),
      // A select is a control: its edge comes from the component, its chevron is drawn here, never an icon or asset.
      rule("select", [
        "appearance: none;",
        "cursor: pointer;",
        "border-radius: var(--ward-radius);",
        "padding-inline-end: calc(var(--ward-space-3) * 2 + var(--ward-space-1));",
        "background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);",
        "background-position: right calc(var(--ward-space-3) + var(--ward-space-1)) top 50%, right var(--ward-space-3) top 50%;",
        "background-size: var(--ward-space-1) var(--ward-space-1);",
        "background-repeat: no-repeat;",
      ]),
      rule("summary", [
        "display: flex;",
        "align-items: center;",
        "gap: var(--ward-space-2);",
        "padding: var(--ward-space-1) var(--ward-space-3);",
        "list-style: none;",
        "cursor: pointer;",
        "border-radius: var(--ward-radius);",
        "box-shadow: inset 0 0 0 var(--ward-border) var(--ward-color-edge);",
      ]),
      rule("summary::-webkit-details-marker", ["display: none;"]),
      rule("summary::after", [
        'content: "";',
        "width: var(--ward-space-1);",
        "height: var(--ward-space-1);",
        "margin-inline-start: auto;",
        "border-right: var(--ward-border) solid currentColor;",
        "border-bottom: var(--ward-border) solid currentColor;",
        "transform: rotate(45deg);",
      ]),
      rule("details[open] > summary::after", ["transform: rotate(-135deg);"]),
      rule("fieldset", ["border: none;", "min-inline-size: 0;"]),
      rule("ul, ol", ["list-style: none;"]),
      rule("img, svg", ["display: block;"]),
      "",
      rule(":focus-visible", [
        "outline: var(--ward-focus-ring) solid var(--ward-color-focus);",
        "outline-offset: var(--ward-focus-offset);",
      ]),
      "",
      // WCAG 2.5.8: a small link answers across height.target; the negative margin gives the padding back so its line stays put.
      rule(".ward-target", [
        "--ward-target-pad: max(0px, calc((var(--ward-height-target) - 1em) / 2));",
        "padding-block: var(--ward-target-pad);",
        "margin-block: calc(-1 * var(--ward-target-pad));",
      ]),
      "",
      rule(".ward-visually-hidden", [
        "position: absolute;",
        "width: 1px;",
        "height: 1px;",
        "margin: -1px;",
        "overflow: hidden;",
        "clip: rect(0 0 0 0);",
        "white-space: nowrap;",
      ]),
      "",
      // A soft card has no border to colour (#231): an outline rings it without moving layout or touching its shadow.
      // Only `from` is set, so the ring fades to the resting outline: transparent, or the focus ring when focused.
      rule("@keyframes ward-flash", ["from { outline-color: var(--ward-flash-colour, var(--ward-color-running)); }"]),
      rule(".ward-border-flash", ["animation: ward-flash var(--ward-motion-flash) 1;"]),
      rule(".ward-border-flash:not(:focus-visible)", ["outline: var(--ward-underline) solid transparent;"]),
      "",
      // Only running work moves; one duration drives it, and reduced motion zeroes that duration as well as stopping it.
      rule("@keyframes ward-running", ["50% { opacity: 0.55; }"]),
      rule(".ward-running", ["animation: ward-running var(--ward-motion-running) ease-in-out infinite;"]),
      "",
      rule("@media (prefers-reduced-motion: reduce)", [
        ":root { --ward-motion-running: 0s; }",
        ".ward-running { animation: none; }",
        "*, *::before, *::after { animation: none !important; transition: none !important; }",
      ]),
      "",
    ])
  );
}

function quote(s) {
  return `'${s}'`;
}

const MOTION_KEYS = ["fast", "flash", "reveal", "tick", "patience", "running"];

export function buildTokens(tokens) {
  const validated = tokens.stream.steps.filter((step) => step.darkChip && step.darkChipText);
  const lines = [
    "/* Generated from tokens.json by scripts/gen-css.mjs — edit tokens.json, never this file. */",
    "",
    `export const WARD_VERSION = ${JSON.stringify(tokens.$meta.version)};`,
    `export type ChipRole = ${Object.keys(tokens.chip).map(quote).join(" | ")};`,
    `export type StreamStep = ${tokens.stream.steps.map((s) => s.step).join(" | ")};`,
    `export const CHIP_ROLES = ${JSON.stringify([...Object.keys(tokens.chip), "stream"])} as const;`,
    `export const STREAM_STEPS = ${JSON.stringify(tokens.stream.steps.map((s) => s.step))} as const;`,
    `export const validatedStreamSteps = ${JSON.stringify(validated.map((step) => step.step))} as const;`,
    `export type ValidatedStreamStep = (typeof validatedStreamSteps)[number];`,
    `export type MarkerKind = ${tokens.marker.kinds.map(quote).join(" | ")};`,
    `export type MarkerSize = ${tokens.marker.sizes.join(" | ")};`,
    `export const LIVE_EVENT_TYPES = ${JSON.stringify(tokens.live.events)} as const;`,
    "export type LiveEventType = (typeof LIVE_EVENT_TYPES)[number];",
    `export const ACCENT_PRESETS = ${JSON.stringify(Object.entries(tokens.accent).map(([name, p]) => ({ name, label: p.label })))} as const;`,
    "export type AccentPreset = (typeof ACCENT_PRESETS)[number][\"name\"];",
    `export const DENSITIES = ${JSON.stringify(Object.entries(tokens.density).map(([name, d]) => ({ name, label: d.label })))} as const;`,
    "export type Density = (typeof DENSITIES)[number][\"name\"];",
    "",
    "export const v = {",
  ];
  lines.push("  color: {", ...Object.keys(palette(tokens, "color")).map((k) => `    ${k}: 'var(--ward-color-${k})',`), "  },");
  lines.push("  chip: {");
  for (const role of Object.keys(tokens.chip)) {
    lines.push(`    ${role}: {`);
    lines.push(`      bg: 'var(--ward-chip-${role}-bg)',`);
    lines.push(`      fg: 'var(--ward-chip-${role}-fg)',`);
    lines.push(`      line: 'var(--ward-chip-${role}-line)',`);
    lines.push("    },");
  }
  lines.push("  },");
  lines.push(
    "  space: {",
    ...Object.keys(tokens.space).map((k) => `    ${/^\d+$/.test(k) ? "s" + k : k}: 'var(--ward-space-${k})',`),
    "  },",
  );
  lines.push("  pad: {", ...Object.keys(tokens.pad).map((k) => `    ${k}: 'var(--ward-pad-${k})',`), "  },");
  lines.push("  gap: {", ...Object.keys(tokens.gap).map((k) => `    ${k}: 'var(--ward-gap-${k})',`), "  },");
  lines.push("  width: {", ...Object.keys(tokens.width).map((k) => `    ${k}: 'var(--ward-width-${k})',`), "  },");
  lines.push("  height: {", ...Object.keys(tokens.height).map((k) => `    ${k}: 'var(--ward-height-${k})',`), "  },");
  lines.push("  size: {", ...tokens.marker.sizes.map((n) => `    marker${n}: 'var(--ward-size-marker${n})',`), "  },");
  lines.push(
    "  radius: 'var(--ward-radius)',",
    "  radiusChip: 'var(--ward-radius-chip)',",
    "  radiusCard: 'var(--ward-radius-card)',",
    "  radiusPanel: 'var(--ward-radius-panel)',",
    "  border: 'var(--ward-border)',",
    "  underline: 'var(--ward-underline)',",
    "  focusOffset: 'var(--ward-focus-offset)',",
    "  focusRing: 'var(--ward-focus-ring)',",
    `  shadow: { ${Object.keys(tokens.shadow).map((k) => `${k}: 'var(--ward-shadow-${k})'`).join(", ")} },`,
  );
  lines.push("  type: {");
  for (const name of Object.keys(tokens.type)) {
    lines.push(`    ${name}: 'var(--ward-type-${name})',`);
    for (const key of ["tracking", "numeric", "transform"]) {
      if (tokens.type[name][key]) lines.push(`    ${name}${key[0].toUpperCase() + key.slice(1)}: 'var(--ward-type-${name}-${key})',`);
    }
  }
  lines.push("  },");
  lines.push("  motion: {", ...MOTION_KEYS.map((k) => `    ${k}: 'var(--ward-motion-${k})',`), "  },");
  lines.push(
    "  live: {",
    `    heartbeat: 'var(--ward-live-heartbeat)',`,
    `    reconnectMax: 'var(--ward-live-reconnectMax)',`,
    `    staleAfter: 'var(--ward-live-staleAfter)',`,
    `    poll: 'var(--ward-live-poll)',`,
    "  },",
    "} as const;",
    "",
    `export const ms = {`,
    ...MOTION_KEYS.map((k) => `  ${k}: ${tokens.motion[k + "Ms"]},`),
    `  heartbeat: ${tokens.live.heartbeatMs},`,
    `  poll: ${tokens.live.pollMs},`,
    `  reconnectMax: ${tokens.live.reconnectMaxMs},`,
    `  staleAfter: ${tokens.live.staleAfterPolls * tokens.live.pollMs},`,
    `  reconnectBase: ${tokens.live.reconnectBaseMs},`,
    `  load: ${tokens.live.loadMs},`,
    "} as const;",
    "",
    "export function stream(step: StreamStep) {",
    "  return {",
    `    id: \`var(--ward-stream-\${step}-id)\`,`,
    `    chip: \`var(--ward-stream-\${step}-chip)\`,`,
    `    chipText: \`var(--ward-stream-\${step}-chipText)\`,`,
    "  } as const;",
    "}",
    "",
    "export function isStreamStep(step: number): step is StreamStep {",
    "  return (STREAM_STEPS as readonly number[]).includes(step);",
    "}",
    "",
    "export function isValidatedStreamStep(step: number): step is ValidatedStreamStep {",
    "  return (validatedStreamSteps as readonly number[]).includes(step);",
    "}",
    "",
    "export function streamVars(step: number): Record<string, string> {",
    "  if (!isStreamStep(step)) throw new Error('unvalidated stream step');",
    "  return { '--stream': `var(--ward-stream-${step}-chip)`, '--streamText': `var(--ward-stream-${step}-chipText)`, '--streamId': `var(--ward-stream-${step}-id)` };",
    "}",
    "",
    "export function streamChip(step: number): string {",
    "  if (!isStreamStep(step)) throw new Error('unvalidated stream step');",
    "  return `var(--ward-stream-${step}-chip)`;",
    "}",
    "",
    `const STREAM_HEX: Record<StreamStep, string> = ${JSON.stringify(Object.fromEntries(tokens.stream.steps.map((s) => [s.step, s.id])))};`,
    "",
    "export function streamHex(step: number): string {",
    "  if (!isStreamStep(step)) throw new Error('unvalidated stream step');",
    "  return STREAM_HEX[step];",
    "}",
    "",
  );
  return lines.join("\n");
}

function isMain() {
  const entry = process.argv[1] ? resolve(process.argv[1]) : "";
  return entry === fileURLToPath(import.meta.url);
}

if (isMain()) {
  const tokens = readTokens();
  writeFileSync(join(root, "src", "ward.css"), buildCss(tokens));
  writeFileSync(join(root, "src", "tokens.ts"), buildTokens(tokens));
  console.log("gen: src/ward.css, src/tokens.ts written from tokens.json " + tokens.$meta.version);
}
