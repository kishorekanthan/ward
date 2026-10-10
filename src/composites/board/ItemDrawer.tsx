import { useId, type ReactNode } from "react";
import { Chip } from "../../primitives/Chip";
import { Overlay } from "../../primitives/Overlay";
import { LiveIndicator } from "../../live/LiveIndicator";
import { duration } from "../../fmt/duration";
import type { BoardItem } from "./types";
import type { WorkCardFeed } from "./WorkCard";
import { streamChipProps, validatedStep } from "../../primitives/streamColour";
import s from "./ItemDrawer.module.css";

export type ItemDetail = BoardItem & {
  summary: string;
  workflow: string;
  stateLabel: string;
  agentSentence?: string;
  agentMeta?: string;
  streamName?: string;
};

/** A fact row the app adds to the drawer's facts list; Ward renders it like a built-in row. */
export type DrawerFact = { label: string; value: ReactNode };

export type ItemDrawerProps = {
  item: ItemDetail;
  actions: ReactNode[];
  onClose: () => void;
  returnFocusTo?: HTMLElement | null;
  feed?: WorkCardFeed | null;
  resolve?: ReactNode;
  resolveLabel?: string;
  actionsNote?: string;
  facts?: DrawerFact[];
};

// A blocked cause is not an owner, so it gets its own row instead of standing in for Waits on.
function blockedRows(item: ItemDetail): [string, ReactNode][] {
  return item.blockedReason ? [["Blocked", item.blockedReason]] : [];
}

function runningRows(item: ItemDetail, feed?: WorkCardFeed | null): [string, ReactNode][] {
  if (!item.run) return [];
  const connection = feed?.connection ?? "live";
  return [["Running", <LiveIndicator key="l" startedAt={item.run.startedAt} connection={connection} turn={item.run.turn} lastEvent={item.run.lastStep} />]];
}

function stepLabel(step: number | null): string {
  const valid = validatedStep(step);
  return valid === null ? "No colour" : `Step ${valid}`;
}

// Built-in rows key on their label; an app fact keys on its position, as two facts may share a label.
type Row = [label: string, value: ReactNode, key?: string];

function factRows(facts?: DrawerFact[]): Row[] {
  return (facts ?? []).map((fact, index) => [fact.label, fact.value, `fact-${index}`]);
}

function detailRows(item: ItemDetail, feed?: WorkCardFeed | null, facts?: DrawerFact[]): Row[] {
  const rows: Row[] = [
    ["Stream", item.streamName ?? <Chip key="s" {...streamChipProps(stepLabel(item.streamStep), item.streamStep)} />],
    ["Workflow", item.workflow],
    ["State", item.stateLabel],
    ["Time in stage", duration(item.timeInStage)],
    ["Waits on", item.run ? item.run.agent : item.waitsOn],
    ...blockedRows(item),
    ...factRows(facts),
    ...runningRows(item, feed),
  ];
  return rows;
}

function ResolveSection({ resolve, label }: { resolve: ReactNode; label: string }) {
  if (resolve === undefined || resolve === null) return null;
  return (
    <section className={s.resolve} aria-label={label}>
      <h3 className={s.k}>{label}</h3>
      {resolve}
    </section>
  );
}

function DrawerHead({ item }: { item: ItemDetail }) {
  const state = item.run ? { role: "running" as const, label: "Agent working" } : item.state;
  return (
    <div className={s.head}>
      <Chip role="meta" label={item.key} />
      {state && <Chip role={state.role} label={state.label} />}
    </div>
  );
}

function AgentQuote({ item }: { item: ItemDetail }) {
  if (!item.agentSentence) return null;
  return (
    <div className={s.block}>
      <p className={s.k}>What the agent says</p>
      <p className={s.quote}>{item.agentSentence}</p>
      {item.agentMeta && <p className={s.note}>{item.agentMeta}</p>}
    </div>
  );
}

export function ItemDrawer({ item, actions, onClose, returnFocusTo, feed, resolve, resolveLabel, actionsNote, facts }: ItemDrawerProps) {
  const titleId = useId();
  const rows = detailRows(item, feed, facts);
  return (
    <Overlay kind="drawer" labelledBy={titleId} onClose={onClose} returnFocusTo={returnFocusTo} flush>
      <div className={s.body}>
        <DrawerHead item={item} />
        <div className={s.summary}>
          <h2 className={s.title} id={titleId}>
            {item.title}
          </h2>
          {item.summary && <p className={s.note}>{item.summary}</p>}
        </div>
        <dl className={s.kv}>
          {rows.map(([label, value, key]) => (
            <div className={s.row} key={key ?? label}>
              <dt className={s.label}>{label}</dt>
              <dd className={s.value}>{value}</dd>
            </div>
          ))}
        </dl>
        <AgentQuote item={item} />
        <div className={s.actionsBlock}>
          <div className={s.actions}>{actions}</div>
          {actionsNote && <p className={s.note}>{actionsNote}</p>}
        </div>
        <ResolveSection resolve={resolve} label={resolveLabel ?? "Ways out of this hold"} />
      </div>
    </Overlay>
  );
}
