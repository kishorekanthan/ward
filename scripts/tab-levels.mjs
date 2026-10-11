/* Renders a page strip over a section strip in both themes in a real browser, because jsdom resolves no var() (#250).
   Names each current tab's fill, ink and underline by the token it resolves to; check.mjs compares them with src/goldens/tab-levels.json. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "tab-levels.json"), "utf8"));
const STORY = "primitives-tabs--page-and-section";

// Runs in the page: for one theme copy, each level's strip count and its current and idle tabs' colours as token names.
function probe(theme) {
  const copy = document.querySelector(`#storybook-root [data-theme=${theme}]`);
  const swatch = document.createElement("span");
  copy.append(swatch);
  const tokens = Object.fromEntries(["sageTint", "sageInk", "text", "muted", "accentTint"].map((name) => {
    swatch.style.color = `var(--ward-color-${name})`;
    return [getComputedStyle(swatch).color, name];
  }));
  swatch.remove();
  const named = (colour) => (colour === "rgba(0, 0, 0, 0)" ? null : (tokens[colour] ?? colour));
  const underline = (shadow) => (shadow.includes("inset") ? named(shadow.match(/rgba?\([^)]*\)/)?.[0]) : null);
  const level = (name) => {
    const strips = copy.querySelectorAll(`[data-level=${name}]`);
    const current = getComputedStyle(strips[0].querySelector("[aria-selected=true]"));
    const idle = getComputedStyle(strips[0].querySelector("[aria-selected=false]"));
    return { strips: strips.length, fill: named(current.backgroundColor), ink: named(current.color), underline: underline(current.boxShadow), idleFill: named(idle.backgroundColor) };
  };
  return { page: level("page"), section: level("section") };
}

function differences(theme, want, got) {
  return Object.entries(want).flatMap(([level, facts]) =>
    Object.entries(facts)
      .filter(([fact, value]) => got[level][fact] !== value)
      .map(([fact, value]) => `${theme}.${level}.${fact}: got ${JSON.stringify(got[level][fact])}, want ${JSON.stringify(value)}`),
  );
}

// Returns every fact that differs from the golden, as "theme.level.fact: got X, want Y".
export async function sweepTabLevels() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await launchChromium();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  try {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`http://127.0.0.1:${server.address().port}/iframe.html?viewMode=story&id=${STORY}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.querySelectorAll("#storybook-root [data-level]").length === 4, null, { timeout: 8000 });
    const themes = Object.entries(golden).filter(([key]) => !key.startsWith("$"));
    const diffs = [];
    for (const [theme, want] of themes) diffs.push(...differences(theme, want, await page.evaluate(probe, theme)));
    return diffs;
  } finally {
    await browser.close();
    server.close();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepTabLevels();
  console.log(diffs.length ? diffs.join("\n") : "tab levels: matches golden");
  process.exitCode = diffs.length ? 1 : 0;
}
