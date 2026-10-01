/* Renders the phone-width stories at 375px in a real browser and reads their geometry, because jsdom has no layout.
   Each probe returns the facts src/goldens/phone-width.json records; check.mjs compares them. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "phone-width.json"), "utf8"));

// Runs in the page: the first themed copy only, so each fact is read once.
async function probeTabs() {
  const strip = document.querySelector('#storybook-root [role="tablist"]');
  const tabs = Array.from(strip.querySelectorAll('[role="tab"]'));
  const active = tabs.find((t) => t.getAttribute("aria-selected") === "true");
  const box = strip.getBoundingClientRect();
  const inView = (el) => {
    const r = el.getBoundingClientRect();
    return r.left >= box.left - 0.5 && r.right <= box.right + 0.5 && r.right <= innerWidth;
  };
  // A fade is as wide as the strip's scroll-padding; a tab under a live fade is half-hidden.
  const fade = Number.parseFloat(getComputedStyle(strip).scrollPaddingInlineStart) || 0;
  const r = active.getBoundingClientRect();
  const clearOfFades =
    fade > 0 &&
    (!strip.hasAttribute("data-fade-start") || r.left >= box.left + fade - 0.5) &&
    (!strip.hasAttribute("data-fade-end") || r.right <= box.right - fade + 0.5);
  // Mid-scroll both fades are live: the mask has a clear stop at each edge.
  const clearStops = getComputedStyle(strip).maskImage.match(/transparent|rgba\(0, 0, 0, 0\)/g) ?? [];
  const masked = strip.hasAttribute("data-fade-start") && strip.hasAttribute("data-fade-end") && clearStops.length === 2;
  const activeInView = inView(active);
  // Each lone fade has its own mask rule, so read the mask at both ends of the scroll.
  const settle = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const loneFade = (on, off) => strip.hasAttribute(on) && !strip.hasAttribute(off) && /gradient/.test(getComputedStyle(strip).maskImage);
  strip.scrollLeft = 0;
  await settle();
  const endFadeMaskedAtStart = loneFade("data-fade-end", "data-fade-start");
  strip.scrollLeft = strip.scrollWidth;
  await settle();
  const startFadeMaskedAtEnd = loneFade("data-fade-start", "data-fade-end");
  return {
    endFadeMaskedAtStart,
    startFadeMaskedAtEnd,
    stripScrolls: strip.scrollWidth > strip.clientWidth && getComputedStyle(strip).overflowX === "auto",
    activeTabInView: activeInView,
    activeTabClearOfFades: clearOfFades,
    fadesMasked: masked,
    lastTabReachedByScroll: inView(tabs[tabs.length - 1]),
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

function probePageHeader() {
  const header = document.querySelector("#storybook-root header");
  const crumb = header.querySelector("nav, ol").getBoundingClientRect();
  const chipBoxes = Array.from(header.querySelectorAll("[data-ward-chip], .ward-chip")).map((c) => ({ c, r: c.getBoundingClientRect() }));
  const title = header.querySelector("h1").getBoundingClientRect();
  const whole = ({ c, r }) => c.scrollWidth <= c.clientWidth + 0.5 && r.right <= header.getBoundingClientRect().right + 0.5;
  return {
    chipsBelowCrumb: chipBoxes.length > 0 && chipBoxes.every(({ r }) => r.top >= crumb.bottom - 0.5),
    chipLines: new Set(chipBoxes.map(({ r }) => Math.round(r.top))).size,
    titleBelowChips: chipBoxes.every(({ r }) => title.top >= r.bottom - 0.5),
    everyChipWhole: chipBoxes.every(whole),
    chipFontSize: chipBoxes.length ? getComputedStyle(chipBoxes[0].c).fontSize : "",
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

function probeStatStrip([text, longText]) {
  const read = (wanted) => {
    const label = Array.from(document.querySelectorAll("#storybook-root dt")).find((d) => d.textContent === wanted);
    const lineHeight = Number.parseFloat(getComputedStyle(label).lineHeight);
    const lines = Math.round(label.getBoundingClientRect().height / lineHeight);
    // Half a line of slack: a 10px line box lets glyph ink overflow by a pixel, which is not a hidden line.
    const clipped = label.scrollHeight > label.clientHeight + lineHeight / 2 || label.scrollWidth > label.clientWidth + 0.5;
    return [label.textContent, lines, clipped];
  };
  const [label, labelLines, labelClipped] = read(text);
  const [longLabel, longLabelLines, longLabelClipped] = read(longText);
  const pageScrollsSideways = document.documentElement.scrollWidth > innerWidth;
  return { label, labelLines, labelClipped, longLabel, longLabelLines, longLabelClipped, pageScrollsSideways };
}

// innerText applies text-transform, so it reads the kicker as a viewer sees it.
function probeKicker() {
  const head = document.querySelector('#storybook-root [data-kind="key"] h2');
  const style = getComputedStyle(head);
  return {
    seenText: head.innerText,
    fontSize: style.fontSize,
    family: style.fontFamily.split(",")[0].trim(),
    letterSpacing: style.letterSpacing,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// Six stage columns at 375px: the grid scrolls, not the page; each lone fade, and both mid-scroll, mask their edges.
async function probeStageGrid() {
  const grid = document.querySelector("#storybook-root [data-ward-stage-grid]");
  const settle = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const loneFade = (on, off) => grid.hasAttribute(on) && !grid.hasAttribute(off) && /gradient/.test(getComputedStyle(grid).maskImage);
  grid.scrollLeft = 0;
  await settle();
  const endFadeMaskedAtStart = loneFade("data-fade-end", "data-fade-start");
  grid.scrollLeft = (grid.scrollWidth - grid.clientWidth) / 2;
  await settle();
  const clearStops = getComputedStyle(grid).maskImage.match(/transparent|rgba\(0, 0, 0, 0\)/g) ?? [];
  const bothFadesMaskedMidScroll = grid.hasAttribute("data-fade-start") && grid.hasAttribute("data-fade-end") && clearStops.length === 2;
  grid.scrollLeft = grid.scrollWidth;
  await settle();
  const startFadeMaskedAtEnd = loneFade("data-fade-start", "data-fade-end");
  return {
    columnWidth: Math.round(grid.firstElementChild.getBoundingClientRect().width),
    gridScrolls: grid.scrollWidth > grid.clientWidth && getComputedStyle(grid).overflowX === "auto",
    endFadeMaskedAtStart,
    bothFadesMaskedMidScroll,
    startFadeMaskedAtEnd,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// Presses the Settings toggle, then reads where the tools row lands.
async function probeTopBar() {
  const header = document.querySelector("#storybook-root header");
  const toggle = header.querySelector("button[aria-controls]");
  const panel = document.getElementById(toggle.getAttribute("aria-controls"));
  const inView = (r) => r.width > 0 && r.left >= -0.5 && r.right <= innerWidth + 0.5;
  const panelHiddenBeforePress = panel.getBoundingClientRect().height === 0;
  toggle.click();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const box = panel.getBoundingClientRect();
  return {
    toggleInView: inView(toggle.getBoundingClientRect()),
    panelHiddenBeforePress,
    panelBelowBar: box.top >= header.getBoundingClientRect().bottom - 0.5,
    panelInView: inView(box) && Array.from(panel.querySelectorAll("button")).every((b) => inView(b.getBoundingClientRect())),
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// The Empty story: the event list keeps six console lines of height, and the foot has no jump button to clip the idle line.
function probeConsole() {
  const list = document.querySelector("#storybook-root ol");
  const style = getComputedStyle(list);
  const line = Number.parseFloat(style.lineHeight);
  const gap = Number.parseFloat(style.rowGap) || 0;
  const foot = list.nextElementSibling;
  const idle = foot.children[1];
  return {
    listLines: Math.round((list.getBoundingClientRect().height + gap) / (line + gap)),
    jumpShown: foot.querySelector("button") !== null,
    idleClipped: idle.scrollWidth > idle.clientWidth + 0.5,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// One chip fits beside a short crumb, so only that story shows chips still take their own line.
const PROBES = { tabs: probeTabs, pageHeader: probePageHeader, pageHeaderOneChip: probePageHeader, statStrip: probeStatStrip, stageGrid: probeStageGrid, topBar: probeTopBar, kicker: probeKicker, console: probeConsole };

async function measure(page, base, key) {
  const { story, label, longLabel } = golden[key];
  await page.goto(`${base}/iframe.html?viewMode=story&id=${story}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.getElementById("storybook-root")?.children.length > 0, null, { timeout: 8000 });
  await page.evaluate(() => document.fonts.ready);
  return { story, ...(await page.evaluate(PROBES[key], [label, longLabel])) };
}

// Returns every fact that differs from the golden, as "key.fact: got X, want Y".
export async function sweepPhoneWidth() {
  ensureBuild();
  const { chromium } = await import("playwright");
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const diffs = [];
  try {
    const page = await browser.newPage({ viewport: golden.viewport });
    for (const key of Object.keys(PROBES)) {
      const got = await measure(page, base, key);
      for (const [fact, want] of Object.entries(golden[key])) {
        if (got[fact] !== want) diffs.push(`${key}.${fact}: got ${JSON.stringify(got[fact])}, want ${JSON.stringify(want)}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  return diffs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepPhoneWidth();
  console.log(diffs.length ? diffs.join("\n") : "phone width: matches golden");
  process.exitCode = diffs.length ? 1 : 0;
}
