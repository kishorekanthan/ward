import type { CSSProperties, KeyboardEvent, ReactElement } from "react";
import { Marker } from "../../primitives/Marker";
import { isStreamStep, isValidatedStreamStep, streamHex, type StreamStep } from "../../tokens";
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
  // swatches: Studio 3b's 22px squares; tiles: Studio 9a's bar, hex and holder. Both keep the list's accessible label.
  presentation?: "swatches" | "tiles";
};

type RenderProps = ColourLadderProps | ColourLadderCompatibilityProps;

type Validation = "validated" | "partial" | "reserved";

// tokens.json ships steps 4–6 without dark stepping or the CVD matrix, so they show but cannot be picked.
export const PARTIAL_STEP_REASON = "not validated yet, pending a CVD matrix and dark stepping";

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

type Presentation = "list" | "swatches" | "tiles";

type CellProps = {
  step: CompatibilityLadderStep;
  value: number | null;
  taken: string | undefined;
  onChange: (step: number) => void;
  presentation: Presentation;
};

const twoDigit = (step: number) => String(step).padStart(2, "0");

// The picked step reads as the viewer's own; otherwise the tile names its holder as the list does.
function tileHolder(validation: Validation, taken: string | undefined, checked: boolean): string {
  if (validation === "reserved") return "Reserved until revalidated";
  if (checked) return "yours";
  return taken ?? holderOf(validation, undefined);
}

function TileBody({ step, validation, note }: { step: number; validation: Validation; note: string }): ReactElement {
  const reserved = validation === "reserved";
  return (
    <>
      <span className={`${s.bar} ward-ladder-bar`} aria-hidden="true" />
      <span className={`${s.hex} ward-ladder-hex`}>{reserved ? `step ${twoDigit(step)}` : streamHex(step)}</span>
      <span className={`${s.note} ward-ladder-note`}>{reserved ? note : `Step ${twoDigit(step)} · ${note}`}</span>
    </>
  );
}

type CellView = {
  shared: Record<string, unknown>;
  label: string;
  name: string;
  holder: string;
  validation: Validation;
  note: string;
  step: number;
};

function cellView({ step, value, taken, onChange, presentation }: CellProps): CellView {
  const validation = ladderValidation(step);
  const holder = holderOf(validation, taken);
  const unavailable = holder !== "free";
  const checked = value === step.step;
  const name = step.name ?? `Step ${step.step}`;
  const select = () => {
    if (!unavailable) onChange(step.step);
  };
  const label = `${name} · ${presentation === "tiles" && checked ? "yours" : holder}`;
  const shared = { role: "radio", "aria-label": label, ...cellAttributes(unavailable, checked), "data-validation": validation, style: cellStyle(step, validation), onClick: select, onKeyDown: (event: KeyboardEvent) => onActivate(event, select) };
  return { shared, label, name, holder, validation, note: tileHolder(validation, taken, checked), step: step.step };
}

const CELLS: Record<Presentation, (view: CellView) => ReactElement> = {
  swatches: (view) => <span {...view.shared} title={view.label} className={`${s.swatch} ward-ladder-cell`} />,
  tiles: (view) => (
    <span {...view.shared} className={`${s.tile} ward-ladder-cell`}>
      <TileBody step={view.step} validation={view.validation} note={view.note} />
    </span>
  ),
  list: (view) => (
    <span {...view.shared} className={`${s.cell} ward-ladder-cell`}>
      <Swatch validation={view.validation} />
      <span className={`${s.name} ward-ladder-name`}>{view.name}</span>
      <span className={`${s.holder} ward-ladder-holder`}>{view.holder}</span>
    </span>
  ),
};

function Cell(props: CellProps): ReactElement {
  return CELLS[props.presentation](cellView(props));
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

function presentationOf(props: RenderProps): Presentation {
  return ("presentation" in props ? props.presentation : undefined) ?? "list";
}

const GROUP_CLASS: Record<Presentation, string> = { list: s.ladder, swatches: s.swatches, tiles: s.tilesFrame };

function RequestTile(): ReactElement {
  return (
    <div className={`${s.tile} ward-ladder-cell`} data-validation="request">
      <span className={`${s.bar} ward-ladder-bar`} aria-hidden="true" />
      <span className={`${s.hex} ward-ladder-hex`}>request</span>
      <span className={`${s.note} ward-ladder-note`}>Ask design for a new step</span>
    </div>
  );
}

const REQUEST: Record<Presentation, () => ReactElement | null> = { list: RequestCell, swatches: () => null, tiles: RequestTile };

export function ColourLadder(props: ColourLadderProps): ReactElement;
export function ColourLadder(props: ColourLadderCompatibilityProps): ReactElement;
export function ColourLadder(props: RenderProps): ReactElement {
  const takenBy = props.takenBy ?? {};
  const onChange = (step: number) => {
    props.onChange?.(step as never);
  };
  assertLadderSteps(props.steps);
  const presentation = presentationOf(props);
  const Request = REQUEST[presentation];
  const cells = (
    <>
      {props.steps.map((step) => (
        <Cell key={step.step} step={step} value={props.value} taken={takenBy[step.step]} onChange={onChange} presentation={presentation} />
      ))}
      <Request />
    </>
  );
  // Tiles reflow on their own width, so the grid sits inside the group it queries.
  return (
    <div role="radiogroup" aria-label={props.label ?? "Stream colour, validated steps only"} className={`${GROUP_CLASS[presentation]} ward-ladder`}>
      {presentation === "tiles" ? <div className={s.tiles}>{cells}</div> : cells}
    </div>
  );
}
