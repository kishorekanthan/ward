import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PreviewRail } from "./PreviewRail";
import type { BoardConfig, BoardItem } from "./types";

const sample: BoardItem[] = [
  {
    key: "FL-231",
    title: "Add cycle-time KPI function",
    stage: "implement",
    timeInStage: 3_600_000,
    waitsOn: "J. Rao",
    streamStep: 1,
    changedAt: "2026-09-06T02:14:00Z",
  },
];

const draft: BoardConfig = {
  columns: [{ id: "implement", label: "Implementing", cap: 6, gate: false }],
  fields: ["key", "cost"],
  sort: "oldest",
};

describe("PreviewRail", () => {
  it("previews with the board's own card renderer, not a second one", () => {
    render(<PreviewRail draft={draft} sample={sample} effects={[]} />);
    const cards = screen.getAllByRole("listitem");
    expect(cards.length).toBeGreaterThan(0);
    expect(cards[0].textContent).toContain("waits on J. Rao");
  });

  it("follows the draft's fields, so the preview shows what the board will", () => {
    const withCost = [{ ...sample[0], cost: 0.34 }];
    /* The standalone preview card, which renders before the column strip. It
       carries no listitem role, so select it by identity — picking
       getAllByRole("listitem")[0] would silently land on the first column card
       instead and the assertions would pass for the wrong element. */
    const previewCard = () => screen.getByLabelText("Preview").querySelector("[data-ward-card]") as HTMLElement;
    const { rerender } = render(<PreviewRail draft={draft} sample={withCost} effects={[]} />);
    expect(previewCard().textContent).toContain("FL-231");
    expect(previewCard().textContent).toContain("$0.34");
    rerender(<PreviewRail draft={{ ...draft, fields: [] }} sample={withCost} effects={[]} />);
    expect(previewCard().textContent).not.toContain("$0.34");
  });

  it("shows the card the chosen sort would put at the head of a column", () => {
    const fresh = { ...sample[0], key: "FL-232", timeInStage: 60_000 };
    const cardKey = () => (screen.getByLabelText("Preview").querySelector("[data-ward-card]")?.textContent ?? "").match(/FL-\d+/)?.[0];
    const { rerender } = render(<PreviewRail draft={draft} sample={[fresh, sample[0]]} effects={[]} />);
    expect(cardKey()).toBe("FL-231");
    rerender(<PreviewRail draft={{ ...draft, sort: "newest" }} sample={[fresh, sample[0]]} effects={[]} />);
    expect(cardKey()).toBe("FL-232");
  });

  it("lists the effects of the draft as an unticked-until-met checklist", () => {
    const text = "Two items would sit over the new cap.";
    /* GateChecklist folds its marker's own label into the accessible name, so
       match on the effect's sentence rather than on the whole name. */
    const box = () => screen.getByRole("checkbox", { name: new RegExp(text.replace(".", "\\.")) });
    const { rerender } = render(<PreviewRail draft={draft} sample={sample} effects={[{ met: false, text }]} />);
    expect(box().getAttribute("aria-checked")).toBe("false");
    rerender(<PreviewRail draft={draft} sample={sample} effects={[{ met: true, text }]} />);
    expect(box().getAttribute("aria-checked")).toBe("true");
  });

  // .strip is a horizontal scroll container, so a keyboard cannot scroll it without a stop of its own.
  it("makes the column strip a reachable, named group", () => {
    render(<PreviewRail draft={draft} sample={sample} effects={[]} />);
    const strip = screen.getByRole("group", { name: "Column preview" });
    expect(strip.getAttribute("tabindex")).toBe("0");
    expect(strip.querySelector("section[aria-labelledby]")).not.toBeNull();
  });

  it("comes after its subject as an aside", () => {
    const { container } = render(<PreviewRail draft={draft} sample={sample} effects={[]} />);
    expect(container.firstElementChild?.tagName).toBe("ASIDE");
  });

  it("draws a skeleton strip as one bar per item, and rings the gate column", () => {
    const two = [sample[0], { ...sample[0], key: "FL-232" }];
    const gated: BoardConfig = { ...draft, columns: [...draft.columns, { id: "review", label: "Waiting on us", gate: true }] };
    render(<PreviewRail draft={gated} sample={two} effects={[]} strip="skeleton" columnsNote="Done shows as a counter." />);
    const strip = screen.getByRole("group", { name: "Column preview" });
    expect(strip.textContent).toBe("Implementing2 itemsWaiting on us0 items");
    expect(strip.querySelector("[data-ward-card]")).toBeNull();
    expect(strip.querySelectorAll("[aria-hidden='true']")).toHaveLength(2);
    expect(strip.querySelector("[data-kind='gate']")?.textContent).toBe("Waiting on us0 items");
    expect(screen.getByText("Done shows as a counter.")).toBeTruthy();
  });

  it("heads each part of the rail the way the comp names them", () => {
    render(<PreviewRail draft={draft} sample={sample} effects={[]} strip="skeleton" />);
    expect(screen.getAllByRole("heading").map((h) => h.textContent)).toEqual(["Live preview", "Card", "Columns · 1 shown", "Effect of this config"]);
  });
});
