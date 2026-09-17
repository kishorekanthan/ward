import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StageHistory, type StageEntry } from "./StageHistory";

const entries: StageEntry[] = [
  { stage: "Intake", sentence: "Raised from a chat session.", at: "2026-09-02T09:04:00Z", actor: "M. Chen", state: "done" },
  { stage: "Triage", sentence: "Draft KPI config produced.", at: "2026-09-03T11:20:00Z", actor: "triage v2", version: "v7", cost: 0.34, state: "done" },
  { stage: "DPM sign-off", sentence: "Waiting on a decision about the late-arrival window.", at: "2026-09-04T08:10:00Z", actor: "J. Rao", state: "hold" },
];

describe("StageHistory", () => {
  it("refuses an entry that names no actor", () => {
    const orphan = { ...entries[0], actor: "" };
    expect(() => render(<StageHistory entries={[orphan]} />)).toThrow(/names no actor/);
  });

  it("renders the wait it is sitting in as an entry, naming the person", () => {
    render(<StageHistory entries={entries} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[2].textContent).toContain("J. Rao");
    expect(items[2].getAttribute("data-state")).toBe("hold");
  });

  it("marks a hold in amber, never in drift orange", () => {
    render(<StageHistory entries={entries} />);
    const node = screen.getAllByTestId("marker")[2];
    expect(node.style.getPropertyValue("--marker")).toBe("var(--ward-color-amber)");
    expect(node.style.getPropertyValue("--marker")).not.toBe("var(--ward-color-orange)");
  });

  it("shows a cost only where one was spent", () => {
    render(<StageHistory entries={entries} />);
    expect(screen.getAllByRole("listitem")[1].textContent).toContain("$0.34");
    expect(screen.getAllByRole("listitem")[0].textContent).not.toContain("$");
  });

  // Board Item 8b `.tl` meta reads "4 Sep 02:06 · claims-extract v6 · $0.19".
  it("keeps the version beside the stage, and the stamp, actor and cost on one meta line", () => {
    render(<StageHistory entries={entries} />);
    const triage = screen.getAllByRole("listitem")[1];
    expect(screen.getByText("Triage").parentElement?.textContent).toBe("Triagev7");
    expect(screen.getByText("v7").getAttribute("title")).toBe("v7");
    expect(triage.querySelector(".ward-history-meta")?.textContent).toBe("03 Sep 12:20 · triage v2 · $0.34");
    expect(screen.getAllByRole("listitem")[0].querySelector(".ward-history-meta")?.textContent).toBe("02 Sep 10:04 · M. Chen");
  });
});
