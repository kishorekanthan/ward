import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BoardHeader } from "./BoardHeader";

const stream = { name: "Order Recovery", key: "order-repair", streamStep: 3 } as const;

const full = {
  stream: { name: "DATA-ENG", key: "FL", streamStep: 1 as const },
  rollups: { inFlight: 14, loadedThisWeek: 1204, agentsWorking: 3, p50: 273_600_000 },
  connection: "live" as const,
  lastEventAt: "2026-09-06T02:14:00Z",
  owners: [{ value: "all", label: "All owners" }],
  owner: "all",
  onOwnerChange: () => {},
  onConfigure: () => {},
};

describe("BoardHeader", () => {
  it("owns the board's only live region", () => {
    const { container } = render(<BoardHeader {...full} />);
    const live = container.querySelectorAll("[aria-live]");
    expect(live).toHaveLength(1);
    expect((live[0] as HTMLElement).getAttribute("aria-live")).toBe("polite");
  });

  it("puts the rollup through the formatters, never raw numbers", () => {
    render(<BoardHeader {...full} />);
    const line = screen.getByText(/in flight/);
    expect(line.textContent).toContain("1,204 loaded this week");
    expect(line.textContent).toContain("P50 3d 4h");
  });

  it("shows connection as a state, not a spinner", () => {
    render(<BoardHeader {...full} connection="reconnecting" />);
    expect(screen.getByRole("status").textContent).toContain("RECONNECTING");
  });

  it("offers the configure action from the header, not from a column", () => {
    render(<BoardHeader {...full} />);
    expect(screen.getByRole("button", { name: "Configure board" })).not.toBeNull();
  });

  it("makes the control row a reachable, named scroll region", () => {
    const { container } = render(<BoardHeader {...full} />);
    const top = screen.getByRole("region", { name: "Board header controls" });
    expect(top.getAttribute("tabindex")).toBe("0");
    expect(container.firstElementChild?.lastElementChild).toBe(top);
  });
});

describe("BoardHeader rollups and actions", () => {
  it("omits rollups the caller does not know instead of printing zeros", () => {
    const { container } = render(
      <BoardHeader stream={stream} rollups={{ inFlight: 3, loadedThisWeek: 1 }} connection="live" lastEventAt={null} />,
    );

    expect(container.querySelector("[aria-live='polite']")?.textContent).toBe("3 in flight · 1 loaded this week");
  });

  it("keeps a supplied agents count and places page actions after Configure board", () => {
    const { container } = render(
      <BoardHeader
        stream={stream}
        rollups={{ inFlight: 2, loadedThisWeek: 0, agentsWorking: 4 }}
        connection="live"
        lastEventAt={null}
        onConfigure={() => {}}
        actions={<button type="button">Raise request</button>}
      />,
    );

    expect(container.querySelector("[aria-live='polite']")?.textContent).toBe("2 in flight · 0 loaded this week · 4 agents working");
    const labels = screen.getAllByRole("button").map((button) => button.textContent);
    expect(labels.filter((label) => label === "Configure board" || label === "Raise request")).toEqual([
      "Configure board",
      "Raise request",
    ]);
  });

  it("states an unknown loaded count as unavailable and prints known cycle times", () => {
    const { container, rerender } = render(<BoardHeader stream={stream} rollups={{ inFlight: 3 }} connection="live" lastEventAt={null} />);
    const line = () => container.querySelector("[aria-live='polite']")?.textContent;
    expect(line()).toBe("3 in flight · loaded this week unavailable");

    const cycle = { inFlight: 2, loadedThisWeek: 5, p50: 30 * 3_600_000, p90: 100.5 * 3_600_000 };
    rerender(<BoardHeader stream={stream} rollups={cycle} connection="live" lastEventAt={null} />);
    expect(line()).toBe("2 in flight · 5 loaded this week · P50 1d 6h · P90 4d 4h");
  });

  it("names the board with the stream as its page heading, followed by the key tag", () => {
    render(<BoardHeader {...full} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect([heading.textContent, heading.nextElementSibling?.textContent]).toEqual(["DATA-ENG", "FL"]);
  });

  it("draws the stream mark before the name only when a mark_ref is set, and the plain swatch otherwise", () => {
    const view = (markRef?: string) => (
      <BoardHeader stream={{ ...stream, markRef }} rollups={{ inFlight: 0, loadedThisWeek: 0 }} connection="live" lastEventAt={null} />
    );
    const { container, rerender } = render(view("initials:order-repair"));
    const mark = requiredMark(container);
    expect([mark.textContent, mark.getAttribute("data-mark-ref"), mark.style.getPropertyValue("--stream")]).toEqual([
      "OR",
      "initials:order-repair",
      "var(--ward-stream-3-id)",
    ]);
    expect(mark.nextElementSibling?.textContent).toBe("Order Recovery");

    rerender(view("mark:9f2c"));
    expect(requiredMark(container).textContent).toBe("");
    expect(container.querySelector("[data-ward-stream-swatch]")).toBeNull();
    rerender(view());
    expect(markOf(container)).toBeNull();
    expect(container.querySelector("[data-ward-stream-swatch]")?.nextElementSibling?.textContent).toBe("Order Recovery");
  });
});

function markOf(container: HTMLElement): HTMLElement | null {
  return container.querySelector<HTMLElement>(".ward-stream-mark");
}

function requiredMark(container: HTMLElement): HTMLElement {
  const mark = markOf(container);
  if (mark === null) throw new Error("no stream mark");
  return mark;
}
