/* Diagnostic, not a gate (`npm run probe:strut`): finds wrappers whose inherited-font line box sets a
   component's height; table cells and flex/grid containers are expected noise. */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const staticDir = join(root, "storybook-static");
if (!existsSync(join(staticDir, "index.json"))) {
  execFileSync("npm", ["run", "build-storybook"], { cwd: root, stdio: "pipe" });
}

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};
const server = createServer((req, res) => {
  const file = join(staticDir, decodeURIComponent(req.url.split("?")[0]));
  try {
    const body = readFileSync(file);
    res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

/* Runs inside the page, so every helper is nested — page.evaluate ships this
   one function across and nothing defined outside it exists at the other end. */
function probe() {
  const host = document.getElementById("storybook-root");
  if (!host) return [];
  const num = (v) => parseFloat(v) || 0;
  const inFlow = (el) => !/absolute|fixed/.test(getComputedStyle(el).position);
  const rows = [];
  for (const el of host.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    // Only elements that named no type token: the serif fallback is the tell.
    if (/Source Sans|Archivo|monospace|ui-monospace|Menlo/i.test(cs.fontFamily)) continue;
    const kids = Array.from(el.children);
    if (!kids.length) continue;
    // A wrapper holding its own text is meant to have a line box.
    if (Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const r = el.getBoundingClientRect();
    if (r.height === 0 || r.width === 0) continue;
    const boxes = kids.filter(inFlow).map((k) => k.getBoundingClientRect()).filter((b) => b.height > 0);
    if (!boxes.length) continue;
    // One horizontal band only: a stacking column is legitimately taller than its tallest child.
    const top = Math.min(...boxes.map((b) => b.top));
    if (boxes.some((b) => Math.abs(b.top - top) > 1)) continue;
    const chrome = num(cs.paddingTop) + num(cs.paddingBottom) + num(cs.borderTopWidth) + num(cs.borderBottomWidth);
    const tallest = Math.max(...boxes.map((b) => b.height));
    const residual = r.height - chrome - tallest;
    if (residual <= 0.5) continue;
    // The strut only matters if this is its parent's tallest in-flow child.
    const p = el.parentElement;
    const sibs = p ? Array.from(p.children).filter(inFlow) : [];
    const tallestSib = sibs.length ? Math.max(...sibs.map((k) => k.getBoundingClientRect().height)) : 0;
    const name = (n) => n.tagName.toLowerCase() + (n.className ? "." + String(n.className).trim().split(/\s+/)[0] : "");
    rows.push({
      where: name(el),
      parent: p ? name(p) : "",
      residual: Math.round(residual * 100) / 100,
      h: Math.round(r.height * 100) / 100,
      tallest: Math.round(tallest * 100) / 100,
      chrome,
      size: cs.fontSize,
      display: cs.display,
      align: cs.alignItems,
      propagates: r.height >= tallestSib - 0.5,
    });
  }
  return rows;
}

const { chromium } = await import("playwright");
const index = JSON.parse(readFileSync(join(staticDir, "index.json"), "utf8"));
const ids = Object.values(index.entries)
  .filter((e) => e.type === "story")
  .map((e) => e.id);
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const all = [];
const queue = ids.slice();
await Promise.all(
  Array.from({ length: 4 }, async () => {
    const page = await context.newPage();
    for (let id = queue.shift(); id; id = queue.shift()) {
      try {
        await page.goto(`${base}/iframe.html?viewMode=story&id=${id}`, { waitUntil: "load", timeout: 30000 });
        await page
          .waitForFunction(() => document.getElementById("storybook-root")?.children.length > 0, null, { timeout: 8000 })
          .catch(() => {});
        for (const r of await page.evaluate(probe)) all.push({ id, ...r });
      } catch {
        /* An unrenderable story is check.mjs gate 6's finding, not this probe's. */
      }
    }
    await page.close();
  }),
);
await browser.close();
server.close();

// Grouped by class, because one wrapper used in 40 stories is one decision.
const groups = new Map();
for (const r of all) {
  if (!groups.has(r.where)) groups.set(r.where, []);
  groups.get(r.where).push(r);
}
const propagating = all.filter((r) => r.propagates).length;
console.log(`swept ${ids.length} stories; ${all.length} struts (${propagating} propagate) in ${groups.size} classes`);
const worst = (v) => v.slice().sort((a, b) => b.residual - a.residual)[0];
for (const [where, v] of [...groups].sort((a, b) => worst(b[1]).residual - worst(a[1]).residual)) {
  const hits = v.filter((x) => x.propagates);
  const w = worst(hits.length ? hits : v);
  const mark = hits.length ? `PROPAGATES ${hits.length}/${v.length}` : `masked      0/${v.length}`;
  console.log(
    `${mark}  ${where} residual=${w.residual}px (h=${w.h} chrome=${w.chrome} tallestChild=${w.tallest} font=${w.size}) ${w.display}/${w.align} in ${w.parent} — ${w.id}`,
  );
}
