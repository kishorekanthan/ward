import { useId, type ReactNode } from "react";
import { Btn } from "../../primitives/Btn";
import { Chip, type ChipProps } from "../../primitives/Chip";
import { StatStrip } from "../../primitives/StatStrip";
import { count } from "../../fmt/count";
import { duration } from "../../fmt/duration";
import type { LiveConnection } from "../../live/types";
import { AgentCard, type AgentCardProps } from "./AgentCard";
import s from "./StageColumn.module.css";

export type StageKind = "entry" | "agent" | "gate" | "terminal";

export type Stage = {
  index: number;
  name: string;
  kind: StageKind;
  count: number;
  medianWait?: number;
  reviewers?: string[];
  gateShare?: number;
  closedThisWeek?: number;
};

export type StageColumnProps = {
  stage: Stage;
  agents?: AgentCardProps[];
  onMount?: () => void;
  feed?: { connection: LiveConnection } | null;
};

export type StageColumnReviewer = { initials: string; name: string };

export type StageColumnSummary = {
  index: number;
  name: string;
  kind: StageKind;
  count?: number;
  medianWait?: string;
  reviewers?: StageColumnReviewer[];
  gateShare?: number;
  closedThisWeek?: number;
};

export type StageColumnWorkflowProps = {
  stage: StageColumnSummary;
  agentCards?: ReactNode;
  onMount?: (index: number) => void;
  presentation: { mode: "workflow" };
};

type RenderProps = StageColumnProps | StageColumnWorkflowProps;

const KIND_LABEL: Record<StageKind, string> = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };

function percent(fraction: number): string {
  return `${Math.round(fraction * 100)}%`;
}

function GatePanel({ stage }: { stage: Stage }) {
  const reviewers = stage.reviewers ?? [];
  return (
    <div className={s.gate} data-panel="gate">
      <p className={s.reviewersLabel}>Reviewers</p>
      <ul className={s.reviewers}>
        {reviewers.map((reviewer) => <li className={s.reviewer} key={reviewer}>{reviewer}</li>)}
      </ul>
      {stage.gateShare === undefined ? null : (
        <StatStrip cells={[
          { value: percent(stage.gateShare), label: "Gate share", accent: "amber" },
          { value: count(stage.count), label: "In stage" },
        ]} />
      )}
    </div>
  );
}

function TerminalCounter({ stage }: { stage: Stage }) {
  return <StatStrip cells={[
    { value: count(stage.count), label: "In stage" },
    { value: count(stage.closedThisWeek ?? 0), label: "Closed this week" },
  ]} />;
}

function StageHead({ stage, titleId }: { stage: Stage; titleId: string }) {
  return (
    <header className={s.head}>
      <span className={s.index}>{String(stage.index).padStart(2, "0")}</span>
      <h3 className={s.name} id={titleId}>{stage.name}</h3>
      <Chip role={stage.kind === "gate" ? "gate" : "soft"} label={KIND_LABEL[stage.kind]} />
    </header>
  );
}

function StageMeta({ stage }: { stage: Stage }) {
  return (
    <p className={s.meta}>
      <span className={s.mono}>{count(stage.count)} in stage</span>
      {stage.medianWait === undefined ? null : <span className={s.mono}>{duration(stage.medianWait)} median wait</span>}
    </p>
  );
}

function StagePanel({ stage }: { stage: Stage }) {
  if (stage.kind === "gate") return <GatePanel stage={stage} />;
  if (stage.kind === "terminal") return <TerminalCounter stage={stage} />;
  return null;
}

function MountAction({ onMount }: { onMount?: () => void }) {
  if (!onMount) return null;
  return <Btn variant="ghost" size="sm" onClick={() => onMount()}>Mount an agent</Btn>;
}

function StandardColumn({ stage, agents = [], onMount, feed }: StageColumnProps) {
  const titleId = useId();
  const connection = feed?.connection ?? "live";
  return (
    <section className={s.column} aria-labelledby={titleId} data-kind={stage.kind}>
      <StageHead stage={stage} titleId={titleId} />
      <StageMeta stage={stage} />
      <StagePanel stage={stage} />
      <div className={s.agents}>
        {agents.map((agent) => <AgentCard key={agent.agent.id} {...agent} connection={connection} />)}
      </div>
      <MountAction onMount={onMount} />
    </section>
  );
}

const WORKFLOW_TAG: Partial<Record<StageKind, ChipProps>> = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" },
};

function ReviewerList({ reviewers }: { reviewers: StageColumnReviewer[] }) {
  return (
    <ul className={s.reviewerList}>
      {reviewers.map((reviewer) => (
        <li key={reviewer.initials} className={s.reviewerRow}>
          <span className={s.reviewerMark} aria-hidden="true">{reviewer.initials}</span>
          <span className={s.reviewerName}>{reviewer.name}</span>
        </li>
      ))}
    </ul>
  );
}

function WorkflowGatePanel({ stage }: { stage: StageColumnSummary }) {
  const reviewers = stage.reviewers ?? [];
  return (
    <div className={s.workflowGate} data-panel="gate">
      <p className={s.gateNote}>
        No agent can advance an item out of this stage.{reviewers.length === 0 ? null : " Reviewers:"}
      </p>
      {reviewers.length === 0 ? null : <ReviewerList reviewers={reviewers} />}
      {stage.gateShare === undefined ? null : (
        <p className={s.cardNote} data-accent="amber">
          <span>{percent(stage.gateShare)}</span> of elapsed time is spent here
        </p>
      )}
    </div>
  );
}

function WorkflowTerminalCounter({ stage }: { stage: StageColumnSummary }) {
  return (
    <div className={s.terminalCard}>
      <span className={s.terminalCount}>{stage.closedThisWeek ?? 0}</span>
      <span className={s.cardNote}>items closed this week</span>
    </div>
  );
}

function itemCount(count = 0): string {
  return `${count} ${count === 1 ? "item" : "items"}`;
}

function workflowCountLine(stage: StageColumnSummary): string {
  if (stage.kind === "terminal") return `${stage.closedThisWeek ?? 0} this week`;
  const items = itemCount(stage.count);
  return stage.medianWait === undefined ? items : `${items} · median wait ${stage.medianWait}`;
}

function WorkflowHead({ stage, titleId }: { stage: StageColumnSummary; titleId: string }) {
  const tag = WORKFLOW_TAG[stage.kind];
  return (
    <header className={s.workflowHead}>
      <span className={s.stageRow}>
        <span className={s.stageLabel} id={`${titleId}-index`}>Stage {String(stage.index).padStart(2, "0")}</span>
        {tag === undefined ? null : <Chip {...tag} size="tag" />}
      </span>
      <h3 id={titleId} className={s.workflowTitle}>{stage.name}</h3>
      <span className={s.workflowMeta}>{workflowCountLine(stage)}</span>
    </header>
  );
}

function canMount(kind: StageKind): boolean {
  return kind === "entry" || kind === "agent";
}

function WorkflowMount({ stage, onMount }: Pick<StageColumnWorkflowProps, "stage" | "onMount">) {
  if (onMount === undefined || !canMount(stage.kind)) return null;
  return <button type="button" className={s.mount} onClick={() => onMount(stage.index)}>+ Mount agent</button>;
}

function WorkflowColumn({ stage, agentCards, onMount }: StageColumnWorkflowProps) {
  const titleId = useId();
  return (
    <section className={s.workflowColumn} aria-labelledby={`${titleId}-index ${titleId}`} data-kind={stage.kind}>
      <WorkflowHead stage={stage} titleId={titleId} />
      {stage.kind === "gate" ? <WorkflowGatePanel stage={stage} /> : null}
      {stage.kind === "terminal" ? <WorkflowTerminalCounter stage={stage} /> : null}
      {agentCards === undefined ? null : <div className={s.workflowAgents}>{agentCards}</div>}
      <WorkflowMount stage={stage} onMount={onMount} />
    </section>
  );
}

function isWorkflow(props: RenderProps): props is StageColumnWorkflowProps {
  return "presentation" in props && props.presentation.mode === "workflow";
}

export function StageColumn(props: RenderProps) {
  if (isWorkflow(props)) return <WorkflowColumn {...props} />;
  return <StandardColumn {...props} />;
}
