import type { ReactNode } from "react";
import { stamp } from "../fmt/stamp";
import { Btn } from "../primitives/Btn";
import s from "./states.module.css";

export type StateAction = { label: string; onClick: () => void };
export type EmptyStateProps = { sentence: string; action?: StateAction };

type BlockProps = EmptyStateProps & { children?: ReactNode; role?: "status" | "alert"; tone?: "failed" };

function Action({ action }: { action?: StateAction }) {
  if (action === undefined) return null;
  return (
    <span className={s.action}>
      <Btn onClick={action.onClick}>{action.label}</Btn>
    </span>
  );
}

function Block({ sentence, action, children, role = "status", tone }: BlockProps) {
  return (
    <div className={`${s.block} ward-state`} role={role} data-tone={tone}>
      <p className={s.sentence}>{sentence}</p>
      {children}
      <Action action={action} />
    </div>
  );
}

export function EmptyState(props: EmptyStateProps) {
  return <Block {...props} />;
}

export type FilteredEmptyProps = { sentence: string; total: number; action?: StateAction };
export function FilteredEmpty({ sentence, total, action }: FilteredEmptyProps) {
  return <Block sentence={sentence} action={action}><p className={s.meta}>0 of {total} match the filter</p></Block>;
}

export function DeniedState(props: EmptyStateProps) {
  return <Block {...props} />;
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
  return <div className={s.strip} role="status" data-tone="warn">Live data stopped {stamp(lastReachableAt)} — showing snapshot from {stamp(snapshotAt)}</div>;
}

export type WriteUnavailableStripProps = { queued: number; since: string };
export function WriteUnavailableStrip({ queued, since }: WriteUnavailableStripProps) {
  return <div className={s.strip} role="alert" data-tone="failed">Writes unavailable — {queued} requests queued since {stamp(since)}</div>;
}
