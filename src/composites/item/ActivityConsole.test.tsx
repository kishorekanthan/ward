import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActivityConsole, type ConsoleLine } from "./ActivityConsole";

const LINES: ConsoleLine[] = [
  { at: "2026-09-04T02:06:11Z", kind: "tool", text: "foundry.query manifest → 1 row" },
  { at: "2026-09-04T02:14:03Z", kind: "ok", text: "usage 1,412 in · 380 out · $0.13" },
];

describe("ActivityConsole", () => {
  it("keeps London second timestamps, visual roles, and quiet live announcements", () => {
    const { container } = render(<ActivityConsole lines={LINES} connection="live" label="Run activity" />);

    expect(screen.getByText("foundry.query manifest → 1 row").previousElementSibling?.textContent).toBe("03:06:11");
    expect(screen.getByText("usage 1,412 in · 380 out · $0.13").parentElement?.getAttribute("data-kind")).toBe("ok");
    expect(screen.getByRole("list", { name: "Run activity" }).getAttribute("aria-live")).toBe("off");
    expect(container.textContent).toContain("waiting for the next event…");
  });

  it("freezes stale copy and jumps to the newest event text", () => {
    render(<ActivityConsole lines={LINES} connection="stale" idleSince="2026-09-04T02:14:03Z" />);

    expect(screen.getByText(/no new events — as of/).textContent).toContain("03:14:03");
    fireEvent.click(screen.getByRole("button", { name: "Jump to latest" }));
    expect(document.activeElement?.textContent).toBe("usage 1,412 in · 380 out · $0.13");
  });

  // Source cases below; copy assertions follow design/Trellis Board Item.dc.html:272, which the target already renders.
  const lines: ConsoleLine[] = [
    { at: "2026-09-06T02:12:00Z", kind: "tool", text: "foundry.query · 1.2s" },
    { at: "2026-09-06T02:13:00Z", kind: "warn", text: "late rows outside the agreed window" },
    { at: "2026-09-06T02:14:00Z", kind: "ok", text: "draft written" },
  ];

  it("never announces itself", () => {
    const { container } = render(<ActivityConsole lines={lines} connection="live" idleSince="2026-09-06T02:14:00Z" />);
    expect(screen.getByRole("list").getAttribute("aria-live")).toBe("off");
    expect(container.querySelector('[aria-live="polite"], [aria-live="assertive"], [role="status"], [role="alert"]')).toBeNull();
  });

  it("gives the keyboard a way to reach the newest line", () => {
    render(<ActivityConsole lines={lines} connection="live" idleSince="2026-09-06T02:14:00Z" />);
    fireEvent.click(screen.getByText("Jump to latest"));
    expect(document.activeElement?.textContent).toContain("draft written");
  });

  it("keeps every line in the document — a reveal is opacity, not mounting", () => {
    render(<ActivityConsole lines={lines} connection="live" idleSince="2026-09-06T02:14:00Z" />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items.every((li) => li.getAttribute("data-revealed") === "true")).toBe(true);
  });

  it("says when the last event landed while idle, and freezes to a stamp when stale", () => {
    const { rerender } = render(<ActivityConsole lines={lines} connection="live" idleSince="2026-09-06T02:14:00Z" />);
    expect(screen.getByText("last event 03:14:00")).not.toBeNull();
    rerender(<ActivityConsole lines={lines} connection="stale" idleSince="2026-09-06T02:14:00Z" />);
    expect(screen.getByText("no new events — as of 03:14:00")).not.toBeNull();
  });

  it("keeps the idle caret and the jump control on the foot, outside the event list", () => {
    const { container } = render(<ActivityConsole lines={lines} connection="live" idleSince="2026-09-06T02:14:00Z" />);
    const foot = screen.getByText("waiting for the next event…").parentElement as HTMLElement;
    expect(foot.tagName).toBe("P");
    expect(foot.querySelector(".ward-caret")?.getAttribute("aria-hidden")).toBe("true");
    expect(foot.querySelector("button.ward-consjump")?.textContent).toBe("Jump to latest");
    expect(container.querySelector("ol")?.contains(foot)).toBe(false);
  });

  it("inks the idle foot in consoleFaint, the keep-list console ink", () => {
    const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "ActivityConsole.module.css"), "utf8");
    const foot = /\n\.foot \{([^}]*)\}/.exec(css)?.[1] ?? "";
    expect(foot).toContain("color: var(--ward-color-consoleFaint);");
    expect(/\n\.idle \{([^}]*)\}/.exec(css)?.[1]).not.toContain("color:");
  });
});
