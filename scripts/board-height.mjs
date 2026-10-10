/* Renders the full-page board stories in a real browser and reads whether the page or the lanes scroll, which edges fade
   and whether every card meta shows whole, because jsdom has no layout.
   Each case returns the facts src/goldens/board-height.json records; check.mjs compares them. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "board-height.json"), "utf8"));

// Runs in the page: the tallest lane is the one holding 30 cards; a lane count would read "9 lanes".
function probeBoard() {
  const region = document.querySelector("[data-ward-board-scroller]");
  const lanes = Array.from(region.children);
  const tallest = lanes.reduce((a, b) => (b.scrollHeight > a.scrollHeight ? b : a));
  const leaves = Array.from(document.querySelectorAll("#storybook-root *")).filter((el) => el.children.length === 0);
  const count = leaves.find((el) => /^\d+ lanes?$/.test(el.textContent.trim()));
  return {
    pageHeightIsViewport: document.scrollingElement.scrollHeight === innerHeight,
    longLaneScrolls: tallest.scrollHeight > tallest.clientHeight && getComputedStyle(tallest).overflowY === "auto",
    columnSelectShown: document.querySelector("#storybook-root [data-ward-select]") !== null,
    laneCount: count ? count.textContent : null,
    fadeEndAtStart: region.hasAttribute("data-fade-end") && /gradient/.test(getComputedStyle(region).maskImage),
    fadeMoves: getComputedStyle(region).transitionDuration.split(",").some((d) => Number.parseFloat(d) > 0) || getComputedStyle(region).animationName !== "none",
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
    lanesOverflowSideways: region.scrollWidth > region.clientWidth,
    laneOverflowY: getComputedStyle(lanes[0]).overflowY,
  };
}

// Runs in the page: every card meta is whole: not clipped by itself or its card, nothing ellipsised, no word split across lines.
function probeMeta() {
  const metas = Array.from(document.querySelectorAll("[data-ward-card-meta]"));
  const lineTops = (range) => new Set(Array.from(range.getClientRects()).filter((b) => b.width > 0).map((b) => Math.round(b.top)));
  const split = (node) => {
    let at = 0;
    return node.data.split(" ").filter((word) => {
      const range = document.createRange();
      range.setStart(node, at);
      range.setEnd(node, at + word.length);
      at += word.length + 1;
      return lineTops(range).size > 1;
    }).length;
  };
  const shown = (node) => node.parentElement.closest(".ward-visually-hidden") === null;
  const texts = (el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const out = [];
    for (let node = walker.nextNode(); node; node = walker.nextNode()) out.push(node);
    return out.filter(shown);
  };
  const cut = (el) => [el, ...el.querySelectorAll("*")].some((part) => getComputedStyle(part).textOverflow === "ellipsis" || getComputedStyle(part).webkitLineClamp !== "none");
  const clipped = (el) => {
    const card = el.closest("[data-ward-card]").getBoundingClientRect();
    const box = el.getBoundingClientRect();
    return el.scrollWidth > el.clientWidth + 0.5 || el.scrollHeight > el.clientHeight + 0.5 || box.right > card.right + 0.5 || box.bottom > card.bottom + 0.5 || cut(el);
  };
  const lines = (el) => Math.round(el.getBoundingClientRect().height / Number.parseFloat(getComputedStyle(el).lineHeight));
  return {
    metas: metas.length,
    metaClipped: metas.filter(clipped).length,
    metaWordsSplit: metas.reduce((sum, el) => sum + texts(el).reduce((n, node) => n + split(node), 0), 0),
    metaWrapped: metas.filter((el) => lines(el) > 1).length,
  };
}

// Scrolls the lanes to "start", to "middle" (the second lane at the left edge) or to "end", and reads the end fade there.
async function scrollLanes(page, where) {
  return page.evaluate(async (to) => {
    const region = document.querySelector("[data-ward-board-scroller]");
    const second = region.children[1];
    const left = { start: 0, middle: second ? second.offsetLeft - region.children[0].offsetLeft : 0, end: region.scrollWidth };
    region.scrollLeft = left[to];
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    return region.hasAttribute("data-fade-end") && /gradient/.test(getComputedStyle(region).maskImage);
  }, where);
}

// Which edges the fade paints: an 8px strip at each end of the lanes, shot as it is and with both fade attributes removed.
async function fadeEdge(page) {
  const region = page.locator("[data-ward-board-scroller]").first();
  const box = await region.boundingBox();
  const strip = (x) => page.screenshot({ clip: { x, y: box.y, width: 8, height: Math.min(box.height, 200) } });
  const shoot = () => Promise.all([strip(box.x), strip(box.x + box.width - 8)]);
  const faded = await shoot();
  const was = await region.evaluate((el) => ["data-fade-start", "data-fade-end"].map((name) => {
    const on = el.hasAttribute(name);
    el.removeAttribute(name);
    return on;
  }));
  const plain = await shoot();
  await region.evaluate((el, on) => ["data-fade-start", "data-fade-end"].forEach((name, i) => el.toggleAttribute(name, on[i])), was);
  const [left, right] = [0, 1].map((i) => !faded[i].equals(plain[i]));
  return ["none", "left", "right", "both"][Number(left) + 2 * Number(right)];
}

async function measure(browser, base, { story, viewport, theme = "light" }) {
  const page = await browser.newPage({ viewport });
  try {
    await page.goto(`${base}/iframe.html?viewMode=story&id=${story}&globals=theme:${theme}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.querySelector("[data-ward-board-scroller]") !== null, null, { timeout: 8000 });
    await page.evaluate(() => document.fonts.ready);
    const facts = { ...(await page.evaluate(probeBoard)), ...(await page.evaluate(probeMeta)), fadeEdge: await fadeEdge(page) };
    await scrollLanes(page, "middle");
    const fadeEdgeMiddle = await fadeEdge(page);
    const fadeEndAtEnd = await scrollLanes(page, "end");
    return { ...facts, fadeEdgeMiddle, fadeEndAtEnd, fadeEdgeAtEnd: await fadeEdge(page) };
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
    for (const [key, { story, viewport, theme, ...want }] of Object.entries(golden)) {
      const got = await measure(browser, base, { story, viewport, theme });
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
