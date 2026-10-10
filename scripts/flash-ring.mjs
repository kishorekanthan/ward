/* Flashes the live WorkCard story in a real browser and reads the ring at the animation's first and last frames, because jsdom runs no animation (#231).
   Each case returns the facts src/goldens/flash-ring.json records; check.mjs compares them. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "flash-ring.json"), "utf8"));

// Runs in the page: flashes the theme's card as useBorderFlash does, reads the last frame, then holds the first for a screenshot.
function startFlash({ theme, role }) {
  const card = document.querySelector(`#storybook-root [data-theme="${theme}"] [data-ward-card]`);
  const box = () => JSON.stringify(card.getBoundingClientRect());
  const atRest = box();
  if (role) card.style.setProperty("--ward-flash-colour", `var(--ward-color-${role})`);
  card.classList.add("ward-border-flash");
  const flash = card.getAnimations().filter((a) => a.animationName === "ward-flash");
  const style = getComputedStyle(card);
  const at = (time) => {
    flash.forEach((a) => Object.assign(a, { currentTime: time }).pause());
    return { ring: style.outlineColor, shadow: style.boxShadow };
  };
  const end = at((flash[0]?.effect.getComputedTiming().duration ?? 1) - 1);
  const start = at(0);
  const alpha = Number(/,\s*([\d.]+)\)$/.exec(end.ring)?.[1] ?? 1);
  return {
    animations: flash.length,
    ring: start.ring,
    ringStyle: style.outlineStyle,
    ringWidth: style.outlineWidth,
    shadowAtStart: start.shadow,
    shadowAtEnd: end.shadow,
    fadesOut: alpha < 0.05,
    sizeKept: box() === atRest,
    box: JSON.parse(atRest),
  };
}

function stopFlash(theme) {
  const card = document.querySelector(`#storybook-root [data-theme="${theme}"] [data-ward-card]`);
  card.getAnimations().forEach((a) => a.cancel());
  card.classList.remove("ward-border-flash");
  card.style.removeProperty("--ward-flash-colour");
}

// The 2px just outside the card's left edge, clear of its rounded corners: the ring paints there and nothing else does.
const ringStrip = (box) => ({ x: box.x - 2, y: box.y + box.height / 4, width: 2, height: box.height / 2 });

async function runCase(page, { theme, role, reducedMotion }) {
  await page.emulateMedia({ reducedMotion: reducedMotion ? "reduce" : "no-preference" });
  const facts = await page.evaluate(startFlash, { theme, role });
  const flashed = await page.screenshot({ clip: ringStrip(facts.box) });
  await page.evaluate(stopFlash, theme);
  const rest = await page.screenshot({ clip: ringStrip(facts.box) });
  return { ...facts, ringPainted: !flashed.equals(rest) };
}

async function openStory(browser, base) {
  const page = await browser.newPage();
  await page.goto(`${base}/iframe.html?viewMode=story&id=${golden.story}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.querySelectorAll("#storybook-root [data-ward-card]").length === 2, null, { timeout: 8000 });
  // The story's feed flashes each card once on mount; wait for that to clear so every case starts at rest.
  await page.waitForFunction(() => document.querySelector("#storybook-root .ward-border-flash") === null, null, { timeout: 8000 });
  return page;
}

// Returns every fact that differs from the golden, as "case.fact: got X, want Y".
export async function sweepFlashRing() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await launchChromium();
  const diffs = [];
  try {
    const page = await openStory(browser, `http://127.0.0.1:${server.address().port}`);
    for (const [key, { theme, role, reducedMotion = false, ...want }] of Object.entries(golden.cases)) {
      const got = await runCase(page, { theme, role, reducedMotion });
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
  const diffs = await sweepFlashRing();
  console.log(diffs.length ? diffs.join("\n") : "flash ring: matches golden");
  process.exitCode = diffs.length ? 1 : 0;
}
