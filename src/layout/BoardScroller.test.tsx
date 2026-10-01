import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BoardScroller, type BoardLane } from "../index";
import { stubMatchMedia } from "../test-setup";

const original = window.matchMedia;

afterEach(() => {
  window.matchMedia = original;
  vi.restoreAllMocks();
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
const laneCount = () => document.querySelector<HTMLElement>("[data-ward-board-lane-count]");

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
    expect(screen.queryByRole("combobox")).toBeNull();
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
    const select = screen.getByRole("combobox", { name: "Column" }) as HTMLSelectElement;
    expect(within(select).getAllByRole("option").map((option) => option.textContent)).toEqual(["Building · 2", "Waiting on us · 1", "Other stages · 0"]);
    expect(visibleLanes()).toEqual(["Building lane"]);
    fireEvent.change(select, { target: { value: "gate" } });
    expect(select.value).toBe("gate");
    expect(visibleLanes()).toEqual(["Gate lane"]);
  });

  it("returns to all lanes when the viewport widens and falls back when the chosen lane disappears", () => {
    const media = stubMatchMedia(true);
    const view = render(<BoardScroller lanes={lanes()} />);
    fireEvent.change(screen.getByRole("combobox", { name: "Column" }), { target: { value: "other" } });
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

  it("shows the lane count only while lanes overflow, including at the scrolled end", () => {
    stubMatchMedia(false);
    mockBoardWidth(1200);
    render(<BoardScroller lanes={five} />);
    expect(laneCount()?.hidden).toBe(false);
    expect(laneCount()?.textContent).toBe("5 lanes");
    const region = screen.getByRole("region");
    region.scrollLeft = 200;
    fireEvent.scroll(region);
    expect(laneCount()?.hidden).toBe(false);
  });

  it("hides the lane count when every lane fits", () => {
    stubMatchMedia(false);
    mockBoardWidth(BOARD);
    render(<BoardScroller lanes={five} />);
    expect(laneCount()?.hidden).toBe(true);
  });

  it("has no lane count for loose children or the phone's single lane", () => {
    mockBoardWidth(1200);
    stubMatchMedia(false);
    const view = render(<BoardScroller><section>Loose</section></BoardScroller>);
    expect(laneCount()).toBeNull();
    view.unmount();
    stubMatchMedia(true);
    render(<BoardScroller lanes={five} />);
    expect(laneCount()).toBeNull();
  });
});
