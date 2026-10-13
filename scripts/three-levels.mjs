/* Renders the Tokens/Surfaces story in a real browser and reads the ground, the panel and each card's ground and ring per theme,
   because jsdom resolves no var(); check.mjs compares them with src/goldens/three-levels.json (Ward #287). */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "three-levels.json"), "utf8"));

// Runs in the page: one reading per themed copy that bothThemes renders. The ring is the first box-shadow's colour.
function probeLevels(theme) {
  const copy = document.querySelector(`#storybook-root [data-theme="${theme}"]`);
  const ground = (sel) => getComputedStyle(copy.querySelector(sel)).backgroundColor;
  const tile = copy.querySelector(".ward-stat-link");
  return {
    ground: ground('[data-level="ground"]'),
    panel: ground('[data-level="panel"]'),
    tile: getComputedStyle(tile).backgroundColor,
    agent: getComputedStyle(copy.querySelector('[data-level="panel"] > a, [data-level="panel"] > article')).backgroundColor,
    ring: getComputedStyle(tile).boxShadow.match(/^rgba?\([^)]*\)/)?.[0] ?? "none",
  };
}

export async function sweepThreeLevels() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await launchChromium();
  const diffs = [];
  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}/iframe.html?viewMode=story&id=${golden.story}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.getElementById("storybook-root")?.children.length > 0, null, { timeout: 8000 });
    for (const theme of ["light", "dark"]) {
      const got = await page.evaluate(probeLevels, theme);
      for (const [fact, want] of Object.entries(golden[theme])) {
        if (got[fact] !== want) diffs.push(`${theme}.${fact}: got ${JSON.stringify(got[fact])}, want ${JSON.stringify(want)}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  return diffs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepThreeLevels();
  console.log(diffs.length ? diffs.join("\n") : "three levels: matches golden");
  process.exitCode = diffs.length ? 1 : 0;
}
