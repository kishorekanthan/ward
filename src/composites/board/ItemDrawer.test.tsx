import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Btn } from "../../primitives/Btn";
import { ItemDrawer, type ItemDetail } from "./ItemDrawer";

const item: ItemDetail = {
  key: "FL-229",
  title: "Late-arriving shipments view",
  stage: "review",
  timeInStage: 93_600_000,
  waitsOn: "A. Whyte",
  streamStep: 1,
  changedAt: "2026-09-06T02:14:00Z",
  summary: "Shipments arriving after the agreed window are not visible to Ops.",
  workflow: "data-eng intake",
  stateLabel: "Needs a human",
};

function drawer(extra: Partial<Parameters<typeof ItemDrawer>[0]> = {}) {
  return (
    <ItemDrawer
      item={item}
      actions={[
        <button key="open" type="button">
          Open in Jira
        </button>,
      ]}
      onClose={() => {}}
      {...extra}
    />
  );
}

const held: ItemDetail = {
  key: "FL-229",
  title: "Late-arriving shipments view",
  stage: "held",
  timeInStage: 273_600_000,
  waitsOn: "J. Rao",
  streamStep: 1,
  changedAt: "2026-09-06T02:14:00Z",
  summary: "A view that folds late arrivals back into the daily counts.",
  workflow: "kpi-config",
  stateLabel: "Held — dpm-signoff",
};

describe("ItemDrawer", () => {
  it("is a modal dialog named by the item title", () => {
    render(<ItemDrawer item={held} actions={[]} onClose={() => {}} />);
    const dialog = screen.getByRole("dialog", { name: "Late-arriving shipments view" });
    expect(dialog.getAttribute("aria-modal")).toBe("true");
  });

  it("names the human it waits on, in the kv block", () => {
    render(<ItemDrawer item={held} actions={[]} onClose={() => {}} />);
    expect(screen.getByText("Waits on").nextElementSibling?.textContent).toBe("J. Rao");
  });

  it("names the agent instead once one holds the item, and shows the counter", () => {
    render(
      <ItemDrawer
        item={{ ...held, run: { agent: "triage v2", startedAt: "2026-09-06T02:14:00Z" } }}
        actions={[]}
        onClose={() => {}}
      />,
    );
    expect(screen.getByText("Waits on").nextElementSibling?.textContent).toBe("triage v2");
    expect(screen.getByRole("timer")).not.toBeNull();
  });

  it("keeps the running row out when nothing is running", () => {
    render(<ItemDrawer item={held} actions={[]} onClose={() => {}} />);
    expect(screen.queryByRole("timer")).toBeNull();
  });

  it("closes on Escape", () => {
    const onClose = vi.fn();
    render(<ItemDrawer item={held} actions={[]} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("renders the actions it is given, and no more", () => {
    render(<ItemDrawer item={held} actions={[<Btn key="a">Nudge owner</Btn>]} onClose={() => {}} />);
    const names = screen.getAllByRole("button").map((b) => b.getAttribute("aria-label") ?? b.textContent);
    expect(names).toEqual(["Close", "Nudge owner"]);
  });
});

describe("ItemDrawer resolve slot", () => {
  it("omits the resolve panel when the caller offers no way out", () => {
    render(drawer());
    expect(screen.queryByRole("region", { name: "Ways out of this hold" })).toBeNull();
  });

  it("puts the resolve controls in their own labelled panel after the actions", () => {
    render(drawer({ resolve: <button type="button">Requeue the agent</button> }));

    const panel = screen.getByRole("region", { name: "Ways out of this hold" });
    expect(within(panel).getByRole("heading", { level: 3 }).textContent).toBe("Ways out of this hold");
    expect(within(panel).getByRole("button", { name: "Requeue the agent" })).toBeDefined();
    const buttons = screen.getAllByRole("button").map((button) => button.textContent);
    expect(buttons.indexOf("Open in Jira")).toBeLessThan(buttons.indexOf("Requeue the agent"));
  });

  it("takes the caller's own wording for the panel label and heading", () => {
    render(drawer({ resolve: <p>Ask the carrier</p>, resolveLabel: "Unblock this item" }));

    const panel = screen.getByRole("region", { name: "Unblock this item" });
    expect(within(panel).getByRole("heading", { level: 3 }).textContent).toBe("Unblock this item");
    expect(screen.queryByRole("region", { name: "Ways out of this hold" })).toBeNull();
  });
});
