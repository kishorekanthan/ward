// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { injectModuleCss } from "../../test-css";
import { StreamRow, type Stream } from "./StreamRow";
import s from "./StreamRow.module.css";

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

  it("says member for a stream of one", () => {
    const { container } = render(table(<StreamRow stream={{ ...stream, members: 1 }} href="#de" />));
    expect(container.textContent).toContain("Priya Nayar1 member");
    expect(container.textContent).not.toContain("1 members");
  });

  it("counts members on the summary owner line, singular for one", () => {
    const line = (members: number) => {
      const { container } = render(table(<StreamRow stream={{ name: "DE", key: "DE", streamStep: 2, owner: "Priya Nayar", members, stages: [] }} href="#de" presentation={{ columns: 5 }} />));
      return container.querySelector("td")?.textContent;
    };
    expect(line(1)).toBe("DEDEPriya Nayar · 1 member");
    expect(line(0)).toBe("DEDEPriya Nayar · 0 members");
    expect(line(1200)).toBe("DEDEPriya Nayar · 1,200 members");
  });

  it("provides a five-cell summary without inventing missing optional details", () => {
    const { container } = render(table(<StreamRow stream={{ name: "Regulatory Ops", key: "REG", streamStep: 3, owner: "unassigned", stages: [], draft: true }} href="#reg" presentation={{ columns: 5 }} />));
    expect(container.querySelectorAll("td")).toHaveLength(5);
    expect(container.textContent).toContain("No stages yet");
    expect(container.textContent).toContain("not set");
    expect(container.textContent).not.toContain("paused");
  });

  it("marks a draft stream and says to define its workflow inside the row's one link", () => {
    const { container } = render(table(<StreamRow stream={{ name: "Regulatory Ops", key: "REG", streamStep: 3, owner: "unassigned", stages: [], draft: true }} href="#reg" presentation={{ columns: 5 }} />));
    expect(screen.getByText("REG · DRAFT")).toBeDefined();
    expect(screen.getByText("Define workflow").closest("a")).toBeNull();
    expect(Array.from(container.querySelectorAll("a"), (a) => [a.textContent, a.getAttribute("href")])).toEqual([["Regulatory Ops", "#reg"]]);
    expect(container.querySelector("tr")?.getAttribute("data-draft")).toBe("true");
  });

  it("joins the stage chain with arrows and totals the agents above their split", () => {
    const summary = { name: "Data Engineering", key: "DE", streamStep: 2 as const, owner: "Priya Nayar", members: 9, stages: [{ name: "Intake" }, { name: "Review", gate: true }, { name: "Loaded" }], agents: { live: 3, draft: 1, paused: 0 }, policy: { id: "DE-04", summary: "no direct writes" }, inFlight: 18, p50: "4.2h" };
    const { container } = render(table(<StreamRow stream={summary} href="#de" presentation={{ columns: 5 }} />));
    const cells = Array.from(container.querySelectorAll("td"), (cell) => cell.textContent);
    expect(cells).toEqual(["Data EngineeringDEPriya Nayar · 9 members", "Intake→◆Review (human gate)→Loaded", "43 live · 1 draft", "DE-04no direct writes", "18P50 4.2h"]);
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

  it("marks a gate stage with a shape as well as colour, and leaves other stages unmarked", () => {
    wrap();
    const gateLink = screen.getByText("DPM sign-off").parentElement as HTMLElement;
    const triageLink = screen.getByText("Triage").parentElement as HTMLElement;
    expect(gateLink.querySelector("[data-gate-mark]")?.textContent).toBe("◆");
    expect(gateLink.querySelector("[data-gate-mark]")?.getAttribute("aria-hidden")).toBe("true");
    expect(gateLink.textContent).toBe("◆DPM sign-off (human gate)");
    expect(triageLink.textContent).not.toMatch(/◆|human gate/);
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

  it("draws a stream with no validated colour step neutral in both presentations, with a meta key chip", () => {
    const summary = { name: "KPI Config", key: "KPI", owner: "R. Okonjo", stages: [] };
    const colourOf = (streamStep: 2 | 4 | null) => {
      const { container, unmount } = render(table(<StreamRow stream={{ ...summary, streamStep }} href="#kpi" presentation={{ columns: 5 }} />));
      const value = container.querySelector<HTMLElement>("tr")?.style.getPropertyValue("--stream");
      unmount();
      return value;
    };
    expect([colourOf(2), colourOf(4), colourOf(null)]).toEqual(["var(--ward-stream-2-chip)", "var(--ward-color-line2)", "var(--ward-color-line2)"]);
    const chipOf = (streamStep: 2 | 4 | null) => {
      const { container, unmount } = render(table(<StreamRow stream={{ ...stream, streamStep }} href="#de" />));
      const chip = Array.from(container.querySelectorAll("[data-ward-chip]")).find((el) => el.textContent === "DE");
      const role = chip?.getAttribute("data-ward-chip");
      unmount();
      return role;
    };
    expect([chipOf(2), chipOf(4), chipOf(null)]).toEqual(["stream", "meta", "meta"]);
  });
});

describe("StreamRow in-flight hint", () => {
  const hint = "Items running, held or blocked";
  const summary = { name: "DE", key: "DE", streamStep: 2 as const, owner: "Priya Nayar", stages: [], inFlight: 7, p50: "2d" };

  it("puts the hint on the in-flight count of the full row", () => {
    const { container } = render(table(<StreamRow stream={{ ...stream, inFlightHint: hint }} href="#de" />));
    const hinted = container.querySelectorAll("[title]");
    expect(hinted).toHaveLength(1);
    expect(hinted[0].getAttribute("title")).toBe(hint);
    expect(hinted[0].textContent).toBe("18");
  });

  it("puts the hint on the in-flight count of the summary row", () => {
    const { container } = render(table(<StreamRow stream={{ ...summary, inFlightHint: hint }} href="#de" presentation={{ columns: 5 }} />));
    const hinted = container.querySelectorAll("[title]");
    expect(hinted).toHaveLength(1);
    expect(hinted[0].getAttribute("title")).toBe(hint);
    expect(hinted[0].textContent).toBe("7");
  });

  it("adds no title without a hint", () => {
    const full = render(table(<StreamRow stream={stream} href="#de" />));
    expect(full.container.querySelector("[title]")).toBeNull();
    const compact = render(table(<StreamRow stream={summary} href="#de" presentation={{ columns: 5 }} />));
    expect(compact.container.querySelector("[title]")).toBeNull();
  });
});

describe("StreamRow as one link", () => {
  const hint = "Items running, held or blocked";
  const summary = { name: "DE", key: "DE", streamStep: 2 as const, owner: "Priya Nayar", stages: [{ name: "Intake" }], inFlight: 7, p50: "2d", inFlightHint: hint };
  const rows = [
    ["full", table(<StreamRow stream={{ ...stream, inFlightHint: hint }} href="#de" />)],
    ["summary", table(<StreamRow stream={summary} href="#de" presentation={{ columns: 5 }} />)],
  ] as const;

  function clicksOn(link: HTMLAnchorElement) {
    const seen: { metaKey: boolean; shiftKey: boolean }[] = [];
    link.addEventListener("click", (event) => {
      event.preventDefault();
      seen.push({ metaKey: event.metaKey, shiftKey: event.shiftKey });
    });
    return seen;
  }

  it.each(rows)("marks the %s row as one link with a single anchor", (_, row) => {
    const { container } = render(row);
    expect(container.querySelector("tr")?.hasAttribute("data-ward-rowlink")).toBe(true);
    expect(Array.from(container.querySelectorAll("a"), (a) => a.getAttribute("href"))).toEqual(["#de"]);
  });

  it.each(rows)("opens the %s row's link from a click on the hinted count, keeping modifier keys", (_, row) => {
    const { container } = render(row);
    const seen = clicksOn(container.querySelector("a")!);
    const hinted = container.querySelector("[title]")!;
    expect(hinted.hasAttribute("data-raised")).toBe(true);
    fireEvent.click(hinted, { metaKey: true, shiftKey: true });
    expect(seen).toEqual([{ metaKey: true, shiftKey: true }]);
  });

  it.each(rows)("passes on nothing else in the %s row: a cell click and a click on the link itself are left alone", (_, row) => {
    const { container } = render(row);
    const link = container.querySelector("a")!;
    const seen = clicksOn(link);
    fireEvent.click(container.querySelectorAll("td")[1]);
    expect(seen).toEqual([]);
    fireEvent.click(link);
    expect(seen).toHaveLength(1);
  });
});

describe("StreamRow compact chain highlight", () => {
  const chain = (streamStep: 3 | 4 | null, stages: { name: string; gate?: boolean }[]) => {
    const { container } = render(table(<StreamRow stream={{ name: "DE", key: "DE", streamStep, owner: "Priya Nayar", stages }} href="#de" presentation={{ columns: 5 }} />));
    const chips = Array.from(container.querySelectorAll("td")[1].querySelectorAll<HTMLElement>("[data-ward-chip]"));
    return chips.map((chip) => [chip.textContent, chip.getAttribute("data-ward-chip"), chip.style.getPropertyValue("--ward-chip-bg"), chip.style.getPropertyValue("--ward-chip-fg")]);
  };

  it("draws the gate as the step-3 stream chip", () => {
    expect(chain(3, [{ name: "Intake" }, { name: "Review", gate: true }])).toEqual([
      ["Intake", "soft", "var(--ward-chip-soft-bg)", "var(--ward-chip-soft-fg)"],
      ["Review", "stream", "var(--ward-stream-3-chip)", "var(--ward-stream-3-chipText)"],
    ]);
  });

  it("highlights only the first of two gates, and both still read as human gates", () => {
    const { container } = render(table(<StreamRow stream={{ name: "UX", key: "UX", streamStep: 3, owner: "A. Whyte", stages: [{ name: "Design review", gate: true }, { name: "Build" }, { name: "Sign-off", gate: true }] }} href="#ux" presentation={{ columns: 5 }} />));
    expect(container.querySelectorAll("td")[1].textContent).toBe("◆Design review (human gate)→Build→◆Sign-off (human gate)");
    expect(chain(3, [{ name: "Design review", gate: true }, { name: "Build" }, { name: "Sign-off", gate: true }]).map((chip) => chip[1])).toEqual(["stream", "soft", "soft"]);
  });

  it("wraps the chain in units that each start with a stage and end with the arrow to the next one", () => {
    const { container } = render(table(<StreamRow stream={{ name: "UX", key: "UX", streamStep: 3, owner: "A. Whyte", stages: [{ name: "Design review", gate: true }, { name: "Build" }, { name: "Sign-off", gate: true }] }} href="#ux" presentation={{ columns: 5 }} />));
    const units = Array.from(container.querySelectorAll(".ward-chiprow > *"), (unit) => unit.textContent);
    expect(units).toEqual(["◆Design review (human gate)→", "Build→", "◆Sign-off (human gate)"]);
  });

  it("keeps the navy gate chip for a stream with no validated step", () => {
    const navy = ["Review", "gate", "var(--ward-chip-gate-bg)", "var(--ward-chip-gate-fg)"];
    expect(chain(null, [{ name: "Intake" }, { name: "Review", gate: true }])[1]).toEqual(navy);
    expect(chain(4, [{ name: "Intake" }, { name: "Review", gate: true }])[1]).toEqual(navy);
  });

  it("highlights nothing in a chain with no gate", () => {
    expect(chain(3, [{ name: "Intake" }, { name: "Build" }]).map((chip) => chip[1])).toEqual(["soft", "soft"]);
  });
});

describe("StreamRow compact identity at phone width", () => {
  it("breaks the name and owner only between words, even in a frame that breaks anywhere", () => {
    const removeCss = injectModuleCss("src/composites/studio/StreamRow.module.css", s);
    render(
      <div style={{ overflowWrap: "anywhere" }}>
        {table(<StreamRow stream={{ name: "Ledger Operations", key: "LO", streamStep: 2, owner: "Ines Okafor", members: 1200, stages: [] }} href="#lo" presentation={{ columns: 5 }} />)}
      </div>,
    );
    const name = getComputedStyle(screen.getByRole("link", { name: "Ledger Operations" }));
    const owner = getComputedStyle(screen.getByText("Ines Okafor · 1,200 members"));
    removeCss();
    expect([name.overflowWrap, name.wordBreak]).toEqual(["normal", "normal"]);
    expect([owner.overflowWrap, owner.wordBreak]).toEqual(["normal", "normal"]);
  });
});
