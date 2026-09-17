import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AgentCard, type Agent } from "./AgentCard";

const agent: Agent = {
  id: "extractor",
  name: "Extractor",
  streamStep: 1,
  versions: [
    { v: "V7", status: "draft" as const },
    { v: "V6", status: "live" as const },
    { v: "V5", status: "paused" as const },
  ],
  run: { itemKey: "T-024", startedAt: "2026-09-06T10:00:00Z" },
};

describe("AgentCard", () => {
  it("keeps Ward string version labels and selected-link state", () => {
    render(<AgentCard agent={agent} href="#agent" selected />);
    expect(screen.getByText("V7 DRAFT")).toBeDefined();
    expect(screen.getByText("V6 LIVE")).toBeDefined();
    expect(screen.getByText("V5 PAUSED")).toBeDefined();
    expect(screen.getByRole("link", { name: "Extractor" }).getAttribute("aria-current")).toBe("true");
  });

  it("shows the supplied latest step without requiring a connection override", () => {
    render(<AgentCard agent={agent} href="#agent" lastEvent={{ label: "validate rows", at: "2026-09-06T10:01:00Z" }} />);
    expect(screen.getByRole("timer").textContent).toContain("validate rows");
  });
});

const specAgent: Agent = {
  id: "triage",
  name: "triage",
  streamStep: 1,
  description: "Reads the ticket and picks the lane.",
  versions: [
    { v: "V6", status: "live" },
    { v: "V7", status: "draft" },
  ],
};

describe("AgentCard (spec)", () => {
  it("shows a draft as running and a live version as done, never as a stream colour", () => {
    render(<AgentCard agent={specAgent} href="/studio/agents/triage" />);
    expect(screen.getByText("V7 DRAFT").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-running-bg)");
    expect(screen.getByText("V6 LIVE").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-done-bg)");
  });

  it("shows a paused version as neutral", () => {
    render(<AgentCard agent={{ ...specAgent, versions: [{ v: "V5", status: "paused" }] }} href="/x" />);
    expect(screen.getByText("V5 PAUSED").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-meta-bg)");
  });

  it("names the item an active run is working on, with a counter", () => {
    render(<AgentCard agent={{ ...specAgent, run: { itemKey: "T-024", startedAt: "2026-09-06T02:14:00Z" } }} href="/x" />);
    expect(screen.getByText(/working on T-024/)).not.toBeNull();
    expect(screen.getByRole("timer")).not.toBeNull();
  });

  it("carries no counter when nothing is running", () => {
    render(<AgentCard agent={specAgent} href="/x" />);
    expect(screen.queryByRole("timer")).toBeNull();
  });

  it("marks the selected card for assistive tech", () => {
    render(<AgentCard agent={specAgent} href="/x" selected />);
    expect(screen.getByRole("link").getAttribute("aria-current")).toBe("true");
  });
});
