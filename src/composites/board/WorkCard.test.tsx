import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { stubMatchMedia } from "../../test-setup";
import { WorkCard } from "./WorkCard";
import type { BoardItem } from "./types";
import type { LiveEvent } from "../../live/types";

const item: BoardItem = {
  key: "FL-229",
  title: "Late-arriving shipments view",
  stage: "held",
  timeInStage: 273_600_000,
  waitsOn: "J. Rao",
  streamStep: 1,
  changedAt: "2026-09-06T02:14:00Z",
  state: { role: "attention", label: "ON HOLD" },
};

function feedStub() {
  const handlers: { key: string; h: (e: LiveEvent) => void }[] = [];
  return {
    connection: "live" as const,
    subscribe: (key: string, h: (e: LiveEvent) => void) => {
      const entry = { key, h };
      handlers.push(entry);
      return () => handlers.splice(handlers.indexOf(entry), 1);
    },
    emit: (e: LiveEvent) =>
      act(() =>
        handlers.forEach(({ key, h }) => {
          if (key === "*" || e.itemKey === key) h(e);
        }),
      ),
  };
}

let nextId = 0;
const event = (type: LiveEvent["type"], itemKey = "FL-229"): LiveEvent => ({ id: `e${++nextId}`, type, at: "2026-09-06T02:14:00Z", itemKey });

describe("WorkCard", () => {
  /* A standalone card carries no listitem role — that is BoardColumn's to
     confer, via inList — so these select the card by its own identity. */
  const cardIn = (c: HTMLElement) => c.querySelector("[data-ward-card]") as HTMLElement;

  it("always shows time in stage and who it waits on, whatever fields are configured", () => {
    const { container } = render(<WorkCard item={item} fields={[]} onOpen={() => {}} />);
    expect(cardIn(container).textContent).toContain("waits on J. Rao");
    expect(cardIn(container).textContent).toContain("3d 4h in stage");
  });

  it("renders one field span per configured field, wrapping two per row via CSS", () => {
    const { container, rerender } = render(<WorkCard item={item} fields={["key"]} onOpen={() => {}} />);
    expect(cardIn(container).querySelectorAll("p[class*='fields'] > span").length).toBe(1);
    rerender(<WorkCard item={item} fields={["key", "cost", "jiraLink"]} onOpen={() => {}} />);
    expect(cardIn(container).querySelectorAll("p[class*='fields'] > span").length).toBe(3);
  });

  it("takes the listitem role only when told it is in a list", () => {
    const { container, rerender } = render(<WorkCard item={item} onOpen={() => {}} />);
    expect(cardIn(container).getAttribute("role")).toBeNull();
    rerender(<WorkCard item={item} onOpen={() => {}} inList />);
    expect(cardIn(container).getAttribute("role")).toBe("listitem");
  });

  it("renders no last row at all when there is nothing to report", () => {
    const { container } = render(<WorkCard item={item} onOpen={() => {}} />);
    expect(container.querySelectorAll("p")).toHaveLength(2);
  });

  it("renders the last row once there is a finding to report", () => {
    const { container } = render(<WorkCard item={{ ...item, finding: "3 late departures" }} onOpen={() => {}} />);
    expect(container.querySelectorAll("p")).toHaveLength(3);
    expect(screen.getByText("3 late departures")).not.toBeNull();
  });

  it("replaces the state chip with AGENT WORKING while an agent holds the item", () => {
    render(<WorkCard item={{ ...item, run: { agent: "triage v2", startedAt: "2026-09-06T02:14:00Z" } }} onOpen={() => {}} />);
    expect(screen.getByText("AGENT WORKING")).not.toBeNull();
    expect(screen.queryByText("ON HOLD")).toBeNull();
  });

  it("shows drift and hold as two chips, drift first", () => {
    const { container } = render(<WorkCard item={{ ...item, flagged: true }} onOpen={() => {}} />);
    const labels = Array.from(cardIn(container).querySelectorAll("[data-ward-chip]")).map((c) => c.textContent);
    expect(labels).toEqual(["DRIFT FLAG", "ON HOLD"]);
  });

  it("flashes once per event for its own item, and never for another", () => {
    stubMatchMedia(false);
    const feed = feedStub();
    const { container } = render(<WorkCard item={item} onOpen={() => {}} feed={feed} />);
    const card = container.firstElementChild as HTMLElement;
    expect(card.classList.contains("ward-border-flash")).toBe(false);
    feed.emit(event("run.step"));
    expect(card.style.getPropertyValue("--ward-flash-colour")).toBe("var(--ward-color-blue)");
    feed.emit(event("run.finding"));
    expect(card.style.getPropertyValue("--ward-flash-colour")).toBe("var(--ward-color-orange)");
    feed.emit(event("run.finished"));
    expect(card.style.getPropertyValue("--ward-flash-colour")).toBe("var(--ward-color-green)");
    feed.emit(event("run.step", "FL-999"));
    expect(card.style.getPropertyValue("--ward-flash-colour")).toBe("var(--ward-color-green)");
  });

  it("ignores an event id it has already flashed, so a replayed feed does not reflash", () => {
    stubMatchMedia(false);
    const feed = feedStub();
    const { container } = render(<WorkCard item={item} onOpen={() => {}} feed={feed} />);
    const card = container.firstElementChild as HTMLElement;
    const replayed = event("run.step");
    feed.emit(replayed);
    expect(card.style.getPropertyValue("--ward-flash-colour")).toBe("var(--ward-color-blue)");
    card.style.removeProperty("--ward-flash-colour");
    feed.emit(replayed);
    expect(card.style.getPropertyValue("--ward-flash-colour")).toBe("");
  });

  it("does not flash on a heartbeat or a reconnect", () => {
    stubMatchMedia(false);
    const feed = feedStub();
    const { container } = render(<WorkCard item={item} onOpen={() => {}} feed={feed} />);
    const card = container.firstElementChild as HTMLElement;
    feed.emit(event("heartbeat"));
    expect(card.style.getPropertyValue("--ward-flash-colour")).toBe("");
    expect(card.classList.contains("ward-border-flash")).toBe(false);
  });

  it("names the item once, by key and title, behind one button", () => {
    render(<WorkCard item={item} onOpen={() => {}} />);
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "FL-229 Late-arriving shipments view" })).not.toBeNull();
  });

  it("is not a live region", () => {
    const { container } = render(<WorkCard item={item} onOpen={() => {}} feed={feedStub()} />);
    expect(container.querySelector("[aria-live]")).toBeNull();
  });

  // The hit button comes back with the key because a mouse click does not focus it everywhere.
  it("opens on its key and hands back the button that was hit", () => {
    const onOpen = vi.fn();
    render(<WorkCard item={item} onOpen={onOpen} />);
    const hit = screen.getByRole("button");
    hit.click();
    expect(onOpen).toHaveBeenCalledWith("FL-229", hit);
  });
});
