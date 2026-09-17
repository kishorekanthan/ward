import { Chip } from "../../primitives/Chip";
import { Field } from "../../primitives/Field";
import { Switch } from "../../primitives/Switch";
import s from "./ConfigRow.module.css";

export type ConfigStage = {
  id: string;
  name: string;
  gate: boolean;
  terminal: boolean;
  agentsMounted: number;
};

export type ColumnDraft = { label: string; cap?: number; shown: boolean };

export type ConfigRowProps = {
  stage: ConfigStage;
  config: ColumnDraft;
  onChange: (next: ColumnDraft) => void;
  onReorder?: (direction: -1 | 1) => void;
};

const GATE_NOTE = "can't be hidden or collapsed";
const TERMINAL_NOTE = "terminal · counted, not a column";

/* The head carries the visible names for the row's controls, which is why those
   labels are hidden rather than absent. Export the two together; widths agree. */
export function ConfigRowHead() {
  return (
    <div className={s.head} aria-hidden="true">
      <span className={s.cHandle} />
      <span className={s.cName}>Stage</span>
      <span className={s.cLabel}>Column label</span>
      <span className={s.cCap}>WIP cap</span>
      <span className={s.cShown}>Shown</span>
    </div>
  );
}

function stageView(stage: ConfigStage, configured: boolean) {
  if (stage.gate) return { shown: true, state: "locked" };
  if (stage.terminal) return { shown: false, state: "off" };
  return { shown: configured, state: configured ? "on" : "off" };
}

function mountedNote(count: number): string | undefined {
  if (count === 0) return undefined;
  return count === 1 ? "1 agent mounted" : `${count} agents mounted`;
}

// Studio 4a: the sub-line under the stage name says why a row is fixed, else what is mounted on it.
function subLine(stage: ConfigStage): string | undefined {
  if (stage.gate) return GATE_NOTE;
  if (stage.terminal) return TERMINAL_NOTE;
  return mountedNote(stage.agentsMounted);
}

function reorderKey(event: React.KeyboardEvent, onReorder?: (direction: -1 | 1) => void) {
  if (event.key === "ArrowUp") onReorder?.(-1);
  if (event.key === "ArrowDown") onReorder?.(1);
}

function StageIdentity({ stage }: { stage: ConfigStage }) {
  return (
    <span className={s.cName}>
      <span className={s.nameLine}>
        <span className={s.name}>{stage.name}</span>
        {stage.gate && <Chip role="gate" label="HUMAN GATE" size="tag" />}
      </span>
      {subLine(stage) && <span className={s.sub}>{subLine(stage)}</span>}
    </span>
  );
}

function capValue(cap?: number): string {
  return cap === undefined ? "" : String(cap);
}

function parsedCap(cap: string): number | undefined {
  return cap === "" ? undefined : Number(cap);
}

function Handle({ name, onReorder }: { name: string; onReorder?: (direction: -1 | 1) => void }) {
  return (
    <span className={s.cHandle}>
      <button
        type="button"
        className={s.handle}
        aria-label={`Reorder ${name}`}
        onKeyDown={(event) => reorderKey(event, onReorder)}
      >
        ⠿
      </button>
    </span>
  );
}

type CellProps = { stage: ConfigStage; config: ColumnDraft; onChange: (next: ColumnDraft) => void };

// A terminal stage never becomes a column, so it has no cap to set.
function CapCell({ stage, config, onChange }: CellProps) {
  if (stage.terminal)
    return (
      <span className={`${s.cCap} ${s.noCap}`} aria-hidden="true">
        —
      </span>
    );
  return (
    <span className={s.cCap}>
      <Field kind="input" label="WIP cap" labelHidden placeholder="none" value={capValue(config.cap)} onChange={(cap) => onChange({ ...config, cap: parsedCap(cap) })} />
    </span>
  );
}

function ShownCell({ stage, config, onChange }: CellProps) {
  const view = stageView(stage, config.shown);
  return (
    <span className={s.cShown}>
      <Switch label="Shown as a column" labelHidden checked={view.shown} locked={stage.gate} disabled={stage.terminal} onChange={(next) => onChange({ ...config, shown: next })} />
      <span className={s.state} aria-hidden="true">
        {view.state}
      </span>
    </span>
  );
}

function rowKind(stage: ConfigStage): string | undefined {
  if (stage.gate) return "gate";
  return stage.terminal ? "terminal" : undefined;
}

export function ConfigRow({ stage, config, onChange, onReorder }: ConfigRowProps) {
  return (
    <div className={s.line} data-kind={rowKind(stage)}>
      <Handle name={stage.name} onReorder={onReorder} />
      <StageIdentity stage={stage} />
      <span className={s.cLabel}>
        <Field kind="input" label="Column label" labelHidden value={config.label} onChange={(label) => onChange({ ...config, label })} />
      </span>
      <CapCell stage={stage} config={config} onChange={onChange} />
      <ShownCell stage={stage} config={config} onChange={onChange} />
    </div>
  );
}
