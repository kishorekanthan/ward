/* Renders the ActivityConsole story in a real browser and reads each themed copy's ground, inset and inks,
   because jsdom resolves no var(); check.mjs compares them with src/goldens/console-theme.json. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureBuild, serve } from "./contrast.mjs";
import { launchChromium } from "./browser.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const golden = JSON.parse(readFileSync(join(root, "src", "goldens", "console-theme.json"), "utf8"));

// Runs in the page: one reading per themed copy that bothThemes renders.
function probeConsole(theme) {
  const list = document.querySelector(`#storybook-root [data-theme="${theme}"] ol`);
  const panel = getComputedStyle(list.parentElement);
  const ink = (kind) => getComputedStyle(list.querySelector(`li[data-kind="${kind}"]`)).color;
  return {
    ground: panel.backgroundColor,
    padding: panel.padding,
    radius: panel.borderRadius,
    tool: ink("tool"),
    warn: ink("warn"),
    ok: ink("ok"),
    dim: ink("dim"),
    foot: getComputedStyle(list.nextElementSibling).color,
  };
}

export async function sweepConsoleTheme() {
  ensureBuild();
  const server = serve();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await launchChromium();
  const diffs = [];
  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}/iframe.html?viewMode=story&id=${golden.story}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.getElementById("storybook-root")?.children.length > 0, null, { timeout: 8000 });
    for (const theme of ["light", "dark"]) {
      const got = await page.evaluate(probeConsole, theme);
      for (const [fact, want] of Object.entries(golden[theme])) {
        if (got[fact] !== want) diffs.push(`${theme}.${fact}: got ${JSON.stringify(got[fact])}, want ${JSON.stringify(want)}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  return diffs;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const diffs = await sweepConsoleTheme();
  console.log(diffs.length ? diffs.join("\n") : "console theme: matches golden");
  process.exitCode = diffs.length ? 1 : 0;
}
