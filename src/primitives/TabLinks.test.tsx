import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TabLinks } from "./TabLinks";

const tabsCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "Tabs.module.css"), "utf8");

function ruleFor(selector: string): string {
  const at = tabsCss.split(/\n(?=\S)/).find((block) => block.split("{")[0]?.split(",").some((part) => part.trim() === selector));
  return at?.slice(at.indexOf("{")) ?? "";
}

const studio = [
  { id: "streams", label: "Streams", href: "#/studio/streams" },
  { id: "gates", label: "Gates", href: "#/studio/gates" },
  { id: "audit", label: "Audit", href: "#/studio/audit" },
];

// A 300px strip holding seven 90px links on a 100px pitch: 700px of content.
function mockStripLayout(): void {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
    return this.tagName === "NAV" ? 300 : 0;
  });
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(function (this: HTMLElement) {
    return this.tagName === "NAV" ? 700 : 0;
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const left = this.tagName === "A" ? Number(this.textContent?.replace("Link ", "")) * 100 - (this.parentElement as HTMLElement).scrollLeft : 0;
    const width = this.tagName === "A" ? 90 : 300;
    return { left, right: left + width, width, top: 0, bottom: 40, height: 40, x: left, y: 0, toJSON: () => ({}) } as DOMRect;
  });
}

afterEach(() => vi.restoreAllMocks());

describe("TabLinks", () => {
  it("renders one labelled nav with one link per entry, at its href", () => {
    render(<TabLinks links={studio} active="gates" label="Studio sections" />);
    const nav = screen.getByRole("navigation", { name: "Studio sections" });
    const links = Array.from(nav.querySelectorAll("a"));
    expect(links.map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Streams", "#/studio/streams"],
      ["Gates", "#/studio/gates"],
      ["Audit", "#/studio/audit"],
    ]);
    expect(screen.queryAllByRole("tab")).toEqual([]);
  });

  it("marks exactly the active entry as the current page", () => {
    render(<TabLinks links={studio} active="audit" label="Studio sections" />);
    const current = screen.getAllByRole("link").filter((link) => link.getAttribute("aria-current") !== null);
    expect(current.map((link) => [link.textContent, link.getAttribute("aria-current")])).toEqual([["Audit", "page"]]);
  });

  it("marks nothing when the active id names no entry", () => {
    render(<TabLinks links={studio} active="console" label="Studio sections" />);
    expect(screen.getAllByRole("link").filter((link) => link.hasAttribute("aria-current"))).toEqual([]);
  });

  it("leaves every link in the tab order, as plain links", () => {
    render(<TabLinks links={studio} active="gates" label="Studio sections" />);
    expect(screen.getAllByRole("link").map((link) => link.getAttribute("tabindex"))).toEqual([null, null, null]);
  });

  it("refuses a set above the cap, as Tabs does", () => {
    const eight = Array.from({ length: 8 }, (_, i) => ({ id: `l${i}`, label: `Link ${i}`, href: `#/${i}` }));
    expect(() => render(<TabLinks links={eight} active="l0" label="Sections" />)).toThrow(/8 links exceeds the cap of 7/);
    expect(() => render(<TabLinks links={eight.slice(0, 7)} active="l0" label="Sections" />)).not.toThrow();
  });

  it("scrolls a current link off the right edge into view on mount", () => {
    mockStripLayout();
    const seven = Array.from({ length: 7 }, (_, i) => ({ id: `l${i}`, label: `Link ${i}`, href: `#/${i}` }));
    render(<TabLinks links={seven} active="l5" label="Sections" />);
    const nav = screen.getByRole("navigation");
    expect(nav.scrollLeft).toBe(290);
    expect(nav.hasAttribute("data-fade-start")).toBe(true);
  });

  it("draws the current link like the selected tab, at both levels", () => {
    expect(ruleFor('.tab[aria-current="page"]')).toBe(ruleFor('.tab[aria-selected="true"]'));
    expect(ruleFor('.tab[aria-current="page"]')).toContain("border-bottom-color: var(--ward-color-blue)");
    expect(ruleFor('.strip[data-level="2"] .tab[aria-current="page"]')).toContain("border-bottom-color: var(--ward-color-text)");
  });

  it("drops the body-link underline and darkens on hover", () => {
    expect(ruleFor("a.tab")).toContain("text-decoration: none");
    expect(ruleFor("a.tab:hover")).toContain("color: var(--ward-color-text)");
  });
});
