import { useState } from "react";
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

function readable(time?: string | null): time is string {
  return !Number.isNaN(Date.parse(time ?? ""));
}

// A blank or unreadable time is unknown; with none known, the strip dates from its first render.
function knownTime(firstRender: string, since?: string, lastEventAt?: string | null): string {
  return [since, lastEventAt].find(readable) ?? firstRender;
}

export function ConnectionMark({ connection, since, lastEventAt }: ConnectionMarkProps) {
  const [firstRender] = useState(() => new Date().toISOString());
  const observedAt = knownTime(firstRender, since, lastEventAt);
  const elapsedMs = useTicker(observedAt, connection === "reconnecting");
  if (connection === "live") {
    return (
      <span className={`${s.root} ward-connection`} role="status">
        <Marker size={6} kind="green" />
        Live
      </span>
    );
  }
  if (connection === "reconnecting") {
    return (
      <span className={`${s.chip} ward-connection`} role="status">
        Reconnecting ·{" "}
        <span className={s.noCase}>{elapsed(elapsedMs)}</span>
      </span>
    );
  }
  return (
    <span className={`${s.chip} ward-connection`} role="status">
      Out of date · as of {stamp(observedAt)}
    </span>
  );
}
