/* Renders the full-page board stories in a real browser and reads whether the page or the lanes scroll, because jsdom has no layout.
   Each case returns the facts src/goldens/board-height.json records; check.mjs compares them. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

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
    lanesOverflowSideways: region.scrollWidth > region.clientWidth,
    laneOverflowY: getComputedStyle(lanes[0]).overflowY,
  };
  region.scrollLeft = region.scrollWidth;
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  return { ...facts, fadeEndAtEnd: fadeMasked() };
}

// Which edge the fade paints: an 8px strip at each end of the lanes, shot with and without data-fade-end.
async function fadeEdge(page) {
  const region = page.locator("[data-ward-board-scroller]").first();
  const box = await region.boundingBox();
  const strip = (x) => page.screenshot({ clip: { x, y: box.y, width: 8, height: Math.min(box.height, 200) } });
  const shoot = () => Promise.all([strip(box.x), strip(box.x + box.width - 8)]);
  const faded = await shoot();
  const was = await region.evaluate((el) => {
    const on = el.hasAttribute("data-fade-end");
    el.removeAttribute("data-fade-end");
    return on;
  });
  const plain = await shoot();
  await region.evaluate((el, on) => el.toggleAttribute("data-fade-end", on), was);
  const [left, right] = [0, 1].map((i) => !faded[i].equals(plain[i]));
  return ["none", "left", "right", "both"][Number(left) + 2 * Number(right)];
}

async function measure(browser, base, { story, viewport }) {
  const page = await browser.newPage({ viewport });
  try {
    await page.goto(`${base}/iframe.html?viewMode=story&id=${story}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.querySelector("[data-ward-board-scroller]") !== null, null, { timeout: 8000 });
    await page.evaluate(() => document.fonts.ready);
    const edge = await fadeEdge(page);
    return { ...(await page.evaluate(probeBoard)), fadeEdge: edge };
  } finally {
    await page.close();
  }
}

// Returns every fact that differs from the golden, as "case.fact: got X, want Y".
export async function sweepBoardHeight() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await launchChromium();
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
