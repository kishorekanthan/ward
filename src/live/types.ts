import type { LiveEventType } from "../tokens";

export type LiveConnection = "live" | "reconnecting" | "stale";

export type LiveEvent = {
  id: string;
  type: LiveEventType;
  at: string;
  itemKey?: string;
  runId?: string;
  agent?: string;
  turn?: [number, number];
  step?: { label: string; tool?: string; ms?: number };
  items?: unknown[];
};
