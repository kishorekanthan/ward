/* Walks every story in a real browser, because jsdom has no :hover, :focus-visible or cascade (#191).
   Fails a link underlined at rest or on hover, a clickable thing that reads as plain text, a link with no hover ground, and a control with no unclipped ring under keyboard focus. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, parseColour, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const VIEWPORT = { width: 1440, height: 900 };
const PAGES = 4;
// Both themed copies of the longest story fit well inside this; a focus trap ends the walk sooner.
const MAX_TABS = 400;

// A colour paints when it is not clear and differs from the ground it sits on.
export function shows(colour, ground) {
  const c = parseColour(colour);
  return colour !== "transparent" && Boolean(c) && c.a > 0 && colour !== ground;
}

const SHADOWS = /,(?![^(]*\))/;

const COLOUR = /rgba?\([^)]*\)/;

function shadowReach(one) {
  const [x = 0, y = 0, , spread = 0] = (one.replace(COLOUR, "").match(/-?[\d.]+px/g) ?? []).map(Number.parseFloat);
  return Math.max(Math.abs(x), Math.abs(y), spread);
}

// An inset box-shadow with a spread or offset of at least 1px draws an edge, as Ward's borders do.
const shadowEdge = (one, ground) => one.includes("inset") && shadowReach(one) >= 1 && shows(one.match(COLOUR)?.[0], ground);

function insetEdge(shadow, ground) {
  return shadow.split(SHADOWS).some((one) => shadowEdge(one, ground));
}

export function edged(box) {
  return box.sides.some((side) => side.w >= 1 && shows(side.c, box.ground)) || insetEdge(box.shadow, box.ground);
}

export function filled(box) {
  return shows(box.bg, box.ground) || box.image !== "none";
}

const framed = (box) => Boolean(box) && (edged(box) || filled(box));
const marked = (f) => framed(f.box) || framed(f.frame) || f.color === f.accent || f.color !== f.parentColor;
// A listbox trigger (Ward Select) owes the same frame and chevron as the native select it replaces.
const disclosure = (f) => f.tag === "select" || f.tag === "summary" || f.popup === true;

const CONTROL_RULES = [
  [(f) => !marked(f), () => "reads as plain text: no border, no background, no accent and its parent's colour"],
  [(f) => f.deco.length > 0, (f) => `underlined at rest (${f.deco.join(", ")})`],
  [(f) => disclosure(f) && !framed(f.box), () => "no control border or fill"],
  [(f) => disclosure(f) && !f.chevron, () => "no chevron"],
];

const HOVER_RULES = [
  [(h) => h.deco.length > 0, (h) => `underlined on hover (${h.deco.join(", ")})`],
  [(h) => !shows(h.own, h.ground) && h.rest.every((c, i) => c === h.hover[i]), () => "no hover ground"],
  [(h) => h.cursor !== "pointer", (h) => `cursor ${h.cursor} on hover`],
];

const ringShows = (f) => f.outline.style !== "none" && f.outline.width >= 1 && shows(f.outline.color, f.ground);

const FOCUS_RULES = [
  [(f) => !f.focusVisible, () => "not :focus-visible under keyboard focus"],
  [(f) => !ringShows(f), () => "no focus ring"],
  [(f) => Boolean(f.clippedBy), (f) => `focus ring clipped by ${f.clippedBy}`],
];

const judge = (rules) => (facts) => rules.filter(([fails]) => fails(facts)).map(([, reason]) => reason(facts));

export const judgeControl = judge(CONTROL_RULES);
export const judgeHover = judge(HOVER_RULES);
export const judgeFocus = judge(FOCUS_RULES);

// Runs in the page once per load: the helpers every later evaluate reads from window.__wardAudit.
function install() {
  const clear = (c) => c === "transparent" || /^rgba\(.*, 0\)$/.test(c);
  const ground = (el) => {
    for (let n = el; n; n = n.parentElement) {
      const bg = getComputedStyle(n).backgroundColor;
      if (!clear(bg)) return bg;
    }
    return "rgb(255, 255, 255)";
  };
  const box = (el) => {
    const cs = getComputedStyle(el);
    const sides = ["Top", "Right", "Bottom", "Left"].map((s) => ({ w: Number.parseFloat(cs[`border${s}Width`]), c: cs[`border${s}Color`] }));
    return { sides, shadow: cs.boxShadow, bg: cs.backgroundColor, image: cs.backgroundImage, ground: ground(el.parentElement) };
  };
  const near = (a, b) => ["left", "top", "right", "bottom"].every((k) => Math.abs(a[k] - b[k]) < 1);
  // A whole-row link, or a hit control stretched over its card, is framed by the row or card.
  const frameOf = (el) => {
    const row = el.closest("[data-ward-rowlink]");
    if (row) return row;
    const stretched = getComputedStyle(el).position === "absolute" && near(el.getBoundingClientRect(), el.parentElement.getBoundingClientRect());
    return stretched ? el.parentElement : null;
  };
  const accent = (el) => {
    const probe = document.createElement("span");
    probe.style.color = "var(--ward-color-link)";
    el.parentElement.append(probe);
    const colour = getComputedStyle(probe).color;
    probe.remove();
    return colour;
  };
  const deco = (el) => [el, ...el.querySelectorAll("*")].map((n) => getComputedStyle(n).textDecorationLine).filter((d) => d !== "none");
  const pseudoMark = (el) => ["::before", "::after"].some((p) => getComputedStyle(el, p).content !== "none");
  const chevron = (el) => getComputedStyle(el).backgroundImage !== "none" || pseudoMark(el);
  const hidden = (el, r) => r.width < 2 || r.height < 2 || r.right <= 0 || r.bottom <= 0 || Boolean(el.closest('[aria-hidden="true"], [inert]'));
  const visible = (el) => el.checkVisibility({ visibilityProperty: true, opacityProperty: true }) && !hidden(el, el.getBoundingClientRect());
  const theme = (el) => el.closest("[data-theme]")?.dataset.theme ?? "light";
  const name = (el) => {
    const text = (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
    const cls = typeof el.className === "string" && el.className ? `.${el.className.split(" ")[0]}` : "";
    return `${el.tagName.toLowerCase()}${cls} "${text}"`;
  };
  // The ring reaches outlineOffset + outlineWidth past the box; an ancestor that clips an axis must hold that reach.
  const spills = (lo, hi, start, size) => lo < start - 0.5 || hi > start + size + 0.5;
  const outside = (ring, a, cs) => {
    const r = a.getBoundingClientRect();
    const x = cs.overflowX !== "visible" && spills(ring.left, ring.right, r.left + a.clientLeft, a.clientWidth);
    const y = cs.overflowY !== "visible" && spills(ring.top, ring.bottom, r.top + a.clientTop, a.clientHeight);
    return x || y;
  };
  const clipper = (el) => {
    const cs = getComputedStyle(el);
    const reach = Math.max(0, Number.parseFloat(cs.outlineOffset) + Number.parseFloat(cs.outlineWidth));
    const r = el.getBoundingClientRect();
    const ring = { left: r.left - reach, right: r.right + reach, top: r.top - reach, bottom: r.bottom + reach };
    for (let a = el.parentElement; a && a.id !== "storybook-root"; a = a.parentElement) {
      if (outside(ring, a, getComputedStyle(a))) return name(a);
    }
    return null;
  };
  const chain = (el) => {
    const stop = frameOf(el);
    const out = [el];
    for (let n = el; stop && n !== stop; n = n.parentElement) out.push(n.parentElement);
    return out;
  };
  window.__wardAudit = { ground, box, frameOf, accent, deco, chevron, visible, theme, name, clipper, chain };
}

// Runs in the page: every visible control's resting facts, and how many links and stretched hits get a hover probe.
function restFacts() {
  const W = window.__wardAudit;
  const host = document.getElementById("storybook-root");
  const controls = [...host.querySelectorAll('a[href], button, select, summary, [role="button"]')].filter(W.visible);
  const facts = controls.map((el) => {
    const frame = W.frameOf(el);
    return {
      tag: el.tagName.toLowerCase(),
      popup: el.getAttribute("aria-haspopup") === "listbox",
      name: W.name(el),
      theme: W.theme(el),
      box: W.box(el),
      frame: frame && W.box(frame),
      color: getComputedStyle(el).color,
      parentColor: getComputedStyle(el.parentElement).color,
      accent: W.accent(el),
      deco: el.matches("a") ? W.deco(el) : [],
      chevron: W.chevron(el),
    };
  });
  window.__wardHover = controls.filter((el) => el.matches("a") || (W.frameOf(el) && !el.closest("[data-ward-rowlink]")));
  return { facts, hovers: window.__wardHover.length };
}

// Runs in the page, mouse away: brings target i into view and keeps its resting grounds; null when something covers it.
function prepareHover(i) {
  const W = window.__wardAudit;
  const el = window.__wardHover[i];
  el.scrollIntoView({ block: "center", inline: "nearest" });
  const r = el.getBoundingClientRect();
  const x = r.left + Math.min(r.width / 2, 8);
  const y = r.top + r.height / 2;
  const hit = document.elementFromPoint(x, y);
  const frame = W.frameOf(el);
  if (!hit || !(el.contains(hit) || frame?.contains(hit))) return null;
  window.__wardRest = W.chain(el).map((n) => getComputedStyle(n).backgroundColor);
  return { x, y };
}

// Runs in the page, mouse over target i at (x, y).
function hoverFacts({ i, x, y }) {
  const W = window.__wardAudit;
  const el = window.__wardHover[i];
  return {
    name: W.name(el),
    theme: W.theme(el),
    deco: el.matches("a") ? W.deco(el) : [],
    own: getComputedStyle(el).backgroundColor,
    ground: W.ground(el.parentElement),
    rest: window.__wardRest,
    hover: W.chain(el).map((n) => getComputedStyle(n).backgroundColor),
    cursor: getComputedStyle(document.elementFromPoint(x, y)).cursor,
  };
}

// Runs in the page after a Tab: the focused control's ring, or null once focus has left the story, or repeat on a trap's wrap.
function focusFacts() {
  const W = window.__wardAudit;
  const el = document.activeElement;
  if (!el || !document.getElementById("storybook-root").contains(el)) return null;
  if (el.dataset.wardAuditSeen) return { repeat: true };
  el.dataset.wardAuditSeen = "1";
  // Focus can leave a control half outside a scroller; scroll it whole first, so only a missing gutter counts as a clip.
  el.scrollIntoView({ block: "nearest", inline: "nearest" });
  const cs = getComputedStyle(el);
  return {
    name: W.name(el),
    theme: W.theme(el),
    focusVisible: el.matches(":focus-visible"),
    outline: { style: cs.outlineStyle, width: Number.parseFloat(cs.outlineWidth), color: cs.outlineColor },
    ground: W.ground(el.parentElement),
    clippedBy: W.clipper(el),
  };
}

const findings = (id, judgeFn, list) => list.flatMap((f) => judgeFn(f).map((why) => `${id} ${f.theme} ${f.name}: ${why}`));

async function hoverAll(page, id, count) {
  const out = [];
  for (let i = 0; i < count; i++) {
    await page.mouse.move(0, 0);
    const at = await page.evaluate(prepareHover, i);
    if (!at) continue;
    await page.mouse.move(at.x, at.y);
    out.push(await page.evaluate(hoverFacts, { i, ...at }));
  }
  return findings(id, judgeHover, out);
}

// Focus has left the story after reaching something, or a focus trap has wrapped to a control already seen.
const tabbedOut = (got, seen) => (got === null && seen > 0) || Boolean(got?.repeat);

async function tabAll(page, id) {
  const out = [];
  for (let step = 0; step < MAX_TABS; step++) {
    await page.keyboard.press("Tab");
    const got = await page.evaluate(focusFacts);
    if (tabbedOut(got, out.length)) break;
    if (got) out.push(got);
  }
  return { count: out.length, failures: findings(id, judgeFocus, out) };
}

async function auditStory(page, base, id) {
  await page.goto(`${base}/iframe.html?viewMode=story&id=${id}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.getElementById("storybook-root")?.children.length > 0, null, { timeout: 8000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(install);
  const rest = await page.evaluate(restFacts);
  const hovers = await hoverAll(page, id, rest.hovers);
  const focus = await tabAll(page, id);
  return { controls: rest.facts.length, hovered: rest.hovers, focused: focus.count, failures: [...findings(id, judgeControl, rest.facts), ...hovers, ...focus.failures] };
}

function storyIds(filter) {
  const index = JSON.parse(readFileSync(join(root, "storybook-static", "index.json"), "utf8"));
  return Object.values(index.entries)
    .filter((e) => e.type === "story" && e.id.includes(filter))
    .map((e) => e.id);
}

async function auditQueue(context, base, queue, out) {
  const page = await context.newPage();
  for (let id = queue.shift(); id; id = queue.shift()) {
    const got = await auditStory(page, base, id).catch((e) => ({ controls: 0, hovered: 0, focused: 0, failures: [`${id}: ${String(e.message).split("\n")[0]}`] }));
    for (const key of ["controls", "hovered", "focused"]) out[key] += got[key];
    out.failures.push(...got.failures);
  }
  await page.close();
}

// Reduced motion stops every transition, so a hover reads its end state at once.
export async function sweepAffordance(filter = "") {
  ensureBuild();
  const ids = storyIds(filter);
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const out = { stories: ids.length, controls: 0, hovered: 0, focused: 0, failures: [] };
  const browser = await launchChromium();
  try {
    const context = await browser.newContext({ viewport: VIEWPORT, reducedMotion: "reduce" });
    const queue = ids.slice();
    await Promise.all(Array.from({ length: PAGES }, () => auditQueue(context, base, queue, out)));
  } finally {
    await browser.close();
    server.close();
  }
  return out;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const r = await sweepAffordance(process.argv[2] ?? "");
  console.log(r.failures.join("\n"));
  console.log(`${r.stories} stories, ${r.controls} controls, ${r.hovered} hovered, ${r.focused} focused, ${r.failures.length} failure(s)`);
  process.exitCode = r.failures.length ? 1 : 0;
}
