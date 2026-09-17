import { elapsed } from "../fmt/elapsed";
import { stamp } from "../fmt/stamp";
import { useTicker } from "../live/useTicker";
import type { LiveConnection } from "../live/types";
import { Marker } from "./Marker";
import s from "./ConnectionMark.module.css";

export type ConnectionMarkProps = {
  connection: LiveConnection;
  since?: string;
  lastEventAt?: string | null;
};

function knownTime(since?: string, lastEventAt?: string | null): string {
  return since ?? lastEventAt ?? new Date().toISOString();
}

export function ConnectionMark({ connection, since, lastEventAt }: ConnectionMarkProps) {
  const observedAt = knownTime(since, lastEventAt);
  const elapsedMs = useTicker(observedAt, connection === "reconnecting");
  if (connection === "live") {
    return (
      <span className={`${s.root} ward-connection`} role="status">
        <Marker size={6} kind="green" />
        LIVE
      </span>
    );
  }
  if (connection === "reconnecting") {
    return (
      <span className={`${s.chip} ward-connection`} role="status">
        RECONNECTING ·{" "}
        <span className={s.noCase}>{elapsed(elapsedMs)}</span>
      </span>
    );
  }
  return (
    <span className={`${s.chip} ward-connection`} role="status">
      STALE · as of {stamp(observedAt)}
    </span>
  );
}
