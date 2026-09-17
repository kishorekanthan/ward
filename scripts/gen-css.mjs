import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export function readTokens() {
  return JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));
}

// One face per (family, weight) a type token asks for; check.mjs gates the correspondence because CSS substitutes silently.
const FONTS = [
  { family: "Archivo", weight: 500, url: "https://fonts.gstatic.com/s/archivo/v25/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxKsv4Rn.woff2", local: ["Archivo Medium", "Archivo-Medium"] },
  { family: "Archivo", weight: 600, url: "https://fonts.gstatic.com/s/archivo/v25/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxKsv4Rn.woff2", local: ["Archivo SemiBold", "Archivo-SemiBold"] },
  { family: "Source Sans 3", weight: 400, url: "https://fonts.gstatic.com/s/sourcesans3/v19/nwpStKy2OAdR1K-IwhWudF-R3w8aZejf5Hc.woff2", local: ["Source Sans 3", "SourceSans3-Regular"] },
  { family: "Source Sans 3", weight: 500, url: "https://fonts.gstatic.com/s/sourcesans3/v19/nwpStKy2OAdR1K-IwhWudF-R3w8aZejf5Hc.woff2", local: ["Source Sans 3 Medium", "SourceSans3-Medium"] },
  { family: "Source Sans 3", weight: 600, url: "https://fonts.gstatic.com/s/sourcesans3/v19/nwpStKy2OAdR1K-IwhWudF-R3w8aZejf5Hc.woff2", local: ["Source Sans 3 SemiBold", "SourceSans3-Semibold"] },
  { family: "Source Sans 3", weight: 700, url: "https://fonts.gstatic.com/s/sourcesans3/v19/nwpStKy2OAdR1K-IwhWudF-R3w8aZejf5Hc.woff2", local: ["Source Sans 3 Bold", "SourceSans3-Bold"] },
  { family: "IBM Plex Mono", weight: 400, url: "https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.woff2", local: ["IBM Plex Mono", "IBMPlexMono"] },
  { family: "IBM Plex Mono", weight: 500, url: "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgsAXHNk.woff2", local: ["IBM Plex Mono Medium", "IBMPlexMono-Medium"] },
  { family: "IBM Plex Mono", weight: 600, url: "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3vAOwlBFgsAXHNk.woff2", local: ["IBM Plex Mono SemiBold", "IBMPlexMono-SemiBold"] },
  { family: "IBM Plex Mono", weight: 700, url: "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3pQPwlBFgsAXHNk.woff2", local: ["IBM Plex Mono Bold", "IBMPlexMono-Bold"] },
];

export const FAMILY_OF = { named: "Archivo", prose: "Source Sans 3", mono: "IBM Plex Mono" };

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

function fontFaces() {
  return FONTS.map((f) =>
    rule("@font-face", [
      `font-family: '${f.family}';`,
      "font-style: normal;",
      `font-weight: ${f.weight};`,
      "font-display: swap;",
      `src: url('${f.url}') format('woff2'), ${f.local.map((l) => `local('${l}')`).join(", ")};`,
    ]),
  ).join("\n\n");
}

function colorVars(colors) {
  return Object.entries(colors).map(([k, val]) => `--ward-color-${k}: ${val};`);
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
    `--ward-border: ${px(tokens.border)};`,
    `--ward-underline: ${px(tokens.underline)};`,
    `--ward-shadow-overlay: ${tokens.shadow.overlay};`,
  ];
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
        ...colorVars(tokens.color),
        ...chipVars(tokens.chip),
        ...streamVars(tokens, false),
        ...layoutVars(tokens),
        ...typeVars(tokens),
        ...motionVars(tokens),
      ]),
      "",
      rule('[data-theme="dark"]', [
        ...colorVars(tokens.dark),
        ...chipVars(tokens.chipDark),
        ...streamVars(tokens, true),
      ]),
      "",
      // :root cannot be re-asserted inside a dark subtree, so light needs its own pin for side-by-side themes.
      rule('[data-theme="light"]', [
        ...colorVars(tokens.color),
        ...chipVars(tokens.chip),
        ...streamVars(tokens, false),
      ]),
      "",
      rule("*, *::before, *::after", ["box-sizing: border-box;"]),
      rule("*", ["margin: 0;", "padding: 0;"]),
      rule("html", ["background: var(--ward-color-bg);"]),
      rule("body", ["min-width: 0;", "background: var(--ward-color-bg);", "color: var(--ward-color-text);", "font: var(--ward-type-body);"]),
      rule("button, input, select, textarea", ["font: inherit;", "color: inherit;", "border: none;"]),
      rule("button", ["background: none;", "cursor: pointer;", "text-align: left;"]),
      rule("fieldset", ["border: none;", "min-inline-size: 0;"]),
      rule("ul, ol", ["list-style: none;"]),
      rule("img, svg", ["display: block;"]),
      "",
      rule(":focus-visible", [
        "outline: var(--ward-border) solid var(--ward-color-blue);",
        "outline-offset: 2px;",
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
      rule("@keyframes ward-flash", ["from { border-color: var(--ward-flash-colour, var(--ward-color-blue)); }"]),
      rule(".ward-border-flash", ["animation: ward-flash var(--ward-motion-flash) 1;"]),
      "",
      rule("@media (prefers-reduced-motion: reduce)", ["*, *::before, *::after { animation: none !important; transition: none !important; }"]),
      "",
    ])
  );
}

function quote(s) {
  return `'${s}'`;
}

const MOTION_KEYS = ["fast", "flash", "reveal", "tick", "patience"];

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
    "",
    "export const v = {",
  ];
  lines.push("  color: {", ...Object.keys(tokens.color).map((k) => `    ${k}: 'var(--ward-color-${k})',`), "  },");
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
    "  border: 'var(--ward-border)',",
    "  underline: 'var(--ward-underline)',",
    "  shadow: { overlay: 'var(--ward-shadow-overlay)' },",
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
