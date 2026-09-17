import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTicker } from "./useTicker";

const START = "2026-09-06T09:00:00Z";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-06T09:00:22Z"));
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("useTicker", () => {
  it("ticks once per second from startedAt", () => {
    const { result } = renderHook(() => useTicker(START, true));
    expect(result.current).toBe(22_000);
    act(() => vi.advanceTimersByTime(3_000));
    expect(result.current).toBe(25_000);
  });

  it("freezes when running flips false", () => {
    const { result, rerender } = renderHook(({ running }) => useTicker(START, running), {
      initialProps: { running: true },
    });
    act(() => vi.advanceTimersByTime(5_000));
    rerender({ running: false });
    act(() => vi.advanceTimersByTime(30_000));
    expect(result.current).toBe(27_000);
  });

  it("pauses while the tab is hidden and resyncs on return", () => {
    const { result } = renderHook(() => useTicker(START, true));
    act(() => vi.advanceTimersByTime(4_000));
    expect(result.current).toBe(26_000);
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    act(() => vi.advanceTimersByTime(10_000));
    expect(result.current).toBe(26_000);
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current).toBe(36_000);
  });

  it("never goes negative if the clock sits behind startedAt", () => {
    vi.setSystemTime(new Date("2026-09-06T08:59:00Z"));
    const { result } = renderHook(() => useTicker(START, true));
    expect(result.current).toBe(0);
  });
});
