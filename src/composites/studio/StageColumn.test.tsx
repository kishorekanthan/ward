import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as mod from "./StageColumn";
import { StageColumn, type Stage } from "./StageColumn";
import type { AgentCardProps } from "./AgentCard";

const gate: Stage = {
  index: 3,
  name: "Review",
  kind: "gate",
  count: 6,
  medianWait: 93_600_000,
  reviewers: ["J. Rao", "M. Chen"],
  gateShare: 0.68,
};

const terminal: Stage = { index: 4, name: "Done", kind: "terminal", count: 12, closedThisWeek: 31 };

const agents: AgentCardProps[] = [{
  agent: { id: "a1", name: "Shipment triage", streamStep: 1, versions: [{ v: "V7", status: "live" }] },
  href: "/agents/a1",
}];

describe("StageColumn", () => {
  it("keeps the original numeric-duration presentation and public surface", () => {
    const { container } = render(<StageColumn stage={gate} agents={agents} feed={{ connection: "reconnecting" }} />);
    expect(Object.keys(mod)).toEqual(["StageColumn"]);
    expect(screen.getByRole("heading", { name: "Review" })).toBeDefined();
    expect(screen.getByText("1d 2h median wait")).toBeDefined();
    expect(within(screen.getByText("Reviewers").closest('[data-panel="gate"]') as HTMLElement).getByText("J. Rao")).toBeDefined();
    expect(container.querySelector('[data-accent="amber"]')?.textContent).toContain("68%");
  });

  it("keeps default visuals and the no-argument mount callback", () => {
    const onMount = vi.fn();
    const { container } = render(<StageColumn stage={terminal} onMount={onMount} />);
    expect(container.textContent).toContain("04DoneTERMINAL");
    expect(screen.getByText("31").nextElementSibling?.textContent).toBe("Closed this week");
    fireEvent.click(screen.getByRole("button", { name: "Mount an agent" }));
    expect(onMount).toHaveBeenCalledWith();
  });

  it("renders the workflow heading, gate copy, reviewers, and measured wait", () => {
    const stage = {
      index: 3,
      name: "Review",
      kind: "gate" as const,
      count: 7,
      medianWait: "2d 4h",
      reviewers: [{ initials: "PN", name: "Priya Nayar" }],
      gateShare: 0.68,
    };
    const { container } = render(<StageColumn stage={stage} presentation={{ mode: "workflow" }} />);
    expect(container.querySelector("section")).toBe(screen.getByRole("region", { name: "Stage 03 Review" }));
    expect(screen.getAllByText("HUMAN GATE")).toHaveLength(1);
    expect(screen.getByText("7 items · median wait 2d 4h")).toBeDefined();
    expect(screen.getByText(/^No agent can advance an item out of this stage\. Reviewers:$/)).toBeDefined();
    expect(screen.getByText("Priya Nayar").previousElementSibling?.textContent).toBe("PN");
    expect(screen.getByText("68%").closest("[data-accent]")?.textContent).toBe("68% of elapsed time is spent here");
    expect(screen.queryByRole("button", { name: "+ Mount agent" })).toBeNull();
  });

  it("passes the workflow stage index and preserves supplied cards", () => {
    const onMount = vi.fn();
    render(
      <StageColumn
        stage={{ index: 2, name: "Extract", kind: "agent", count: 6 }}
        agentCards={<article><a href="#/studio/agents/a%2Fb">Mounted agent</a></article>}
        onMount={onMount}
        presentation={{ mode: "workflow" }}
      />,
    );
    expect(screen.getByRole("link", { name: "Mounted agent" }).getAttribute("href")).toBe("#/studio/agents/a%2Fb");
    expect(screen.getByText("6 items")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "+ Mount agent" }));
    expect(onMount).toHaveBeenCalledWith(2);
  });

  it("counts a single waiting item in the singular", () => {
    render(<StageColumn stage={{ index: 3, name: "Review", kind: "gate", count: 1 }} presentation={{ mode: "workflow" }} />);
    expect(screen.getByText("1 item")).toBeDefined();
  });

  it("counts the terminal stage by the week and offers no mount", () => {
    render(<StageColumn stage={{ index: 5, name: "Loaded", kind: "terminal", count: 2, closedThisWeek: 41 }} onMount={vi.fn()} presentation={{ mode: "workflow" }} />);
    expect(screen.getByText("41 this week")).toBeDefined();
    expect(screen.getByText("41").nextElementSibling?.textContent).toBe("items closed this week");
    expect(screen.getByText("TERMINAL")).toBeDefined();
    expect(screen.queryByRole("button", { name: "+ Mount agent" })).toBeNull();
  });
});

describe("StageColumn (spec)", () => {
  it("keeps GatePanel and TerminalCounter internal to the file", () => {
    expect(Object.keys(mod)).toEqual(["StageColumn"]);
  });

  it("states the gate share as an amber stat — never drift orange, never the stream colour", () => {
    const { container } = render(<StageColumn stage={gate} />);
    const cell = screen.getByText("68%").closest("[data-accent]");
    expect(cell?.getAttribute("data-accent")).toBe("amber");
    expect(container.querySelector('[data-accent="blue"]')).toBeNull();
    expect(container.querySelector("section")?.getAttribute("style")).toBeNull();
  });

  it("names a gate stage with a word and lists its reviewers in the dashed panel", () => {
    render(<StageColumn stage={gate} />);
    const panel = screen.getByText("Reviewers").closest('[data-panel="gate"]');
    expect(panel).not.toBeNull();
    expect(within(panel as HTMLElement).getByText("J. Rao")).not.toBeNull();
    expect(screen.getByText("GATE")).not.toBeNull();
  });

  it("counts a terminal stage instead of drawing a gate panel", () => {
    const { container } = render(<StageColumn stage={terminal} />);
    expect(container.querySelector('[data-panel="gate"]')).toBeNull();
    expect(screen.getByText("Closed this week")).not.toBeNull();
    expect(screen.getByText("31")).not.toBeNull();
  });

  it("renders no mount action and no agents when the stage has neither", () => {
    const { container } = render(<StageColumn stage={{ index: 1, name: "Intake", kind: "entry", count: 0 }} />);
    expect(screen.queryByRole("button")).toBeNull();
    expect(container.querySelectorAll("article")).toHaveLength(0);
  });

  it("labels the section by its own stage name and never opens a live region", () => {
    const { container } = render(<StageColumn stage={{ index: 2, name: "Build", kind: "agent", count: 4 }} agents={agents} onMount={() => {}} />);
    const section = container.querySelector("section") as HTMLElement;
    expect(document.getElementById(section.getAttribute("aria-labelledby") as string)?.textContent).toBe("Build");
    expect(container.querySelector("[aria-live]")).toBeNull();
  });
});
