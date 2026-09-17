import type { ReactElement, ReactNode } from "react";
import { Chip } from "../../primitives/Chip";
import { LiveIndicator } from "../../live/LiveIndicator";
import type { LiveConnection } from "../../live/types";
import type { ChipRole } from "../../tokens";
import s from "./RunbookSteps.module.css";

export type RunbookStepState = "done" | "running" | "pending";

export type RunbookStep = {
  title: string;
  detail: string;
  state: RunbookStepState;
  startedAt?: string;
};

type RunbookStepsBaseProps = {
  steps: RunbookStep[];
  actions?: ReactNode;
  connection?: LiveConnection;
};

export type WebRunbookStepsProps = RunbookStepsBaseProps & { presentation: "web" };

const STATE: Record<RunbookStepState, { role: ChipRole; label: string }> = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" },
};

function numeral(index: number) {
  return String(index + 1).padStart(2, "0");
}

function Step({ step, index, connection }: { step: RunbookStep; index: number; connection: LiveConnection }) {
  const state = STATE[step.state];
  const running = step.state === "running";
  return (
    <li className={s.step} aria-current={running ? "step" : undefined}>
      <span className={s.numeral}>{numeral(index)}</span>
      <span className={s.body}>
        <span className={s.head}>
          <span className={s.title}>{step.title}</span>
          <Chip role={state.role} label={state.label} />
          {running && step.startedAt && <LiveIndicator startedAt={step.startedAt} connection={connection} />}
        </span>
        <span className={s.detail}>{step.detail}</span>
      </span>
    </li>
  );
}

function CompactRunbookSteps({ steps, actions, connection = "live" }: RunbookStepsBaseProps): ReactElement {
  return (
    <div className={s.runbook}>
      <ol className={s.list}>
        {steps.map((step, i) => (
          <Step key={step.title} step={step} index={i} connection={connection} />
        ))}
      </ol>
      {actions && <div className={s.actions}>{actions}</div>}
    </div>
  );
}

// The web numeral keeps its muted ink inline so it survives without the Ward stylesheet.
function WebStep({ step, index, connection }: { step: RunbookStep; index: number; connection: LiveConnection }) {
  return (
    <li className={`${s.step} ${s.webStep} ward-runbook-step`}>
      <span className={`${s.numeral} ward-runbook-num`} style={{ color: "var(--ward-color-muted)" }}>
        {numeral(index)}
      </span>
      <span className={`${s.body} ${s.webBody}`}>
        <span className={`${s.head} ward-envrow`}>
          <span className={`${s.title} ${s.webTitle}`}>{step.title}</span>
          <Chip {...STATE[step.state]} />
          {step.state === "running" && step.startedAt !== undefined ? (
            <LiveIndicator startedAt={step.startedAt} connection={connection} />
          ) : null}
        </span>
        <span className={`${s.detail} ${s.webDetail} ward-runbook-detail`}>{step.detail}</span>
      </span>
    </li>
  );
}

function WebRunbookSteps({ steps, actions, connection = "live" }: WebRunbookStepsProps): ReactElement {
  return (
    <div className={s.runbook}>
      <ol className={`${s.list} ${s.webList} ward-runbook`}>
        {steps.map((step, i) => (
          <WebStep key={step.title} step={step} index={i} connection={connection} />
        ))}
      </ol>
      {actions !== undefined ? <span className={`${s.actions} ward-clarity-actions`}>{actions}</span> : null}
    </div>
  );
}

export function RunbookSteps(props: RunbookStepsBaseProps | WebRunbookStepsProps): ReactElement {
  return "presentation" in props ? <WebRunbookSteps {...props} /> : <CompactRunbookSteps {...props} />;
}
