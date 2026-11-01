import { useRef, type ReactElement } from "react";
import { Field } from "../../primitives/Field";
import { MoveAnnouncer, MoveButton, moveAnnouncement, moveRow, moveTo, useMoveFocus, type Direction } from "./stageMoves";
import s from "./NewStreamModal.module.css";

export type StageListRow = { name: string; kind: "entry" | "agent" | "gate" | "terminal" };

export type StageListEditorProps = {
  stages: StageListRow[];
  onChange: (stages: StageListRow[]) => void;
  // Given, each name is picked from these; left out, names are free text.
  catalogue?: string[];
  // How a catalogue name reads on screen ("sql-plan" as "SQL plan"); left out, the name shows as it is.
  stageLabel?: (name: string) => string;
};

type Label = (name: string) => string;
const asIs: Label = (name) => name;

const KINDS = [
  { value: "entry", label: "Entry" },
  { value: "agent", label: "Agent" },
  { value: "gate", label: "Review" },
  { value: "terminal", label: "Done" },
];

const OUTSIDE = "not a known stage";

function catalogueOptions(catalogue: string[], name: string, label: Label) {
  const offered = catalogue.map((value) => ({ value, label: label(value) }));
  return catalogue.includes(name) ? offered : [{ value: name, label: `${name ? label(name) : "(unnamed)"} · ${OUTSIDE}` }, ...offered];
}

function NameField({ stage, index, catalogue, label: show, onName }: { stage: StageListRow; index: number; catalogue?: string[]; label: Label; onName: (name: string) => void }): ReactElement {
  const label = `Stage ${index + 1} name`;
  if (!catalogue) return <Field variant="inline" labelHidden placeholder="Name this stage" label={label} value={stage.name} onChange={onName} />;
  const invalid = catalogue.includes(stage.name) ? undefined : `${stage.name ? show(stage.name) : "This stage"} is ${OUTSIDE}`;
  return <Field variant="inline" kind="select" labelHidden label={label} value={stage.name} options={catalogueOptions(catalogue, stage.name, show)} invalid={invalid} onChange={onName} />;
}

function stageName(stage: StageListRow, index: number, label: Label): string {
  return stage.name ? label(stage.name) : `stage ${index + 1}`;
}

// Rows carry no ids of their own; stable local ids keep typed values and focus with the row on reorder.
function useRowIds(count: number): { current: string[] } {
  const ids = useRef<string[]>([]);
  const next = useRef(0);
  while (ids.current.length < count) ids.current.push(`stage-row-${next.current++}`);
  if (ids.current.length > count) ids.current = ids.current.slice(0, count);
  return ids;
}

function StageRow({ id, stage, index, total, catalogue, label, onReplace, onMove }: {
  id: string;
  catalogue?: string[];
  label: Label;
  stage: StageListRow;
  index: number;
  total: number;
  onReplace: (stage: StageListRow) => void;
  onMove: (direction: Direction) => void;
}): ReactElement {
  const name = stageName(stage, index, label);
  const gate = stage.kind === "gate";
  return (
    <li className={`${s.webStage} ward-stageedit`} data-gate={gate ? "true" : undefined}>
      <span className={s.webIndex} aria-hidden="true">{String(index + 1)}</span>
      <div className={s.webStageName}>
        <NameField stage={stage} index={index} catalogue={catalogue} label={label} onName={(value) => onReplace({ ...stage, name: value })} />
      </div>
      <Field variant={gate ? "tagGate" : "tag"} labelHidden kind="select" label={`Stage ${index + 1} kind`} value={stage.kind} options={KINDS} onChange={(kind) => onReplace({ ...stage, kind: kind as StageListRow["kind"] })} />
      <span className={s.webMoves}>
        {index > 0 && <MoveButton id={id} name={name} direction="up" onMove={() => onMove("up")} />}
        {index < total - 1 && <MoveButton id={id} name={name} direction="down" onMove={() => onMove("down")} />}
      </span>
    </li>
  );
}

export function StageListEditor({ stages, onChange, catalogue, stageLabel = asIs }: StageListEditorProps): ReactElement {
  const ids = useRowIds(stages.length);
  const focus = useMoveFocus<HTMLOListElement>();
  const move = (index: number, direction: Direction) => {
    const to = moveTo(index, direction);
    ids.current = moveRow(ids.current, index, to);
    focus.moved({ id: ids.current[to], direction }, moveAnnouncement(stageName(stages[index], index, stageLabel), to, stages.length));
    onChange(moveRow(stages, index, to));
  };
  const replace = (index: number, stage: StageListRow) => onChange(stages.map((row, rowIndex) => (rowIndex === index ? stage : row)));
  return (
    <div className={s.webStages}>
      <ol ref={focus.root} className={s.webStageList} aria-label="Workflow stages in order">
        {stages.map((stage, index) => (
          <StageRow key={ids.current[index]} id={ids.current[index]} stage={stage} index={index} total={stages.length} catalogue={catalogue} label={stageLabel} onReplace={(next) => replace(index, next)} onMove={(direction) => move(index, direction)} />
        ))}
      </ol>
      <MoveAnnouncer text={focus.announcement} />
      <p className={s.addStage}>
        <button type="button" className={s.addStageButton} onClick={() => onChange([...stages, { name: "", kind: "agent" }])}>+ Add stage</button>
      </p>
    </div>
  );
}
