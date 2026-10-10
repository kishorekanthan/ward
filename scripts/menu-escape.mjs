/* Opens Ward's menus where overflow boxes used to clip them (#225), in a real browser, because jsdom has no layout or top layer.
   Compares each open menu's box with src/goldens/menu-escape.json; `node scripts/menu-escape.mjs --record` rewrites that golden. */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const goldenPath = join(root, "src", "goldens", "menu-escape.json");
export const TOLERANCE = 0.5;
const WIDTHS = [1280, 375];

// Runs in the page: every control in the scope, the open popup, what a person can see of it, and the box it must escape.
function probe({ scope, trigger, popup, box }) {
  const round = (n) => Math.round(n * 100) / 100;
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return { x: round(r.left), y: round(r.top), w: round(r.width), h: round(r.height) };
  };
  const shows = (el) => {
    const r = el.getBoundingClientRect();
    return el.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2));
  };
  const popupOf = (host) => {
    const list = host.querySelector(popup);
    return list && (list.closest("[popover]") ?? list);
  };
  const openFacts = (opened) => {
    const rows = Array.from(opened.querySelectorAll("[role=option], [role=menuitem]"));
    return { menu: rect(opened), topLayer: opened.matches(":popover-open"), allShown: rows.length > 0 && rows.every(shows) };
  };
  const host = document.querySelector(scope);
  const opened = popupOf(host);
  const clip = host.querySelector(box);
  const root = document.documentElement;
  return {
    controls: Array.from(host.querySelectorAll("input, button")).filter((el) => !opened || !opened.contains(el)).map(rect),
    trigger: rect(host.querySelector(trigger)),
    ...(opened ? openFacts(opened) : { menu: null }),
    view: { w: root.clientWidth, h: root.clientHeight },
    clip: rect(clip),
    sideways: clip.scrollWidth > clip.clientWidth,
    focused: document.activeElement === host.querySelector(trigger),
  };
}

const TOOLBAR = '[aria-label="Board header controls"]';
const LISTBOX = "button[aria-haspopup=listbox]";
const TRIGGER = "[data-menu-escape]";

// Each case opens one trigger; box names the overflow box the menu must escape. Below 768px a dialog is a sheet tall enough to hold the menu.
const CASES = [
  ...["light", "dark"].map((theme) => ({ key: `toolbar:${theme}`, story: "board-boardheader--crowded-toolbar", scope: `#storybook-root > [data-theme=${theme}]`, pick: { css: `${TOOLBAR} ${LISTBOX}`, name: "Stream" }, popup: "[role=listbox]", box: TOOLBAR, keys: true })),
  ...["light", "dark"].map((theme) => ({ key: `board page:${theme}`, story: "layout-boardscroller--board-page-crowded-header", globals: `theme:${theme}`, scope: "#storybook-root", pick: { css: `${TOOLBAR} ${LISTBOX}`, name: "Stream" }, popup: "[role=listbox]", box: TOOLBAR })),
  ...["light", "dark"].map((theme) => ({ key: `dialog:${theme}`, story: "layout-appshell--dialog-with-select", globals: `theme:${theme}`, scope: "body", pick: { css: `[role=dialog] ${LISTBOX}`, name: "Stage" }, popup: "[role=listbox]", box: "[role=dialog]", widths: [1280] })),
  { key: "clipping box:light", story: "primitives-menu--inside-clipping-box", scope: "#storybook-root > [data-theme=light]", pick: { css: "button[aria-haspopup=menu]", name: "Account" }, popup: "[role=menu]", box: "div[style*=overflow]" },
];

async function load(page, base, c) {
  const globals = c.globals ? `&globals=${c.globals}` : "";
  await page.goto(`${base}/iframe.html?viewMode=story&id=${c.story}${globals}`, { waitUntil: "load", timeout: 30000 });
  await page.locator(`${c.scope} ${c.pick.css}`).first().waitFor({ timeout: 8000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(tag, { scope: c.scope, ...c.pick });
}

// Marks the trigger whose visible name matches, since Owner and Stream share one selector.
function tag({ scope, css, name }) {
  const named = (el) => (el.getAttribute("aria-labelledby") ?? "").split(" ").map((id) => document.getElementById(id)?.textContent).join(" ").trim() || el.textContent.trim();
  Array.from(document.querySelector(scope).querySelectorAll(css)).find((el) => named(el) === name)?.setAttribute("data-menu-escape", "");
}

const facts = (page, c) => page.evaluate(probe, { scope: c.scope, trigger: TRIGGER, popup: c.popup, box: c.box });

// Open, arrow, Escape and Enter from the keyboard; each close must hand focus back to the trigger.
async function keyboard(page, c) {
  const trigger = page.locator(`${c.scope} ${TRIGGER}`);
  const popup = page.locator(`${c.scope} ${c.popup}`);
  await page.keyboard.press("Escape");
  const escaped = { closed: await popup.count() === 0, focused: (await facts(page, c)).focused };
  await page.keyboard.press("ArrowDown");
  const reopened = await popup.count() === 1;
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  const picked = { closed: await popup.count() === 0, focused: (await facts(page, c)).focused, value: (await trigger.textContent()).trim() };
  return { escaped, reopened, picked };
}

async function measureCase(page, base, c) {
  await load(page, base, c);
  const closed = await facts(page, c);
  await page.locator(`${c.scope} ${TRIGGER}`).click();
  await page.locator(`${c.scope} ${c.popup}`).waitFor({ timeout: 8000 });
  const open = await facts(page, c);
  const keys = c.keys ? await keyboard(page, c) : null;
  return { closed, open, keys, scrollY: await page.evaluate(() => window.scrollY) };
}

async function measureAll(page, base) {
  const out = {};
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const c of CASES.filter((c) => (c.widths ?? WIDTHS).includes(width))) out[`${c.key}@${width}`] = await measureCase(page, base, c);
  }
  return out;
}

const settle = () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));

// A menu the viewport squeezes scrolls inside itself; a scroll or a key below the fold must not snap it back to the top.
async function measureScroll(page, base) {
  await page.setViewportSize({ width: 375, height: 220 });
  await page.goto(`${base}/iframe.html?viewMode=story&id=primitives-menu--groups-and-footer`, { waitUntil: "load", timeout: 30000 });
  const panel = page.locator("[role=menu]").first().locator("..");
  await panel.waitFor({ timeout: 8000 });
  const squeezed = await panel.evaluate((el) => el.scrollHeight > el.clientHeight);
  await panel.evaluate((el) => {
    window.placed = 0;
    new MutationObserver(() => window.placed++).observe(el, { attributeFilter: ["style"] });
    el.scrollTop = el.scrollHeight;
  });
  await page.evaluate(settle);
  const scrolled = await panel.evaluate((el) => el.scrollTop);
  const placed = await page.evaluate(() => window.placed);
  await panel.locator("[role=menuitem]").first().focus();
  await page.keyboard.press("End");
  await page.evaluate(settle);
  const lastShown = await panel.evaluate((el) => document.activeElement.getBoundingClientRect().bottom <= el.getBoundingClientRect().bottom + 0.5);
  return { squeezed, scrolled, placed, lastShown, listHeld: await hoverScrolledList(page, base) };
}

// Hovering the top whole row re-renders the Select, which places the menu again; the list scrolled to its end must stay there.
async function hoverScrolledList(page, base) {
  await page.setViewportSize({ width: 375, height: 260 });
  await page.goto(`${base}/iframe.html?viewMode=story&id=primitives-select--long-list-with-find`, { waitUntil: "load", timeout: 30000 });
  const list = page.locator("[role=listbox]").first();
  await list.waitFor({ timeout: 8000 });
  const end = await list.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
    return el.scrollTop;
  });
  await page.evaluate(settle);
  await list.evaluate((el) => {
    const top = el.getBoundingClientRect().top;
    const row = Array.from(el.querySelectorAll("[role=option]")).find((option) => option.getBoundingClientRect().top >= top);
    row.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
  });
  await page.evaluate(settle);
  return end > 0 && (await list.evaluate((el) => el.scrollTop)) === end;
}

const T = TOLERANCE;
const moved = (a, b) => ["x", "y", "w", "h"].some((k) => Math.abs(a[k] - b[k]) > T);
const inView = (r, view) => r.x >= -T && r.y >= -T && r.x + r.w <= view.w + T && r.y + r.h <= view.h + T;
const below = (r, box) => r.y + r.h > box.y + box.h + T || r.x + r.w > box.x + box.w + T;
const outside = (r, box) => below(r, box) || r.y < box.y - T || r.x < box.x - T;
const controlsMoved = ({ closed, open }) => closed.controls.length !== open.controls.length || closed.controls.some((r, i) => moved(r, open.controls[i]));

// A moved control, or a menu its box still holds, means the menu is back inside the page flow.
const PLACE_RULES = [
  [controlsMoved, "controls moved when the menu opened"],
  [({ open }) => !open.topLayer, "menu is not in the top layer"],
  [({ open }) => !open.allShown, "some menu rows are hidden or covered"],
  [({ open }) => !inView(open.menu, open.view), "menu runs past the viewport"],
  [({ open }) => !outside(open.menu, open.clip), "menu stays inside the box it should escape"],
  [({ open, closed }) => open.sideways || closed.sideways, "the box scrolls sideways"],
];

const KEY_RULES = [
  [(k) => !k.escaped.closed || !k.escaped.focused, "Escape did not close the menu back to its trigger"],
  [(k) => !k.reopened, "ArrowDown did not open the menu"],
  [(k) => !k.picked.closed || !k.picked.focused, "Enter did not close the menu back to its trigger"],
  [(k) => k.picked.value !== "Integration", "ArrowDown then Enter did not pick Integration"],
];

const SCROLL_RULES = [
  [(f) => !f.squeezed, "the menu had room, so its scroll was not tested"],
  [(f) => f.scrolled === 0, "scrolling the menu snapped it back to the top"],
  [(f) => f.placed > 0, "scrolling inside the menu placed it again"],
  [(f) => !f.lastShown, "End left the focused item below the fold"],
  [(f) => !f.listHeld, "hovering a row snapped the scrolled list back"],
];

const broken = (rules, facts, where) => rules.filter(([bad]) => bad(facts)).map(([, message]) => `${where}: ${message}`);

function placeDiffs(where, got) {
  return got.open.menu ? broken(PLACE_RULES, got, where) : [];
}

function keyDiffs(where, keys) {
  return keys ? broken(KEY_RULES, keys, where) : [];
}

// The open menu's box against the trigger it hangs from, so page scroll cannot move the golden.
export function menuBox(open) {
  const round = (n) => Math.round(n * 100) / 100;
  return { dx: round(open.menu.x - open.trigger.x), dy: round(open.menu.y - open.trigger.y - open.trigger.h), w: open.menu.w, h: open.menu.h };
}

function goldenDiffs(where, got, want) {
  if (!want) return [`${where}: not in the golden`];
  if (!got.open.menu) return [`${where}: menu did not open`];
  const box = menuBox(got.open);
  return Object.keys(want).filter((k) => Math.abs(box[k] - want[k]) > TOLERANCE).map((k) => `${where} menu.${k}: got ${box[k]}, want ${want[k]}`);
}

export const scrollDiffs = (facts) => broken(SCROLL_RULES, facts, "short viewport@375");

export function escapeDiffs(got, golden) {
  return Object.entries(got).flatMap(([where, run]) => [...goldenDiffs(where, run, golden[where]), ...placeDiffs(where, run), ...keyDiffs(where, run.keys)]);
}

async function measureStories() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await launchChromium();
  try {
    const page = await browser.newPage();
    const base = `http://127.0.0.1:${server.address().port}`;
    return { runs: await measureAll(page, base), scroll: await measureScroll(page, base) };
  } finally {
    await browser.close();
    server.close();
  }
}

export async function sweepMenuEscape() {
  const { runs, scroll } = await measureStories();
  return [...escapeDiffs(runs, JSON.parse(readFileSync(goldenPath, "utf8"))), ...scrollDiffs(scroll)];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--record")) {
    const { runs } = await measureStories();
    const golden = Object.fromEntries(Object.entries(runs).map(([where, run]) => [where, run.open.menu ? menuBox(run.open) : null]));
    writeFileSync(goldenPath, JSON.stringify(golden, null, 2).replace(/\{[^{}]*\}/g, (box) => JSON.stringify(JSON.parse(box))) + "\n");
    console.log(`menu escape: recorded ${goldenPath}`);
  } else {
    const diffs = await sweepMenuEscape();
    console.log(diffs.length ? diffs.join("\n") : "menu escape: matches golden");
    process.exitCode = diffs.length ? 1 : 0;
  }
}
