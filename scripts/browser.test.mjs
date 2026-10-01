import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";

const launch = vi.fn(async () => "browser");
vi.mock("playwright", () => ({ chromium: { launch } }));
const { launchChromium } = await import("./browser.mjs");

const scripts = dirname(fileURLToPath(import.meta.url));
const LAUNCHES_CHROMIUM = /chromium\s*\.\s*launch|import\(\s*["']playwright["']\s*\)|from\s*["']playwright["']/;

describe("launchChromium", () => {
  it("launches with font hinting off, so Linux CI measures text like macOS", async () => {
    await launchChromium();
    expect(launch).toHaveBeenCalledWith({ args: ["--font-render-hinting=none"] });
  });

  it("is the only way a script launches Chromium", () => {
    const others = readdirSync(scripts).filter(
      (f) => f.endsWith(".mjs") && !f.endsWith(".test.mjs") && f !== "browser.mjs",
    );
    const launching = others.filter((f) => LAUNCHES_CHROMIUM.test(readFileSync(join(scripts, f), "utf8")));
    expect(others.length).toBeGreaterThan(5);
    expect(launching).toEqual([]);
  });
});
