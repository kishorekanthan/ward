import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Btn } from "../../primitives/Btn";
import type { DrawerFact } from "../../index";
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

  it("labels the stream of an item with no validated colour step with a meta NO COLOUR chip", () => {
    const chipOf = (streamStep: 2 | 4 | null) => {
      const { unmount } = render(drawer({ item: { ...item, streamStep } }));
      const chip = Array.from(document.querySelectorAll("[data-ward-chip]")).find((el) => /Step|No colour/.test(el.textContent ?? ""));
      const found = [chip?.getAttribute("data-ward-chip"), chip?.textContent];
      unmount();
      return found;
    };
    expect([chipOf(2), chipOf(4), chipOf(null)]).toEqual([["stream", "Step 2"], ["meta", "No colour"], ["meta", "No colour"]]);
  });
});

describe("ItemDrawer app facts", () => {
  const terms = () => screen.getAllByRole("term").map((term) => term.textContent);
  const builtIn = ["Stream", "Workflow", "State", "Time in stage", "Waits on"];
  const tested: DrawerFact = { label: "Tested", value: <span>Passed 2 hours ago</span> };

  it("puts an app fact after the built-in and Blocked rows and before Running", () => {
    const busy: ItemDetail = { ...item, blockedReason: "Carrier feed is down", run: { agent: "triage v2", startedAt: "2026-09-06T02:14:00Z" } };
    render(drawer({ item: busy, facts: [tested] }));
    expect(terms()).toEqual(["Stream", "Workflow", "State", "Time in stage", "Waits on", "Blocked", "Tested", "Running"]);
  });

  it("renders the fact's label and value node in a row built like the built-in rows", () => {
    render(drawer({ facts: [tested] }));
    const [, , , , waitsOn, label] = screen.getAllByRole("term");
    const value = label.nextElementSibling as HTMLElement;
    expect([label.tagName, label.textContent, value.tagName, value.innerHTML]).toEqual(["DT", "Tested", "DD", "<span>Passed 2 hours ago</span>"]);
    expect([label.className, value.className, label.parentElement?.className]).toEqual([waitsOn.className, waitsOn.nextElementSibling?.className, waitsOn.parentElement?.className]);
  });

  it("adds no row and no markup when the app supplies no facts", () => {
    for (const facts of [undefined, []]) {
      const { unmount } = render(drawer({ facts }));
      expect(terms()).toEqual(builtIn);
      expect(document.querySelector("dl")?.children.length).toBe(5);
      unmount();
    }
  });

  it("keeps a button or link in a fact's value interactive", () => {
    const onOpen = vi.fn();
    const value = (
      <>
        Failed at Storybook build <Btn variant="ghost" size="sm" onClick={onOpen}>Open run</Btn> <a href="/runs/latest">See all runs</a>
      </>
    );
    render(drawer({ facts: [{ label: "Tested", value }] }));
    const button = screen.getByRole("button", { name: "Open run" });
    button.focus();
    expect(document.activeElement).toBe(button);
    fireEvent.click(button);
    expect(onOpen).toHaveBeenCalledTimes(1);
    const link = screen.getByRole("link", { name: "See all runs" });
    link.focus();
    expect([document.activeElement, link.getAttribute("href")]).toEqual([link, "/runs/latest"]);
  });

  it("keeps the Running row mounted when a fact or Blocked appears before it", () => {
    const running: ItemDetail = { ...item, run: { agent: "triage v2", startedAt: "2026-09-06T02:14:00Z" } };
    const { rerender } = render(drawer({ item: running }));
    const runningValue = () => screen.getAllByRole("definition").at(-1);
    const before = runningValue();
    rerender(drawer({ item: { ...running, blockedReason: "Carrier feed is down" }, facts: [tested] }));
    expect(terms().at(-1)).toBe("Running");
    expect(runningValue()).toBe(before);
  });

  it("shows two facts that share a label, in order, without a key clash", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const { rerender } = render(drawer({ facts: [{ label: "Tested", value: "Unit suite passed" }, { label: "Tested", value: "Storybook passed" }] }));
    rerender(drawer({ facts: [{ label: "Tested", value: "Unit suite failed" }, { label: "Tested", value: "Storybook passed" }, { label: "Tested", value: "Lint passed" }] }));
    const values = screen.getAllByRole("definition").slice(5).map((value) => value.textContent);
    expect(values).toEqual(["Unit suite failed", "Storybook passed", "Lint passed"]);
    expect(errors).not.toHaveBeenCalled();
    errors.mockRestore();
  });
});
