import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fireEvent, render, screen } from "@testing-library/react";
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

const seven = Array.from({ length: 7 }, (_, i) => ({ id: `l${i}`, label: `Link ${i}`, href: `#/${i}` }));

// Every link is 90px wide and More is 60px, with no gap; the strip is `room` wide.
function mockFit(room: number): void {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
    return this.tagName === "NAV" ? room : 0;
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const width = this.hasAttribute("data-more-probe") ? 60 : 90;
    return { left: 0, right: width, width, top: 0, bottom: 40, height: 40, x: 0, y: 0, toJSON: () => ({}) } as DOMRect;
  });
}

// Links waiting in More are aria-hidden, so the role query lists only what the strip shows.
const shownLabels = () => screen.getAllByRole("link").map((link) => link.textContent);

afterEach(() => vi.restoreAllMocks());

describe("TabLinks", () => {
  it("renders one labelled nav with one link per entry, at its href", () => {
    render(<TabLinks level="page" links={studio} active="gates" label="Studio sections" />);
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
    render(<TabLinks level="page" links={studio} active="audit" label="Studio sections" />);
    const current = screen.getAllByRole("link").filter((link) => link.getAttribute("aria-current") !== null);
    expect(current.map((link) => [link.textContent, link.getAttribute("aria-current")])).toEqual([["Audit", "page"]]);
  });

  it("marks nothing when the active id names no entry", () => {
    render(<TabLinks level="page" links={studio} active="console" label="Studio sections" />);
    expect(screen.getAllByRole("link").filter((link) => link.hasAttribute("aria-current"))).toEqual([]);
  });

  it("leaves every link in the tab order, as plain links", () => {
    render(<TabLinks level="page" links={studio} active="gates" label="Studio sections" />);
    expect(screen.getAllByRole("link").map((link) => link.getAttribute("tabindex"))).toEqual([null, null, null]);
  });

  it("is no tab stop itself: its links take focus", () => {
    render(<TabLinks level="section" links={studio} active="gates" label="Studio sections" />);
    expect(screen.getByRole("navigation", { name: "Studio sections" }).hasAttribute("tabindex")).toBe(false);
  });

  it("shows a count after its label, as Tabs does", () => {
    render(<TabLinks level="page" links={[{ id: "open", label: "Open", href: "#/open", count: 14 }, ...studio]} active="open" label="Item states" />);
    expect(screen.getByRole("link", { current: "page" }).textContent).toBe("Open · 14");
  });

  it("refuses a set above the cap, as Tabs does", () => {
    const eight = Array.from({ length: 8 }, (_, i) => ({ id: `l${i}`, label: `Link ${i}`, href: `#/${i}` }));
    expect(() => render(<TabLinks level="page" links={eight} active="l0" label="Sections" />)).toThrow(/8 links exceeds the cap of 7/);
    expect(() => render(<TabLinks level="page" links={eight.slice(0, 7)} active="l0" label="Sections" />)).not.toThrow();
  });

  it("moves the links that do not fit into More, in order, as links to their pages", () => {
    mockFit(300);
    render(<TabLinks level="page" links={seven} active="l0" label="Sections" />);
    // 90 for Link 0 and 60 for More leave 150: Link 1 fits, Link 2 would need 330.
    expect(shownLabels()).toEqual(["Link 0", "Link 1"]);
    fireEvent.click(screen.getByRole("button", { name: "More" }));
    const items = screen.getAllByRole("menuitem").map((item) => [item.textContent, item.getAttribute("href")]);
    expect(items).toEqual([2, 3, 4, 5, 6].map((i) => [`Link ${i}`, `#/${i}`]));
  });

  it("keeps a waiting link's count in More", () => {
    mockFit(300);
    const counted = seven.map((link, i) => (i === 4 ? { ...link, count: 9 } : link));
    render(<TabLinks level="page" links={counted} active="l0" label="Sections" />);
    fireEvent.click(screen.getByRole("button", { name: "More" }));
    expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toContain("Link 4 · 9");
  });

  it("keeps the current link in the strip when it sits past the run", () => {
    mockFit(300);
    render(<TabLinks level="page" links={seven} active="l5" label="Sections" />);
    expect(shownLabels()).toEqual(["Link 0", "Link 5"]);
    expect(screen.getByRole("link", { current: "page" }).textContent).toBe("Link 5");
  });

  it("takes a waiting link out of the tab order, and never scrolls the strip", () => {
    mockFit(300);
    render(<TabLinks level="page" links={seven} active="l0" label="Sections" />);
    const waiting = Array.from(document.querySelectorAll("nav > a[data-overflow]"), (link) => link.getAttribute("tabindex"));
    expect(waiting).toEqual(["-1", "-1", "-1", "-1", "-1"]);
    expect(screen.getByRole("navigation").className).toMatch(/fits/);
  });

  it("shows every link and no More when they fit", () => {
    mockFit(700);
    render(<TabLinks level="page" links={seven} active="l3" label="Sections" />);
    expect(shownLabels()).toEqual(seven.map((link) => link.label));
    expect(screen.queryByRole("button", { name: "More" })).toBeNull();
  });

  it("draws the current link like the selected tab, at both levels", () => {
    expect(ruleFor('.tab[aria-current="page"]')).toBe(ruleFor('.tab[aria-selected="true"]'));
    expect(ruleFor('.tab[aria-current="page"]')).toContain("background: var(--ward-color-sageTint)");
    const section = '.strip[data-level="section"] .tab';
    expect(ruleFor(`${section}[aria-current="page"]`)).toBe(ruleFor(`${section}[aria-selected="true"]`));
    expect(ruleFor(`${section}[aria-current="page"]:hover`)).toBe(ruleFor(`${section}[aria-selected="true"]:hover`));
  });

  it("names the fix when a second page strip of links shows", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<><TabLinks level="page" links={studio} active="gates" label="Studio" /><TabLinks level="page" links={studio} active="audit" label="Admin" /></>);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("marks its level on the strip", () => {
    render(<TabLinks level="section" links={studio} active="gates" label="Studio" />);
    expect(screen.getByRole("navigation").dataset.level).toBe("section");
    expect(screen.getByRole("navigation").className).toContain("ward-tabs--section");
  });

  it("drops the body-link underline and tints on hover", () => {
    expect(ruleFor("a.tab")).toContain("text-decoration: none");
    expect(ruleFor(".tab:hover")).toContain("background: var(--ward-color-accentTint)");
  });
});
