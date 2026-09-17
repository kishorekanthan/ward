import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LiveIndicator } from "./LiveIndicator";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-06T10:00:22Z"));
});
afterEach(() => {
  vi.useRealTimers();
});

describe("LiveIndicator", () => {
  it("renders elapsed · turn · last event as text under role=timer", () => {
    render(
      <LiveIndicator
        startedAt="2026-09-06T10:00:00Z"
        connection="live"
        turn={[3, 8]}
        lastEvent={{ label: "foundry.query", at: "2026-09-06T10:00:20Z" }}
      />,
    );
    expect(screen.getByRole("timer").textContent).toBe("22s · turn 3/8 · foundry.querystarted 06 Sep 11:00");
  });

  it("ticks once per second while live", () => {
    render(<LiveIndicator startedAt="2026-09-06T10:00:00Z" connection="live" />);
    const line = () => screen.getByRole("timer").textContent;
    expect(line()).toMatch(/^22s/);
    act(() => vi.advanceTimersByTime(2_000));
    expect(line()).toMatch(/^24s/);
  });

  it("freezes with as-of time when stale and never ticks", () => {
    render(
      <LiveIndicator
        startedAt="2026-09-06T10:00:00Z"
        connection="stale"
        lastEvent={{ label: "foundry.query", at: "2026-09-06T09:14:00Z" }}
      />,
    );
    const line = () => screen.getByRole("timer").textContent;
    expect(line()).toContain("as of 10:14");
    act(() => vi.advanceTimersByTime(10_000));
    expect(line()).toContain("as of 10:14");
  });

  it("keeps ticking while reconnecting", () => {
    render(<LiveIndicator startedAt="2026-09-06T10:00:00Z" connection="reconnecting" />);
    act(() => vi.advanceTimersByTime(1_000));
    expect(screen.getByRole("timer").textContent).toMatch(/^23s/);
  });

  it("hides the counter from assistive tech and states the start time", () => {
    render(<LiveIndicator startedAt="2026-09-06T10:00:00Z" connection="live" />);
    expect(screen.getByText(/^22s/).getAttribute("aria-hidden")).toBe("true");
    expect(screen.getByText(/started 06 Sep 11:00/).className).toContain("ward-visually-hidden");
  });
});
