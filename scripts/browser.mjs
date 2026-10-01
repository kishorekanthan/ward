/* The one Chromium launch every rendered check uses, so text measures the same on macOS and Linux CI. */

// Linux Chromium hints glyph advances to whole pixels, which wraps text a line early (#110); macOS ignores the flag.
export const LAUNCH_ARGS = ["--font-render-hinting=none"];

export async function launchChromium() {
  const { chromium } = await import("playwright");
  return chromium.launch({ args: LAUNCH_ARGS });
}
