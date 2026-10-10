import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BoardScroller, type BoardLane } from "../index";
import { chooseOption, optionLabels, stubMatchMedia } from "../test-setup";

const original = window.matchMedia;

afterEach(() => {
  window.matchMedia = original;
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// Five 240px lanes in a 1000px board scroll 200px sideways; in a 1200px board they fit.
const BOARD = 1000;
function mockBoardWidth(scroll: number): void {
  const isBoard = (el: HTMLElement) => el.hasAttribute("data-ward-board-scroller");
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
    return isBoard(this) ? BOARD : 0;
  });
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(function (this: HTMLElement) {
    return isBoard(this) ? scroll : 0;
  });
}

const five = ["build", "gate", "other", "build", "gate"].map((id, i) => ({ ...lanes([id])[0], id: `${id}${i}` }));
// The removed label read "5 lanes"; no text of that shape may come back.
const laneCountText = () => screen.queryByText(/\d+ lanes?$/);

function lanes(ids: string[] = ["build", "gate", "other"]): BoardLane[] {
  const all: Record<string, BoardLane> = {
    build: { id: "build", label: "Building", count: 2, content: <section>Building lane</section> },
    gate: { id: "gate", label: "Waiting on us", count: 1, content: <section>Gate lane</section> },
    other: { id: "other", label: "Other stages", count: 0, content: <section>Other lane</section> },
  };
  return ids.map((id) => all[id]);
}

function visibleLanes(): string[] {
  return Array.from(screen.getByRole("region", { name: "Workflow board" }).querySelectorAll("section"), (node) => node.textContent ?? "");
}

describe("BoardScroller lanes", () => {
  it("shows every lane side by side without a selector above the phone edge", () => {
    stubMatchMedia(false);
    render(<BoardScroller lanes={lanes()} />);
    expect(visibleLanes()).toEqual(["Building lane", "Gate lane", "Other lane"]);
    expect(screen.queryByRole("button", { name: "Column" })).toBeNull();
  });

  it("tells the board how many lanes share its width above the phone edge, and only there", () => {
    stubMatchMedia(false);
    const view = render(<BoardScroller lanes={lanes()} />);
    expect(screen.getByRole("region").style.getPropertyValue("--ward-board-lanes")).toBe("3");
    view.rerender(<BoardScroller lanes={lanes(["build", "gate"])} />);
    expect(screen.getByRole("region").style.getPropertyValue("--ward-board-lanes")).toBe("2");
    view.rerender(<BoardScroller><section>Loose</section></BoardScroller>);
    expect(screen.getByRole("region").style.getPropertyValue("--ward-board-lanes")).toBe("");
  });

  it("leaves the lane count unset on the phone's single lane", () => {
    stubMatchMedia(true);
    render(<BoardScroller lanes={lanes()} />);
    expect(screen.getByRole("region").style.getPropertyValue("--ward-board-lanes")).toBe("");
  });

  it("shows one lane on phone and switches it from a labelled selector with counts", () => {
    stubMatchMedia(true);
    render(<BoardScroller lanes={lanes()} />);
    const select = screen.getByRole("button", { name: "Column" });
    expect(optionLabels(select)).toEqual(["Building · 2", "Waiting on us · 1", "Other stages · 0"]);
    expect(visibleLanes()).toEqual(["Building lane"]);
    chooseOption(select, "Waiting on us · 1");
    expect(select.textContent).toBe("Waiting on us · 1");
    expect(visibleLanes()).toEqual(["Gate lane"]);
  });

  it("returns to all lanes when the viewport widens and falls back when the chosen lane disappears", () => {
    const media = stubMatchMedia(true);
    const view = render(<BoardScroller lanes={lanes()} />);
    chooseOption(screen.getByRole("button", { name: "Column" }), "Other stages · 0");
    view.rerender(<BoardScroller lanes={lanes(["build", "gate"])} />);
    expect(visibleLanes()).toEqual(["Building lane"]);
    act(() => media.setMatches(false));
    expect(visibleLanes()).toEqual(["Building lane", "Gate lane"]);
  });
});

describe("BoardScroller overflow", () => {
  it("fades the right edge while lanes sit beyond it, and drops the fade once scrolled to the end", () => {
    stubMatchMedia(false);
    mockBoardWidth(1200);
    render(<BoardScroller lanes={five} />);
    const region = screen.getByRole("region");
    expect(region.hasAttribute("data-fade-end")).toBe(true);
    region.scrollLeft = 200;
    fireEvent.scroll(region);
    expect(region.hasAttribute("data-fade-end")).toBe(false);
  });

  it("shows no fade when every lane fits", () => {
    stubMatchMedia(false);
    mockBoardWidth(BOARD);
    render(<BoardScroller lanes={five} />);
    expect(screen.getByRole("region").hasAttribute("data-fade-end")).toBe(false);
  });

  it("fades the left edge only once the lanes are scrolled from the start", () => {
    stubMatchMedia(false);
    mockBoardWidth(1200);
    render(<BoardScroller lanes={five} />);
    const region = screen.getByRole("region");
    expect(region.hasAttribute("data-fade-start")).toBe(false);
    region.scrollLeft = 100;
    fireEvent.scroll(region);
    expect([region.hasAttribute("data-fade-start"), region.hasAttribute("data-fade-end")]).toEqual([true, true]);
    region.scrollLeft = 0;
    fireEvent.scroll(region);
    expect(region.hasAttribute("data-fade-start")).toBe(false);
  });

  it("names no lane count while lanes overflow, at the scrolled end, or when they fit", () => {
    stubMatchMedia(false);
    mockBoardWidth(1200);
    const view = render(<BoardScroller lanes={five} />);
    expect(laneCountText()).toBeNull();
    const region = screen.getByRole("region");
    region.scrollLeft = 200;
    fireEvent.scroll(region);
    expect(laneCountText()).toBeNull();
    view.unmount();
    mockBoardWidth(BOARD);
    render(<BoardScroller lanes={five} />);
    expect(laneCountText()).toBeNull();
  });

  it("shows the fade once a resize makes lanes overflow", () => {
    const fires: (() => void)[] = [];
    vi.stubGlobal("ResizeObserver", class {
      constructor(cb: () => void) { fires.push(cb); }
      observe() {}
      disconnect() {}
    });
    stubMatchMedia(false);
    mockBoardWidth(BOARD);
    render(<BoardScroller lanes={five} />);
    expect(screen.getByRole("region").hasAttribute("data-fade-end")).toBe(false);
    mockBoardWidth(1200);
    act(() => fires.forEach((fire) => fire()));
    expect(screen.getByRole("region").hasAttribute("data-fade-end")).toBe(true);
  });
});
