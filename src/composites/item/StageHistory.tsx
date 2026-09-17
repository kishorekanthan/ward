import type { ReactElement } from "react";
import { Marker } from "../../primitives/Marker";
import { money } from "../../fmt/money";
import { stamp } from "../../fmt/stamp";
import s from "./StageHistory.module.css";

export interface HistoryEntry {
  stage: string;
  sentence: string;
  at: string;
  actor: string;
  version?: string;
  cost?: number;
  state: "done" | "hold" | "pending";
}

/** @deprecated Use HistoryEntry, retained for consumers of the original Ward API. */
export type StageEntry = HistoryEntry;

export interface StageHistoryProps {
  entries: HistoryEntry[];
}

const MARKER_KIND: Record<HistoryEntry["state"], "tick" | "attention" | "hollow"> = {
  done: "tick",
  hold: "attention",
  pending: "hollow",
};

function EntryHead({ entry }: { entry: HistoryEntry }): ReactElement {
  return (
    <span className={s.head}>
      <span className={s.stage}>{entry.stage}</span>
      {entry.version ? <span className={s.version} title={entry.version}>{entry.version}</span> : null}
    </span>
  );
}

function Entry({ entry }: { entry: HistoryEntry }): ReactElement {
  if (!entry.actor) {
    throw new Error(`StageHistory: the "${entry.stage}" entry names no actor — every entry names who or what acted`);
  }
  return (
    <li className={`${s.item} ward-history-entry`} data-state={entry.state} data-hold={entry.state === "hold" ? "true" : undefined}>
      <span className={`${s.node} ward-history-node`}>
        <Marker size={9} kind={MARKER_KIND[entry.state]} label={entry.state} />
      </span>
      <span className={`${s.body} ward-history-stage`}>
        <EntryHead entry={entry} />
        <span className={s.sentence}>{entry.sentence}</span>
        <span className={`${s.meta} ward-history-meta`}>
          {`${stamp(entry.at)} · ${entry.actor}`}
          {entry.cost === undefined ? "" : ` · ${money(entry.cost)}`}
        </span>
      </span>
    </li>
  );
}

export function StageHistory({ entries }: StageHistoryProps): ReactElement {
  return (
    <ol className={`${s.list} ward-history`}>
      {entries.map((entry, index) => (
        <Entry entry={entry} key={entry.stage + String(index)} />
      ))}
    </ol>
  );
}
