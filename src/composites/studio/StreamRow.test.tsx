// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StreamRow, type Stream } from "./StreamRow";

const stream: Stream = {
  name: "Data Engineering",
  key: "DE",
  streamStep: 2,
  owner: "Priya Nayar",
  members: 1200,
  stages: [{ name: "INTAKE", gate: false }, { name: "REVIEW", gate: true }],
  agents: { live: 3, draft: 1, paused: 0 },
  policy: { id: "DE-04", summary: "no direct writes" },
  inFlight: 18,
  p50: 172800000,
};

function table(row: React.JSX.Element) {
  return <table><tbody>{row}</tbody></table>;
}

describe("StreamRow", () => {
  it("keeps the six-cell Ward presentation with independently formatted counts and duration", () => {
    const { container } = render(table(<StreamRow stream={stream} href="#de" />));
    expect(container.querySelectorAll("td")).toHaveLength(6);
    expect(screen.getByRole("link", { name: "Data Engineering" }).getAttribute("href")).toBe("#de");
    expect(container.textContent).toContain("1,200 members");
    expect(container.textContent).toContain("2d 0h");
  });

  it("provides a five-cell summary without inventing missing optional details", () => {
    const { container } = render(table(<StreamRow stream={{ name: "Regulatory Ops", key: "REG", streamStep: 3, owner: "unassigned", stages: [], draft: true }} href="#reg" presentation={{ columns: 5 }} />));
    expect(container.querySelectorAll("td")).toHaveLength(5);
    expect(container.textContent).toContain("No stages yet");
    expect(container.textContent).toContain("not set");
    expect(container.textContent).not.toContain("paused");
  });

  it("marks a draft stream and links the empty workflow to its definition", () => {
    const { container } = render(table(<StreamRow stream={{ name: "Regulatory Ops", key: "REG", streamStep: 3, owner: "unassigned", stages: [], draft: true }} href="#reg" presentation={{ columns: 5 }} />));
    expect(screen.getByText("REG · DRAFT")).toBeDefined();
    expect(screen.getByRole("link", { name: "Define workflow" }).getAttribute("href")).toBe("#reg");
    expect(container.querySelector("tr")?.getAttribute("data-draft")).toBe("true");
  });

  it("joins the stage chain with arrows and totals the agents above their split", () => {
    const summary = { name: "Data Engineering", key: "DE", streamStep: 2 as const, owner: "Priya Nayar", members: 9, stages: [{ name: "Intake" }, { name: "Review", gate: true }, { name: "Loaded" }], agents: { live: 3, draft: 1, paused: 0 }, policy: { id: "DE-04", summary: "no direct writes" }, inFlight: 18, p50: "4.2h" };
    const { container } = render(table(<StreamRow stream={summary} href="#de" presentation={{ columns: 5 }} />));
    const cells = Array.from(container.querySelectorAll("td"), (cell) => cell.textContent);
    expect(cells).toEqual(["Data EngineeringDEPriya Nayar · 9 members", "Intake→Review (human gate)→Loaded", "43 live · 1 draft", "DE-04no direct writes", "18P50 4.2h"]);
  });
});

const specStream: Stream = {
  name: "Data engineering",
  key: "DATA-ENG",
  streamStep: 1,
  owner: "J. Rao",
  members: 12,
  stages: [
    { name: "Triage", gate: false },
    { name: "DPM sign-off", gate: true },
  ],
  agents: { live: 4, draft: 1, paused: 2 },
  policy: { id: "FL-118", summary: "Deny writes by default." },
  inFlight: 14,
  p50: 273_600_000,
};

const wrap = () =>
  render(
    <table>
      <tbody>
        <StreamRow stream={specStream} href="/studio/streams/data-eng" />
      </tbody>
    </table>,
  );

describe("StreamRow (spec)", () => {
  it("marks the gate stage as a gate, never with the stream colour", () => {
    wrap();
    expect(screen.getByText("DPM sign-off").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-gate-bg)");
  });

  it("keeps the rest of the stage chain neutral", () => {
    wrap();
    expect(screen.getByText("Triage").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-soft-bg)");
  });

  it("uses the stream colour only on the stream's own chip", () => {
    wrap();
    expect(screen.getByText("DATA-ENG").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-stream-1-chip)");
  });

  it("puts figures through the formatters", () => {
    wrap();
    expect(screen.getByText("3d 4h")).not.toBeNull();
  });

  it("links from the name", () => {
    wrap();
    expect(screen.getByRole("link", { name: "Data engineering" }).getAttribute("href")).toBe("/studio/streams/data-eng");
  });
});
