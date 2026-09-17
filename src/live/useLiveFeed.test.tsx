import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LiveTransport, LiveTransportHandlers } from "./transport";
import { useLiveFeed } from "./useLiveFeed";
import type { LiveEvent } from "./types";

type FakeConn = { closed: boolean };
type Open = { url: string; resume: { lastEventId: string }; handlers: LiveTransportHandlers; conn: FakeConn };

function fakeTransport(opens: Open[]): LiveTransport {
  return (url, resume, handlers) => {
    const conn: FakeConn = { closed: false };
    opens.push({ url, resume, handlers, conn });
    return {
      close: () => {
        conn.closed = true;
      },
    };
  };
}

const event = (over: Partial<LiveEvent> = {}): LiveEvent => ({
  id: "e1",
  type: "run.step",
  at: "2026-09-06T10:00:00Z",
  itemKey: "T-024",
  ...over,
});

let opens: Open[];

beforeEach(() => {
  vi.useFakeTimers();
  opens = [];
});
afterEach(() => {
  vi.useRealTimers();
});

function started(transport: LiveTransport) {
  return renderHook(() => useLiveFeed("sse://ward/feed", transport));
}

describe("useLiveFeed", () => {
  it("goes live when the transport opens", () => {
    const { result } = started(fakeTransport(opens));
    expect(result.current.connection).toBe("reconnecting");
    act(() => opens[0].handlers.onOpen());
    expect(result.current.connection).toBe("live");
  });

  it("drops to reconnecting after one missed heartbeat, stale after 3× poll", () => {
    const { result } = started(fakeTransport(opens));
    act(() => opens[0].handlers.onOpen());
    act(() => vi.advanceTimersByTime(15_000));
    expect(result.current.connection).toBe("reconnecting");
    act(() => vi.advanceTimersByTime(30_000));
    expect(result.current.connection).toBe("stale");
  });

  it("stale revives when an event arrives", () => {
    const { result } = started(fakeTransport(opens));
    act(() => opens[0].handlers.onOpen());
    act(() => vi.advanceTimersByTime(45_000));
    expect(result.current.connection).toBe("stale");
    act(() => opens[0].handlers.onEvent(JSON.stringify(event()), "e1"));
    expect(result.current.connection).toBe("live");
  });

  it("reconnects with 1s→30s backoff and passes Last-Event-ID", () => {
    started(fakeTransport(opens));
    const delays = [1_000, 2_000, 4_000, 8_000, 16_000, 30_000, 30_000];
    act(() => opens[0].handlers.onEvent(JSON.stringify(event({ id: "e-41" })), "e-41"));
    act(() => opens[0].handlers.onError());
    delays.forEach((delay, i) => {
      act(() => vi.advanceTimersByTime(delay - 1));
      expect(opens).toHaveLength(i + 1);
      act(() => vi.advanceTimersByTime(1));
      expect(opens).toHaveLength(i + 2);
      act(() => opens[i + 1].handlers.onError());
    });
    expect(opens[1].resume.lastEventId).toBe("e-41");
  });

  it("closes the transport on unmount", () => {
    const { unmount } = started(fakeTransport(opens));
    unmount();
    expect(opens[0].conn.closed).toBe(true);
  });

  it("subscribes by itemKey and by *", () => {
    const { result } = started(fakeTransport(opens));
    const cardEvents: string[] = [];
    const allEvents: string[] = [];
    act(() => {
      result.current.subscribe("T-024", (e) => cardEvents.push(e.type));
      result.current.subscribe("*", (e) => allEvents.push(e.type));
    });
    act(() => opens[0].handlers.onEvent(JSON.stringify(event({ itemKey: "T-024" })), "1"));
    act(() => opens[0].handlers.onEvent(JSON.stringify(event({ itemKey: "T-099", type: "item.moved" })), "2"));
    act(() => opens[0].handlers.onEvent(JSON.stringify(event({ type: "heartbeat", itemKey: undefined })), "3"));
    expect(cardEvents).toEqual(["run.step"]);
    expect(allEvents).toEqual(["run.step", "item.moved", "heartbeat"]);
  });

  it("records lastEventAt and honours an unsubscribe", () => {
    const { result } = started(fakeTransport(opens));
    const seen: string[] = [];
    act(() => {
      const off = result.current.subscribe("*", (e) => seen.push(e.id));
      off();
    });
    act(() => opens[0].handlers.onEvent(JSON.stringify(event({ id: "e-9" })), "e-9"));
    expect(seen).toEqual([]);
    expect(result.current.lastEventAt).not.toBe("");
  });
});
