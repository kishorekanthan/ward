/* Measures the consumer's crowded toolbar in both themes: jsdom cannot verify heights, alignment or containment. */
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

function probe() {
  const rect = (el) => {
    const box = el.getBoundingClientRect();
    return { left: box.left, right: box.right, top: box.top, height: box.height, width: box.width, center: box.top + box.height / 2 };
  };
  const textFits = (el) => {
    const style = getComputedStyle(el);
    const canvas = document.createElement("canvas").getContext("2d");
    canvas.font = style.font;
    const text = el.value || el.placeholder || el.textContent;
    return canvas.measureText(text).width <= el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) + 0.5;
  };
  const copy = (tools) => {
    const controls = Array.from(tools.querySelectorAll("input, button"));
    const values = Array.from(tools.querySelectorAll("button[aria-haspopup=listbox] > span"));
    return {
      theme: tools.closest("[data-theme]").dataset.theme,
      toolbar: rect(tools),
      groups: Array.from(tools.children).map(rect),
      controls: controls.map(rect),
      textFits: controls.every(textFits) && values.every((el) => el.scrollWidth <= el.clientWidth + 1),
      inputFont: getComputedStyle(controls.find((el) => el.tagName === "INPUT")).fontSize,
      buttonFont: getComputedStyle(controls.find((el) => el.textContent === "Configure board")).fontSize,
    };
  };
  return {
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    copies: Array.from(document.querySelectorAll('[aria-label="Board header controls"]')).map(copy),
  };
}

function controlDiffs(copy) {
  const heights = copy.controls.map((box) => box.height);
  const small = copy.controls.some((box) => box.height < 24 || box.width < 24);
  const diffs = [];
  if (Math.max(...heights) - Math.min(...heights) > 0.5) diffs.push("control heights differ");
  if (small) diffs.push("control target smaller than 24px");
  if (!copy.textFits) diffs.push("control text clipped");
  if (copy.inputFont !== copy.buttonFont) diffs.push("filter and button text sizes differ");
  return diffs;
}

function toolbarRows(groups) {
  const rows = new Map();
  for (const box of groups) {
    const row = Math.round(box.center);
    rows.set(row, [...(rows.get(row) ?? []), box]);
  }
  return rows;
}

function rowDiffs(copy, width) {
  const diffs = [];
  const rows = toolbarRows(copy.groups);
  if (width === 1280 && rows.size !== 1) diffs.push("desktop toolbar does not form one row");
  for (const boxes of rows.values()) diffs.push(...gapDiffs(boxes));
  return diffs;
}

function gapDiffs(boxes) {
  const gaps = boxes.slice(1).map((box, index) => box.left - boxes[index].right);
  return gaps.some((gap) => Math.abs(gap - 8) > 0.5) ? ["toolbar gaps differ from 8px"] : [];
}

function alignmentDiffs(copy) {
  return copy.controls.some((box) => !copy.groups.some((group) => Math.abs(box.center - group.center) <= 0.5))
    ? ["control centers do not align with their row"] : [];
}

function containmentDiffs(copy, width) {
  const outside = copy.groups.some((box) => box.left < copy.toolbar.left - 0.5 || box.right > copy.toolbar.right + 0.5);
  return outside || copy.toolbar.left < 0 || copy.toolbar.right > width + 0.5 ? ["toolbar content escapes its container"] : [];
}

export function toolbarDiffs(got, width) {
  const diffs = got.scrollWidth > got.width ? ["document scrolls sideways"] : [];
  if (got.copies.length !== 2) diffs.push("expected both themes");
  for (const copy of got.copies) {
    diffs.push(...[...controlDiffs(copy), ...rowDiffs(copy, width), ...alignmentDiffs(copy), ...containmentDiffs(copy, got.width)]
      .map((message) => `${copy.theme}@${width}: ${message}`));
  }
  return diffs;
}

async function namedControls(page) {
  const diffs = [];
  for (const theme of ["light", "dark"]) {
    const scope = page.locator(`#storybook-root > [data-theme=${theme}]`);
    for (const [role, name] of [["button", "Owner"], ["button", "Stream"], ["textbox", "Filter items"], ["button", "Configure board"], ["button", "Raise a request"]]) {
      if (await scope.getByRole(role, { name, exact: true }).count() !== 1) diffs.push(`${theme}: missing named ${name} control`);
    }
  }
  return diffs;
}

export async function sweepBoardToolbar() {
  ensureBuild();
  const server = serve();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  let browser;
  try {
    browser = await launchChromium();
    const page = await browser.newPage();
    const diffs = [];
    for (const width of [1280, 375]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`http://127.0.0.1:${server.address().port}/iframe.html?viewMode=story&id=board-boardheader--crowded-toolbar`);
      await page.locator('[aria-label="Board header controls"]').first().waitFor();
      await page.evaluate(() => document.fonts.ready);
      diffs.push(...toolbarDiffs(await page.evaluate(probe), width), ...await namedControls(page));
    }
    return diffs;
  } finally {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepBoardToolbar();
  console.log(diffs.length ? diffs.join("\n") : "board toolbar: both themes aligned, readable and contained at 1280 and 375px");
  process.exitCode = diffs.length ? 1 : 0;
}
