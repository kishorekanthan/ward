import { Chip } from "../../primitives/Chip";
import { count } from "../../fmt/count";
import { duration } from "../../fmt/duration";
import type { CSSProperties, ReactElement } from "react";
import type { StreamStep } from "../../tokens";
import { streamChipProps, streamColour } from "../../primitives/streamColour";
import s from "./StreamRow.module.css";
import { safeHref } from "../../primitives/safeHref";

export type Stream = {
  name: string;
  key: string;
  streamStep: StreamStep | null;
  owner: string;
  members: number;
  stages: { name: string; gate: boolean }[];
  agents: { live: number; draft: number; paused: number };
  policy: { id: string; summary: string };
  inFlight: number;
  /** Tooltip saying what the in-flight count counts. */
  inFlightHint?: string;
  p50?: number;
  draft?: boolean;
};

export type StreamRowSummary = {
  name: string;
  key: string;
  streamStep: StreamStep | null;
  owner: string;
  members?: number;
  stages: { name: string; gate?: boolean }[];
  agents?: { live: number; draft: number; paused: number };
  policy?: { id: string; summary: string };
  inFlight?: number;
  /** Tooltip saying what the in-flight count counts. */
  inFlightHint?: string;
  p50?: string;
  draft?: boolean;
};

export type StreamRowPresentation = { columns: 5; className?: string };

type CompactStreamRowProps = { stream: StreamRowSummary; href: string; presentation: StreamRowPresentation };

export type StreamRowProps = { stream: Stream; href: string; presentation?: undefined } | CompactStreamRowProps;

function agentsLine(agents: NonNullable<StreamRowSummary["agents"]>): string {
  const parts = [`${agents.live} live`];
  if (agents.draft > 0) parts.push(`${agents.draft} draft`);
  if (agents.paused > 0) parts.push(`${agents.paused} paused`);
  return parts.join(" · ");
}

function compactClassName(className: string | undefined): string {
  return className === undefined ? s.compactRow : `${s.compactRow} ${className}`;
}

function membersText(members: number): string {
  return `${count(members)} ${members === 1 ? "member" : "members"}`;
}

function ownerLine(stream: StreamRowSummary): string {
  return stream.members === undefined ? stream.owner : `${stream.owner} · ${membersText(stream.members)}`;
}

function identityCell(stream: StreamRowSummary, href: string): ReactElement {
  const draft = stream.draft === true;
  return <td className={s.compactCell}>
    <span className={s.stack}>
      <span className={s.identityLine}>
        <span className={`${s.identity} ward-identity`} data-draft={draft} aria-hidden="true" />
        <a className={`${s.compactName} ward-rowlink`} href={safeHref(href)} data-draft={draft}>{stream.name}</a>
        <Chip role="meta" size="tag" label={draft ? `${stream.key} · DRAFT` : stream.key} />
      </span>
      <span className={s.ownerLine}>{ownerLine(stream)}</span>
    </span>
  </td>;
}

// A gate differs from other stages by a shape and spoken text, never by colour alone.
function StageChip({ name, gate, size }: { name: string; gate: boolean; size?: "tag" }): ReactElement {
  return <>
    {gate ? <span className={s.gateMark} aria-hidden="true" data-gate-mark>◆</span> : null}
    <Chip role={gate ? "gate" : "soft"} size={size} label={name} />
    {gate ? <span className="ward-visually-hidden"> (human gate)</span> : null}
  </>;
}

function stageChain(stages: StreamRowSummary["stages"]): ReactElement {
  return <span className={`${s.chain} ward-chiprow`}>
    {stages.map((stage, index) => (
      <span key={`${stage.name}${index}`} className={s.link}>
        {index === 0 ? null : <span className={s.arrow} aria-hidden="true">→</span>}
        <StageChip name={stage.name} gate={stage.gate === true} size="tag" />
      </span>
    ))}
  </span>;
}

function stagesCell(stages: StreamRowSummary["stages"], href: string): ReactElement {
  return <td className={s.compactCell}>
    {stages.length === 0 ? <span className={s.emptyChain}><span className={s.muted}>No stages yet</span><a className={s.define} href={safeHref(href)}>Define workflow</a></span> : stageChain(stages)}
  </td>;
}

function statCell(value: string | undefined, sub: string | undefined, fallback: string, hint?: string): ReactElement {
  return <td className={s.compactCell}>
    {value === undefined ? <span className={s.muted}>{fallback}</span> : <span className={s.stat}>
      <span className={`${s.statValue} ward-stat-value`} title={hint}>{value}</span>
      {sub === undefined ? null : <span className={s.sub}>{sub}</span>}
    </span>}
  </td>;
}

function policyCell(policy: StreamRowSummary["policy"]): ReactElement {
  return <td className={s.compactCell}>
    {policy === undefined ? <span className={s.muted}>not set</span> : <span className={s.stat}>
      <span className={s.policyId}>{policy.id}</span>
      <span className={s.sub}>{policy.summary}</span>
    </span>}
  </td>;
}

function agentsTotal(agents: StreamRowSummary["agents"]): string | undefined {
  return agents === undefined ? undefined : String(agents.live + agents.draft + agents.paused);
}

function compactRow({ stream, href, presentation }: CompactStreamRowProps) {
  const rowClass = compactClassName(presentation.className);
  return (
    <tr className={`${rowClass} ward-streamrow`} data-draft={stream.draft === true} style={{ "--stream": streamColour(stream.streamStep, "chip") } as CSSProperties}>
      {identityCell(stream, href)}
      {stagesCell(stream.stages, href)}
      {statCell(agentsTotal(stream.agents), stream.agents === undefined ? undefined : agentsLine(stream.agents), "—")}
      {policyCell(stream.policy)}
      {statCell(stream.inFlight === undefined ? undefined : String(stream.inFlight), stream.p50 === undefined ? undefined : `P50 ${stream.p50}`, "—", stream.inFlightHint)}
    </tr>
  );
}

function isCompact(props: StreamRowProps): props is CompactStreamRowProps {
  return props.presentation?.columns === 5;
}

export function StreamRow(props: StreamRowProps) {
  if (isCompact(props)) return compactRow(props);
  const { stream, href } = props;
  return (
    <tr className={s.row}>
      <td className={s.cell}>
        <a className={s.name} href={safeHref(href)}>
          {stream.name}
        </a>
        <Chip {...streamChipProps(stream.key, stream.streamStep)} />
        {stream.draft && <Chip role="running" label="DRAFT" />}
      </td>
      <td className={s.cell}>
        <span className={s.chain}>
          {stream.stages.map((st) => (
            <span key={st.name} className={s.link}><StageChip name={st.name} gate={st.gate} /></span>
          ))}
        </span>
      </td>
      <td className={s.cell}>
        <span className={s.mono}>
          {stream.agents.live} live · {stream.agents.draft} draft · {stream.agents.paused} paused
        </span>
      </td>
      <td className={s.cell}>
        <span className={s.owner}>{stream.owner}</span>
        <span className={s.mono}>{membersText(stream.members)}</span>
      </td>
      <td className={s.cell} data-align="end">
        <span className={s.mono} title={stream.inFlightHint}>{count(stream.inFlight)}</span>
      </td>
      <td className={s.cell} data-align="end">
        <span className={s.mono}>{stream.p50 === undefined ? "" : duration(stream.p50)}</span>
      </td>
    </tr>
  );
}
