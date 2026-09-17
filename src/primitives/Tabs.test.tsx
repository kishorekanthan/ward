import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

const seven = Array.from({ length: 7 }, (_, i) => ({ id: `t${i}`, label: `Tab ${i}` }));

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
});
