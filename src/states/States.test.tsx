import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState, LoadFailed, StaleStrip, WriteUnavailableStrip } from "./States";

describe("state tones", () => {
  it("marks a load failure as failed, an empty state as untoned", () => {
    render(
      <>
        <EmptyState sentence="No items in this stage." />
        <LoadFailed sentence="The board could not be reached." at="2026-09-06T02:14:00Z" onRetry={() => {}} />
      </>,
    );
    expect(screen.getByRole("status").hasAttribute("data-tone")).toBe(false);
    expect(screen.getByRole("alert").getAttribute("data-tone")).toBe("failed");
  });

  it("tones a stale snapshot as a warning and unwritten changes as a failure", () => {
    render(
      <>
        <StaleStrip lastReachableAt="2026-09-06T02:14:00Z" snapshotAt="2026-09-06T02:13:00Z" />
        <WriteUnavailableStrip queued={2} since="2026-09-06T02:14:00Z" />
      </>,
    );
    expect(screen.getByRole("status").getAttribute("data-tone")).toBe("warn");
    expect(screen.getByRole("alert").getAttribute("data-tone")).toBe("failed");
  });

  it("wraps the action so it sits on its own line below the sentence", () => {
    render(<EmptyState sentence="No items yet." action={{ label: "Load an item", onClick: () => {} }} />);
    expect(screen.getByRole("button", { name: "Load an item" }).parentElement?.tagName).toBe("SPAN");
  });
});
