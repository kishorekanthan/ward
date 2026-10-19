import s from "./StageSteps.module.css";

export type StepState = "done" | "now" | "next";
export type Step = { label: string; state: StepState };
export type StageStepsProps = { steps: Step[]; running?: boolean; label?: string };

const SPOKEN: Record<StepState, string> = { done: ", done", now: ", current", next: "" };

function StepItem({ step, running }: { step: Step; running: boolean }) {
  const pulse = step.state === "now" && running;
  return (
    <li className={s.step} data-state={step.state} aria-current={step.state === "now" ? "step" : undefined}>
      <span className={pulse ? `${s.dot} ward-running` : s.dot} aria-hidden="true" />
      <span className={s.label}>{step.label}</span>
      <span className="ward-visually-hidden">{SPOKEN[step.state]}</span>
    </li>
  );
}

// Only the now step of running work pulses; a waiting or finished track stays still.
export function StageSteps({ steps, running = false, label = "Progress" }: StageStepsProps) {
  return (
    <ol className={s.root} aria-label={label} data-ward-steps="">
      {steps.map((step) => <StepItem key={step.label} step={step} running={running} />)}
    </ol>
  );
}
