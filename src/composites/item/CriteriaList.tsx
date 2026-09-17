import { Marker } from "../../primitives/Marker";
import s from "./CriteriaList.module.css";

export type Criterion = {
  met: boolean;
  text: string;
  evidence?: string;
  why?: string;
};

function CriterionMarker({ criterion }: { criterion: Criterion }) {
  return <Marker size={14} kind={criterion.met ? "tick" : "box"} label={criterion.met ? "met" : "unmet"} />;
}

// The body stacks as a grid, so separators are for the row's accessible name only, never a visible row.
function Separator({ text }: { text: string }) {
  return <span className="ward-visually-hidden">{text}</span>;
}

function consequence(why?: string): string {
  return why ? `${why} — keeps the item held` : "keeps the item held";
}

function CriterionDetails({ criterion }: { criterion: Criterion }) {
  return (
    <span className={s.body}>
      <span className={s.text}>{criterion.text}</span>
      {criterion.evidence ? <><Separator text=" — " /><code className={s.evidence} title={criterion.evidence}>{criterion.evidence}</code></> : null}
      {criterion.met ? null : <><Separator text=" · " /><span className={s.consequence}>{consequence(criterion.why)}</span></>}
    </span>
  );
}

function CriterionRow({ criterion }: { criterion: Criterion }) {
  return (
    <li className={s.item} data-met={criterion.met} role="checkbox" aria-checked={criterion.met} aria-disabled="true">
      <CriterionMarker criterion={criterion} />
      <CriterionDetails criterion={criterion} />
    </li>
  );
}

export function CriteriaList({ criteria }: { criteria: Criterion[] }) {
  return (
    <div>
      <ul className={`${s.list} ward-checklist`}>
        {criteria.map((criterion) => <CriterionRow criterion={criterion} key={criterion.text} />)}
      </ul>
      {criteria.some((criterion) => !criterion.met) ? (
        <p className={s.note}>
          A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record.
        </p>
      ) : null}
    </div>
  );
}
