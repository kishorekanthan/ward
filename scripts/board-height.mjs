/* Renders the full-page board stories in a real browser and reads whether the page or the lanes scroll, because jsdom has no layout.
   Each case returns the facts src/goldens/board-height.json records; check.mjs compares them. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "board-height.json"), "utf8"));

// Runs in the page: the tallest lane is the one holding 30 cards; at the end, scrolls the lanes fully right and reads the fade again.
async function probeBoard() {
  const region = document.querySelector("[data-ward-board-scroller]");
  const lanes = Array.from(region.children);
  const tallest = lanes.reduce((a, b) => (b.scrollHeight > a.scrollHeight ? b : a));
  const count = document.querySelector("[data-ward-board-lane-count]");
  const fadeMasked = () => region.hasAttribute("data-fade-end") && /gradient/.test(getComputedStyle(region).maskImage);
  const facts = {
    pageHeightIsViewport: document.scrollingElement.scrollHeight === innerHeight,
    longLaneScrolls: tallest.scrollHeight > tallest.clientHeight && getComputedStyle(tallest).overflowY === "auto",
    columnSelectShown: document.querySelector("#storybook-root select") !== null,
    laneCount: count && !count.hidden ? count.textContent : null,
    fadeEndAtStart: fadeMasked(),
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
  region.scrollLeft = region.scrollWidth;
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  return { ...facts, fadeEndAtEnd: fadeMasked() };
}

async function measure(browser, base, { story, viewport }) {
  const page = await browser.newPage({ viewport });
  try {
    await page.goto(`${base}/iframe.html?viewMode=story&id=${story}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.querySelector("[data-ward-board-scroller]") !== null, null, { timeout: 8000 });
    await page.evaluate(() => document.fonts.ready);
    return await page.evaluate(probeBoard);
  } finally {
    await page.close();
  }
}

// Returns every fact that differs from the golden, as "case.fact: got X, want Y".
export async function sweepBoardHeight() {
  ensureBuild();
  const { chromium } = await import("playwright");
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const diffs = [];
  try {
    for (const [key, { story, viewport, ...want }] of Object.entries(golden)) {
      const got = await measure(browser, base, { story, viewport });
      for (const [fact, value] of Object.entries(want)) {
        if (got[fact] !== value) diffs.push(`${key}.${fact}: got ${JSON.stringify(got[fact])}, want ${JSON.stringify(value)}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  return diffs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepBoardHeight();
  console.log(diffs.length ? diffs.join("\n") : "board height: matches golden");
  process.exitCode = diffs.length ? 1 : 0;
}
