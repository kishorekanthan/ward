import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LegacyWorkCard, type LegacyBoardItemView } from "./compat";

const item: LegacyBoardItemView = {
  key: "WL-42",
  title: "Reconcile launch metrics",
  streamStep: 2,
  timeInStage: 65_000,
  waitsOn: "review",
  changedAt: "2026-09-06T10:00:00Z",
  run: { agent: "Atlas", startedAt: "2026-09-06T09:59:00Z" },
};

describe("legacy board compatibility", () => {
  it("renders running work cards with their legacy status and metadata", () => {
    render(<LegacyWorkCard item={item} fields={["key"]} onOpen={() => {}} feed={null} />);

    expect(screen.getByRole("button").textContent).toContain("AGENT WORKING");
    expect(screen.getByRole("button").textContent).toContain("WL-42");
    expect(screen.getByRole("button").textContent).toContain("1m · waits on Atlas");
  });
});
