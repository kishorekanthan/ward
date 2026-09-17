import { elapsed } from "../fmt/elapsed";
import { clock } from "../fmt/clock";
import { stamp } from "../fmt/stamp";
import { useTicker } from "./useTicker";
import s from "./LiveIndicator.module.css";

export type LiveIndicatorProps = {
  startedAt: string;
  lastEvent?: { label: string; at: string };
  connection: "live" | "reconnecting" | "stale";
  turn?: [number, number];
};

function indicatorParts(
  running: boolean,
  elapsedMs: number,
  frozenAt: string,
  turn?: [number, number],
  lastEvent?: LiveIndicatorProps["lastEvent"],
): string[] {
  const parts = [elapsed(elapsedMs)];
  if (!running) parts.push(`as of ${clock(frozenAt)}`);
  if (turn) parts.push(`turn ${turn[0]}/${turn[1]}`);
  if (lastEvent) parts.push(lastEvent.label);
  return parts;
}

export function LiveIndicator({ startedAt, lastEvent, connection, turn }: LiveIndicatorProps) {
  const running = connection !== "stale";
  const elapsedMs = useTicker(startedAt, running);
  const frozenAt = lastEvent?.at ?? startedAt;
  const parts = indicatorParts(running, elapsedMs, frozenAt, turn, lastEvent);
  return (
    <span className={`${s.root} ward-liveind`} role="timer">
      <span aria-hidden="true">{parts.join(" · ")}</span>
      <span className="ward-visually-hidden">started {stamp(startedAt)}</span>
    </span>
  );
}
