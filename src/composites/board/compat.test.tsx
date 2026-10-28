import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LegacyBoardHeader, LegacyWorkCard, type LegacyBoardItemView } from "./compat";

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

    expect(screen.getByRole("button").textContent).toContain("Running");
    expect(screen.getByRole("button").textContent).toContain("WL-42");
    expect(screen.getByRole("button").textContent).toContain("1m · waits on Atlas");
  });

  it("labels the time on an idle card with no owner as time in stage", () => {
    render(<LegacyWorkCard item={{ ...item, waitsOn: "", run: undefined }} fields={["key"]} onOpen={() => {}} feed={null} />);
    expect(screen.getByRole("button").textContent).toContain("1m in stage");
    expect(screen.getByRole("button").textContent).not.toContain("waits on");
  });

  it.each([
    [1, "4 open · 2 done this week · 1 agent working"],
    [3, "4 open · 2 done this week · 3 agents working"],
  ])("counts %i working agent(s) in the rollup with the right noun", (agentsWorking, line) => {
    const { container } = render(
      <LegacyBoardHeader stream={{ name: "Ledger", key: "LED", streamStep: 1 }} rollups={{ inFlight: 4, loadedThisWeek: 2, agentsWorking }} connection="live" lastEventAt={null} />,
    );
    expect(container.querySelector(".ward-rollup")?.textContent).toBe(line);
  });
});
