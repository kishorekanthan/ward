import type { ReactNode } from "react";
import { stamp } from "../fmt/stamp";
import { Btn } from "../primitives/Btn";
import s from "./states.module.css";

export type StateAction = { label: string; onClick: () => void };
export type EmptyStateProps = { sentence: string; action?: StateAction };

type BlockProps = EmptyStateProps & { children?: ReactNode; role?: "status" | "alert"; tone?: "failed"; kind?: string };

function Action({ action }: { action?: StateAction }) {
  if (action === undefined) return null;
  return (
    <span className={s.action}>
      <Btn onClick={action.onClick}>{action.label}</Btn>
    </span>
  );
}

function Block({ sentence, action, children, role = "status", tone, kind, ask }: BlockProps & { ask?: string }) {
  return (
    <div className={`${s.block} ward-state${kind === undefined ? "" : ` ${kind}`}`} role={role} data-tone={tone}>
      <p className={s.sentence}>{sentence}{ask === undefined || ask === "" ? null : <> <strong>{ask}</strong></>}</p>
      {children}
      <Action action={action} />
    </div>
  );
}

export function EmptyState(props: EmptyStateProps) {
  return <Block {...props} kind="ward-emptystate" />;
}

export type FilteredEmptyProps = { sentence: string; total: number; action?: StateAction };
export function FilteredEmpty({ sentence, total, action }: FilteredEmptyProps) {
  return <Block sentence={sentence} action={action}><p className={s.meta}>0 of {total} match the filter</p></Block>;
}

// A refusal names who to ask (bold) and offers ways on; a normal state, so no tone and no Retry.
export type DeniedStateProps = EmptyStateProps & { ask?: string; ways?: StateAction[] };
function Ways({ ways }: { ways: StateAction[] }) {
  return (
    <div className={`${s.ways} ward-state-ways`}>
      {ways.map((way) => <Btn key={way.label} variant="secondary" onClick={way.onClick}>{way.label}</Btn>)}
    </div>
  );
}

export function DeniedState({ ways, ...props }: DeniedStateProps) {
  return <Block {...props}>{ways === undefined || ways.length === 0 ? null : <Ways ways={ways} />}</Block>;
}

export type LoadFailedProps = { sentence: string; at: string; onRetry: () => void };
export function LoadFailed({ sentence, at, onRetry }: LoadFailedProps) {
  return (
    <Block role="alert" tone="failed" sentence={sentence} action={{ label: "Retry", onClick: onRetry }}>
      <p className={s.meta}>failed at {stamp(at)}</p>
    </Block>
  );
}

export type StaleStripProps = { lastReachableAt: string; snapshotAt: string };
export function StaleStrip({ lastReachableAt, snapshotAt }: StaleStripProps) {
  return <div className={s.strip} role="status" data-tone="warn">Live data stopped {stamp(lastReachableAt)}. Showing snapshot from {stamp(snapshotAt)}</div>;
}

export type WriteUnavailableStripProps = { queued: number; since: string };
export function WriteUnavailableStrip({ queued, since }: WriteUnavailableStripProps) {
  return <div className={s.strip} role="alert" data-tone="failed">Writes unavailable: {queued} requests queued since {stamp(since)}</div>;
}
