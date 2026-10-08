/* Renders the full-page studio shell in a real browser, because jsdom has no layout: the frame, the inner scrollers and the drawer.
   Each case returns the facts src/goldens/studio-frame.json records; check.mjs compares them (#209). */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "studio-frame.json"), "utf8"));

const TOGGLE = "main button[aria-expanded]";

// Runs in the page: the shell at rest, read before any press.
function probeFrame() {
  const scrollsInside = (el) => {
    for (let at = el; at && at !== document.body; at = at.parentElement) {
      if (/auto|scroll/.test(getComputedStyle(at).overflowY) && at.scrollHeight > at.clientHeight) return true;
    }
    return false;
  };
  const lastLink = Array.from(document.querySelectorAll("#storybook-root a")).at(-1);
  const lastParagraph = Array.from(document.querySelectorAll("#storybook-root main p")).at(-1);
  const toggle = document.querySelector("main button[aria-expanded]");
  return {
    documentScrollsDown: document.scrollingElement.scrollHeight > innerHeight,
    documentScrollsSideways: document.documentElement.scrollWidth > innerWidth,
    sidebarInFlow: lastLink !== undefined && lastLink.closest("[role=dialog]") === null,
    sidebarScrollsInside: lastLink !== undefined && scrollsInside(lastLink),
    pageScrollsInside: scrollsInside(lastParagraph),
    toggleLabel: toggle ? toggle.textContent : null,
  };
}

// Runs in the page with the drawer open.
function probeDrawer() {
  const linksStack = (dialog) => {
    const [first, second] = Array.from(dialog.querySelectorAll("a[href]"), (a) => a.getBoundingClientRect());
    return second !== undefined && second.top >= first.bottom - 0.5 && second.left === first.left;
  };
  const dialog = document.querySelector("[role=dialog]");
  if (!dialog) return { drawerOpens: false };
  const box = dialog.getBoundingClientRect();
  const toggle = document.querySelector("main button[aria-expanded]");
  return {
    drawerOpens: dialog.getAttribute("aria-modal") === "true",
    drawerNamed: document.getElementById(dialog.getAttribute("aria-labelledby")).textContent,
    drawerControlled: dialog.id !== "" && dialog.id === toggle.getAttribute("aria-controls"),
    focusInDrawer: dialog.contains(document.activeElement),
    drawerWithinViewport: box.left >= 0 && box.right <= innerWidth,
    openScrollsSideways: document.documentElement.scrollWidth > innerWidth,
    linksInColumn: linksStack(dialog),
  };
}

// Tabs once past every focusable in the drawer; a trapped focus is still inside.
async function tabStaysInside(page) {
  const stops = await page.evaluate(() => document.querySelectorAll("[role=dialog] a[href], [role=dialog] button").length);
  for (let i = 0; i <= stops; i += 1) await page.keyboard.press("Tab");
  return page.evaluate(() => document.querySelector("[role=dialog]")?.contains(document.activeElement) ?? false);
}

async function probeEscape(page) {
  await page.keyboard.press("Escape");
  return page.evaluate(() => ({
    escapeCloses: document.querySelector("[role=dialog]") === null,
    focusBackOnToggle: document.activeElement === document.querySelector("main button[aria-expanded]"),
  }));
}

async function probeOpened(page) {
  if ((await page.locator(TOGGLE).count()) === 0) return {};
  await page.locator(TOGGLE).click();
  const drawer = await page.evaluate(probeDrawer);
  const tabStaysInDrawer = await tabStaysInside(page);
  return { ...drawer, tabStaysInDrawer, ...(await probeEscape(page)) };
}

async function measure(browser, base, { story, viewport }) {
  const page = await browser.newPage({ viewport });
  try {
    await page.goto(`${base}/iframe.html?viewMode=story&id=${story}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.querySelector("#storybook-root main") !== null, null, { timeout: 8000 });
    await page.evaluate(() => document.fonts.ready);
    const frame = await page.evaluate(probeFrame);
    return { ...frame, ...(await probeOpened(page)) };
  } finally {
    await page.close();
  }
}

function differences(key, want, got) {
  return Object.entries(want)
    .filter(([fact, value]) => got[fact] !== value)
    .map(([fact, value]) => `${key}.${fact}: got ${JSON.stringify(got[fact])}, want ${JSON.stringify(value)}`);
}

// Returns every fact that differs from the golden, as "case.fact: got X, want Y".
export async function sweepStudioFrame() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await launchChromium();
  const diffs = [];
  try {
    const cases = Object.entries(golden).filter(([key]) => !key.startsWith("$"));
    for (const [key, { story, viewport, ...want }] of cases) {
      diffs.push(...differences(key, want, await measure(browser, base, { story, viewport })));
    }
  } finally {
    await browser.close();
    server.close();
  }
  return diffs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepStudioFrame();
  console.log(diffs.length ? diffs.join("\n") : "studio frame: matches golden");
  process.exitCode = diffs.length ? 1 : 0;
}
