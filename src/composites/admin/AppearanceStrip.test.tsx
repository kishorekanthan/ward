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
    const { container } = render(<AppearanceStrip draft={specDraft} sample={specSample} streams={[]} />);
    expect(container.querySelector<HTMLElement>("section")?.style.getPropertyValue("--stream")).toBe("var(--ward-stream-2-id)");
    expect(screen.getByText(specSample.title)).not.toBeNull();
    expect(screen.getByText("FIN").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-stream-2-chip)");
  });

  it("draws a draft with no validated colour step neutral in both presentations, without throwing", () => {
    for (const streamStep of [4, null]) {
      const kpi = { key: "KPI", name: "KPI Config", streamStep } as unknown as Identity;
      const compact = render(<AppearanceStrip draft={kpi} sample={specSample} streams={[]} />);
      expect([streamOf(compact.container, "[data-ward-card]"), streamOf(compact.container, "section")]).toEqual(["var(--ward-color-line2)", "var(--ward-color-line2)"]);
      expect(compact.getAllByText("KPI")[0].className).toContain("ward-chip--meta");
      expect([...compact.container.querySelectorAll("svg rect")].map((r) => r.getAttribute("fill"))[3]).toBe(streamStep === 4 ? "var(--ward-color-line2)" : "var(--ward-color-line)");
      compact.unmount();
    }
    const validated = render(<AppearanceStrip draft={specDraft} sample={specSample} streams={[]} presentation="detailed" identities={[specDraft]} />);
    expect(firstChipRole(validated.container)).toBe("stream");
    validated.unmount();
    for (const streamStep of [4, null]) {
      const draft = { key: "KPI", name: "KPI Config", streamStep };
      const { container, getAllByText, unmount } = render(<AppearanceStrip draft={specDraft} sample={specSample} streams={[]} presentation="detailed" identities={[draft]} />);
      expect(streamOf(container, "[data-ward-card]")).toBe("var(--ward-color-line2)");
      expect(firstSegmentStyle(container)).toContain("var(--ward-color-line2)");
      expect(getAllByText("KPI")[0].className).toContain("ward-chip--meta");
      unmount();
    }
  });
});

function streamOf(container: HTMLElement, selector: string): string | undefined {
  return container.querySelector<HTMLElement>(selector)?.style.getPropertyValue("--stream");
}

function firstChipRole(container: HTMLElement): string | null | undefined {
  return container.querySelector("[data-ward-chip]")?.getAttribute("data-ward-chip");
}

function firstSegmentStyle(container: HTMLElement): string | null | undefined {
  return container.querySelector("svg rect")?.getAttribute("style");
}

describe("AppearanceStrip detailed rail (comp 9a)", () => {
  const de = { key: "DE", name: "Data Engineering", streamStep: 1 as const };
  const detailed = (extra: Partial<Parameters<typeof AppearanceStrip>[0]> = {}) =>
    render(<AppearanceStrip draft={de} sample={sample} streams={[]} presentation="detailed" identities={[de]} {...extra} />);
  const sectionOf = (name: string) => screen.getByRole("region", { name });

  it("labels its sections in the comp's order", () => {
    const { container } = detailed();
    expect([...container.querySelectorAll("section h4")].map((h) => h.textContent)).toEqual(["Board card", "Streams index row", "Overview chart segment", "Not themeable"]);
  });

  it("reads the index row marker, name, key chip, the marker in the draft's colour", () => {
    detailed();
    const row = sectionOf("Streams index row").querySelector("p") as HTMLElement;
    expect([...row.children].map((c) => c.textContent)).toEqual(["", "Data Engineering", "DE"]);
    expect(row.children[0].className).toContain("ward-marker--stream");
    expect(row.style.getPropertyValue("--stream")).toBe("var(--ward-stream-1-id)");
  });

  it("draws an unvalidated draft's index marker neutral", () => {
    detailed({ identities: [{ key: "KPI", name: "KPI Config", streamStep: 4 }] });
    expect((sectionOf("Streams index row").querySelector("p") as HTMLElement).style.getPropertyValue("--stream")).toBe("var(--ward-color-line2)");
  });

  it("puts the chart note after the chart and shows the Not themeable sentence", () => {
    detailed();
    const chart = [...sectionOf("Overview chart segment").children].map((c) => c.tagName);
    expect(chart).toEqual(["H4", "FIGURE", "P"]);
    expect(sectionOf("Overview chart segment").textContent).toContain("six adjacent segments, direct-labelled, no legend to lean on.");
    expect(sectionOf("Not themeable").textContent).toBe(
      "Not themeableThe action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.",
    );
  });

  it("with no sample keeps the index row and chart, and says why Board card is empty", () => {
    const { container } = detailed({ sample: undefined, sampleEmpty: "Nothing in flight." });
    expect(screen.queryByRole("button")).toBeNull();
    expect(sectionOf("Board card").textContent).toBe("Board cardNothing in flight.");
    expect(sectionOf("Streams index row").textContent).toBe("Streams index rowData EngineeringDE");
    expect(container.querySelectorAll("svg rect")).toHaveLength(6);
  });

  it("falls back to the default Board card sentence", () => {
    detailed({ sample: undefined });
    expect(sectionOf("Board card").textContent).toBe("Board cardNo item in flight to preview.");
  });

  it("draws the sample card inside Board card", () => {
    detailed();
    expect(sectionOf("Board card").querySelector("[data-ward-card]")).not.toBeNull();
  });

  it("omits the card from a compact strip with no sample", () => {
    // A card built from no sample has no key, so data-ward-card alone cannot see it; its open button can.
    const { container } = render(<AppearanceStrip draft={de} streams={[]} />);
    expect(screen.queryByRole("button")).toBeNull();
    expect(container.querySelectorAll("svg rect")).toHaveLength(6);
  });
});
