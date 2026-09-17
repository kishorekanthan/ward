import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { Chip } from "../../primitives/Chip";
import { LiveIndicator } from "../../live/LiveIndicator";
import { useBorderFlash } from "../../live/useBorderFlash";
import { duration } from "../../fmt/duration";
import { money } from "../../fmt/money";
import type { LiveConnection, LiveEvent } from "../../live/types";
import type { BoardField, BoardItem } from "./types";
import s from "./WorkCard.module.css";

export type WorkCardFeed = {
  connection: LiveConnection;
  subscribe: (itemKey: string | "*", handler: (e: LiveEvent) => void) => () => void;
};

export type WorkCardProps = {
  item: BoardItem;
  fields?: BoardField[];
  onOpen?: (key: string, source: HTMLElement) => void;
  selected?: boolean;
  feed?: WorkCardFeed | null;
  rovingProps?: Record<string, unknown>;
  // Only BoardColumn wraps cards in a role="list"; a standalone card with role="listitem" is an orphan.
  inList?: boolean;
};

const FLASH: Partial<Record<LiveEvent["type"], "blue" | "orange" | "green">> = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green",
};

function useEventFlash(ref: RefObject<HTMLElement | null>, itemKey: string, feed?: WorkCardFeed | null) {
  const blue = useBorderFlash(ref, "blue");
  const orange = useBorderFlash(ref, "orange");
  const green = useBorderFlash(ref, "green");
  const seen = useRef(new Set<string>());
  useEffect(() => {
    if (!feed) return;
    const flashers = { blue, orange, green };
    return feed.subscribe(itemKey, (e) => {
      if (seen.current.has(e.id)) return;
      seen.current.add(e.id);
      const colour = FLASH[e.type];
      if (colour) flashers[colour]();
    });
  }, [blue, feed, green, itemKey, orange]);
}

const FIELD_VALUE: Record<BoardField, (item: BoardItem) => string> = {
  key: (item) => item.key,
  lastAgentAction: (item) => item.lastAgentAction ?? "",
  cost: (item) => item.cost === undefined ? "" : money(item.cost),
  jiraLink: (item) => item.jiraKey ?? "",
};

function fieldValue(item: BoardItem, field: BoardField): string {
  return FIELD_VALUE[field](item);
}

function MetaLine({ item, connection }: { item: BoardItem; connection: LiveConnection }) {
  const sep = (
    <span className={s.sep} aria-hidden="true">
      ·
    </span>
  );
  if (item.run) {
    return (
      <p className={s.meta}>
        <span className={s.who}>waits on {item.run.agent}</span>
        {sep}
        <LiveIndicator startedAt={item.run.startedAt} connection={connection} turn={item.run.turn} lastEvent={item.run.lastStep} />
      </p>
    );
  }
  return (
    <p className={s.meta}>
      <span className={s.who}>waits on {item.waitsOn}</span>
      {sep}
      <span className={s.mono}>{duration(item.timeInStage)} in stage</span>
    </p>
  );
}

function Head({ item }: { item: BoardItem }) {
  const state = item.run ? { role: "running" as const, label: "AGENT WORKING" } : item.state;
  return (
    <div className={s.head}>
      {item.flagged && <Chip role="drift" label="DRIFT FLAG" />}
      {state && <Chip role={state.role} label={state.label} />}
    </div>
  );
}

// A blocked card names its cause in words; the BLOCKED chip alone would say only that it stopped.
function BlockedLine({ reason }: { reason?: string }) {
  if (!reason) return null;
  return <p className={s.reason}>Blocked: {reason}</p>;
}

function Fields({ item, fields }: { item: BoardItem; fields: BoardField[] }) {
  if (fields.length === 0) return null;
  return (
    <p className={s.fields}>
      {fields.map((f) => (
        <span className={s.field} key={f}>
          {fieldValue(item, f)}
        </span>
      ))}
    </p>
  );
}

const flag = (on?: boolean) => (on ? true : undefined);

function cardStyle(item: BoardItem): CSSProperties {
  return { "--stream": `var(--ward-stream-${item.streamStep}-id)` } as CSSProperties;
}

// Hands the hit button over because a mouse click does not focus it in every browser.
function openItem(onOpen: WorkCardProps["onOpen"], key: string, source: HTMLElement) {
  onOpen?.(key, source);
}

function connectionOf(feed?: WorkCardFeed | null): LiveConnection {
  return feed?.connection ?? "live";
}

// An empty last row would still draw its reserved height, so it is dropped entirely.
function Last({ item, stale }: { item: BoardItem; stale?: boolean }) {
  const text = item.run?.lastStep?.label ?? item.finding;
  if (!text) return null;
  return (
    <p className={s.last} data-stale={flag(stale)}>
      {text}
    </p>
  );
}

export function WorkCard(props: WorkCardProps) {
  const fields = props.fields ?? [];
  const item = props.item;
  const ref = useRef<HTMLDivElement>(null);
  useEventFlash(ref, item.key, props.feed);

  const connection = connectionOf(props.feed);
  const style = cardStyle(item);

  return (
    <div
      ref={ref}
      role={props.inList ? "listitem" : undefined}
      data-ward-card={item.key}
      className={s.card}
      style={style}
      data-selected={flag(props.selected)}
      data-flagged={flag(item.flagged)}
    >
      <button type="button" className={s.hit} onClick={(event) => openItem(props.onOpen, item.key, event.currentTarget)} {...props.rovingProps}>
        <span className="ward-visually-hidden">
          {item.key} {item.title}
        </span>
      </button>
      <Head item={item} />
      <p className={s.title}>{item.title}</p>
      <MetaLine item={item} connection={connection} />
      <BlockedLine reason={item.blockedReason} />
      <Fields item={item} fields={fields} />
      <Last item={item} stale={connection === "stale"} />
    </div>
  );
}
