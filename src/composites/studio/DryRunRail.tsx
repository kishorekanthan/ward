import { useEffect, useId, useState, type ReactElement, type ReactNode } from "react";
import { duration } from "../../fmt/duration";
import { money } from "../../fmt/money";
import { ratio } from "../../fmt/ratio";
import { stamp } from "../../fmt/stamp";
import { LiveIndicator } from "../../live/LiveIndicator";
import type { LiveConnection, LiveEvent } from "../../live/types";
import { Btn } from "../../primitives/Btn";
import { Chip } from "../../primitives/Chip";
import { Marker } from "../../primitives/Marker";
import { StatStrip } from "../../primitives/StatStrip";
import type { MarkerKind } from "../../tokens";
import { GateChecklist, type GateItem } from "./GateChecklist";
import s from "./DryRunRail.module.css";

export type DryRunStepKind = "ok" | "finding" | "action" | "notSimulated" | "running";
export type DryRunStep = { kind: DryRunStepKind; title: string; detail: string };
// durationMs is given, not derived: the comp's header reads "Trace · 6 steps · 38s".
export type DryRun = { status: "passed" | "failed" | "running" | "notRun"; startedAt?: string; sample?: { key: string; title: string; replayedFrom: string }; steps: DryRunStep[]; cost?: number; turns?: [number, number]; durationMs?: number };
export type FoundryDryRun = Omit<DryRun, "sample" | "steps"> & { sample?: { key: string; title: string; replayedFrom?: string }; steps: Array<Omit<DryRunStep, "detail"> & { detail?: string }>; gateCount?: number };
export type DryRunFeed = { connection: LiveConnection; subscribe?: (itemKey: string | "*", handler: (event: LiveEvent) => void) => () => void };

type WardProps = { run: DryRun; checklist: GateItem[]; publishNote: string; onPublish: () => void; feed?: DryRunFeed | null; presentation?: "ward" };
type FoundryProps = { run: FoundryDryRun; checklist: GateItem[]; publishNote?: string; onPublish?: () => void; feed: DryRunFeed | null; presentation: "foundry" };
export type DryRunRailProps = WardProps | FoundryProps;
type AnyStep = DryRunStep | FoundryDryRun["steps"][number];

const STATUS: Record<DryRun["status"], { role: "done" | "failed" | "running" | "pending"; label: string }> = {
  passed: { role: "done", label: "PASSED" }, failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" }, notRun: { role: "pending", label: "NOT RUN" },
};
const FOUNDRY_BLOCKER: Partial<Record<DryRun["status"], string>> = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" };
const STEP_MARKER: Record<"ok" | "finding" | "action", MarkerKind> = { ok: "greenFill", finding: "orangeFill", action: "blue" };
const HOLLOW_NAME: Partial<Record<DryRunStepKind, string>> = { notSimulated: "not simulated", running: "running" };

function foundryPresentation(props: DryRunRailProps): props is FoundryProps { return props.presentation === "foundry"; }

function wardPublishReason(run: DryRun, checklist: GateItem[]): string | null {
  if (run.status === "running") return "Publish is disabled: dry run in progress.";
  const unmet = checklist.filter((item) => !item.met);
  if (unmet.length > 0) return `Publish is disabled: ${unmet.length} of ${checklist.length} gate conditions unmet — ${unmet[0].text}`;
  return run.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}

function foundryPublishReason(run: FoundryDryRun, checklist: GateItem[]): string | null {
  const statusBlocker = FOUNDRY_BLOCKER[run.status];
  if (statusBlocker !== undefined) return statusBlocker;
  return checklist.find((item) => !item.met)?.text ?? null;
}

function hasFoundryGate(run: FoundryDryRun): boolean { return (run.status === "passed" || run.status === "failed") && (run.gateCount ?? 0) > 0; }
function validateWardTrace(run: DryRun, checklist: GateItem[]): void { if (checklist.length > 0 && !run.steps.some((step) => step.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated"); }
function validateFoundryTrace(run: FoundryDryRun): void { if (hasFoundryGate(run) && !run.steps.some((step) => step.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated"); }

function RevealedStep(props: { children: ReactNode; kind: DryRunStepKind }): ReactElement {
  const [shown, setShown] = useState(false);
  useEffect(() => setShown(true), []);
  const current = props.kind === "running" ? "step" : undefined;
  return <li className={`${s.step} ${s.reveal} ward-dryrun-step ward-reveal`} data-in={shown ? "true" : undefined} data-kind={props.kind} aria-current={current}>{props.children}</li>;
}

// The un-simulated dot is a ring, so it is hand-rolled: Marker only paints a fill.
function StepMark(props: { kind: DryRunStepKind }): ReactElement {
  const hollow = HOLLOW_NAME[props.kind];
  if (hollow !== undefined) return <span className={s.hollow} data-hollow="true" role="img" aria-label={hollow} />;
  return <Marker size={6} kind={STEP_MARKER[props.kind as keyof typeof STEP_MARKER]} label={props.kind} />;
}

function StepDetail(props: { detail?: string; foundry: boolean }): ReactElement | null { return props.detail === undefined ? null : <span className={s.stepDetail}>{props.foundry ? " · " : ""}{props.detail}</span>; }
function StepTimer(props: { run: DryRun | FoundryDryRun; kind: DryRunStepKind; connection: LiveConnection }): ReactElement | null { return props.kind === "running" && props.run.startedAt !== undefined ? <LiveIndicator startedAt={props.run.startedAt} connection={props.connection} turn={props.run.turns} /> : null; }

function TraceRow(props: { run: DryRun | FoundryDryRun; step: AnyStep; connection: LiveConnection; foundry: boolean }): ReactElement {
  const { step } = props;
  return <RevealedStep kind={step.kind}>
    <StepMark kind={step.kind} />
    <span className={s.stepBody} data-current={step.kind === "running" ? "true" : undefined}>
      <span className={s.stepTitle}>{step.title}</span><StepDetail detail={step.detail} foundry={props.foundry} />
    </span>
    <StepTimer run={props.run} kind={step.kind} connection={props.connection} />
  </RevealedStep>;
}

function traceLabel(steps: AnyStep[], durationMs: number | undefined): string {
  const parts = ["Trace", `${steps.length} step${steps.length === 1 ? "" : "s"}`];
  if (durationMs !== undefined) parts.push(duration(durationMs));
  return parts.join(" · ");
}

function Trace(props: { run: DryRun | FoundryDryRun; steps: AnyStep[]; connection: LiveConnection; foundry: boolean }): ReactElement | null {
  const headId = useId();
  if (props.steps.length === 0) return null;
  return <section className={`${s.trace} ${s.section}`}>
    <p className={s.traceHead} id={headId}>{traceLabel(props.steps, props.run.durationMs)}</p>
    <ol className={s.steps} aria-labelledby={headId}>{props.steps.map((step, index) => <TraceRow key={step.title + String(index)} {...props} step={step} />)}</ol>
  </section>;
}

function WardSample(props: { sample?: DryRun["sample"] }): ReactElement | null {
  if (props.sample === undefined) return null;
  return <div className={`${s.sample} ${s.section}`}>
    <p className={s.sampleLabel}>Sample item</p>
    <p className={s.sampleTitle}>{props.sample.key} · {props.sample.title}</p>
    <p className={s.sampleMeta}>replayed from {props.sample.replayedFrom}</p>
  </div>;
}

function FoundrySample(props: { sample?: FoundryDryRun["sample"] }): ReactElement | null {
  if (props.sample === undefined) return null;
  const replayed = props.sample.replayedFrom === undefined ? "" : " · replayed from " + stamp(props.sample.replayedFrom);
  return <p className={`${s.sampleMeta} ${s.section} ward-dryrun-sample`}>{"Sample item: " + props.sample.key + " · " + props.sample.title + replayed + " · no writes committed"}</p>;
}

function WardStats(props: { run: DryRun }): ReactElement {
  const cells = [{ value: props.run.cost === undefined ? "—" : money(props.run.cost), label: "Cost" }, { value: props.run.turns ? ratio(props.run.turns[0], props.run.turns[1]) : "—", label: "Turns used" }];
  return <div className={s.sectionFlush}><StatStrip divided cells={cells} /></div>;
}

function foundryCells(run: FoundryDryRun): Array<{ value: string; label: string }> {
  const cells: Array<{ value: string; label: string }> = [];
  if (run.cost !== undefined) cells.push({ value: money(run.cost), label: "Cost" });
  if (run.turns !== undefined) cells.push({ value: ratio(run.turns[0], run.turns[1]), label: "Turns used" });
  return cells;
}

function FoundryStats(props: { run: FoundryDryRun }): ReactElement | null {
  const cells = foundryCells(props.run);
  if (cells.length === 0) return null;
  if (cells.length === 1) return <p className={s.section}><span className="ward-stat-value">{cells[0].value}</span> <span className="ward-stat-label">{cells[0].label}</span></p>;
  return <div className={s.sectionFlush}><StatStrip divided cells={cells} /></div>;
}

function PublishButton(props: { reason: string | null; onPublish: () => void }): ReactElement {
  const reasonId = useId();
  if (props.reason !== null) return <><p className={`${s.reason} ward-checklist-note`} id={reasonId}>{props.reason}</p><Btn variant="primary" label="Publish" disabled describedBy={reasonId} /></>;
  return <Btn variant="primary" label="Publish" onClick={props.onPublish} />;
}

function WardPublish(props: { reason: string | null; note: string; onPublish: () => void }): ReactElement { return <div className={`${s.publish} ${s.section}`}><PublishButton reason={props.reason} onPublish={props.onPublish} /><p className={s.note}>{props.note}</p></div>; }
function FoundryPublish(props: { reason: string | null; onPublish?: () => void }): ReactElement | null { return props.onPublish === undefined ? null : <div className={`${s.publish} ${s.section}`}><PublishButton reason={props.reason} onPublish={props.onPublish} /></div>; }

function RailHead(props: { run: DryRun | FoundryDryRun; foundry: boolean; connection: LiveConnection }): ReactElement {
  return <div className={`${s.head} ${s.section}`}>
    {props.foundry && <span className={s.headLabel}>Dry run</span>}
    <Chip role={STATUS[props.run.status].role} label={STATUS[props.run.status].label} />
    {props.run.status === "running" && props.run.startedAt !== undefined && <LiveIndicator startedAt={props.run.startedAt} connection={props.connection} turn={props.run.turns} />}
  </div>;
}

function useLiveSteps(run: FoundryDryRun, feed: DryRunFeed | null): FoundryDryRun["steps"] {
  const [steps, setSteps] = useState(run.steps);
  useEffect(() => setSteps(run.steps), [run.steps]);
  useEffect(() => {
    if (feed?.subscribe === undefined || run.status !== "running") return;
    return feed.subscribe("*", (event) => { if (event.type === "run.step" || event.type === "run.finding") setSteps((current) => [...current, { kind: event.type === "run.finding" ? "finding" : "action", title: event.step?.label ?? "step", detail: event.step?.tool }]); });
  }, [feed, run.status]);
  return steps;
}

function WardRail(props: WardProps): ReactElement {
  validateWardTrace(props.run, props.checklist);
  const connection = props.feed?.connection ?? "live";
  return <aside className={`${s.rail} ward-dryrun`} aria-label="Dry run">
    <RailHead run={props.run} foundry={false} connection={connection} /><WardSample sample={props.run.sample} />
    <Trace run={props.run} steps={props.run.steps} connection={connection} foundry={false} />
    <WardStats run={props.run} />
    <div className={s.section}><GateChecklist items={props.checklist} /></div>
    <WardPublish reason={wardPublishReason(props.run, props.checklist)} note={props.publishNote} onPublish={props.onPublish} />
  </aside>;
}

function FoundryRail(props: FoundryProps): ReactElement {
  const steps = useLiveSteps(props.run, props.feed);
  validateFoundryTrace(props.run);
  const connection = props.feed?.connection ?? "live";
  return <aside className={`${s.rail} ward-dryrun`} aria-label="Dry run">
    <RailHead run={props.run} foundry connection={connection} /><FoundrySample sample={props.run.sample} />
    <Trace run={props.run} steps={steps} connection={connection} foundry />
    <FoundryStats run={props.run} />
    <div className={s.section}><GateChecklist items={props.checklist} note={props.publishNote} /></div>
    <FoundryPublish reason={foundryPublishReason(props.run, props.checklist)} onPublish={props.onPublish} />
  </aside>;
}

export function DryRunRail(props: DryRunRailProps): ReactElement { return foundryPresentation(props) ? <FoundryRail {...props} /> : <WardRail {...props} />; }
