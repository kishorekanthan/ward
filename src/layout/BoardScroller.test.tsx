import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BoardScroller, type BoardLane } from "../index";
import { stubMatchMedia } from "../test-setup";

const original = window.matchMedia;

afterEach(() => {
  window.matchMedia = original;
});

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
