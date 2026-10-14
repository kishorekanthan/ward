import { fireEvent, render, screen } from "@testing-library/react";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ruleBody } from "../test-css";
import { OverflowRow } from "./OverflowRow";

const here = dirname(fileURLToPath(import.meta.url));
const CSS = join(here, "OverflowRow.module.css");
const ROW = { client: 375, scroll: 1000 };

function mockRowLayout(scroll: { current: number } | number): void {
  const width = () => (typeof scroll === "number" ? scroll : scroll.current);
  const isRow = (el: HTMLElement) => el.hasAttribute("data-ward-overflow-row");
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
    return isRow(this) ? ROW.client : 0;
  });
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(function (this: HTMLElement) {
    return isRow(this) ? width() : 0;
  });
}

function cssFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? cssFiles(join(dir, e.name)) : e.name.endsWith(".css") ? [join(dir, e.name)] : []));
}

afterEach(() => vi.restoreAllMocks());

describe("OverflowRow", () => {
  it("marks only the edges that hide content, following the scroll", () => {
    mockRowLayout(ROW.scroll);
    render(<OverflowRow label="Lanes">lanes</OverflowRow>);
    const row = screen.getByRole("region", { name: "Lanes" });
    const fades = () => [row.hasAttribute("data-fade-start"), row.hasAttribute("data-fade-end")];
    expect(fades()).toEqual([false, true]);
    row.scrollLeft = ROW.scroll - ROW.client;
    fireEvent.scroll(row);
    expect(fades()).toEqual([true, false]);
  });

  it("marks no edge when everything fits", () => {
    mockRowLayout(ROW.client);
    render(<OverflowRow label="Lanes">lanes</OverflowRow>);
    const row = screen.getByRole("region", { name: "Lanes" });
    expect([row.hasAttribute("data-fade-start"), row.hasAttribute("data-fade-end")]).toEqual([false, false]);
  });

  it("fades 32px at each hidden edge", () => {
    expect(ruleBody(CSS, ".row")).toContain("--ward-overflow-fade: var(--ward-space-7)");
    expect(ruleBody(CSS, ".row")).toContain("scroll-padding-inline: var(--ward-overflow-fade)");
    expect(ruleBody(CSS, ".row[data-fade-end]")).toBe("mask-image: linear-gradient(to left, transparent, currentColor var(--ward-overflow-fade))");
    expect(ruleBody(CSS, ".row[data-fade-start]")).toBe("mask-image: linear-gradient(to right, transparent, currentColor var(--ward-overflow-fade))");
  });

  it("measures the edges again when the item count changes", () => {
    const width = { current: ROW.scroll };
    mockRowLayout(width);
    const { rerender } = render(<OverflowRow label="Lanes" count={5}>lanes</OverflowRow>);
    const row = screen.getByRole("region", { name: "Lanes" });
    expect(row.hasAttribute("data-fade-end")).toBe(true);
    width.current = ROW.client;
    rerender(<OverflowRow label="Lanes" count={1}>lanes</OverflowRow>);
    expect(row.hasAttribute("data-fade-end")).toBe(false);
  });

  it("scrolls sideways and rings the focused row inside its own edge", () => {
    expect(ruleBody(CSS, ".row")).toContain("overflow-x: auto");
    expect(ruleBody(CSS, ".row:focus-visible")).toContain("outline: var(--ward-focus-ring) solid var(--ward-color-focus)");
    expect(ruleBody(CSS, ".row:focus-visible")).toContain("outline-offset: calc(-1 * var(--ward-focus-ring))");
  });

  it("keeps the navigation role on a focusable nav row", () => {
    render(<OverflowRow as="nav" label="Sections">x</OverflowRow>);
    expect(screen.getByRole("navigation", { name: "Sections" }).tabIndex).toBe(0);
  });

  it("takes focus with its label so arrow keys scroll it, unless its children take focus", () => {
    render(
      <>
        <OverflowRow label="Lanes">lanes</OverflowRow>
        <OverflowRow as="nav" label="Sections" focusable={false}>
          <a href="#a">A</a>
        </OverflowRow>
      </>,
    );
    expect(screen.getByRole("region", { name: "Lanes" }).tabIndex).toBe(0);
    expect(screen.getByRole("navigation", { name: "Sections" }).hasAttribute("tabindex")).toBe(false);
  });

  it("keeps the scrollbar's room at rest and shows it only on hover or focus", () => {
    expect(ruleBody(CSS, ".row")).toContain("scrollbar-color: transparent transparent");
    expect(ruleBody(CSS, ".row:hover,\n.row:focus-visible")).toBe("scrollbar-color: var(--ward-color-muted) transparent");
  });

  it("shows the scrollbar at rest on a touch screen, which has no hover", () => {
    expect(readFileSync(CSS, "utf8")).toMatch(/@media \(hover: none\) \{\s*\.row \{\s*scrollbar-color: var\(--ward-color-muted\) transparent;\s*\}\s*\}/);
  });

  it("is the only place a fade mask is declared", () => {
    const masked = cssFiles(join(here, "..")).filter((f) => /\[data-fade-(start|end)\]\s*\{[^}]*mask-image/.test(readFileSync(f, "utf8")));
    expect(masked.map((f) => f.slice(here.length - "layout".length))).toEqual(["layout/OverflowRow.module.css"]);
  });
});
