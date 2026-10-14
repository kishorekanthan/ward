import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Chip, type ChipTone } from "./Chip";

const TONES: ChipTone[] = ["neutral", "info", "success", "warning", "danger"];
const wardCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "ward.css"), "utf8");
const THEMES = { light: ":root", dark: '[data-theme="dark"]' } as const;
// jsdom leaves var() unresolved, so each theme's block in ward.css supplies the value.
function resolved(value: string, theme: keyof typeof THEMES): string {
  const start = wardCss.indexOf(`${THEMES[theme]} {`);
  const block = wardCss.slice(start, wardCss.indexOf("}", start));
  return value.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => new RegExp(`${name}: ([^;]+);`).exec(block)?.[1] ?? whole);
}

describe("Chip", () => {
  it("paints from the role's own token trio", () => {
    render(<Chip role="attention" label="ON HOLD" />);
    const el = screen.getByText("ON HOLD");
    expect(el.style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-attention-bg)");
    expect(el.style.getPropertyValue("--ward-chip-fg")).toBe("var(--ward-chip-attention-fg)");
    expect(el.style.getPropertyValue("--ward-chip-line")).toBe("var(--ward-chip-attention-line)");
  });

  it("takes a stream fill only from the stream chip vars, never the identity value", () => {
    render(<Chip role="stream" label="DATA-ENG" streamStep={1} />);
    const el = screen.getByText("DATA-ENG");
    expect(el.style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-stream-1-chip)");
    expect(el.style.getPropertyValue("--ward-chip-fg")).toBe("var(--ward-stream-1-chipText)");
    expect(el.style.getPropertyValue("--ward-chip-bg")).not.toBe("var(--ward-stream-1-id)");
  });

  it("refuses a stream step with no measured dark pair", () => {
    expect(() => render(<Chip role="stream" label="FOUR" streamStep={4} />)).toThrow(/not validated/);
  });

  it("refuses a stream colour on a status role — two meanings are two chips", () => {
    expect(() => render(<Chip role="done" label="PASSED" streamStep={1} />)).toThrow(/only valid when role is 'stream'/);
  });

  it("gives the five tones of the scale one filled shape, line on fill, in both themes", () => {
    for (const theme of Object.keys(THEMES) as (keyof typeof THEMES)[]) {
      const fills = TONES.map((tone) => {
        const { unmount } = render(<Chip role={tone} label={tone} />);
        const el = screen.getByText(tone);
        const [bg, line] = [el.style.getPropertyValue("--ward-chip-bg"), el.style.getPropertyValue("--ward-chip-line")].map((v) => resolved(v, theme));
        unmount();
        expect(line).toBe(bg);
        return bg;
      });
      expect(new Set(fills).size).toBe(TONES.length);
      expect(fills.every((bg) => bg.startsWith("#"))).toBe(true);
    }
  });

  it("reads each tone from its own status token", () => {
    const own = { neutral: "quiet", info: "running", success: "done", warning: "attention", danger: "failed" } as const;
    for (const tone of TONES) {
      render(<Chip role={tone} label={tone} />);
      expect(screen.getByText(tone).style.getPropertyValue("--ward-chip-bg")).toBe(`var(--ward-chip-${own[tone]}-bg)`);
    }
  });

  it("refuses a wordless chip", () => {
    expect(() => render(<Chip role="meta" label="" />)).toThrow(/label is required/);
  });
});
