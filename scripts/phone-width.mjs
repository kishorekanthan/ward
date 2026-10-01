/* Renders the phone-width stories at 375px in a real browser and reads their geometry, because jsdom has no layout.
   Each probe returns the facts src/goldens/phone-width.json records; check.mjs compares them. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "phone-width.json"), "utf8"));

// Runs in the page: the first themed copy only, so each fact is read once.
function probeTabs() {
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
  const masked = strip.hasAttribute("data-fade-end") && /gradient/.test(getComputedStyle(strip).maskImage);
  const activeInView = inView(active);
  strip.scrollLeft = strip.scrollWidth;
  return {
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

// One chip fits beside a short crumb, so only that story shows chips still take their own line.
const PROBES = { tabs: probeTabs, pageHeader: probePageHeader, pageHeaderOneChip: probePageHeader, statStrip: probeStatStrip };

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
