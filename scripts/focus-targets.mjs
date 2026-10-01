/* Tabs through the A11y/FocusTargets story in a real browser, because jsdom has neither layout nor :focus-visible.
   Each focused link must paint a ring on all four sides and answer clicks across a 24px band; src/goldens/focus-targets.json lists them. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "focus-targets.json"), "utf8"));

// Runs in the page: the focused link and the themed copy it sits in, or null once Tab has left the story.
function readFocused() {
  const el = document.activeElement;
  const copy = el?.closest("#storybook-root > [data-theme]");
  if (!copy || !el.matches("a, button")) return null;
  el.scrollIntoView({ block: "center" });
  const r = el.getClientRects()[0];
  const style = getComputedStyle(el);
  const reach = (Number.parseFloat(style.outlineOffset) || 0) + (Number.parseFloat(style.outlineWidth) || 0);
  const x = r.left + r.width / 2;
  const hits = (y) => document.elementFromPoint(x, y)?.closest("a, button") === el;
  const mid = r.top + r.height / 2;
  // px from the bottom of the link's text to the top of its ::after underline; null without one.
  const underlineGap = (box) => {
    const line = getComputedStyle(el, "::after");
    if (line.content === "none" || line.position !== "absolute") return null;
    const text = document.createRange();
    text.selectNodeContents(el);
    return Math.round((box.bottom - Number.parseFloat(line.bottom) - Number.parseFloat(line.height) - text.getBoundingClientRect().bottom) * 10) / 10;
  };
  // The browser's own focus ring also paints, so the ring must be Ward's: solid, in this copy's theme blue.
  const blue = document.createElement("span");
  blue.style.color = "var(--ward-color-blue)";
  copy.append(blue);
  const wardRing = style.outlineStyle === "solid" && style.outlineColor === getComputedStyle(blue).color;
  blue.remove();
  return {
    theme: copy.dataset.theme,
    name: el.textContent.trim(),
    focusVisible: el.matches(":focus-visible"),
    wardRing,
    height: r.height,
    hit24: hits(mid - 11.5) && hits(mid + 11.5),
    underlineGap: underlineGap(r),
    box: { x: r.left, y: r.top, width: r.width, height: r.height, reach },
  };
}

// Runs in the page: elements outside the targets whose box shifts when every ward-target band is taken away.
function movedByTargets() {
  const copy = document.getElementById("storybook-root");
  const others = [...copy.querySelectorAll("*")].filter((el) => !el.closest(".ward-target"));
  const boxes = () => others.map((el) => JSON.stringify(el.getBoundingClientRect()));
  const targets = [...copy.querySelectorAll(".ward-target")];
  const banded = boxes();
  targets.forEach((el) => el.classList.remove("ward-target"));
  const bare = boxes();
  targets.forEach((el) => el.classList.add("ward-target"));
  return others.filter((_, i) => banded[i] !== bare[i]).map((el) => el.tagName.toLowerCase() + (el.className ? `.${el.className}` : ""));
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
  for (let step = 0; step < 80; step++) {
    await page.keyboard.press("Tab");
    const got = await page.evaluate(readFocused);
    if (got === null) {
      if (seen.length) break;
      continue;
    }
    const ring = await ringOnEverySide(page, got.box);
    seen.push({ theme: got.theme, name: got.name, focusVisible: got.focusVisible, wardRing: got.wardRing, ring, tall: got.height >= 24, hit24: got.hit24, underlineGap: got.underlineGap, height: got.height });
  }
  return seen;
}

// Each theme copy must tab through the same links with the same facts; every diff names its theme.
function themeDiffs(theme, seen) {
  const diffs = [];
  const names = seen.map((t) => t.name);
  const want = golden.targets.map((t) => t.name);
  if (JSON.stringify(names) !== JSON.stringify(want)) diffs.push(`${theme} tab order: got ${JSON.stringify(names)}, want ${JSON.stringify(want)}`);
  golden.targets.forEach((target, i) => {
    const got = seen[i];
    for (const [fact, value] of Object.entries(target)) {
      if (got && got[fact] !== value) diffs.push(`${theme} ${target.name}.${fact}: got ${JSON.stringify(got[fact])}, want ${JSON.stringify(value)} (height ${got.height.toFixed(1)})`);
    }
  });
  return diffs;
}

// Returns every fact that differs from the golden, as "theme name.fact: got X, want Y".
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
    const moved = await page.evaluate(movedByTargets);
    if (moved.length) diffs.push(`layout: ${moved.length} element(s) move with the 24px bands, want 0 (${moved.slice(0, 3).join(", ")})`);
    const seen = await tabThrough(page);
    for (const theme of golden.themes) diffs.push(...themeDiffs(theme, seen.filter((t) => t.theme === theme)));
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
