/* Renders the web PolicyRow story at 1280px and 375px and reads each row's setting, value control and chip (#185, #189), because jsdom has no layout.
   Compares against src/goldens/policy-row.json; `node scripts/policy-row.mjs --record` rewrites that golden. */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const goldenPath = join(root, "src", "goldens", "policy-row.json");
export const TOLERANCE = 0.5;
const STORY = "admin-policyrow--web-wide-controls";
const VIEWPORT = { width: 1280, height: 800 };
const PHONE = { width: 375, height: 667 };
const PHONE_PAIRS = [["setting", "control"], ["setting", "chip"], ["control", "chip"]];

// Runs in the page: the control's box spans everything drawn in it, so a control spilling out of its column counts.
// At phone width each box also has its top and height, and the row records how far its setting text runs past its box.
function probe(phone) {
  const round = (n) => Math.round(n * 100) / 100;
  const drawn = (el) => [el, ...el.querySelectorAll("*")].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 0);
  const span = (rs) => ({ left: Math.min(...rs.map((r) => r.left)), top: Math.min(...rs.map((r) => r.top)), right: Math.max(...rs.map((r) => r.right)), bottom: Math.max(...rs.map((r) => r.bottom)) });
  const box = (r, from) => (phone ? { x: round(r.left - from.left), y: round(r.top - from.top), w: round(r.right - r.left), h: round(r.bottom - r.top) } : { x: round(r.left - from.left), w: round(r.right - r.left) });
  const overflow = (el) => Math.max(...[el, ...el.children].map((e) => e.scrollWidth - e.clientWidth));
  return Array.from(document.querySelectorAll("#storybook-root .ward-policyrow")).map((row) => {
    const from = row.getBoundingClientRect();
    const [setting, control, chip] = row.children;
    const parts = { control: box(span(drawn(control)), from), chip: box(chip.getBoundingClientRect(), from) };
    const name = row.querySelector(".ward-policy-consequence").previousElementSibling.textContent;
    return phone ? { row: name, setting: box(setting.getBoundingClientRect(), from), ...parts, overflow: overflow(setting) } : { row: name, ...parts };
  });
}

function edgeDiffs(where, got, want, parts, keys) {
  return parts.flatMap((part) =>
    keys.filter((k) => Math.abs(got[part][k] - want[part][k]) > TOLERANCE).map((k) => `${where} ${part}.${k}: got ${got[part][k]}, want ${want[part][k]}`),
  );
}

function rowDiffs(got, want) {
  const where = `${want.row}`;
  if (!got) return [`${where}: missing`];
  const overlap = got.control.x + got.control.w > got.chip.x + TOLERANCE ? [`${where}: control ends at ${got.control.x + got.control.w}, past the chip at ${got.chip.x}`] : [];
  return [...overlap, ...edgeDiffs(where, got, want, ["control", "chip"], ["x", "w"])];
}

const overlapBy = (a, b, pos, size) => Math.min(a[pos] + a[size], b[pos] + b[size]) - Math.max(a[pos], b[pos]);
const intersects = (a, b) => overlapBy(a, b, "x", "w") > TOLERANCE && overlapBy(a, b, "y", "h") > TOLERANCE;

// At phone width no two of setting, control and chip may share pixels: on a narrow row the control used to cover the setting (#189).
export function phoneOverlaps(where, got) {
  return PHONE_PAIRS.filter(([a, b]) => intersects(got[a], got[b])).map(([a, b]) => `${where}: ${a} overlaps ${b}`);
}

// A setting squeezed to nothing, or text wider than its box, is text the control or the row edge hides.
export function phoneClips(where, got) {
  const narrow = got.setting.w > TOLERANCE ? [] : [`${where}: setting is ${got.setting.w}px wide`];
  const runs = got.overflow > TOLERANCE ? [`${where}: setting text runs ${got.overflow}px past its box`] : [];
  return [...narrow, ...runs];
}

function phoneRowDiffs(got, want) {
  const where = `${want.row} @375`;
  if (!got) return [`${where}: missing`];
  return [...phoneOverlaps(where, got), ...phoneClips(where, got), ...edgeDiffs(where, got, want, ["setting", "control", "chip"], ["x", "y", "w", "h"])];
}

function listDiffs(got, want, diffs, label) {
  const extra = got.length > want.length ? [`${label}${got.length - want.length} row(s) not in the golden`] : [];
  return [...want.flatMap((w, i) => diffs(got[i], w)), ...extra];
}

// Every row whose control runs into its chip, every edge that moved by more than TOLERANCE px, and every row added or lost.
export function policyRowDiffs(got, want) {
  return listDiffs(got, want, rowDiffs, "");
}

// The same at phone width, where any overlap of setting, control and chip, or any clipped setting text, also fails.
export function phonePolicyRowDiffs(got, want) {
  return listDiffs(got, want, phoneRowDiffs, "375px: ");
}

async function measureAt(page, url, viewport, phone) {
  await page.setViewportSize(viewport);
  await page.goto(url, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.querySelector("#storybook-root .ward-policyrow") !== null, null, { timeout: 8000 });
  await page.evaluate(() => document.fonts.ready);
  return await page.evaluate(probe, phone);
}

async function measureStory() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await launchChromium();
  try {
    const page = await browser.newPage({ viewport: VIEWPORT });
    const url = `http://127.0.0.1:${server.address().port}/iframe.html?viewMode=story&id=${STORY}`;
    return { rows: await measureAt(page, url, VIEWPORT, false), phone: await measureAt(page, url, PHONE, true) };
  } finally {
    await browser.close();
    server.close();
  }
}

export async function sweepPolicyRow() {
  const got = await measureStory();
  const want = JSON.parse(readFileSync(goldenPath, "utf8"));
  return [...policyRowDiffs(got.rows, want.rows), ...phonePolicyRowDiffs(got.phone, want.phone?.rows ?? [])];
}

function goldenText(got) {
  const lines = (rows, indent) => rows.map((r) => indent + JSON.stringify(r)).join(",\n");
  return `{\n  "story": "${STORY}",\n  "viewport": ${JSON.stringify(VIEWPORT)},\n  "rows": [\n${lines(got.rows, "    ")}\n  ],\n  "phone": {\n    "viewport": ${JSON.stringify(PHONE)},\n    "rows": [\n${lines(got.phone, "      ")}\n    ]\n  }\n}\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--record")) {
    writeFileSync(goldenPath, goldenText(await measureStory()));
    console.log(`policy row: recorded ${goldenPath}`);
  } else {
    const diffs = await sweepPolicyRow();
    console.log(diffs.length ? diffs.join("\n") : "policy row: matches golden");
    process.exitCode = diffs.length ? 1 : 0;
  }
}
