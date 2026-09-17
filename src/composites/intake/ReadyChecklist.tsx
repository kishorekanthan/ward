import { Btn } from "../../primitives/Btn";
import { GateChecklist, type GateItem } from "../studio/GateChecklist";
import s from "./ReadyChecklist.module.css";

export type ReadyChecklistProps = {
  items: GateItem[];
  note: string;
  actionLabel?: string;
  onAction: () => void;
  // rail: unboxed inside a record rail section, with a secondary action.
  density?: "rail";
};

export function ReadyChecklist({ items, note, actionLabel = "Review & create", onAction, density }: ReadyChecklistProps) {
  return (
    <div className={s.root} data-density={density}>
      <GateChecklist items={items} note={note} density={density} />
      <Btn variant={density === "rail" ? "secondary" : "primary"} onClick={onAction}>
        {actionLabel}
      </Btn>
    </div>
  );
}

