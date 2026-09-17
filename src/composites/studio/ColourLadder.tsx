import type { CSSProperties, KeyboardEvent, ReactElement } from "react";
import { Marker } from "../../primitives/Marker";
import { isStreamStep, isValidatedStreamStep, type StreamStep } from "../../tokens";
import s from "./ColourLadder.module.css";

export type LadderStep = { step: StreamStep; name: string; reserved?: boolean };

type CompatibilityLadderStep = { step: number; name?: string; reserved?: boolean };

export type ColourLadderProps = {
  label: string;
  steps: LadderStep[];
  value: StreamStep;
  onChange: (step: StreamStep) => void;
  takenBy?: Record<number, string>;
};

export type ColourLadderCompatibilityProps = {
  label?: string;
  steps: CompatibilityLadderStep[];
  value: number | null;
  onChange?: (step: number) => void;
  takenBy?: Record<number, string>;
  // swatches: Studio 3b's 22px squares; each keeps its name and holder as its accessible label.
  presentation?: "swatches";
};

type RenderProps = ColourLadderProps | ColourLadderCompatibilityProps;

type Validation = "validated" | "partial" | "reserved";

// tokens.json ships steps 4–6 without dark stepping or the CVD matrix, so they show but cannot be picked.
export const PARTIAL_STEP_REASON = "not validated — needs CVD matrix and dark stepping";

export function ladderValidation(step: CompatibilityLadderStep): Validation {
  if (step.reserved) return "reserved";
  return isValidatedStreamStep(step.step) ? "validated" : "partial";
}

function holderOf(validation: Validation, taken: string | undefined): string {
  if (taken !== undefined && validation !== "reserved") return `taken by ${taken}`;
  if (validation === "reserved") return "reserved";
  if (validation === "partial") return "not validated";
  return "free";
}

function cellStyle(step: CompatibilityLadderStep, validation: Validation): CSSProperties {
  return validation === "reserved" ? {} : ({ "--stream": `var(--ward-stream-${step.step}-id)` } as CSSProperties);
}

function Swatch({ validation }: { validation: Validation }): ReactElement {
  if (validation === "validated") return <Marker size={14} kind="stream" />;
  return <span className={`${s.empty} ward-ladder-swatch ward-ladder-swatch--empty`} aria-hidden="true" />;
}

function onActivate(event: KeyboardEvent, select: () => void): void {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  select();
}

function cellAttributes(unavailable: boolean, checked: boolean) {
  return {
    "aria-checked": checked,
    "aria-disabled": unavailable || undefined,
    tabIndex: unavailable ? -1 : 0,
    "data-checked": checked ? "true" : undefined,
    "data-unavailable": unavailable ? "true" : undefined,
  };
}

function Cell({ step, value, taken, onChange, swatch }: {
  step: CompatibilityLadderStep;
  value: number | null;
  taken: string | undefined;
  onChange: (step: number) => void;
  swatch: boolean;
}): ReactElement {
  const validation = ladderValidation(step);
  const holder = holderOf(validation, taken);
  const unavailable = holder !== "free";
  const name = step.name ?? `Step ${step.step}`;
  const select = () => {
    if (!unavailable) onChange(step.step);
  };
  const label = `${name} — ${holder}`;
  if (swatch)
    return (
      <span role="radio" aria-label={label} title={label} {...cellAttributes(unavailable, value === step.step)} className={`${s.swatch} ward-ladder-cell`} data-validation={validation} style={cellStyle(step, validation)} onClick={select} onKeyDown={(event) => onActivate(event, select)} />
    );
  return (
    <span
      role="radio"
      aria-label={label}
      {...cellAttributes(unavailable, value === step.step)}
      className={`${s.cell} ward-ladder-cell`}
      data-validation={validation}
      style={cellStyle(step, validation)}
      onClick={select}
      onKeyDown={(event) => onActivate(event, select)}
    >
      <Swatch validation={validation} />
      <span className={`${s.name} ward-ladder-name`}>{name}</span>
      <span className={`${s.holder} ward-ladder-holder`}>{holder}</span>
    </span>
  );
}

function assertLadderSteps(steps: CompatibilityLadderStep[]): void {
  for (const step of steps) {
    if (!step.reserved && !isStreamStep(step.step)) throw new Error("colour ladder renders token steps only");
  }
}

function RequestCell(): ReactElement {
  return (
    <div className={`${s.cell} ward-ladder-cell ${s.request}`} data-validation="request">
      <span className={`${s.empty} ward-ladder-swatch ward-ladder-swatch--empty`} aria-hidden="true" />
      <span className={`${s.name} ward-ladder-name`}>request</span>
      <span className={`${s.holder} ward-ladder-holder`}>Ask design for a new step</span>
    </div>
  );
}

function isSwatches(props: RenderProps): boolean {
  return "presentation" in props && props.presentation === "swatches";
}

export function ColourLadder(props: ColourLadderProps): ReactElement;
export function ColourLadder(props: ColourLadderCompatibilityProps): ReactElement;
export function ColourLadder(props: RenderProps): ReactElement {
  const takenBy = props.takenBy ?? {};
  const onChange = (step: number) => {
    props.onChange?.(step as never);
  };
  assertLadderSteps(props.steps);
  const swatch = isSwatches(props);
  return (
    <div role="radiogroup" aria-label={props.label ?? "Stream colour — validated steps only"} className={`${swatch ? s.swatches : s.ladder} ward-ladder`}>
      {props.steps.map((step) => (
        <Cell key={step.step} step={step} value={props.value} taken={takenBy[step.step]} onChange={onChange} swatch={swatch} />
      ))}
      {swatch ? null : <RequestCell />}
    </div>
  );
}
