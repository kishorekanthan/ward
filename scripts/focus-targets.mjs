/* Tabs through the A11y/FocusTargets story in a real browser, in both themes, because jsdom has neither layout nor :focus-visible.
   Each focused link must paint a ring on all four sides and answer clicks across a 24px band; whole-row links and linked stat cells must open from anywhere on their box. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "focus-targets.json"), "utf8"));

// Runs in the page: the focused link and its themed copy, or null once Tab has left every copy.
function readFocused() {
  const el = document.activeElement;
  const copy = el?.closest("#storybook-root > div");
  if (!copy || !el.matches("a, button")) return null;
  el.scrollIntoView({ block: "center" });
  const r = el.getClientRects()[0];
  const style = getComputedStyle(el);
  const reach = (Number.parseFloat(style.outlineOffset) || 0) + (Number.parseFloat(style.outlineWidth) || 0);
  const x = r.left + r.width / 2;
  const hits = (y) => document.elementFromPoint(x, y)?.closest("a, button") === el;
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
  // The browser's own focus ring also paints, so the ring must be Ward's: solid, in the theme's blue.
  const blue = document.createElement("span");
  blue.style.color = "var(--ward-color-blue)";
  copy.append(blue);
  const wardRing = style.outlineStyle === "solid" && style.outlineColor === getComputedStyle(blue).color;
  blue.remove();
  return {
    theme: copy.dataset.theme,
    name: el.textContent.trim(),
    focusVisible: el.matches(":focus-visible"),
    wardRing,
    height: r.height,
    hit24: hits(mid - 11.5) && hits(mid + 11.5),
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

// Runs in the page, focus gone: whether the last focused control draws an edge (border or inset ring) in a colour other than its ground.
function restEdge() {
  const clear = (colour) => /^rgba\(.*, 0\)$/.test(colour);
  const groundOf = (at) => (at.parentElement && clear(getComputedStyle(at).backgroundColor) ? groundOf(at.parentElement) : getComputedStyle(at).backgroundColor);
  const style = getComputedStyle(window.__wardFocused);
  const ground = groundOf(window.__wardFocused);
  const shows = (colour) => !clear(colour) && colour !== ground;
  const side = (name) => Number.parseFloat(style[`border${name}Width`]) >= 1 && shows(style[`border${name}Color`]);
  const inset = style.boxShadow.match(/^(rgba?\([^)]*\)) 0px 0px 0px ([\d.]+)px inset$/);
  return ["Top", "Right", "Bottom", "Left"].every(side) || Boolean(inset && Number.parseFloat(inset[2]) >= 1 && shows(inset[1]));
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
  const edged = await page.evaluate(restEdge);
  await page.evaluate(() => window.__wardFocused.focus());
  return { ring: focused.every((shot, i) => !shot.equals(blurred[i])), edged };
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
    const { ring, edged } = await ringAndRestEdge(page, got.box);
    seen.push({ theme: got.theme, name: got.name, focusVisible: got.focusVisible, wardRing: got.wardRing, ring, edged, tall: got.height >= 24, hit24: got.hit24, underlineGap: got.underlineGap, height: got.height });
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

function diffFacts(want, got, label) {
  const diffs = [];
  for (const target of want) {
    const found = got.find((t) => t.name === target.name);
    for (const [fact, value] of Object.entries(target)) {
      if (found?.[fact] !== value) diffs.push(`${label}${target.name}.${fact}: got ${JSON.stringify(found?.[fact])}, want ${JSON.stringify(value)}`);
    }
  }
  return diffs;
}

// Returns every fact that differs from the golden, as "name.fact: got X, want Y".
export async function sweepFocusTargets() {
  ensureBuild();
  const { chromium } = await import("playwright");
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const diffs = [];
  try {
    const page = await browser.newPage({ viewport: golden.viewport });
    await page.goto(`${base}/iframe.html?viewMode=story&id=${golden.story}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.getElementById("storybook-root")?.children.length > 0, null, { timeout: 8000 });
    await page.evaluate(() => document.fonts.ready);
    const moved = await page.evaluate(movedByTargets);
    if (moved.length) diffs.push(`layout: ${moved.length} element(s) move with the 24px bands, want 0 (${moved.slice(0, 3).join(", ")})`);
    const seen = await tabThrough(page);
    const want = golden.targets.map((t) => t.name);
    for (const theme of golden.themes) {
      const inTheme = seen.filter((t) => t.theme === theme);
      const names = inTheme.map((t) => t.name);
      if (JSON.stringify(names) !== JSON.stringify(want)) diffs.push(`${theme} tab order: got ${JSON.stringify(names)}, want ${JSON.stringify(want)}`);
      diffs.push(...diffFacts(golden.targets, inTheme, `${theme} `));
    }
    diffs.push(...diffFacts(golden.rowLinks, await rowLinks(page), "row link "));
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
