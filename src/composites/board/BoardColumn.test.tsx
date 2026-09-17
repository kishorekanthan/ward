import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BoardColumn } from "./BoardColumn";
import type { BoardItem } from "./types";

const make = (key: string, timeInStage: number): BoardItem => ({
  key,
  title: `Item ${key}`,
  stage: "implement",
  timeInStage,
  waitsOn: "J. Rao",
  streamStep: 1,
  changedAt: "2026-09-06T02:14:00Z",
});

const items = [make("FL-1", 3_600_000), make("FL-2", 86_400_000), make("FL-3", 60_000)];

const column = { id: "waiting", label: "Waiting on us", cap: 2, gate: false };

describe("BoardColumn", () => {
  it("says it is over cap in words as well as tint", () => {
    render(<BoardColumn column={column} items={items} sort="oldest" onOpen={() => {}} />);
    expect(screen.getByRole("status").textContent).toBe("Waiting on us is over cap now — 3 items against 2");
  });

  it("hands card keystrokes to the caller on the column itself, so no wrapper sits between it and the board grid", () => {
    const onKeyDown = vi.fn((event: { currentTarget: EventTarget }) => event.currentTarget);
    const { container } = render(<BoardColumn column={column} items={items} sort="oldest" onOpen={() => {}} onKeyDown={onKeyDown} />);
    fireEvent.keyDown(screen.getAllByRole("button")[1], { key: "ArrowDown" });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown.mock.results[0].value).toBe(container.firstElementChild);
  });

  it("carries no over-cap note while inside the cap", () => {
    render(<BoardColumn column={column} items={items.slice(0, 2)} sort="oldest" onOpen={() => {}} />);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("marks a human gate with a chip, never with the stream colour", () => {
    render(<BoardColumn column={{ ...column, gate: true, cap: undefined }} items={items} sort="oldest" onOpen={() => {}} />);
    expect(screen.getByText("GATE")).not.toBeNull();
  });

  it("puts the oldest item first and reverses on the other sort", () => {
    const { rerender } = render(<BoardColumn column={column} items={items} sort="oldest" onOpen={() => {}} />);
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(3);
    const first = () => screen.getAllByRole("button")[0].textContent;
    expect(first()).toContain("FL-2");
    rerender(<BoardColumn column={column} items={items} sort="newest" onOpen={() => {}} />);
    expect(first()).toContain("FL-3");
  });

  it("gives the column a title attribute so a truncated label stays readable", () => {
    render(<BoardColumn column={column} items={items} sort="oldest" onOpen={() => {}} />);
    expect(screen.getByRole("heading", { level: 2 }).getAttribute("title")).toBe("Waiting on us");
  });

  it("names the section by its own heading", () => {
    render(<BoardColumn column={column} items={items} sort="oldest" onOpen={() => {}} />);
    expect(screen.getByRole("region", { name: "Waiting on us" })).not.toBeNull();
  });
});
