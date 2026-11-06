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
  it("live is a green square plus Live text under role=status", () => {
    render(<ConnectionMark connection="live" since="2026-09-06T09:59:50Z" />);
    const mark = screen.getByRole("status");
    expect(mark.textContent).toBe("Live");
  });

  it("reconnecting shows the ticking elapsed as text, not only on hover", () => {
    render(<ConnectionMark connection="reconnecting" since="2026-09-06T09:59:46Z" />);
    expect(screen.getByRole("status").textContent).toBe("Reconnecting · 14s");
    expect(screen.getByRole("status").getAttribute("title")).toBeNull();
    act(() => vi.advanceTimersByTime(5_000));
    expect(screen.getByRole("status").textContent).toBe("Reconnecting · 19s");
  });

  it("stale says the data is out of date, as of the last reachable time", () => {
    render(<ConnectionMark connection="stale" since="2026-09-06T09:14:00Z" />);
    expect(screen.getByRole("status").textContent).toBe("Out of date · as of 06 Sep 10:14");
  });

  it.each([[""], ["not a time"]])("stale with the unreadable since %j dates from the last event", (since) => {
    render(<ConnectionMark connection="stale" since={since} lastEventAt="2026-09-06T08:30:00Z" />);
    expect(screen.getByRole("status").textContent).toBe("Out of date · as of 06 Sep 09:30");
  });

  it("a readable since wins over the last event", () => {
    render(<ConnectionMark connection="stale" since="2026-09-06T09:14:00Z" lastEventAt="2026-09-06T08:30:00Z" />);
    expect(screen.getByRole("status").textContent).toBe("Out of date · as of 06 Sep 10:14");
  });

  it.each([[""], ["not a time"], [null]])("stale with no readable time dates from the first render, last event %j", (lastEventAt) => {
    const { rerender } = render(<ConnectionMark connection="stale" since="" lastEventAt={lastEventAt} />);
    act(() => vi.advanceTimersByTime(120_000));
    rerender(<ConnectionMark connection="stale" since="" lastEventAt={lastEventAt} />);
    expect(screen.getByRole("status").textContent).toBe("Out of date · as of 06 Sep 11:00");
  });

  it("reconnecting with no known time counts up from the first render", () => {
    render(<ConnectionMark connection="reconnecting" />);
    expect(screen.getByRole("status").textContent).toBe("Reconnecting · 0s");
    act(() => vi.advanceTimersByTime(5_000));
    expect(screen.getByRole("status").textContent).toBe("Reconnecting · 5s");
  });
});
