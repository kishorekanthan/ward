/* Renders the phone-width stories at 375px (or a golden's own width) in a real browser and reads their geometry, because jsdom has no layout.
   Each probe returns the facts src/goldens/phone-width.json records; check.mjs compares them. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "phone-width.json"), "utf8"));

// Runs in the page: the first themed copy only, so each fact is read once.
async function probeTabs() {
  const strip = document.querySelector('#storybook-root [role="tablist"]');
  const tabs = Array.from(strip.querySelectorAll('[role="tab"]'));
  const active = tabs.find((t) => t.getAttribute("aria-selected") === "true");
  const box = strip.getBoundingClientRect();
  const inView = (el) => {
    const r = el.getBoundingClientRect();
    return r.left >= box.left - 0.5 && r.right <= box.right + 0.5 && r.right <= innerWidth;
  };
  // A fade is as wide as the strip's scroll-padding; a tab under a live fade is half-hidden.
  const fade = Number.parseFloat(getComputedStyle(strip).scrollPaddingInlineStart) || 0;
  const r = active.getBoundingClientRect();
  const clearOfFades =
    fade > 0 &&
    (!strip.hasAttribute("data-fade-start") || r.left >= box.left + fade - 0.5) &&
    (!strip.hasAttribute("data-fade-end") || r.right <= box.right - fade + 0.5);
  // Mid-scroll both fades are live: the mask has a clear stop at each edge.
  const clearStops = getComputedStyle(strip).maskImage.match(/transparent|rgba\(0, 0, 0, 0\)/g) ?? [];
  const masked = strip.hasAttribute("data-fade-start") && strip.hasAttribute("data-fade-end") && clearStops.length === 2;
  const activeInView = inView(active);
  // Each lone fade has its own mask rule, so read the mask at both ends of the scroll.
  const settle = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const loneFade = (on, off) => strip.hasAttribute(on) && !strip.hasAttribute(off) && /gradient/.test(getComputedStyle(strip).maskImage);
  strip.scrollLeft = 0;
  await settle();
  const endFadeMaskedAtStart = loneFade("data-fade-end", "data-fade-start");
  strip.scrollLeft = strip.scrollWidth;
  await settle();
  const startFadeMaskedAtEnd = loneFade("data-fade-start", "data-fade-end");
  return {
    endFadeMaskedAtStart,
    startFadeMaskedAtEnd,
    stripScrolls: strip.scrollWidth > strip.clientWidth && getComputedStyle(strip).overflowX === "auto",
    activeTabInView: activeInView,
    activeTabClearOfFades: clearOfFades,
    fadesMasked: masked,
    lastTabReachedByScroll: inView(tabs[tabs.length - 1]),
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

function probePageHeader() {
  const header = document.querySelector("#storybook-root header");
  const crumb = header.querySelector("nav, ol").getBoundingClientRect();
  const chipBoxes = Array.from(header.querySelectorAll("[data-ward-chip], .ward-chip")).map((c) => ({ c, r: c.getBoundingClientRect() }));
  const title = header.querySelector("h1").getBoundingClientRect();
  const whole = ({ c, r }) => c.scrollWidth <= c.clientWidth + 0.5 && r.right <= header.getBoundingClientRect().right + 0.5;
  return {
    chipsBelowCrumb: chipBoxes.length > 0 && chipBoxes.every(({ r }) => r.top >= crumb.bottom - 0.5),
    chipLines: new Set(chipBoxes.map(({ r }) => Math.round(r.top))).size,
    titleBelowChips: chipBoxes.every(({ r }) => title.top >= r.bottom - 0.5),
    everyChipWhole: chipBoxes.every(whole),
    chipFontSize: chipBoxes.length ? getComputedStyle(chipBoxes[0].c).fontSize : "",
    actionsShown: header.querySelectorAll("[data-ward-actions] [data-action]").length,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// Actions wider than the screen collapse to ···; their hidden measure copy keeps its width but stays inside the header.
function probePageHeaderWideActions() {
  const header = document.querySelector("#storybook-root header");
  return {
    actionsCollapsed: header.querySelectorAll("[data-ward-actions] button").length === 1,
    measureWiderThanScreen: header.querySelector("[data-ward-measure]").getBoundingClientRect().width > innerWidth,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// Link actions at 375px: a lone link stays in the strip at full target height; two fold behind ···.
function probePageHeaderLinks() {
  const strip = document.querySelector("#storybook-root header [data-ward-actions]");
  const links = Array.from(strip.querySelectorAll("a"));
  // A flex link is one box however its text wraps, so measure the line boxes of the text itself.
  const lineRects = (element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return Array.from(range.getClientRects());
  };
  const textLines = (element) => new Set(lineRects(element).map((r) => Math.round(r.top))).size;
  // A clipped line edge hits whatever covers it, so both edges of every line must hit its own link.
  const hits = (a, x, y) => a.contains(document.elementFromPoint(x, y));
  const linesVisible = (a) => lineRects(a).every((r) => hits(a, r.left + r.width / 2, r.top + 1) && hits(a, r.left + r.width / 2, r.bottom - 1));
  return {
    linksShown: links.length,
    toggleShown: strip.querySelector("button") !== null,
    linkTargetAtLeast: Math.min(...links.map((a) => Math.round(a.getBoundingClientRect().height))),
    linkInView: links.every((a) => a.getBoundingClientRect().right <= innerWidth + 0.5 && linesVisible(a)),
    linkLines: Math.max(...links.map(textLines)),
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// A long unbroken title wraps inside the screen: the page keeps its width and the action stays in view, uncollapsed (#190).
function probePageHeaderLongTitle() {
  const header = document.querySelector("#storybook-root header");
  const h1 = header.querySelector("h1");
  const action = header.querySelector("[data-ward-actions] button");
  const r = action.getBoundingClientRect();
  const range = document.createRange();
  range.selectNodeContents(h1);
  return {
    documentWidth: document.documentElement.scrollWidth,
    actionShown: action.textContent === "Publish" && r.left >= 0 && r.right <= innerWidth + 0.5 && action.contains(document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)),
    label: h1.textContent,
    titleWhole: h1.scrollWidth <= h1.clientWidth + 0.5 && !h1.hasAttribute("aria-hidden"),
    titleLinesAtLeast: new Set(Array.from(range.getClientRects()).map((line) => Math.round(line.top))).size,
  };
}

function probeStatStrip([text, longText]) {
  const read = (wanted) => {
    const label = Array.from(document.querySelectorAll("#storybook-root dt")).find((d) => d.textContent === wanted);
    const lineHeight = Number.parseFloat(getComputedStyle(label).lineHeight);
    const lines = Math.round(label.getBoundingClientRect().height / lineHeight);
    // Half a line of slack: a 10px line box lets glyph ink overflow by a pixel, which is not a hidden line.
    const clipped = label.scrollHeight > label.clientHeight + lineHeight / 2 || label.scrollWidth > label.clientWidth + 0.5;
    return [label.textContent, lines, clipped];
  };
  const [label, labelLines, labelClipped] = read(text);
  const [longLabel, longLabelLines, longLabelClipped] = read(longText);
  const pageScrollsSideways = document.documentElement.scrollWidth > innerWidth;
  return { label, labelLines, labelClipped, longLabel, longLabelLines, longLabelClipped, pageScrollsSideways };
}

// innerText applies text-transform, so it reads the kicker as a viewer sees it; line counts pin a short kicker's row as before #84.
function probeKicker() {
  const head = document.querySelector('#storybook-root [data-kind="key"] h2');
  const style = getComputedStyle(head);
  const lines = (el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight));
  return {
    headLines: lines(head),
    noteLines: lines(head.nextElementSibling),
    seenText: head.innerText,
    fontSize: style.fontSize,
    family: style.fontFamily.split(",")[0].trim(),
    letterSpacing: style.letterSpacing,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// A long kicker wraps inside its band beside a short note kept whole, taking all the room the note leaves (#122); a long note then wraps rather than widening the page.
async function probeLongKicker() {
  const bandEnd = (band) => band.getBoundingClientRect().right - Number.parseFloat(getComputedStyle(band).paddingRight);
  const head = document.querySelector('#storybook-root [data-kind="key"] h2');
  const note = head.nextElementSibling;
  const lines = (el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight));
  const box = head.getBoundingClientRect();
  const facts = {
    headLines: lines(head),
    headInView: box.right <= innerWidth + 0.5,
    noteOnFirstLine: note.getBoundingClientRect().top < box.top + parseFloat(getComputedStyle(head).lineHeight) / 2,
    noteLines: lines(note),
    noteReachesBandEnd: Math.abs(bandEnd(note.parentElement) - note.getBoundingClientRect().right) <= 0.5,
  };
  note.textContent = "pick one to release the item before the nightly cut-off closes";
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  return { ...facts, longNoteInView: note.getBoundingClientRect().right <= innerWidth + 0.5, pageScrollsSideways: document.documentElement.scrollWidth > innerWidth };
}

// A long note beside a long kicker: its shortest wrapped line (the last excepted) is counted in characters, per #107.
function probeLongKickerLongNote() {
  const note = document.querySelector('#storybook-root [data-kind="key"] h2').nextElementSibling;
  const text = note.firstChild;
  const range = document.createRange();
  const perLine = new Map();
  for (let i = 0; i < text.length; i++) {
    range.setStart(text, i);
    range.setEnd(text, i + 1);
    const top = Math.round(range.getBoundingClientRect().top);
    perLine.set(top, (perLine.get(top) ?? 0) + 1);
  }
  const counts = [...perLine.values()];
  const band = note.parentElement.getBoundingClientRect();
  return {
    noteCharsPerLineAtLeast: Math.min(...counts.slice(0, -1)),
    noteInBand: note.getBoundingClientRect().right <= band.right - Number.parseFloat(getComputedStyle(note.parentElement).paddingRight) + 0.5,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// Scrolled up, the console foot carries both buttons beside the idle copy; all stay whole and in view at 375px.
async function probeConsoleFoot() {
  document.querySelector("#storybook-root ol").scrollTop = 0;
  const foot = document.querySelector("#storybook-root .ward-caret").parentElement;
  const jumpShown = () => Array.from(foot.querySelectorAll("button")).some((b) => b.textContent === "Jump to latest");
  const deadline = performance.now() + 3000;
  while (!jumpShown()) {
    if (performance.now() > deadline) throw new Error("consoleFoot: Jump to latest did not appear within 3s of scrolling the log to the top");
    await new Promise((r) => requestAnimationFrame(r));
  }
  const box = foot.getBoundingClientRect();
  const buttons = Array.from(foot.querySelectorAll("button"));
  const idle = foot.querySelector(".ward-caret + span");
  const whole = (b) => {
    const r = b.getBoundingClientRect();
    return b.scrollWidth <= b.clientWidth + 0.5 && r.left >= box.left - 0.5 && r.right <= Math.min(box.right, innerWidth) + 0.5;
  };
  return {
    buttons: buttons.map((b) => b.textContent).join(" | "),
    everyButtonWhole: buttons.length > 0 && buttons.every(whole),
    idleCopyWhole: idle.scrollWidth <= idle.clientWidth + 0.5,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// Six stage columns at 375px: the grid scrolls, not the page; each lone fade, and both mid-scroll, mask their edges.
async function probeStageGrid() {
  const grid = document.querySelector("#storybook-root [data-ward-stage-grid]");
  const settle = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const loneFade = (on, off) => grid.hasAttribute(on) && !grid.hasAttribute(off) && /gradient/.test(getComputedStyle(grid).maskImage);
  grid.scrollLeft = 0;
  await settle();
  const endFadeMaskedAtStart = loneFade("data-fade-end", "data-fade-start");
  grid.scrollLeft = (grid.scrollWidth - grid.clientWidth) / 2;
  await settle();
  const clearStops = getComputedStyle(grid).maskImage.match(/transparent|rgba\(0, 0, 0, 0\)/g) ?? [];
  const bothFadesMaskedMidScroll = grid.hasAttribute("data-fade-start") && grid.hasAttribute("data-fade-end") && clearStops.length === 2;
  grid.scrollLeft = grid.scrollWidth;
  await settle();
  const startFadeMaskedAtEnd = loneFade("data-fade-start", "data-fade-end");
  return {
    columnWidth: Math.round(grid.firstElementChild.getBoundingClientRect().width),
    gridScrolls: grid.scrollWidth > grid.clientWidth && getComputedStyle(grid).overflowX === "auto",
    endFadeMaskedAtStart,
    bothFadesMaskedMidScroll,
    startFadeMaskedAtEnd,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// Presses the Settings toggle, then reads where the tools row lands.
async function probeTopBar() {
  const header = document.querySelector("#storybook-root header");
  const toggle = header.querySelector("button[aria-controls]");
  const panel = document.getElementById(toggle.getAttribute("aria-controls"));
  const inView = (r) => r.width > 0 && r.left >= -0.5 && r.right <= innerWidth + 0.5;
  const panelHiddenBeforePress = panel.getBoundingClientRect().height === 0;
  toggle.click();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const box = panel.getBoundingClientRect();
  return {
    toggleInView: inView(toggle.getBoundingClientRect()),
    panelHiddenBeforePress,
    panelBelowBar: box.top >= header.getBoundingClientRect().bottom - 0.5,
    panelInView: inView(box) && Array.from(panel.querySelectorAll("button")).every((b) => inView(b.getBoundingClientRect())),
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// Reads the Primary nav as mounted, then masks at the start, mid-scroll and the end, as for the Tabs strip.
async function probeTopBarNav() {
  const nav = document.querySelector('#storybook-root nav[aria-label="Primary"]');
  const box = nav.getBoundingClientRect();
  const current = nav.querySelector('[aria-current="page"]').getBoundingClientRect();
  const fade = Number.parseFloat(getComputedStyle(nav).scrollPaddingInlineStart) || 0;
  const currentLinkInView = current.left >= box.left - 0.5 && current.right <= box.right + 0.5 && current.right <= innerWidth;
  const currentLinkClearOfFades =
    fade > 0 &&
    (!nav.hasAttribute("data-fade-start") || current.left >= box.left + fade - 0.5) &&
    (!nav.hasAttribute("data-fade-end") || current.right <= box.right - fade + 0.5);
  const fadeShown = nav.hasAttribute("data-fade-start") || nav.hasAttribute("data-fade-end") || /gradient/.test(getComputedStyle(nav).maskImage);
  const settle = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const loneFade = (on, off) => nav.hasAttribute(on) && !nav.hasAttribute(off) && /gradient/.test(getComputedStyle(nav).maskImage);
  nav.scrollLeft = 0;
  await settle();
  const endFadeMaskedAtStart = loneFade("data-fade-end", "data-fade-start");
  nav.scrollLeft = (nav.scrollWidth - nav.clientWidth) / 2;
  await settle();
  const clearStops = getComputedStyle(nav).maskImage.match(/transparent|rgba\(0, 0, 0, 0\)/g) ?? [];
  const bothFadesMaskedMidScroll = nav.hasAttribute("data-fade-start") && nav.hasAttribute("data-fade-end") && clearStops.length === 2;
  nav.scrollLeft = nav.scrollWidth;
  await settle();
  return {
    navScrolls: nav.scrollWidth > nav.clientWidth && getComputedStyle(nav).overflowX === "auto",
    fadeShown,
    currentLinkInView,
    currentLinkClearOfFades,
    endFadeMaskedAtStart,
    bothFadesMaskedMidScroll,
    startFadeMaskedAtEnd: loneFade("data-fade-start", "data-fade-end"),
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// The Empty story: the event list keeps six console lines of height, and the foot has no jump button.
function probeConsole() {
  const list = document.querySelector("#storybook-root ol");
  const style = getComputedStyle(list);
  const line = Number.parseFloat(style.lineHeight);
  const gap = Number.parseFloat(style.rowGap) || 0;
  const foot = list.nextElementSibling;
  const idle = foot.children[1];
  return {
    listLines: Math.round((list.getBoundingClientRect().height + gap) / (line + gap)),
    jumpShown: foot.querySelector(".ward-consjump") !== null,
    idleClipped: idle.scrollWidth > idle.clientWidth + 0.5,
    pageScrollsSideways: document.documentElement.scrollWidth > innerWidth,
  };
}

// One chip fits beside a short crumb, so only that story shows chips still take their own line.
const PROBES = { tabs: probeTabs, pageHeader: probePageHeader, pageHeaderOneChip: probePageHeader, pageHeaderWideActions: probePageHeaderWideActions, pageHeaderLoneLink: probePageHeaderLinks, pageHeaderLongLoneLink: probePageHeaderLinks, pageHeaderTwoLinks: probePageHeaderLinks, pageHeaderLongTitle: probePageHeaderLongTitle, statStrip: probeStatStrip, stageGrid: probeStageGrid, topBar: probeTopBar, topBarNav: probeTopBarNav, topBarNavWide: probeTopBarNav, kicker: probeKicker, shortKicker: probeKicker, kickerAt320: probeKicker, longKicker: probeLongKicker, longKickerLongNote: probeLongKickerLongNote, console: probeConsole, consoleFoot: probeConsoleFoot };

async function measure(page, base, key) {
  const { story, label, longLabel, width = golden.viewport.width } = golden[key];
  await page.setViewportSize({ ...golden.viewport, width });
  await page.goto(`${base}/iframe.html?viewMode=story&id=${story}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.getElementById("storybook-root")?.children.length > 0, null, { timeout: 8000 });
  await page.evaluate(() => document.fonts.ready);
  return { story, width, ...(await page.evaluate(PROBES[key], [label, longLabel])) };
}

// Returns every fact that differs from the golden, as "key.fact: got X, want Y".
export async function sweepPhoneWidth() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await launchChromium();
  const diffs = [];
  try {
    const page = await browser.newPage({ viewport: golden.viewport });
    for (const key of Object.keys(PROBES)) {
      const got = await measure(page, base, key);
      for (const [fact, want] of Object.entries(golden[key])) {
        const met = fact.endsWith("AtLeast") ? got[fact] >= want : got[fact] === want;
        if (!met) diffs.push(`${key}.${fact}: got ${JSON.stringify(got[fact])}, want ${JSON.stringify(want)}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  return diffs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepPhoneWidth();
  console.log(diffs.length ? diffs.join("\n") : "phone width: matches golden");
  process.exitCode = diffs.length ? 1 : 0;
}
