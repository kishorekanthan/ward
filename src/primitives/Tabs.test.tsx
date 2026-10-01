import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

const tabsCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "Tabs.module.css"), "utf8");

function ruleBlock(selector: string): string {
  return tabsCss.match(new RegExp(`(?:^|\\n)${selector.replace(/[.[\]"=]/g, "\\$&")}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
}

const seven = Array.from({ length: 7 }, (_, i) => ({ id: `t${i}`, label: `Tab ${i}` }));

// A 300px strip holding seven 90px tabs on a 100px pitch: 700px of content.
const STRIP = { client: 300, scroll: 700 };

function rectAt(left: number, width: number): DOMRect {
  return { left, right: left + width, width, top: 0, bottom: 40, height: 40, x: left, y: 0, toJSON: () => ({}) } as DOMRect;
}

function mockStripLayout(): void {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
    return this.getAttribute("role") === "tablist" ? STRIP.client : 0;
  });
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(function (this: HTMLElement) {
    return this.getAttribute("role") === "tablist" ? STRIP.scroll : 0;
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    if (this.getAttribute("role") !== "tab") return rectAt(0, STRIP.client);
    const strip = this.parentElement as HTMLElement;
    return rectAt(Number(this.id.replace("tab-t", "")) * 100 - strip.scrollLeft, 90);
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Tabs", () => {
  it("refuses a set above the cap rather than wrapping or scrolling", () => {
    expect(() => render(<Tabs label="Admin" tabs={[...seven, { id: "t7", label: "Tab 7" }]} active="t0" onChange={() => {}} />)).toThrow(
      /exceeds the cap of 7/,
    );
  });

  it("accepts the fixed seven-tab Admin set", () => {
    render(<Tabs label="Admin" tabs={seven} active="t0" onChange={() => {}} />);
    expect(screen.getAllByRole("tab")).toHaveLength(7);
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

  it("scrolls the strip, not the page, so a selected tab past the right edge is in view on mount", () => {
    mockStripLayout();
    render(<Tabs label="Admin" tabs={seven} active="t6" onChange={() => {}} />);
    // Tab 6 spans 600-690 in a 300px window: its right edge needs 690 - 300 = 390.
    expect(screen.getByRole("tablist").scrollLeft).toBe(390);
  });

  it("brings back a selected tab that sits left of the scrolled window", () => {
    mockStripLayout();
    const { rerender } = render(<Tabs label="Admin" tabs={seven} active="t6" onChange={() => {}} />);
    rerender(<Tabs label="Admin" tabs={seven} active="t1" onChange={() => {}} />);
    expect(screen.getByRole("tablist").scrollLeft).toBe(100);
  });

  it("leaves the strip where it is when the selected tab is already in view", () => {
    mockStripLayout();
    render(<Tabs label="Admin" tabs={seven} active="t1" onChange={() => {}} />);
    expect(screen.getByRole("tablist").scrollLeft).toBe(0);
  });

  it("fades only the edges that hide tabs, following the scroll", () => {
    mockStripLayout();
    render(<Tabs label="Admin" tabs={seven} active="t0" onChange={() => {}} />);
    const strip = screen.getByRole("tablist");
    const fades = () => [strip.hasAttribute("data-fade-start"), strip.hasAttribute("data-fade-end")];
    expect(fades()).toEqual([false, true]);
    strip.scrollLeft = 200;
    fireEvent.scroll(strip);
    expect(fades()).toEqual([true, true]);
    strip.scrollLeft = 400;
    fireEvent.scroll(strip);
    expect(fades()).toEqual([true, false]);
  });

  it("stops a revealed tab clear of the edge fade, the strip's 24px scroll-padding", () => {
    mockStripLayout();
    const computed = window.getComputedStyle;
    vi.spyOn(window, "getComputedStyle").mockImplementation((el) =>
      el.getAttribute("role") === "tablist" ? ({ scrollPaddingInlineStart: "24px" } as CSSStyleDeclaration) : computed(el),
    );
    const { rerender } = render(<Tabs label="Admin" tabs={seven} active="t2" onChange={() => {}} />);
    const strip = screen.getByRole("tablist");
    // Tab 2 ends at 290, inside the 300px window but under the right fade: 290 - 300 + 24 = 14.
    expect(strip.scrollLeft).toBe(14);
    rerender(<Tabs label="Admin" tabs={seven} active="t6" onChange={() => {}} />);
    expect(strip.scrollLeft).toBe(414);
    // Tab 6 ends at 690: 690 - 300 + 24 = 414. Tab 1 then starts at -314: 414 - 314 - 24 = 76.
    rerender(<Tabs label="Admin" tabs={seven} active="t1" onChange={() => {}} />);
    expect(strip.scrollLeft).toBe(76);
  });

  it("drops the end fade when a tab shrinks and the strip no longer overflows, as when a web font swaps in", () => {
    const observers: { targets: Set<Element>; fire: () => void }[] = [];
    vi.stubGlobal(
      "ResizeObserver",
      class {
        targets = new Set<Element>();
        constructor(cb: () => void) {
          observers.push({ targets: this.targets, fire: cb });
        }
        observe(el: Element) {
          this.targets.add(el);
        }
        disconnect() {
          this.targets.clear();
        }
      },
    );
    mockStripLayout();
    render(<Tabs label="Admin" tabs={seven} active="t0" onChange={() => {}} />);
    const strip = screen.getByRole("tablist");
    expect(strip.hasAttribute("data-fade-end")).toBe(true);
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(STRIP.client);
    const tab = screen.getAllByRole("tab")[3];
    for (const o of observers) if (o.targets.has(tab)) o.fire();
    expect(strip.hasAttribute("data-fade-end")).toBe(false);
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

  it("scrolls an overflowing strip instead of wrapping its tabs", () => {
    expect(ruleBlock(".strip")).toMatch(/overflow-x:\s*auto;/);
    expect(ruleBlock(".strip")).toMatch(/flex-wrap:\s*nowrap;/);
  });
});
