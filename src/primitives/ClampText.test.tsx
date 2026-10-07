import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClampText } from "./ClampText";
import s from "./ClampText.module.css";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "ClampText.module.css"), "utf8");
const TITLE = "Reconcile late-arriving inbound shipments against the carrier's manifest before the nightly warehouse cut-off has closed";

function declarations(selector: string): string[] {
  const start = css.indexOf(selector + " {");
  return start === -1 ? [] : css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start)).split(";").map((d) => d.trim()).filter(Boolean);
}

describe("ClampText", () => {
  it("keeps the whole text in the DOM and in the tooltip, as a span by default", () => {
    const { container } = render(<ClampText text={TITLE} />);
    const el = container.firstElementChild as HTMLElement;
    expect(TITLE).toHaveLength(120);
    expect(el.tagName).toBe("SPAN");
    expect(el.textContent).toBe(TITLE);
    expect(el.getAttribute("title")).toBe(TITLE);
    expect(el.hasAttribute("data-ward-clamp")).toBe(true);
    expect(el.className).toBe(s.clamp);
  });

  it("names a clamped heading with its full text and keeps the host's class", () => {
    render(<ClampText as="h1" className="host" text={TITLE} />);
    const heading = screen.getByRole("heading", { level: 1, name: TITLE });
    expect(heading.className).toBe(`${s.clamp} host`);
  });

  it("wraps at any character to two lines, then cuts, and may shrink below its text", () => {
    expect(declarations(".clamp[data-ward-clamp]")).toEqual([
      "display: -webkit-box",
      "-webkit-box-orient: vertical",
      "-webkit-line-clamp: 2",
      "line-clamp: 2",
      "overflow: hidden",
      "overflow-wrap: anywhere",
      "white-space: normal",
      "min-width: 0",
    ]);
  });
});
