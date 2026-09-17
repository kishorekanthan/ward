import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConnectionMark } from "./ConnectionMark";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-06T10:00:00Z"));
});
afterEach(() => {
  vi.useRealTimers();
});

describe("ConnectionMark", () => {
  it("live is a green square plus LIVE text under role=status", () => {
    render(<ConnectionMark connection="live" since="2026-09-06T09:59:50Z" />);
    const mark = screen.getByRole("status");
    expect(mark.textContent).toBe("LIVE");
  });

  it("reconnecting renders the warn chip with a ticking elapsed", () => {
    render(<ConnectionMark connection="reconnecting" since="2026-09-06T09:59:46Z" />);
    expect(screen.getByRole("status").textContent).toBe("RECONNECTING · 14s");
    act(() => vi.advanceTimersByTime(5_000));
    expect(screen.getByRole("status").textContent).toBe("RECONNECTING · 19s");
  });

  it("stale freezes with as of the last reachable time", () => {
    render(<ConnectionMark connection="stale" since="2026-09-06T09:14:00Z" />);
    expect(screen.getByRole("status").textContent).toBe("STALE · as of 06 Sep 10:14");
  });
});
