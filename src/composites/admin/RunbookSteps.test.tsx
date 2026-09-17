import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RunbookSteps, type RunbookStep } from "./RunbookSteps";

const STEPS: RunbookStep[] = [
  { title: "Mint the new PAT", detail: "scheduled job · Jira REST", state: "done", startedAt: "2026-09-06T09:00:00Z" },
  { title: "Wait for the secret sync", detail: "ExternalSecrets", state: "running", startedAt: "2026-09-06T10:00:00Z" },
  { title: "Restart the relay", detail: "env is read at boot", state: "pending" },
  { title: "Confirm the watcher", detail: "no start recorded", state: "running" },
];

function texts(container: HTMLElement, selector: string): Array<string | null> {
  return Array.from(container.querySelectorAll(selector)).map((el) => el.textContent);
}

function timers(container: HTMLElement): boolean[] {
  return Array.from(container.querySelectorAll("li")).map((li) => li.querySelector("[role='timer']") !== null);
}

describe("RunbookSteps web presentation", () => {
  it("renders legacy numerals with inline muted ink, state chips and details", () => {
    const { container } = render(<RunbookSteps presentation="web" steps={STEPS} />);
    expect(container.querySelectorAll("ol.ward-runbook > li.ward-runbook-step")).toHaveLength(4);
    expect(texts(container, ".ward-runbook-num")).toEqual(["01", "02", "03", "04"]);
    const inks = Array.from(container.querySelectorAll<HTMLElement>(".ward-runbook-num")).map((el) => el.style.color);
    expect(inks).toEqual(Array(4).fill("var(--ward-color-muted)"));
    expect(texts(container, ".ward-envrow > .ward-chip")).toEqual(["DONE", "RUNNING", "PENDING", "RUNNING"]);
    const roles = Array.from(container.querySelectorAll(".ward-chip")).map((el) => el.className.match(/ward-chip--(\w+)/)?.[1]);
    expect(roles).toEqual(["done", "running", "pending", "running"]);
    expect(texts(container, ".ward-runbook-detail")).toEqual(["scheduled job · Jira REST", "ExternalSecrets", "env is read at boot", "no start recorded"]);
    expect(container.querySelector("[aria-current]")).toBeNull();
  });

  it("shows a timer only on a running step that has started, honouring the connection", () => {
    const { container } = render(<RunbookSteps presentation="web" steps={STEPS} connection="stale" />);
    expect(timers(container)).toEqual([false, true, false, false]);
    expect(container.querySelector("[role='timer']")?.textContent).toContain("as of");
  });

  it("wraps actions in the clarity-actions span and omits it without actions", () => {
    const { container } = render(<RunbookSteps presentation="web" steps={STEPS} actions={<button>Rotate</button>} />);
    const actions = container.querySelector(".ward-clarity-actions");
    expect(actions?.tagName).toBe("SPAN");
    expect(actions?.textContent).toBe("Rotate");
    const bare = render(<RunbookSteps presentation="web" steps={STEPS} />);
    expect(bare.container.querySelector(".ward-clarity-actions")).toBeNull();
  });
});

describe("RunbookSteps compact", () => {
  it("marks the running steps current, keeps the timer gate and uses no legacy hooks", () => {
    const { container } = render(<RunbookSteps steps={STEPS} actions={<button>Rotate</button>} />);
    expect(Array.from(container.querySelectorAll("li")).map((li) => li.getAttribute("aria-current"))).toEqual([null, "step", null, "step"]);
    expect(timers(container)).toEqual([false, true, false, false]);
    expect(texts(container, ".ward-chip")).toEqual(["DONE", "RUNNING", "PENDING", "RUNNING"]);
    expect(container.querySelector(".ward-runbook-num, .ward-clarity-actions, li > [style]")).toBeNull();
    expect(Array.from(container.querySelectorAll("button")).map((b) => b.parentElement?.tagName)).toEqual(["DIV"]);
  });
});

const specSteps: RunbookStep[] = [
  { title: "Raise the change", detail: "Ticket CHG-4120 approved by the platform owner.", state: "done" },
  { title: "Rotate the secret", detail: "The new value is written to the vault first.", state: "running" },
  { title: "Restart the consumers", detail: "Relay and workers pick the new value up on boot.", state: "pending" },
];

const css = readFileSync("src/composites/admin/RunbookSteps.module.css", "utf8");

describe("RunbookSteps spec", () => {
  it("numbers the steps in muted ink and never in the action blue", () => {
    expect(css.includes("--ward-color-blue")).toBe(false);
    expect(/\.numeral\s*\{[^}]*--ward-color-muted/.test(css)).toBe(true);
  });

  it("pads the numerals as drawn", () => {
    render(<RunbookSteps steps={specSteps} />);
    expect(screen.getByText("01")).not.toBeNull();
    expect(screen.getByText("03")).not.toBeNull();
  });

  it("counts a running step only once it has started", () => {
    const { rerender } = render(<RunbookSteps steps={specSteps} />);
    expect(screen.queryByRole("timer")).toBeNull();
    rerender(<RunbookSteps steps={specSteps.map((s) => (s.state === "running" ? { ...s, startedAt: new Date().toISOString() } : s))} />);
    expect(screen.getByRole("timer")).not.toBeNull();
  });

  it("marks the running step as the current one", () => {
    const { container } = render(<RunbookSteps steps={specSteps} />);
    const current = container.querySelectorAll("[aria-current='step']");
    expect(current.length).toBe(1);
    expect(current[0].textContent).toContain("Rotate the secret");
  });

  it("is an ordered list", () => {
    const { container } = render(<RunbookSteps steps={specSteps} />);
    expect(container.querySelector("ol")?.querySelectorAll("li").length).toBe(3);
  });
});
