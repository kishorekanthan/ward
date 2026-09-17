import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { BoardItem } from "../board/types";
import { AppearanceStrip, type Identity } from "./AppearanceStrip";

const sample = {
  key: "FL-229",
  title: "Late-arriving shipments view",
  stage: "ON HOLD",
  state: { role: "attention" as const, label: "ON HOLD" },
  streamStep: 1 as const,
  timeInStage: 288000000,
  waitsOn: "J. Rao",
  changedAt: "2026-09-04T02:14:00Z",
};

const draft = { key: "REG", name: "Regulatory Ops", streamStep: 3 as const };

describe("AppearanceStrip", () => {
  it("keeps the compact Ward presentation as the default", () => {
    const { container } = render(<AppearanceStrip draft={draft} sample={sample} streams={[{ key: "DE", name: "Data Engineering", streamStep: 1 }]} />);
    expect(container.querySelectorAll("svg rect")).toHaveLength(6);
    expect(screen.queryByText("six adjacent segments, direct-labelled, no legend to lean on.")).toBeNull();
    expect(screen.getByText("Regulatory Ops")).toBeDefined();
  });

  it("renders direct-labelled identities in order and forwards the real work-item key", () => {
    const onOpen = vi.fn();
    const { container } = render(
      <AppearanceStrip
        draft={draft}
        sample={sample}
        streams={[{ key: "DE", name: "Data Engineering", streamStep: 1 }]}
        onOpen={onOpen}
        presentation="detailed"
        identities={[draft, { key: "DE", name: "Data Engineering", streamStep: 1 }, { key: "NEW", name: "New stream", streamStep: null }]}
      />,
    );
    const rects = container.querySelectorAll("svg rect");
    expect(rects).toHaveLength(6);
    expect(rects[0].getAttribute("style")).toContain("var(--ward-stream-3-chip)");
    expect(rects[2].getAttribute("style")).toContain("var(--ward-color-line2)");
    expect(Array.from(container.querySelectorAll(".ward-seglabel")).map((label) => label.textContent)).toEqual(["REG", "DE", "NEW", "—", "—", "—"]);
    expect(screen.getByRole("img", { name: "Overview chart segments" })).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "FL-229 Late-arriving shipments view" }));
    expect(onOpen).toHaveBeenCalledWith("FL-229");
  });

  it("uses a meta chip for an unvalidated detailed draft", () => {
    render(
      <AppearanceStrip
        draft={draft}
        sample={sample}
        streams={[]}
        presentation="detailed"
        identities={[{ key: "NEW", name: "New stream", streamStep: null }]}
      />,
    );
    expect(screen.getAllByText("NEW")[0].className).toContain("ward-chip--meta");
  });
});

const specSample: BoardItem = {
  key: "T-024",
  title: "Reconcile September shipment feed",
  stage: "Agent review",
  timeInStage: 280_000,
  waitsOn: "J. Rao",
  streamStep: 3,
  changedAt: "2026-09-06T01:14:00Z",
};

const specDraft: Identity = { name: "Finance ops", key: "FIN", streamStep: 2 };

describe("AppearanceStrip spec", () => {
  it("always draws the six-segment chart, whatever the ladder holds", () => {
    const { container } = render(<AppearanceStrip draft={specDraft} sample={specSample} streams={[]} />);
    expect(container.querySelectorAll("rect")).toHaveLength(6);
  });

  it("draws the chart itself, statically", () => {
    const { container } = render(<AppearanceStrip draft={specDraft} sample={specSample} streams={[{ name: "DE", key: "DE", streamStep: 1 }]} />);
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector("animate")).toBeNull();
    expect(container.querySelector("animateTransform")).toBeNull();
  });

  it("colours the taken steps and leaves the free ones on the line colour", () => {
    const { container } = render(<AppearanceStrip draft={specDraft} sample={specSample} streams={[{ name: "DE", key: "DE", streamStep: 1 }]} />);
    const fills = [...container.querySelectorAll("rect")].map((r) => r.getAttribute("fill"));
    expect(fills[0]).toContain("--ward-stream-1-id");
    expect(fills[1]).toContain("--ward-stream-2-id");
    expect(fills[2]).toBe("var(--ward-color-line)");
  });

  it("previews the card in the draft's colour, not the sample's", () => {
    const { container } = render(<AppearanceStrip draft={specDraft} sample={specSample} streams={[]} />);
    const card = container.querySelector("[data-ward-card]") as HTMLElement;
    expect(card.style.getPropertyValue("--stream")).toBe("var(--ward-stream-2-id)");
  });

  it("renders a real work card and the stream head", () => {
    render(<AppearanceStrip draft={specDraft} sample={specSample} streams={[]} />);
    expect(screen.getByText(specSample.title)).not.toBeNull();
    expect(screen.getByText("FIN").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-stream-2-chip)");
  });
});
