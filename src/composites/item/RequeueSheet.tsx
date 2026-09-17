import { useId, useState } from "react";
import { Btn } from "../../primitives/Btn";
import { Chip } from "../../primitives/Chip";
import { CostMeter } from "../../primitives/CostMeter";
import { Field } from "../../primitives/Field";
import { Overlay } from "../../primitives/Overlay";
import s from "./RequeueSheet.module.css";

export type RequeueSheetProps = {
  run: { agent: string; stage: string };
  effects: string[];
  refusals: { reason: string }[];
  cost: { spent: number; more: number; itemTotal: number; ceiling: number };
  onRequeue?: (note?: string) => void;
  onClose: () => void;
  returnFocusTo?: HTMLElement | null;
};

type RequeueActionProps = { refused: boolean; reasonId: string; note: string; onRequeue?: (note?: string) => void };

// With no refusal and no handler nothing could explain a disabled Requeue, so it is omitted, as DryRunRail omits Publish.
function RequeueAction({ refused, reasonId, note, onRequeue }: RequeueActionProps) {
  if (refused) {
    return (
      <Btn variant="primary" disabled describedBy={reasonId}>
        Requeue
      </Btn>
    );
  }
  if (onRequeue === undefined) return null;
  return (
    <Btn variant="primary" onClick={() => onRequeue(note === "" ? undefined : note)}>
      Requeue
    </Btn>
  );
}

export function RequeueSheet({ run, effects, refusals, cost, onRequeue, onClose, returnFocusTo }: RequeueSheetProps) {
  const titleId = useId();
  const reasonId = `${titleId}-refusal`;
  const [note, setNote] = useState("");
  const refused = refusals.length > 0;
  return (
    <Overlay kind="sheet" labelledBy={titleId} onClose={onClose} returnFocusTo={returnFocusTo}>
      <div className={s.sheet}>
        <h2 className={s.title} id={titleId}>
          Requeue {run.agent}
        </h2>
        <p className={s.stage}>{run.stage}</p>
        <ol className={s.effects}>
          {effects.map((e, i) => (
            <li className={s.effect} key={e}>
              <span className={s.numeral}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.effectText}>{e}</span>
            </li>
          ))}
        </ol>
        <CostMeter
          spent={cost.spent}
          ceiling={cost.ceiling}
          breakdown={[
            { label: "This requeue adds", amount: cost.more },
            { label: "Item total so far", amount: cost.itemTotal },
          ]}
        />
        <Field kind="textarea" label="Note for the agent" value={note} onChange={setNote} />
        {refused && (
          <div className={s.refusals}>
            <Chip role="meta" label="REFUSED" />
            <ul className={s.reasons}>
              {refusals.map((r, i) => (
                <li className={s.reason} key={r.reason} id={i === 0 ? reasonId : undefined}>
                  {r.reason}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={s.actions}>
          <RequeueAction refused={refused} reasonId={reasonId} note={note} onRequeue={onRequeue} />
          <Btn onClick={onClose}>Cancel</Btn>
        </div>
      </div>
    </Overlay>
  );
}
