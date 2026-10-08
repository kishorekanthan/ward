/* Tabs through the A11y/FocusTargets story in a real browser, in both themes, because jsdom has neither layout nor :focus-visible.
   Each focused link or control must paint a ring on all four sides and answer clicks across a 24px band; whole-row links and linked stat cells must open from anywhere on their box. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "focus-targets.json"), "utf8"));

// Runs in the page: the focused link and its themed copy, or null once Tab has left every copy.
function readFocused() {
  const el = document.activeElement;
  const copy = el?.closest("#storybook-root > div");
  if (!copy) return null;
  if (!el.matches("a, button, input, select, textarea")) return { skip: true };
  el.scrollIntoView({ block: "center" });
  const r = el.getClientRects()[0];
  const style = getComputedStyle(el);
  const px = (value) => Number.parseFloat(value) || 0;
  const reach = px(style.outlineOffset) + px(style.outlineWidth);
  const x = r.left + r.width / 2;
  const hits = (y, at = x) => document.elementFromPoint(at, y)?.closest("a, button, input, select, textarea") === el;
  const mid = r.top + r.height / 2;
  // An underline drawn by the link itself and as wide as it; a static link would hand its ::after to an ancestor.
  const spansLink = (line, box) =>
    line.content !== "none" && line.position === "absolute" && style.position !== "static" && Math.abs(Number.parseFloat(line.width) - box.width) < 1;
  // px from the bottom of the link's text to the top of its ::after underline; null without one spanning the link.
  const underlineGap = (box) => {
    const line = getComputedStyle(el, "::after");
    if (!spansLink(line, box)) return null;
    const text = document.createRange();
    text.selectNodeContents(el);
    return Math.round((box.bottom - Number.parseFloat(line.bottom) - Number.parseFloat(line.height) - text.getBoundingClientRect().bottom) * 10) / 10;
  };
  // The browser's own focus ring also paints, so the ring must be Ward's: solid, in the theme's focus colour.
  const isWardRing = () => {
    const focus = document.createElement("span");
    focus.style.color = "var(--ward-color-focus)";
    copy.append(focus);
    const ward = style.outlineStyle === "solid" && style.outlineColor === getComputedStyle(focus).color;
    focus.remove();
    return ward;
  };
  // A select's text is every option, and a listbox trigger's is its value, so both go by their accessible name.
  const ownText = () => (el.matches('select, [aria-haspopup="listbox"]') ? "" : el.textContent.trim());
  const label = () => ownText() || el.getAttribute("aria-label") || el.labels?.[0]?.textContent.trim();
  return {
    theme: copy.dataset.theme,
    name: label(),
    focusVisible: el.matches(":focus-visible"),
    wardRing: isWardRing(),
    height: r.height,
    hit24: [mid - 11.5, mid + 11.5].every((y) => hits(y)),
    wide24: [x - 11.5, x + 11.5].every((at) => hits(mid, at)),
    underlineGap: underlineGap(r),
    box: { x: r.left, y: r.top, width: r.width, height: r.height, reach },
  };
}

// Runs in the page: elements outside the targets whose box shifts when every ward-target band is taken away.
function movedByTargets() {
  const copy = document.querySelector("#storybook-root > div");
  const others = [...copy.querySelectorAll("*")].filter((el) => !el.closest(".ward-target"));
  const boxes = () => others.map((el) => JSON.stringify(el.getBoundingClientRect()));
  const targets = [...copy.querySelectorAll(".ward-target")];
  const banded = boxes();
  targets.forEach((el) => el.classList.remove("ward-target"));
  const bare = boxes();
  targets.forEach((el) => el.classList.add("ward-target"));
  return others.filter((_, i) => banded[i] !== bare[i]).map((el) => el.tagName.toLowerCase() + (el.className ? `.${el.className}` : ""));
}

// The four bands just outside the box where the outline paints; each must change when focus leaves.
// Top and bottom bands skip the corners, so the side lines cannot stand in for a clipped edge.
function bands({ x, y, width, height, reach }) {
  const r = Math.max(reach, 1);
  return [
    { x, y: y - r, width, height: r },
    { x, y: y + height, width, height: r },
    { x: x - r, y, width: r, height },
    { x: x + width, y, width: r, height },
  ];
}

// Runs in the page, focus gone: whether the last focused control draws an edge (border or inset ring) at 3:1 on its ground (WCAG 1.4.11),
// an off switch's thumb shows at 3:1 on its track, and a form control's text reads at 4.5:1 on its own ground. A segment's boundary is its radio group's.
function restFacts() {
  const clear = (colour) => /^rgba\(.*, 0\)$/.test(colour);
  const groundOf = (at) => (at.parentElement && clear(getComputedStyle(at).backgroundColor) ? groundOf(at.parentElement) : getComputedStyle(at).backgroundColor);
  const control = window.__wardFocused.closest('[role="radiogroup"]') ?? window.__wardFocused;
  const style = getComputedStyle(control);
  const ground = groundOf(control);
  const rgb = (colour) => colour.match(/[\d.]+/g).map(Number);
  const over = (colour, on) => { const [r, g, b, a = 1] = rgb(colour); return [r, g, b].map((c, i) => a * c + (1 - a) * rgb(on)[i]); };
  const luminance = (channels) => channels.map((c) => (c / 255 <= 0.04045 ? c / 255 / 12.92 : ((c / 255 + 0.055) / 1.055) ** 2.4)).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
  const contrast = (colour, on) => { const [hi, lo] = [luminance(over(colour, on)), luminance(over(on, on))].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
  const shows = (colour, on = ground) => !clear(colour) && colour !== on && contrast(colour, on) >= 3;
  const side = (name) => Number.parseFloat(style[`border${name}Width`]) >= 1 && shows(style[`border${name}Color`]);
  const inset = style.boxShadow.match(/^(rgba?\([^)]*\)) 0px 0px 0px ([\d.]+)px inset$/);
  const edged = () => ["Top", "Right", "Bottom", "Left"].every(side) || Boolean(inset && Number.parseFloat(inset[2]) >= 1 && shows(inset[1]));
  const knob = () => (control.matches('[role="switch"][aria-checked="false"]') ? shows(getComputedStyle(control.firstElementChild).backgroundColor, style.backgroundColor) : null);
  const ink = () => (control.matches('input, select, textarea, [aria-haspopup="listbox"]') ? contrast(style.color, ground) >= 4.5 : null);
  return { edged: edged(), knob: knob(), ink: ink() };
}

const shoot = (page, clips) => Promise.all(clips.map((clip) => page.screenshot({ clip })));

async function ringAndRestEdge(page, box) {
  const clips = bands(box);
  const focused = await shoot(page, clips);
  await page.evaluate(() => {
    window.__wardFocused = document.activeElement;
    document.activeElement.blur();
  });
  const blurred = await shoot(page, clips);
  const rest = await page.evaluate(restFacts);
  await page.evaluate(() => window.__wardFocused.focus());
  return { ring: focused.every((shot, i) => !shot.equals(blurred[i])), ...rest };
}

// Room for both themed copies of the story; too low a cap silently cuts the dark copy short.
const MAX_TABS = 80;

async function tabThrough(page) {
  const seen = [];
  for (let step = 0; step < MAX_TABS; step++) {
    await page.keyboard.press("Tab");
    const got = await page.evaluate(readFocused);
    if (got === null) {
      if (seen.length) break;
      continue;
    }
    if (got.skip) continue;
    const { ring, edged, knob, ink } = await ringAndRestEdge(page, got.box);
    seen.push({ theme: got.theme, name: got.name, focusVisible: got.focusVisible, wardRing: got.wardRing, ring, edged, knob, ink, tall: got.height >= 24, hit24: got.hit24, wide24: got.wide24, underlineGap: got.underlineGap, height: got.height });
  }
  return seen;
}

// Runs in the page: each whole-row link in the first copy, the points a click must open it from, and what covers them.
function rowLinkBoxes() {
  window.scrollTo(0, 0);
  const copy = document.querySelector("#storybook-root > div");
  const centre = (r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  return [...copy.querySelectorAll("[data-ward-rowlink]")].map((box) => {
    const r = box.getBoundingClientRect();
    const anchors = box.querySelectorAll("a");
    const grid = [r.left + 3, r.left + r.width / 2, r.right - 3].flatMap((x) => [r.top + 3, r.top + r.height / 2, r.bottom - 3].map((y) => ({ x, y })));
    const hinted = [...box.querySelectorAll("[data-raised]")];
    const raised = hinted.map((el) => centre(el.getBoundingClientRect()));
    const onTop = hinted.filter((el, i) => document.elementFromPoint(raised[i].x, raised[i].y)?.closest("[data-raised]") === el);
    const covered = (p) => {
      const hit = document.elementFromPoint(p.x, p.y)?.closest("a, [data-raised]");
      return hit === anchors[0] || (hit?.matches("[data-raised]") && box.contains(hit));
    };
    const underlined = getComputedStyle(anchors[0]).textDecorationLine.includes("underline");
    return { name: anchors[0]?.textContent.trim(), href: anchors[0]?.getAttribute("href"), oneAnchor: anchors.length === 1, covered: grid.every(covered), tall: r.height >= 24, touch: r.height >= 44, raised: onTop.length, underlined, ground: getComputedStyle(box).backgroundColor, centre: centre(r), points: [...grid, ...raised] };
  });
}

// Real clicks at every point; a capturing listener records the link each one opens and keeps the page where it is.
async function clickAcross(page, box) {
  const opened = [];
  for (const { x, y } of box.points) {
    await page.evaluate(() => { window.__wardOpened = []; });
    await page.mouse.click(x, y);
    opened.push(await page.evaluate(() => window.__wardOpened));
  }
  return opened.every((links) => links.length === 1 && links[0] === box.href);
}

// Hovering the row's centre must change its ground, so the whole row reads as one target.
async function hoverShade(page, box) {
  await page.mouse.move(box.centre.x, box.centre.y);
  const ground = await page.evaluate(({ x, y }) => getComputedStyle(document.elementFromPoint(x, y).closest("[data-ward-rowlink]")).backgroundColor, box.centre);
  return ground !== box.ground;
}

async function rowLinks(page) {
  await page.evaluate(() => document.addEventListener("click", (e) => {
    const a = e.target.closest?.("a");
    if (a) { window.__wardOpened.push(a.getAttribute("href")); e.preventDefault(); }
  }, true));
  const boxes = await page.evaluate(rowLinkBoxes);
  const out = [];
  await page.mouse.move(0, 0);
  for (const box of boxes) {
    const facts = { name: box.name, oneAnchor: box.oneAnchor, covered: box.covered, tall: box.tall, touch: box.touch, raised: box.raised, underlined: box.underlined };
    out.push({ ...facts, hoverShade: await hoverShade(page, box), wholeHit: await clickAcross(page, box) });
  }
  return out;
}

function targetDiffs(target, found, label) {
  return Object.entries(target)
    .filter(([fact, value]) => found?.[fact] !== value)
    .map(([fact, value]) => `${label}${target.name}.${fact}: got ${JSON.stringify(found?.[fact])}, want ${JSON.stringify(value)}`);
}

export function diffFacts(want, got, label) {
  return want.flatMap((target) => targetDiffs(target, got.find((t) => t.name === target.name), label));
}

async function openStory(browser, base, { viewport, story }) {
  const page = await browser.newPage({ viewport });
  await page.goto(`${base}/iframe.html?viewMode=story&id=${story}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.getElementById("storybook-root")?.children.length > 0, null, { timeout: 8000 });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

// Tab order and facts per theme, each diff prefixed with the page's label.
async function tabDiffs(page, targets, label) {
  const seen = await tabThrough(page);
  const want = targets.map((t) => t.name);
  return golden.themes.flatMap((theme) => {
    const inTheme = seen.filter((t) => t.theme === theme);
    const names = inTheme.map((t) => t.name);
    const order = JSON.stringify(names) === JSON.stringify(want) ? [] : [`${label}${theme} tab order: got ${JSON.stringify(names)}, want ${JSON.stringify(want)}`];
    return [...order, ...diffFacts(targets, inTheme, `${label}${theme} `)];
  });
}

// Returns every fact that differs from the golden, as "name.fact: got X, want Y"; the phone page holds controls only shown below 768px.
export async function sweepFocusTargets() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await launchChromium();
  const diffs = [];
  try {
    const page = await openStory(browser, base, golden);
    const moved = await page.evaluate(movedByTargets);
    if (moved.length) diffs.push(`layout: ${moved.length} element(s) move with the 24px bands, want 0 (${moved.slice(0, 3).join(", ")})`);
    diffs.push(...(await tabDiffs(page, golden.targets, "")));
    diffs.push(...diffFacts(golden.rowLinks, await rowLinks(page), "row link "));
    diffs.push(...(await tabDiffs(await openStory(browser, base, golden.phone), golden.phone.targets, "phone ")));
  } finally {
    await browser.close();
    server.close();
  }
  return diffs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepFocusTargets();
  console.log(diffs.length ? diffs.join("\n") : "focus targets: match golden");
  process.exitCode = diffs.length ? 1 : 0;
}
