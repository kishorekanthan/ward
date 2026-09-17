import { useId, type ReactNode } from "react";
import { Chip } from "../../primitives/Chip";
import { Overlay } from "../../primitives/Overlay";
import { LiveIndicator } from "../../live/LiveIndicator";
import { duration } from "../../fmt/duration";
import type { BoardItem } from "./types";
import type { WorkCardFeed } from "./WorkCard";
import s from "./ItemDrawer.module.css";

export type ItemDetail = BoardItem & {
  summary: string;
  workflow: string;
  stateLabel: string;
  agentSentence?: string;
  agentMeta?: string;
  streamName?: string;
};

export type ItemDrawerProps = {
  item: ItemDetail;
  actions: ReactNode[];
  onClose: () => void;
  returnFocusTo?: HTMLElement | null;
  feed?: WorkCardFeed | null;
  resolve?: ReactNode;
  resolveLabel?: string;
  actionsNote?: string;
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

function detailRows(item: ItemDetail, feed?: WorkCardFeed | null): [string, ReactNode][] {
  const rows: [string, ReactNode][] = [
    ["Stream", item.streamName ?? <Chip key="s" role="stream" label={`STEP ${item.streamStep}`} streamStep={item.streamStep} />],
    ["Workflow", item.workflow],
    ["State", item.stateLabel],
    ["Time in stage", duration(item.timeInStage)],
    ["Waits on", item.run ? item.run.agent : item.waitsOn],
    ...blockedRows(item),
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
  const state = item.run ? { role: "running" as const, label: "AGENT WORKING" } : item.state;
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

export function ItemDrawer({ item, actions, onClose, returnFocusTo, feed, resolve, resolveLabel, actionsNote }: ItemDrawerProps) {
  const titleId = useId();
  const rows = detailRows(item, feed);
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
          {rows.map(([label, value]) => (
            <div className={s.row} key={label}>
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
