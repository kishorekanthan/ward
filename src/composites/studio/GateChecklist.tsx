import { Mark } from "../../primitives/Mark";
import s from "./GateChecklist.module.css";

export type GateItem = { met: boolean; text: string };
// compact: Studio 4a's "Effect of this config" list — smaller text, unmet rows muted.
// rail: Intake 12c's "Before it can be created" list — use-text rows, unmet rows in ink.
export type GateChecklistProps = { items: GateItem[]; note?: string; density?: "compact" | "rail" };

export function GateChecklist({ items, note, density }: GateChecklistProps) {
  return (
    <div className={s.root} data-density={density}>
      <ul className={`${s.list} ward-checklist`}>
        {items.map((i) => (
          <li className={`${s.item} ward-checklist-item`} key={i.text} data-met={i.met}>
            <span role="checkbox" aria-checked={i.met} aria-disabled="true" aria-label={i.text} className={s.box}>
              {/* No label: the checkbox already announces the state via aria-checked. */}
              <Mark state={i.met ? "met" : "unmet"} />
            </span>
            <span className={s.text}>{i.text}</span>
          </li>
        ))}
      </ul>
      {note !== undefined && <p className={`${s.note} ward-checklist-note`}>{note}</p>}
    </div>
  );
}
