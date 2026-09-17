import type { CSSProperties } from "react";
import { Chip } from "../../primitives/Chip";
import { LiveIndicator } from "../../live/LiveIndicator";
import type { LiveConnection } from "../../live/types";
import type { StreamStep } from "../../tokens";
import s from "./AgentCard.module.css";

export type AgentVersion = { v: string; status: "live" | "draft" | "paused"; label?: string; by?: string; at?: string };

export type Agent = {
  id: string;
  name: string;
  streamStep: StreamStep;
  description?: string;
  versions: AgentVersion[];
  run?: { itemKey: string; startedAt: string; turn?: [number, number] };
};

const ROLE = { live: "done", draft: "running", paused: "meta" } as const;

export type AgentCardProps = {
  agent: Agent;
  href: string;
  selected?: boolean;
  connection?: LiveConnection;
  lastEvent?: { label: string; at: string };
  className?: string;
};

function cardClassName(className: string | undefined): string {
  return className === undefined ? s.card : `${s.card} ${className}`;
}

function Versions({ versions }: { versions: AgentVersion[] }) {
  return (
    <div className={s.chips}>
      {versions.map((v) => (
        <Chip key={v.v} role={ROLE[v.status]} size="tag" label={v.label ?? `${v.v} ${v.status.toUpperCase()}`} />
      ))}
    </div>
  );
}

function Description({ description }: { description: string | undefined }) {
  return description === undefined ? null : <p className={s.description}>{description}</p>;
}

function Run({ run, connection, lastEvent }: Pick<AgentCardProps, "connection" | "lastEvent"> & { run: Agent["run"] }) {
  if (run === undefined) return null;
  return (
    <p className={s.run}>
      working on {run.itemKey}
      <span className={s.sep} aria-hidden="true">
        ·
      </span>
      <LiveIndicator startedAt={run.startedAt} connection={connection ?? "live"} lastEvent={lastEvent} turn={run.turn} />
    </p>
  );
}

function isPaused(versions: AgentVersion[]): true | undefined {
  return versions.length > 0 && versions.every((v) => v.status === "paused") ? true : undefined;
}

export function AgentCard({ agent, href, selected, connection = "live", lastEvent, className }: AgentCardProps) {
  const style = { "--stream": `var(--ward-stream-${agent.streamStep}-id)` } as CSSProperties;
  const current = selected ? "true" : undefined;
  return (
    <article
      aria-current={current}
      className={cardClassName(className)}
      style={style}
      data-selected={current}
      data-paused={isPaused(agent.versions)}
    >
      <h3 className={s.head}>
        <span className={s.mark} aria-hidden="true" />
        <a className={`${s.name} ward-rowlink`} href={href} aria-current={current}>
          {agent.name}
        </a>
      </h3>
      <Description description={agent.description} />
      <Run run={agent.run} connection={connection} lastEvent={lastEvent} />
      <Versions versions={agent.versions} />
    </article>
  );
}
