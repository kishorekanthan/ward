import type { CSSProperties, ReactNode } from "react";
import { Btn } from "../../primitives/Btn";
import { ConnectionMark } from "../../primitives/ConnectionMark";
import { Field } from "../../primitives/Field";
import { count } from "../../fmt/count";
import { duration } from "../../fmt/duration";
import type { LiveConnection } from "../../live/types";
import type { FieldOption } from "../../primitives/Field";
import type { StreamStep } from "../../tokens";
import s from "./BoardHeader.module.css";

export type BoardRollups = {
  inFlight: number;
  loadedThisWeek?: number;
  agentsWorking?: number;
  p50?: number;
  p90?: number;
};

export type BoardHeaderProps = {
  stream: { name: string; key: string; streamStep: StreamStep; markRef?: string | null };
  rollups: BoardRollups;
  connection: LiveConnection;
  lastEventAt: string | null;
  owners?: FieldOption[];
  owner?: string;
  onOwnerChange?: (value: string) => void;
  onConfigure?: () => void;
  actions?: ReactNode;
};

const INITIALS_PREFIX = "initials:";

// A missing loaded count is stated as unavailable because a zero would claim nothing shipped.
function loadedPart(loaded: number | undefined) {
  return loaded === undefined ? "loaded this week unavailable" : `${count(loaded)} loaded this week`;
}

// Unknown optional rollups are omitted so the line gets shorter instead of showing an invented zero.
function rollupLine(r: BoardRollups) {
  const parts = [`${count(r.inFlight)} in flight`, loadedPart(r.loadedThisWeek)];
  if (r.agentsWorking !== undefined) parts.push(`${count(r.agentsWorking)} agents working`);
  if (r.p50 !== undefined) parts.push(`P50 ${duration(r.p50)}`);
  if (r.p90 !== undefined) parts.push(`P90 ${duration(r.p90)}`);
  return parts.join(" · ");
}

function initialsOf(markRef: string) {
  if (!markRef.startsWith(INITIALS_PREFIX)) return "";
  const words = markRef.slice(INITIALS_PREFIX.length).split(/[\s_-]+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join("");
}

// Without a mark_ref the stream draws as the comp's 8px swatch; uploaded marks are referenced by id only, so they draw as a plain tile.
function StreamMark({ markRef, streamStep }: { markRef?: string | null; streamStep: StreamStep }) {
  const style = { "--stream": `var(--ward-stream-${streamStep}-id)` } as CSSProperties;
  if (!markRef) return <span className={s.swatch} style={style} data-ward-stream-swatch="" aria-hidden="true" />;
  return (
    <span className={`${s.mark} ward-stream-mark`} style={style} data-mark-ref={markRef} aria-hidden="true">
      {initialsOf(markRef)}
    </span>
  );
}

function OwnerField({ owners, owner, onOwnerChange }: Pick<BoardHeaderProps, "owners" | "owner" | "onOwnerChange">) {
  if (owners === undefined || owners.length === 0) return null;
  return <Field kind="select" label="Owner" value={owner ?? owners[0].value} onChange={onOwnerChange} options={owners} />;
}

export function BoardHeader({
  stream,
  rollups,
  connection,
  lastEventAt,
  owners,
  owner,
  onOwnerChange,
  onConfigure,
  actions,
}: BoardHeaderProps) {
  return (
    <div className={s.head}>
      <div className={s.identity}>
        <div className={s.titleRow}>
          <StreamMark markRef={stream.markRef} streamStep={stream.streamStep} />
          <h1 className={s.title}>{stream.name}</h1>
          <span className={s.key}>{stream.key}</span>
        </div>
        <p className={s.rollup} aria-live="polite">
          {rollupLine(rollups)}
        </p>
      </div>
      <div className={s.tools} tabIndex={0} role="region" aria-label="Board header controls">
        <OwnerField owners={owners} owner={owner} onOwnerChange={onOwnerChange} />
        {onConfigure === undefined ? null : <Btn onClick={onConfigure}>Configure board</Btn>}
        {actions}
        <ConnectionMark connection={connection} since={lastEventAt ?? undefined} />
      </div>
    </div>
  );
}
