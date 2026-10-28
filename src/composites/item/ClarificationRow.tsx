import { useId } from "react";
import { Btn } from "../../primitives/Btn";
import { Chip } from "../../primitives/Chip";
import type { ChipRole } from "../../tokens";
import s from "./ClarificationRow.module.css";

export type Delivery = "queued" | "delivered" | "retrying" | "failed";

export type Clarification = {
  author: string;
  body: string;
  delivery: Delivery;
  etaOrAttempt: string;
  editedAt?: string;
  originalId?: string;
};

export type ClarificationRowProps = {
  comment: Clarification;
  onEdit?: () => void;
  onWithdraw?: () => void;
  onCancelDelivery?: () => void;
  onViewOriginal?: () => void;
  unavailable?: string;
  /** Display name of the tracker the comment is delivered to. */
  tracker?: string;
};

const CHIP: Record<Delivery, { role: ChipRole; label: string }> = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" },
};

function notes(tracker: string): Record<Delivery, string> {
  return {
    queued: "Not sent yet. Edits replace it.",
    delivered: `Sent. Edits show in ${tracker} as yours.`,
    retrying: "Sending. Cancel to edit.",
    failed: "Not sent. Resend or cancel.",
  };
}

function Actions({ comment, reasonId, onEdit, onWithdraw, onCancelDelivery, onViewOriginal }: ClarificationRowProps & { reasonId: string }) {
  if (comment.delivery === "queued")
    return (
      <>
        <Btn variant="primary" size="sm" onClick={onEdit}>
          Edit
        </Btn>
        <Btn variant="ghost" size="sm" onClick={onWithdraw}>
          Withdraw
        </Btn>
      </>
    );
  if (comment.delivery === "delivered")
    return (
      <>
        <Btn variant="ghost" size="sm" onClick={onEdit}>
          Edit
        </Btn>
        {comment.originalId !== undefined ? (
          <Btn variant="ghost" size="sm" onClick={onViewOriginal}>
            View original
          </Btn>
        ) : null}
      </>
    );
  if (comment.delivery === "retrying")
    return (
      <>
        <Btn variant="primary" size="sm" disabled describedBy={reasonId}>
          Edit
        </Btn>
        <Btn variant="secondary" size="sm" onClick={onCancelDelivery}>
          Cancel delivery
        </Btn>
      </>
    );
  return (
    <>
      <Btn variant="secondary" size="sm" onClick={onEdit}>
        Edit
      </Btn>
      <Btn variant="ghost" size="sm" onClick={onWithdraw}>
        Withdraw
      </Btn>
    </>
  );
}

// A relay with no edit endpoint still has to show the comment, so the actions state why instead of lying.
function Unavailable({ reason, reasonId }: { reason: string; reasonId: string }) {
  return (
    <>
      <Btn variant="primary" size="sm" disabled describedBy={reasonId}>
        Edit
      </Btn>
      <span className={s.reason} id={reasonId}>
        {reason}
      </span>
    </>
  );
}

function validate(props: ClarificationRowProps): void {
  if (props.unavailable === undefined && props.onEdit === undefined)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}

function RowActions(props: ClarificationRowProps & { reasonId: string; unavailableId: string }) {
  if (props.unavailable === undefined) return <Actions {...props} />;
  return <Unavailable reason={props.unavailable} reasonId={props.unavailableId} />;
}

export function ClarificationRow(props: ClarificationRowProps) {
  const { comment } = props;
  validate(props);
  const reasonId = useId();
  const unavailableId = `${reasonId}-unavailable`;
  const chip = CHIP[comment.delivery];
  return (
    <div className={`${s.row} ward-clarityrow`} data-delivery={comment.delivery} data-queued={comment.delivery === "queued" ? "true" : undefined}>
      <div className={s.head}>
        <span className={s.author}>{comment.author}</span>
        <Chip role={chip.role} label={chip.label} />
        <span className={s.eta}>{comment.etaOrAttempt}</span>
        {comment.editedAt !== undefined ? <span className={s.edited}>{"edited " + comment.editedAt}</span> : null}
      </div>
      <p className={s.body}>{comment.body}</p>
      <p className={s.reason} id={reasonId}>{notes(props.tracker ?? "Jira")[comment.delivery]}</p>
      <div className={s.actions}>
        <RowActions {...props} reasonId={reasonId} unavailableId={unavailableId} />
      </div>
    </div>
  );
}
