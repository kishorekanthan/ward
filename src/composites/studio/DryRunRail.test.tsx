import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { LiveEvent } from "../../live/types";
import { DryRunRail, type DryRun, type DryRunFeed, type FoundryDryRun } from "./DryRunRail";
import type { GateItem } from "./GateChecklist";

const RUN: FoundryDryRun = {
  status: "passed", gateCount: 1, cost: 0.11, turns: [5, 8],
  sample: { key: "T-012", title: "Backfill claims", replayedFrom: "2026-09-04T01:14:00Z" },
  steps: [{ kind: "action", title: "Read manifest" }, { kind: "notSimulated", title: "Waiting on human" }],
};
const MET = [{ met: true, text: "Dry run passed" }];

function feed(): { value: DryRunFeed; emit: () => void; count: () => number } {
  const handlers = new Set<(event: LiveEvent) => void>();
  return {
    value: { connection: "live", subscribe: (_key, handler) => { handlers.add(handler); return () => handlers.delete(handler); } },
    emit: () => handlers.forEach((handler) => handler({ id: "e1", type: "run.step", at: "2026-09-06T10:00:00Z", step: { label: "Read manifest", tool: "foundry.query" } })),
    count: () => handlers.size,
  };
}

describe("DryRunRail foundry presentation", () => {
  it("uses the exact compatible publish blockers and omits the action without a callback", () => {
    const { rerender } = render(<DryRunRail presentation="foundry" run={RUN} checklist={MET} feed={null} />);
    expect(screen.queryByRole("button", { name: "Publish" })).toBeNull();
    const onPublish = vi.fn();
    rerender(<DryRunRail presentation="foundry" run={{ ...RUN, status: "failed" }} checklist={MET} feed={null} onPublish={onPublish} />);
    const button = screen.getByRole("button", { name: "Publish" }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(document.getElementById(button.getAttribute("aria-describedby") ?? "")?.textContent).toBe("dry run failed");
    rerender(<DryRunRail presentation="foundry" run={RUN} checklist={MET} feed={null} onPublish={onPublish} />);
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));
    expect(onPublish).toHaveBeenCalledTimes(1);
  });

  it("requires an unsimulated step only for completed gate traces", () => {
    const invalid = { ...RUN, steps: RUN.steps.filter((step) => step.kind !== "notSimulated") };
    expect(() => render(<DryRunRail presentation="foundry" run={invalid} checklist={MET} feed={null} />)).toThrow(/notSimulated/);
    expect(() => render(<DryRunRail presentation="foundry" run={{ ...invalid, status: "running" }} checklist={MET} feed={null} />)).not.toThrow();
  });

  it("appends subscribed steps, resets from a new run, and unsubscribes", () => {
    const source = feed();
    const running = { ...RUN, status: "running" as const, steps: [] };
    const view = render(<DryRunRail presentation="foundry" run={running} checklist={MET} feed={source.value} />);
    expect(source.count()).toBe(1);
    act(source.emit);
    expect(screen.getByText("Read manifest").parentElement?.textContent).toContain("· foundry.query");
    view.rerender(<DryRunRail presentation="foundry" run={{ ...running, steps: [{ kind: "ok", title: "Fresh step" }] }} checklist={MET} feed={source.value} />);
    expect(screen.queryByText("Read manifest")).toBeNull();
    expect(screen.getByText("Fresh step")).not.toBeNull();
    view.unmount();
    expect(source.count()).toBe(0);
  });
});

const wait = { kind: "notSimulated" as const, title: "Reviewer sign-off", detail: "A human wait is never simulated." };

const steps: DryRun["steps"] = [
  { kind: "ok", title: "foundry.query", detail: "1.2s · 84 rows" },
  { kind: "finding", title: "Missing carrier reference", detail: "Held for clarification." },
  wait,
];

const run: DryRun = { status: "passed", steps, cost: 0.34, turns: [3, 8], sample: { key: "T-024", title: "Late shipment", replayedFrom: "06 Sep 02:14" } };

const complete: GateItem[] = [
  { met: true, text: "Two reviewers named." },
  { met: true, text: "Dry run replayed on a real item." },
];

const incomplete: GateItem[] = [complete[0], { met: false, text: "Dry run replayed on a real item." }];

const NOTE = "Publishing mounts the agent on the live stream.";

describe("DryRunRail", () => {
  it("refuses a trace with a gate but no unsimulated human wait", () => {
    expect(() =>
      render(<DryRunRail run={{ ...run, steps: steps.slice(0, 2) }} checklist={complete} publishNote={NOTE} onPublish={() => {}} />),
    ).toThrow(/notSimulated/);
  });

  it("never renders the human wait as a passing step", () => {
    render(<DryRunRail run={run} checklist={complete} publishNote={NOTE} onPublish={() => {}} />);
    const step = screen.getByText("Reviewer sign-off").closest("li") as HTMLElement;
    expect(within(step).queryByTestId("marker")).toBeNull();
    expect(step.querySelector('[data-hollow="true"]')).not.toBeNull();
  });

  it("states the gap as the disabled Publish button's reason", () => {
    const onPublish = vi.fn();
    render(<DryRunRail run={run} checklist={incomplete} publishNote={NOTE} onPublish={onPublish} />);
    const btn = screen.getByRole("button", { name: "Publish" }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(document.getElementById(btn.getAttribute("aria-describedby") as string)?.textContent).toBe(
      "Publish is disabled: 1 of 2 gate conditions unmet — Dry run replayed on a real item.",
    );
    fireEvent.click(btn);
    expect(onPublish).not.toHaveBeenCalled();
  });

  it("holds Publish while the dry run is in progress and says so", () => {
    const running: DryRun = { ...run, status: "running", startedAt: new Date().toISOString(), steps: [...steps, { kind: "running", title: "policy.check", detail: "open" }] };
    render(<DryRunRail run={running} checklist={complete} publishNote={NOTE} onPublish={() => {}} />);
    const btn = screen.getByRole("button", { name: "Publish" }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(document.getElementById(btn.getAttribute("aria-describedby") as string)?.textContent).toMatch(/dry run in progress/);
    expect(screen.getByText("RUNNING").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-running-bg)");
    expect(screen.getAllByRole("timer").length).toBeGreaterThan(0);
    expect(screen.getByText("policy.check").closest("li")?.getAttribute("aria-current")).toBe("step");
  });

  it("publishes only on a complete checklist", () => {
    const onPublish = vi.fn();
    render(<DryRunRail run={run} checklist={complete} publishNote={NOTE} onPublish={onPublish} />);
    const btn = screen.getByRole("button", { name: "Publish" }) as HTMLButtonElement;
    expect(btn.disabled).toBe(false);
    fireEvent.click(btn);
    expect(onPublish).toHaveBeenCalledTimes(1);
  });

  it("maps each run status onto its status chip", () => {
    const { unmount } = render(<DryRunRail run={{ ...run, status: "notRun" }} checklist={complete} publishNote={NOTE} onPublish={() => {}} />);
    expect(screen.getByText("NOT RUN").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-pending-bg)");
    unmount();
    render(<DryRunRail run={{ ...run, status: "failed" }} checklist={complete} publishNote={NOTE} onPublish={() => {}} />);
    expect(screen.getByText("FAILED").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-failed-bg)");
  });

  it("keeps the rail out of the live-region budget and states cost and turns as words", () => {
    const { container } = render(<DryRunRail run={run} checklist={complete} publishNote={NOTE} onPublish={() => {}} />);
    expect(container.querySelector("[aria-live]")).toBeNull();
    expect(screen.getByText("$0.34")).not.toBeNull();
    expect(screen.getByText("3 / 8")).not.toBeNull();
    expect(screen.getByText(NOTE)).not.toBeNull();
  });
});

describe("DryRunRail trace header", () => {
  const base = { publishNote: "note", onPublish: () => {} };

  it("names the step count and the run duration through fmt/duration", () => {
    render(<DryRunRail {...base} run={{ ...run, durationMs: 38_000 }} checklist={complete} />);
    expect(screen.getByText("Trace · 3 steps · 38s")).toBeTruthy();
  });

  it("drops the duration segment for a run that was never timed", () => {
    render(<DryRunRail {...base} run={run} checklist={complete} />);
    expect(screen.getByText("Trace · 3 steps")).toBeTruthy();
  });

  it("says step, not steps, for a one-step run", () => {
    render(<DryRunRail {...base} run={{ ...run, steps: [steps[0]] }} checklist={[]} />);
    expect(screen.getByText("Trace · 1 step")).toBeTruthy();
  });

  // A run with nothing to trace shows no trace, not an empty labelled list.
  it("renders no trace at all when there are no steps", () => {
    render(<DryRunRail {...base} run={{ status: "notRun", steps: [] }} checklist={[]} />);
    expect(screen.queryByText(/^Trace/)).toBeNull();
  });

  it("labels the step list by that header, so the list is not anonymous", () => {
    const { container } = render(<DryRunRail {...base} run={run} checklist={complete} />);
    const list = container.querySelector("ol[aria-labelledby]");
    expect(list).toBeTruthy();
    expect(container.querySelector(`#${list?.getAttribute("aria-labelledby")}`)?.textContent).toBe("Trace · 3 steps");
  });
});
