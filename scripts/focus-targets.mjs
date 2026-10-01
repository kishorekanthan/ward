/* Tabs through the A11y/FocusTargets story in a real browser, because jsdom has neither layout nor :focus-visible.
   Each focused link must paint a ring on all four sides and answer clicks across a 24px band; src/goldens/focus-targets.json lists them. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "focus-targets.json"), "utf8"));

// Runs in the page: the focused link inside the first themed copy, or null once Tab has left it.
function readFocused() {
  const el = document.activeElement;
  const copy = document.querySelector("#storybook-root > div");
  if (!el || !copy.contains(el) || !el.matches("a, button")) return null;
  const r = el.getClientRects()[0];
  const style = getComputedStyle(el);
  const reach = (Number.parseFloat(style.outlineOffset) || 0) + (Number.parseFloat(style.outlineWidth) || 0);
  const x = r.left + r.width / 2;
  const hits = (y) => document.elementFromPoint(x, y)?.closest("a, button") === el;
  const mid = r.top + r.height / 2;
  // The browser's own focus ring also paints, so the ring must be Ward's: solid, in the theme's blue.
  const blue = document.createElement("span");
  blue.style.color = "var(--ward-color-blue)";
  copy.append(blue);
  const wardRing = style.outlineStyle === "solid" && style.outlineColor === getComputedStyle(blue).color;
  blue.remove();
  return {
    name: el.textContent.trim(),
    focusVisible: el.matches(":focus-visible"),
    wardRing,
    height: r.height,
    hit24: hits(mid - 11.5) && hits(mid + 11.5),
    box: { x: r.left, y: r.top, width: r.width, height: r.height, reach },
  };
}

// The four bands just outside the box where the outline paints; each must change when focus leaves.
function bands({ x, y, width, height, reach }) {
  const r = Math.max(reach, 1);
  return [
    { x: x - r, y: y - r, width: width + 2 * r, height: r },
    { x: x - r, y: y + height, width: width + 2 * r, height: r },
    { x: x - r, y, width: r, height },
    { x: x + width, y, width: r, height },
  ];
}

const shoot = (page, clips) => Promise.all(clips.map((clip) => page.screenshot({ clip })));

async function ringOnEverySide(page, box) {
  const clips = bands(box);
  const focused = await shoot(page, clips);
  await page.evaluate(() => {
    window.__wardFocused = document.activeElement;
    document.activeElement.blur();
  });
  const blurred = await shoot(page, clips);
  await page.evaluate(() => window.__wardFocused.focus());
  return focused.every((shot, i) => !shot.equals(blurred[i]));
}

async function tabThrough(page) {
  const seen = [];
  for (let step = 0; step < 40; step++) {
    await page.keyboard.press("Tab");
    const got = await page.evaluate(readFocused);
    if (got === null) {
      if (seen.length) break;
      continue;
    }
    const ring = await ringOnEverySide(page, got.box);
    seen.push({ name: got.name, focusVisible: got.focusVisible, wardRing: got.wardRing, ring, tall: got.height >= 24, hit24: got.hit24, height: got.height });
  }
  return seen;
}

// Returns every fact that differs from the golden, as "name.fact: got X, want Y".
export async function sweepFocusTargets() {
  ensureBuild();
  const { chromium } = await import("playwright");
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const diffs = [];
  try {
    const page = await browser.newPage({ viewport: golden.viewport });
    await page.goto(`${base}/iframe.html?viewMode=story&id=${golden.story}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.getElementById("storybook-root")?.children.length > 0, null, { timeout: 8000 });
    await page.evaluate(() => document.fonts.ready);
    const seen = await tabThrough(page);
    const names = seen.map((t) => t.name);
    const want = golden.targets.map((t) => t.name);
    if (JSON.stringify(names) !== JSON.stringify(want)) diffs.push(`tab order: got ${JSON.stringify(names)}, want ${JSON.stringify(want)}`);
    for (const target of golden.targets) {
      const got = seen.find((t) => t.name === target.name);
      for (const [fact, value] of Object.entries(target)) {
        if (got && got[fact] !== value) diffs.push(`${target.name}.${fact}: got ${JSON.stringify(got[fact])}, want ${JSON.stringify(value)} (height ${got.height.toFixed(1)})`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  return diffs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepFocusTargets();
  console.log(diffs.length ? diffs.join("\n") : "focus targets: match golden");
  process.exitCode = diffs.length ? 1 : 0;
}
