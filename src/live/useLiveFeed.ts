import { useCallback, useEffect, useRef, useState } from "react";
import { LIVE_EVENT_TYPES, ms, type LiveEventType } from "../tokens";
import type { LiveTransport, LiveTransportConnection } from "./transport";
import type { LiveConnection, LiveEvent } from "./types";

type Handler = (e: LiveEvent) => void;

export type LiveFeed = {
  connection: LiveConnection;
  lastEventAt: string | null;
  subscribe: (itemKey: string | "*", handler: Handler) => () => void;
};

function liveType(value: unknown): LiveEventType | null {
  if (typeof value !== "string") return null;
  return (LIVE_EVENT_TYPES as readonly string[]).includes(value) ? value as LiveEventType : null;
}

function eventRecord(data: string): Record<string, unknown> | null {
  try {
    const value = JSON.parse(data) as unknown;
    return typeof value === "object" && value !== null ? value as Record<string, unknown> : null;
  } catch {
    return null;
  }
}

function eventId(record: Record<string, unknown>, transportId: string): string {
  if (transportId !== "") return transportId;
  return typeof record.id === "string" ? record.id : "";
}

function eventTimestamp(record: Record<string, unknown>): string {
  return typeof record.at === "string" ? record.at : new Date().toISOString();
}

function parseEvent(data: string, transportId: string, transportType?: string): LiveEvent | null {
  const record = eventRecord(data);
  if (record === null) return null;
  const type = liveType(transportType) ?? liveType(record.type);
  if (type === null) return null;
  return { ...record, type, id: eventId(record, transportId), at: eventTimestamp(record) } as LiveEvent;
}

function connectionForSilence(silence: number, current: LiveConnection): LiveConnection | null {
  if (silence >= ms.staleAfter) return "stale";
  if (silence >= ms.heartbeat && current === "live") return "reconnecting";
  return null;
}

function shouldResume(
  silence: number,
  resuming: boolean,
  connection: LiveTransportConnection | null,
): connection is LiveTransportConnection {
  return silence >= ms.heartbeat && !resuming && connection !== null;
}

export function useLiveFeed(url: string, transport: LiveTransport): LiveFeed {
  const [connection, setConnection] = useState<LiveConnection>("reconnecting");
  const [lastEventAt, setLastEventAt] = useState<string | null>(null);
  const handlersRef = useRef(new Map<Handler, string | "*">());
  const seenRef = useRef(0);
  const lastIdRef = useRef("");
  const attemptRef = useRef(0);
  const connRef = useRef<LiveTransportConnection | null>(null);
  const retryRef = useRef(0);
  const monitorRef = useRef(0);
  const resumingRef = useRef(false);
  const stateRef = useRef<LiveConnection>("reconnecting");

  const setConn = useCallback((next: LiveConnection) => {
    stateRef.current = next;
    setConnection(next);
  }, []);

  const touch = useCallback(() => {
    seenRef.current = Date.now();
  }, []);

  const deliver = useCallback((e: LiveEvent) => {
    for (const [handler, key] of handlersRef.current) {
      if (key === "*" || e.itemKey === key) handler(e);
    }
  }, []);

  const open = useCallback(() => {
    connRef.current = transport(url, { lastEventId: lastIdRef.current }, {
      onEvent: (data, eventId, eventType) => {
        const event = parseEvent(data, eventId, eventType);
        if (event === null) return;
        if (event.id) lastIdRef.current = event.id;
        touch();
        resumingRef.current = false;
        setConn("live");
        setLastEventAt(event.at);
        deliver(event);
      },
      onOpen: () => {
        attemptRef.current = 0;
        resumingRef.current = false;
        touch();
        setConn("live");
      },
      onError: () => {
        connRef.current?.close();
        connRef.current = null;
        resumingRef.current = true;
        if (stateRef.current !== "stale") setConn("reconnecting");
        const delay = Math.min(ms.reconnectBase * 2 ** attemptRef.current, ms.reconnectMax);
        attemptRef.current += 1;
        retryRef.current = window.setTimeout(open, delay);
      },
    });
  }, [deliver, setConn, touch, transport, url]);

  const resume = useCallback((connection: LiveTransportConnection) => {
    resumingRef.current = true;
    connection.close();
    connRef.current = null;
    retryRef.current = window.setTimeout(open, ms.reconnectBase);
  }, [open]);

  const subscribe = useCallback((itemKey: string | "*", handler: Handler) => {
    handlersRef.current.set(handler, itemKey);
    return () => {
      handlersRef.current.delete(handler);
    };
  }, []);

  useEffect(() => {
    open();
    monitorRef.current = window.setInterval(() => {
      const silence = Date.now() - seenRef.current;
      const next = connectionForSilence(silence, stateRef.current);
      if (next) setConn(next);
      const current = connRef.current;
      if (shouldResume(silence, resumingRef.current, current)) resume(current);
    }, ms.tick);
    return () => {
      window.clearInterval(monitorRef.current);
      window.clearTimeout(retryRef.current);
      resumingRef.current = false;
      connRef.current?.close();
      connRef.current = null;
    };
  }, [open, resume, setConn]);

  return { connection, lastEventAt, subscribe };
}
