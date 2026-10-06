/* Renders the web PolicyRow story at 1280px and reads each row's value control and chip (#185), because jsdom has no layout.
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

// Runs in the page: the control's box spans everything drawn in it, so a control spilling out of its column counts.
function probe() {
  const round = (n) => Math.round(n * 100) / 100;
  const drawn = (el) => [el, ...el.querySelectorAll("*")].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 0);
  return Array.from(document.querySelectorAll("#storybook-root .ward-policyrow")).map((row) => {
    const from = row.getBoundingClientRect().left;
    const boxes = drawn(row.children[1]);
    const left = Math.min(...boxes.map((r) => r.left));
    const right = Math.max(...boxes.map((r) => r.right));
    const chip = row.children[2].getBoundingClientRect();
    return {
      row: row.querySelector(".ward-policy-consequence").previousElementSibling.textContent,
      control: { x: round(left - from), w: round(right - left) },
      chip: { x: round(chip.left - from), w: round(chip.width) },
    };
  });
}

function rowDiffs(got, want) {
  const where = `${want.row}`;
  if (!got) return [`${where}: missing`];
  const moved = ["control", "chip"].flatMap((part) =>
    ["x", "w"].filter((k) => Math.abs(got[part][k] - want[part][k]) > TOLERANCE).map((k) => `${where} ${part}.${k}: got ${got[part][k]}, want ${want[part][k]}`),
  );
  const overlap = got.control.x + got.control.w > got.chip.x + TOLERANCE ? [`${where}: control ends at ${got.control.x + got.control.w}, past the chip at ${got.chip.x}`] : [];
  return [...overlap, ...moved];
}

// Every row whose control runs into its chip, every edge that moved by more than TOLERANCE px, and every row added or lost.
export function policyRowDiffs(got, want) {
  const extra = got.length > want.length ? [`${got.length - want.length} row(s) not in the golden`] : [];
  return [...want.flatMap((w, i) => rowDiffs(got[i], w)), ...extra];
}

async function measureStory() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await launchChromium();
  try {
    const page = await browser.newPage({ viewport: VIEWPORT });
    await page.goto(`http://127.0.0.1:${server.address().port}/iframe.html?viewMode=story&id=${STORY}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.querySelector("#storybook-root .ward-policyrow") !== null, null, { timeout: 8000 });
    await page.evaluate(() => document.fonts.ready);
    return await page.evaluate(probe);
  } finally {
    await browser.close();
    server.close();
  }
}

export async function sweepPolicyRow() {
  return policyRowDiffs(await measureStory(), JSON.parse(readFileSync(goldenPath, "utf8")).rows);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--record")) {
    const rows = (await measureStory()).map((r) => "    " + JSON.stringify(r)).join(",\n");
    writeFileSync(goldenPath, `{\n  "story": "${STORY}",\n  "viewport": ${JSON.stringify(VIEWPORT)},\n  "rows": [\n${rows}\n  ]\n}\n`);
    console.log(`policy row: recorded ${goldenPath}`);
  } else {
    const diffs = await sweepPolicyRow();
    console.log(diffs.length ? diffs.join("\n") : "policy row: matches golden");
    process.exitCode = diffs.length ? 1 : 0;
  }
}
