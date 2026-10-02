/* Renders every RecordSection story at 320, 375 and 1280px and reads its header's geometry (#143), because jsdom has no layout.
   Compares against src/goldens/header-geometry.json; `node scripts/header-geometry.mjs --record` rewrites that golden. */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const goldenPath = join(root, "src", "goldens", "header-geometry.json");
export const TOLERANCE = 0.5;
const WIDTHS = [320, 375, 1280];
const STORIES = ["block", "rail-list", "kicker", "long-kicker", "long-kicker-long-note", "inline-empty", "prose"];

// Runs in the page: each themed copy's header, the root against its section and each child against the root.
function probe() {
  const box = (el, from) => {
    const r = el.getBoundingClientRect();
    const o = from.getBoundingClientRect();
    const round = (n) => Math.round(n * 100) / 100;
    return { x: round(r.left - o.left), y: round(r.top - o.top), w: round(r.width), h: round(r.height) };
  };
  return Array.from(document.querySelectorAll("#storybook-root [data-ward-record-section]")).map((section) => {
    const header = section.firstElementChild;
    const kids = Array.from(header.children).map((el, i) => ({ el: `${i}:${el.tagName.toLowerCase()}`, ...box(el, header) }));
    return [{ el: "root", ...box(header, section) }, ...kids];
  });
}

async function measureAll(page, base) {
  const out = {};
  for (const story of STORIES) {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`${base}/iframe.html?viewMode=story&id=layout-recordsection--${story}`, { waitUntil: "load", timeout: 30000 });
      await page.waitForFunction(() => document.querySelector("#storybook-root [data-ward-record-section]") !== null, null, { timeout: 8000 });
      await page.evaluate(() => document.fonts.ready);
      out[`${story}@${width}`] = await page.evaluate(probe);
    }
  }
  return out;
}

function rectDiffs(where, got, want) {
  if (!got) return [`${where}: missing, want ${want.el}`];
  if (got.el !== want.el) return [`${where}: got ${got.el}, want ${want.el}`];
  return ["x", "y", "w", "h"].filter((k) => Math.abs(got[k] - want[k]) > TOLERANCE).map((k) => `${where} ${want.el}.${k}: got ${got[k]}, want ${want[k]}`);
}

function copyDiffs(where, got = [], want = []) {
  const extra = got.length > want.length ? [`${where}: ${got.length - want.length} rect(s) not in the golden`] : [];
  return [...want.flatMap((w, i) => rectDiffs(where, got[i], w)), ...extra];
}

// Every rect edge that moved by more than TOLERANCE px, and every header or child added or lost, as one line each.
export function geometryDiffs(got, want) {
  const keys = new Set([...Object.keys(want), ...Object.keys(got)]);
  return [...keys].flatMap((key) => {
    const copies = Math.max(want[key]?.length ?? 0, got[key]?.length ?? 0);
    return Array.from({ length: copies }, (_, i) => copyDiffs(`${key} copy ${i}`, got[key]?.[i], want[key]?.[i])).flat();
  });
}

async function measureStories() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await launchChromium();
  try {
    const page = await browser.newPage();
    return await measureAll(page, `http://127.0.0.1:${server.address().port}`);
  } finally {
    await browser.close();
    server.close();
  }
}

export async function sweepHeaderGeometry() {
  return geometryDiffs(await measureStories(), JSON.parse(readFileSync(goldenPath, "utf8")));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--record")) {
    const json = JSON.stringify(await measureStories(), null, 2).replace(/\{[^{}[\]]*\}/g, (rect) => JSON.stringify(JSON.parse(rect)));
    writeFileSync(goldenPath, json + "\n");
    console.log(`header geometry: recorded ${goldenPath}`);
  } else {
    const diffs = await sweepHeaderGeometry();
    console.log(diffs.length ? diffs.join("\n") : "header geometry: matches golden");
    process.exitCode = diffs.length ? 1 : 0;
  }
}
