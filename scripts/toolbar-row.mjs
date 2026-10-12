/* Measures a header row of a button, two dropdowns and the ··· button in both themes: jsdom cannot see heights or tops. */
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const NAMES = ["Share", "View", "Stream", "More actions"];

function probe(names) {
  const box = (el) => {
    const rect = el.getBoundingClientRect();
    return { top: rect.top, height: rect.height };
  };
  const named = (scope, name) =>
    Array.from(scope.querySelectorAll("button")).find((el) => (el.getAttribute("aria-label") ?? el.textContent.trim()) === name
      || (el.getAttribute("aria-labelledby") && document.getElementById(el.getAttribute("aria-labelledby"))?.textContent === name));
  return Array.from(document.querySelectorAll("#storybook-root > [data-theme]")).map((copy) => ({
    theme: copy.dataset.theme,
    boxes: names.map((name) => ({ name, box: named(copy, name) ? box(named(copy, name)) : null })),
  }));
}

export function rowDiffs(copies, width) {
  const diffs = copies.length === 2 ? [] : [`@${width}: expected both themes`];
  for (const copy of copies) {
    const at = `${copy.theme}@${width}`;
    const missing = copy.boxes.filter((entry) => !entry.box).map((entry) => entry.name);
    if (missing.length) diffs.push(`${at}: missing ${missing.join(", ")}`);
    const boxes = copy.boxes.filter((entry) => entry.box).map((entry) => entry.box);
    if (!boxes.length) continue;
    const spread = (key) => Math.max(...boxes.map((b) => b[key])) - Math.min(...boxes.map((b) => b[key]));
    if (spread("height") > 1) diffs.push(`${at}: heights differ by ${spread("height").toFixed(1)}px`);
    if (spread("top") > 1) diffs.push(`${at}: tops differ by ${spread("top").toFixed(1)}px`);
  }
  return diffs;
}

export async function sweepToolbarRow() {
  ensureBuild();
  const server = serve();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  let browser;
  try {
    browser = await launchChromium();
    const page = await browser.newPage();
    const diffs = [];
    for (const width of [1280, 1024]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`http://127.0.0.1:${server.address().port}/iframe.html?viewMode=story&id=primitives-pageheader--toolbar-row`);
      await page.getByRole("button", { name: "Share" }).first().waitFor();
      await page.evaluate(() => document.fonts.ready);
      diffs.push(...rowDiffs(await page.evaluate(probe, NAMES), width));
    }
    return diffs;
  } finally {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepToolbarRow();
  console.log(diffs.length ? diffs.join("\n") : "toolbar row: button, dropdowns and ··· share height and top within 1px, both themes, 1280 and 1024px");
  process.exitCode = diffs.length ? 1 : 0;
}
