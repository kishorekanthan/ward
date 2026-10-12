/* Renders the CardGrid and StatTiles stories at 1280px and checks row geometry (#262), because jsdom has no layout.
   In a card row the card bottoms, and the agent cards' facts bottoms, sit within 2px; a tile row has one width and fills its grid. */
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

export const TOLERANCE = 2;
const VIEWPORT = { width: 1280, height: 900 };
// Each story names the tile count per row it must show; card stories need at least two cards a row.
export const STORIES = [
  { id: "layout-cardgrid--ragged", kind: "cards", rows: [2, 2] },
  { id: "layout-cardgrid--agent-row", kind: "cards", rows: [4] },
  { id: "primitives-statstrip--tiles-five", kind: "tiles", rows: [5] },
  { id: "primitives-statstrip--tiles-seven", kind: "tiles", rows: [6, 1] },
];

// Runs in the page: every grid in the story (one per theme copy), its children grouped into rows by their top edge.
function probe(kind) {
  const selector = kind === "tiles" ? ".ward-stattiles" : "[data-ward-card-grid], [data-ward-stage-grid]";
  const box = (el) => el.getBoundingClientRect();
  const foot = (el) => el.querySelector(":scope > dl");
  return Array.from(document.querySelectorAll(`#storybook-root ${selector}`)).map((grid) => {
    const rows = new Map();
    for (const child of grid.children) {
      const r = box(child);
      const key = Math.round(r.top);
      const facts = foot(child);
      rows.set(key, [...(rows.get(key) ?? []), { bottom: r.bottom, width: r.width, right: r.right, facts: facts && kind === "cards" ? box(facts).bottom : null }]);
    }
    return { right: box(grid).right, rows: [...rows.values()] };
  });
}

const spread = (values) => Math.max(...values) - Math.min(...values);

function cardRowDiffs(where, row) {
  const bottoms = spread(row.map((c) => c.bottom)) > TOLERANCE ? [`${where}: card bottoms differ by ${spread(row.map((c) => c.bottom)).toFixed(1)}px`] : [];
  const feet = row.map((c) => c.facts).filter((f) => f !== null);
  const facts = feet.length > 1 && spread(feet) > TOLERANCE ? [`${where}: facts bottoms differ by ${spread(feet).toFixed(1)}px`] : [];
  return [...bottoms, ...facts];
}

function tileRowDiffs(where, row, width, right, first) {
  const widths = row.filter((t) => Math.abs(t.width - width) > 0.5).map((t) => `${where}: tile ${t.width.toFixed(1)}px wide, first tile ${width.toFixed(1)}px`);
  const fills = first && Math.abs(Math.max(...row.map((t) => t.right)) - right) > 0.5 ? [`${where}: first row ends short of the grid's right edge`] : [];
  return [...widths, ...fills];
}

// Every row whose cards or facts end on different lines, every tile of another width, and every row count other than the story's.
export function gridDiffs(story, grids) {
  if (grids.length === 0) return [`${story.id}: no grid rendered`];
  return grids.flatMap((grid, g) => {
    const counts = grid.rows.map((row) => row.length);
    const where = (i) => `${story.id} copy ${g + 1} row ${i + 1}`;
    const shape = counts.join(",") === story.rows.join(",") ? [] : [`${story.id} copy ${g + 1}: rows of ${counts.join(",")}, want ${story.rows.join(",")}`];
    const width = grid.rows[0]?.[0]?.width ?? 0;
    const rows = grid.rows.flatMap((row, i) => (story.kind === "tiles" ? tileRowDiffs(where(i), row, width, grid.right, i === 0) : cardRowDiffs(where(i), row)));
    return [...shape, ...rows];
  });
}

async function measure(page, port, story) {
  await page.goto(`http://127.0.0.1:${port}/iframe.html?viewMode=story&id=${story.id}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.querySelector("#storybook-root")?.children.length > 0, null, { timeout: 8000 });
  await page.evaluate(() => document.fonts.ready);
  return gridDiffs(story, await page.evaluate(probe, story.kind));
}

export async function sweepCardGrid() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await launchChromium();
  try {
    const page = await browser.newPage({ viewport: VIEWPORT });
    const diffs = [];
    for (const story of STORIES) diffs.push(...(await measure(page, server.address().port, story)));
    return diffs;
  } finally {
    await browser.close();
    server.close();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepCardGrid();
  console.log(diffs.length ? diffs.join("\n") : "card grid: rows line up");
  process.exitCode = diffs.length ? 1 : 0;
}
