import { fireEvent, render, screen } from "@testing-library/react";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import { injectModuleCss } from "../test-css";
import s from "./layout.module.css";
import { StageGrid } from "./StageGrid";

// Six 176px stage columns in a 375px phone column.
const PHONE = { client: 375, scroll: 1056 };

function mockGridLayout(scroll: number): void {
  const isGrid = (el: HTMLElement) => el.hasAttribute("data-ward-stage-grid");
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
    return isGrid(this) ? PHONE.client : 0;
  });
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(function (this: HTMLElement) {
    return isGrid(this) ? scroll : 0;
  });
}

const six = ["Intake", "Triage", "Build", "Review", "Release", "Done"].map((label) => <section key={label}>{label}</section>);

let removeCss = () => {};
afterEach(() => {
  removeCss();
  vi.restoreAllMocks();
});

describe("StageGrid", () => {
  it("is a keyboard-scrollable labelled region that lays out one track per column", () => {
    render(<StageGrid columns={6} label="Workflow stages">{six}</StageGrid>);
    const grid = screen.getByRole("region", { name: "Workflow stages" });
    expect(grid.tabIndex).toBe(0);
    expect(grid.style.getPropertyValue("--ward-stage-grid-columns")).toBe("6");
  });

  it("keeps one track when a stream has no stages yet", () => {
    render(<StageGrid columns={0}>{null}</StageGrid>);
    expect(screen.getByRole("region", { name: "Stages" }).style.getPropertyValue("--ward-stage-grid-columns")).toBe("1");
  });

  it("scrolls sideways inside the grid, not the page", () => {
    removeCss = injectModuleCss(join(dirname(fileURLToPath(import.meta.url)), "layout.module.css"), s);
    render(<StageGrid columns={6}>{six}</StageGrid>);
    const style = getComputedStyle(screen.getByRole("region"));
    expect(style.overflowX).toBe("auto");
    expect(style.minWidth).toBe("0px");
  });

  it("fades the edges that hide columns at phone width, following the scroll", () => {
    mockGridLayout(PHONE.scroll);
    render(<StageGrid columns={6}>{six}</StageGrid>);
    const grid = screen.getByRole("region");
    const fades = () => [grid.hasAttribute("data-fade-start"), grid.hasAttribute("data-fade-end")];
    expect(fades()).toEqual([false, true]);
    grid.scrollLeft = 300;
    fireEvent.scroll(grid);
    expect(fades()).toEqual([true, true]);
    grid.scrollLeft = PHONE.scroll - PHONE.client;
    fireEvent.scroll(grid);
    expect(fades()).toEqual([true, false]);
  });

  it("shows no fade when every column fits", () => {
    mockGridLayout(PHONE.client);
    render(<StageGrid columns={2}>{six.slice(0, 2)}</StageGrid>);
    const grid = screen.getByRole("region");
    expect([grid.hasAttribute("data-fade-start"), grid.hasAttribute("data-fade-end")]).toEqual([false, false]);
  });

  it("floors tracker columns at the wider board-column width", () => {
    removeCss = injectModuleCss(join(dirname(fileURLToPath(import.meta.url)), "layout.module.css"), s);
    const { rerender } = render(<StageGrid columns={4}>{six.slice(0, 4)}</StageGrid>);
    const floor = () => getComputedStyle(screen.getByRole("region")).getPropertyValue("--ward-stage-grid-floor").trim();
    expect(floor()).toBe("var(--ward-width-stageColumn)");
    rerender(<StageGrid columns={4} floor="column">{six.slice(0, 4)}</StageGrid>);
    expect(floor()).toBe("var(--ward-width-colFloor)");
  });
});
