/* Measures every story's rendered ink against its composited background, because gate 2 only sees pairs someone listed.
   WCAG AA (3:1 large); aria-hidden and disabled are exempt; resting states at 1440x900 only. */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const staticDir = join(root, "storybook-static");
const VIEWPORT = { width: 1440, height: 900 };
const PAGES = 4;
const FROZEN_NOW = Date.UTC(2026, 0, 1, 12, 0, 0);

// One parser for hex (gate 2, tokens.json) and rgb() (gate 6, the browser) so both gates compute the same ratio.
export function parseColour(value) {
  if (typeof value !== "string") return value;
  const fn = /rgba?\(([^)]+)\)/.exec(value);
  if (fn) {
    const p = fn[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  const hex = value.replace("#", "");
  const wide = hex.length <= 4 ? hex.replace(/./g, (c) => c + c) : hex;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(wide.slice(i, i + 2), 16));
  return { r, g, b, a: wide.length >= 8 ? parseInt(wide.slice(6, 8), 16) / 255 : 1 };
}

function channel(c) {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

export function luminance(colour) {
  const c = parseColour(colour);
  return 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// The build is cached on content, not mtime, because a checkout rewrites mtimes.
function inputHash() {
  const parts = [...walk(join(root, "src")), ...walk(join(root, ".storybook"))];
  for (const f of ["tokens.json", "package.json", "vite.config.ts", "tsconfig.json"]) {
    const p = join(root, f);
    if (existsSync(p)) parts.push(p);
  }
  const h = createHash("sha256");
  for (const p of parts.sort()) h.update(p.slice(root.length) + "\0").update(readFileSync(p));
  return h.digest("hex");
}

function ensureBuild() {
  const stamp = join(staticDir, ".ward-inputs");
  const want = inputHash();
  const fresh = existsSync(stamp) && readFileSync(stamp, "utf8") === want && existsSync(join(staticDir, "index.json"));
  if (fresh) return "reused storybook-static";
  execFileSync("npm", ["run", "build-storybook"], { cwd: root, stdio: "pipe" });
  writeFileSync(stamp, want);
  return "rebuilt storybook-static";
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

function serve() {
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
  return server;
}

// Runs inside the page: page.evaluate ships only this function, so every helper is nested.
function sweepPage() {
  const rgba = (s) => {
    const m = /rgba?\(([^)]+)\)/.exec(s);
    if (!m) return null;
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const over = (f, b) => ({
    r: f.r * f.a + b.r * (1 - f.a),
    g: f.g * f.a + b.g * (1 - f.a),
    b: f.b * f.a + b.b * (1 - f.a),
    a: 1,
  });
  const backgroundOf = (el) => {
    const stack = [];
    for (let n = el; n; n = n.parentElement) {
      const c = rgba(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) {
        stack.push(c);
        if (c.a === 1) break;
      }
    }
    if (!stack.length || stack[stack.length - 1].a < 1) stack.push({ r: 255, g: 255, b: 255, a: 1 });
    let out = stack.pop();
    while (stack.length) out = over(stack.pop(), out);
    return out;
  };
  // Off-screen means past the left or top edge only; content below the fold is still visible once scrolled.
  const invisible = (el, cs, r) =>
    cs.visibility === "hidden" ||
    cs.display === "none" ||
    r.width === 0 ||
    r.height === 0 ||
    r.right <= 0 ||
    r.bottom <= 0 ||
    /inset\(50%\)/.test(cs.clipPath) ||
    cs.clip === "rect(0px, 0px, 0px, 0px)" ||
    (r.width <= 1 && r.height <= 1);
  const exemption = (el) => {
    if (el.closest('[aria-hidden="true"]')) return "aria-hidden";
    if (el.closest('[disabled],[aria-disabled="true"]')) return "disabled";
    return null;
  };
  /* Elements holding their own text, plus filled form controls — an input's
     value is text on a background even though it is not a child text node. */
  const inked = (el) => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return (el.value ?? "").trim();
    return Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent)
      .join("")
      .trim();
  };

  const host = document.getElementById("storybook-root");
  if (!host || !host.children.length) return { empty: true, rows: [] };
  const rows = [];
  for (const el of host.querySelectorAll("*")) {
    const text = inked(el);
    if (!text) continue;
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    if (invisible(el, cs, rect)) continue;
    const raw = rgba(cs.color);
    if (!raw) continue;
    const bg = backgroundOf(el);
    const fg = raw.a < 1 ? over(raw, bg) : raw;
    const size = parseFloat(cs.fontSize);
    const weight = cs.fontWeight === "bold" ? 700 : parseInt(cs.fontWeight) || 400;
    rows.push({
      where: el.tagName.toLowerCase() + (el.className ? "." + String(el.className).trim().split(/\s+/)[0] : ""),
      text: text.slice(0, 40),
      fg: `rgb(${[fg.r, fg.g, fg.b].map(Math.round).join(",")})`,
      bg: `rgb(${[bg.r, bg.g, bg.b].map(Math.round).join(",")})`,
      large: size >= 24 || (size >= 18.66 && weight >= 700),
      theme: el.closest('[data-theme="dark"]') ? "dark" : "light",
      exempt: exemption(el),
    });
  }
  return { empty: false, rows };
}

async function visit(page, base, id, out) {
  const noise = [];
  const onError = (e) => noise.push(String(e.message ?? e).split("\n")[0].slice(0, 120));
  const onConsole = (m) => {
    if (m.type() === "error") noise.push(m.text().split("\n")[0].slice(0, 120));
  };
  page.on("pageerror", onError);
  page.on("console", onConsole);
  try {
    await page.goto(`${base}/iframe.html?viewMode=story&id=${id}`, { waitUntil: "load", timeout: 30000 });
    await page
      .waitForFunction(() => document.getElementById("storybook-root")?.children.length > 0, null, { timeout: 8000 })
      .catch(() => {});
    const result = await page.evaluate(sweepPage);
    if (result.empty) out.broken.push(`${id} rendered nothing${noise.length ? ` — ${noise[0]}` : ""}`);
    else if (noise.length) out.broken.push(`${id} errored — ${noise[0]}`);
    for (const row of result.rows) out.rows.push({ id, ...row });
  } catch (e) {
    out.broken.push(`${id} failed to load — ${String(e.message).split("\n")[0].slice(0, 120)}`);
  }
  page.off("pageerror", onError);
  page.off("console", onConsole);
}

export async function sweepRenderedContrast() {
  const build = ensureBuild();
  const { chromium } = await import("playwright");
  const index = JSON.parse(readFileSync(join(staticDir, "index.json"), "utf8"));
  const ids = Object.values(index.entries)
    .filter((e) => e.type === "story")
    .map((e) => e.id);

  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const started = Date.now();
  const out = { rows: [], broken: [] };
  let browser;
  try {
    browser = await chromium.launch();
    /* One context shared by the pool so the asset cache is shared too; a
       context per story re-downloads the whole preview bundle each time. */
    const context = await browser.newContext({ viewport: VIEWPORT });
    await context.addInitScript(`
      {
        const FROZEN_NOW = ${FROZEN_NOW};
        const RealDate = Date;
        class FrozenDate extends RealDate {
          constructor(...args) {
            if (args.length === 0) super(FROZEN_NOW);
            else super(...args);
          }
          static now() {
            return FROZEN_NOW;
          }
        }
        FrozenDate.parse = RealDate.parse;
        FrozenDate.UTC = RealDate.UTC;
        globalThis.Date = FrozenDate;
      }
    `);
    const queue = ids.slice();
    await Promise.all(
      Array.from({ length: PAGES }, async () => {
        const page = await context.newPage();
        for (let id = queue.shift(); id; id = queue.shift()) await visit(page, base, id, out);
        await page.close();
      }),
    );
  } finally {
    await browser?.close();
    server.close();
  }

  const measured = out.rows.filter((r) => !r.exempt);
  const failures = measured.filter((r) => contrast(r.fg, r.bg) < (r.large ? 3 : 4.5));
  const exempt = {};
  for (const r of out.rows.filter((x) => x.exempt)) exempt[r.exempt] = (exempt[r.exempt] ?? 0) + 1;
  return {
    build,
    stories: ids.length,
    seconds: ((Date.now() - started) / 1000).toFixed(1),
    nodes: out.rows.length,
    measured: measured.length,
    large: measured.filter((r) => r.large).length,
    exempt,
    broken: out.broken,
    failures: failures.map((r) => ({ ...r, ratio: contrast(r.fg, r.bg).toFixed(2), need: r.large ? 3 : 4.5 })),
  };
}

/* Group by colour pair, not by node: one bad token used in 62 places is one
   decision to revisit, and 62 near-identical lines hide that. */
export function describeFailures(failures) {
  const groups = new Map();
  for (const f of failures) {
    const key = `${f.fg} on ${f.bg} = ${f.ratio}:1 (needs ${f.need}:1, ${f.theme})`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(`${f.id} ${f.where} "${f.text}"`);
  }
  return [...groups]
    .map(([key, hits]) => `${key} x${hits.length} — e.g. ${hits.slice(0, 2).join("; ")}`)
    .join(" | ");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const r = await sweepRenderedContrast();
  const exempt = Object.entries(r.exempt).map(([k, n]) => `${k} ${n}`).join(", ") || "none";
  console.log(`${r.build}; swept ${r.stories} stories in ${r.seconds}s`);
  console.log(`${r.nodes} text nodes — ${r.measured} measured (${r.large} large), exempt: ${exempt}`);
  if (r.broken.length) console.log(`BROKEN (${r.broken.length}): ${r.broken.join(" | ")}`);
  if (r.failures.length) console.log(`FAIL ${r.failures.length}: ${describeFailures(r.failures)}`);
  // A named total: inline `a + b === 0` parses as `a + (b === 0)` and exited 0 on a broken story.
  const bad = r.broken.length + r.failures.length;
  if (bad === 0) console.log("contrast: green");
  process.exitCode = bad === 0 ? 0 : 1;
}
