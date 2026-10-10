import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

const tabsCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "Tabs.module.css"), "utf8");

function ruleBlock(selector: string): string {
  return tabsCss.match(new RegExp(`(?:^|\\n)${selector.replace(/[.[\]"=]/g, "\\$&")}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
}

const seven = Array.from({ length: 7 }, (_, i) => ({ id: `t${i}`, label: `Tab ${i}` }));

const eight = [...seven, { id: "t7", label: "Tab 7", count: 3 }];

// Every tab is 90px wide and More is 60px, with no gap; the strip is `room` wide.
function mockFit(room: number): void {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
    return this.getAttribute("role") === "tablist" ? room : 0;
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const width = this.hasAttribute("data-more-probe") ? 60 : 90;
    return { left: 0, right: width, width, top: 0, bottom: 40, height: 40, x: 0, y: 0, toJSON: () => ({}) } as DOMRect;
  });
}

// Tabs waiting in More are aria-hidden, so the role query lists only what the strip shows.
const shownLabels = () => screen.getAllByRole("tab").map((tab) => tab.textContent);

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Tabs", () => {
  it("shows all eight tabs in one strip, and no More, when they fit", () => {
    mockFit(1000);
    render(<Tabs label="Stream" tabs={eight} active="t0" onChange={() => {}} />);
    expect(screen.getAllByRole("tablist")).toHaveLength(1);
    expect(shownLabels()).toEqual(["Tab 0", "Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5", "Tab 6", "Tab 7 · 3"]);
  });

  it("moves the tabs that do not fit into More, in order", () => {
    mockFit(300);
    render(<Tabs label="Stream" tabs={eight} active="t0" onChange={() => {}} />);
    // 90 for Tab 0 and 60 for More leave 150: Tab 1 fits, Tab 2 would need 330.
    expect(shownLabels()).toEqual(["Tab 0", "Tab 1", "More"]);
    fireEvent.click(screen.getByRole("tab", { name: "More" }));
    expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toEqual(["Tab 2", "Tab 3", "Tab 4", "Tab 5", "Tab 6", "Tab 7 · 3"]);
  });

  it("keeps the selected tab in the strip, in place of the last tab that fits", () => {
    mockFit(300);
    render(<Tabs label="Stream" tabs={eight} active="t6" onChange={() => {}} />);
    expect(shownLabels()).toEqual(["Tab 0", "Tab 6", "More"]);
    expect(screen.getByRole("tab", { name: "Tab 6" }).getAttribute("aria-selected")).toBe("true");
  });

  it("walks the arrows across the shown tabs into More, and Escape closes More onto its button", () => {
    mockFit(300);
    render(<Tabs label="Stream" tabs={eight} active="t0" onChange={() => {}} />);
    const strip = screen.getByRole("tablist");
    screen.getByRole("tab", { name: "Tab 0" }).focus();
    fireEvent.keyDown(strip, { key: "ArrowRight" });
    fireEvent.keyDown(strip, { key: "ArrowRight" });
    const more = screen.getByRole("tab", { name: "More" });
    expect(document.activeElement).toBe(more);
    expect(more.getAttribute("tabindex")).toBe("0");
    fireEvent.keyDown(more, { key: "ArrowDown" });
    expect(document.activeElement?.textContent).toBe("Tab 2");
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(more);
  });

  it("selects a tab picked in More and puts focus on it, back in the strip", async () => {
    mockFit(300);
    const picked = vi.fn();
    function Host() {
      const [active, setActive] = useState("t0");
      return <Tabs label="Stream" tabs={eight} active={active} onChange={(id) => (picked(id), setActive(id))} />;
    }
    render(<Host />);
    fireEvent.click(screen.getByRole("tab", { name: "More" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Tab 4" }));
    expect(picked).toHaveBeenCalledWith("t4");
    expect(shownLabels()).toEqual(["Tab 0", "Tab 4", "More"]);
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("tab", { name: "Tab 4" })));
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: "More" }));
  });

  it("marks exactly one tab selected", () => {
    render(<Tabs label="Stream" tabs={seven.slice(0, 3)} active="t1" onChange={() => {}} />);
    const selected = screen.getAllByRole("tab").filter((t) => t.getAttribute("aria-selected") === "true");
    expect(selected.map((t) => t.textContent)).toEqual(["Tab 1"]);
  });

  it("keeps one tab stop in the strip and moves with arrows", () => {
    render(<Tabs label="Stream" tabs={seven.slice(0, 3)} active="t0" onChange={() => {}} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((t) => t.getAttribute("tabindex"))).toEqual(["0", "-1", "-1"]);
    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(document.activeElement).toBe(tabs[1]);
  });

  it("marks the second level so it never repeats the primary underline", () => {
    render(<Tabs label="Sessions" level={2} tabs={seven.slice(0, 3)} active="t0" onChange={() => {}} />);
    expect(screen.getByRole("tablist").dataset.level).toBe("2");
  });

  it("reports the tab the reader picked", () => {
    const onChange = vi.fn();
    render(<Tabs label="Stream" tabs={seven.slice(0, 3)} active="t0" onChange={onChange} />);
    fireEvent.click(screen.getAllByRole("tab")[2]);
    expect(onChange).toHaveBeenCalledWith("t2");
  });

  it("sets the selected tab in bold, and only the selected tab", () => {
    expect(ruleBlock('.tab[aria-selected="true"]')).toMatch(/font-weight:\s*600;/);
    expect(ruleBlock(".tab")).not.toMatch(/font-weight/);
  });

  it("reaches the last of seven tabs by keyboard, from the first and from its neighbour", () => {
    render(<Tabs label="Admin" tabs={seven} active="t0" onChange={() => {}} />);
    const tabs = screen.getAllByRole("tab");
    const strip = screen.getByRole("tablist");
    fireEvent.keyDown(strip, { key: "End" });
    expect(document.activeElement).toBe(tabs[6]);
    expect(tabs[6].getAttribute("tabindex")).toBe("0");
    fireEvent.keyDown(strip, { key: "Home" });
    for (let step = 0; step < 6; step++) fireEvent.keyDown(strip, { key: "ArrowRight" });
    expect(document.activeElement).toBe(tabs[6]);
  });

  it("makes the selected last tab the strip's one tab stop", () => {
    render(<Tabs label="Admin" tabs={seven} active="t6" onChange={() => {}} />);
    expect(screen.getAllByRole("tab").map((t) => t.getAttribute("tabindex"))).toEqual(["-1", "-1", "-1", "-1", "-1", "-1", "0"]);
  });

  it("never scrolls or wraps the strip: what does not fit waits in More", () => {
    expect(ruleBlock(".strip.fits")).toMatch(/overflow:\s*visible;/);
    expect(ruleBlock(".strip")).toMatch(/flex-wrap:\s*nowrap;/);
  });
});
