import { useId, useState } from "react";
import { Btn } from "../../primitives/Btn";
import { Checkbox } from "../../primitives/Checkbox";
import { Chip } from "../../primitives/Chip";
import { Field } from "../../primitives/Field";
import s from "./Composer.module.css";

export type ComposerProps = {
  placeholder: string;
  asUser: string;
  attachTo?: { label: string; onChange: () => void };
  requeueAfter?: { checked: boolean; agent: string; consequence?: string; onChange?: (checked: boolean) => void };
  onPost: (asUser: string, body: string) => void;
  onDraft?: (body: string) => void;
  // reply: Intake 12c's one-line reply row with a text Send; the label stays attached but hidden.
  variant?: "reply";
};

function ReplyRow({ placeholder, asUser, onPost }: ComposerProps) {
  const [body, setBody] = useState("");
  const sendsAs = useId();
  return (
    <div className={s.reply} data-ward-composer="reply">
      <div className={s.replyRow}>
        <Field variant="reply" labelHidden placeholder={placeholder} label={placeholder} value={body} onChange={setBody} describedBy={sendsAs} />
        <Btn variant="ghost" describedBy={sendsAs} onClick={() => onPost(asUser, body)}>
          Send
        </Btn>
      </div>
      <p id={sendsAs} className={s.sendsAs}>{`Sends as ${asUser}.`}</p>
    </div>
  );
}

export function Composer(props: ComposerProps) {
  return props.variant === "reply" ? <ReplyRow {...props} /> : <PostBox {...props} />;
}

function PostBox({ placeholder, asUser, attachTo, requeueAfter, onPost, onDraft }: ComposerProps) {
  const [body, setBody] = useState("");
  return (
    <div className={s.root}>
      <Field kind="textarea" label={placeholder} value={body} onChange={setBody} />
      {attachTo && (
        <div className={s.attach}>
          <Chip role="soft" label={attachTo.label} />
          <Btn variant="ghost" size="sm" onClick={attachTo.onChange}>
            Change
          </Btn>
        </div>
      )}
      {requeueAfter && (
        <Checkbox
          label={`Requeue ${requeueAfter.agent} after posting`}
          consequence={requeueAfter.consequence}
          checked={requeueAfter.checked}
          onChange={requeueAfter.onChange}
        />
      )}
      <div className={s.actions}>
        <Btn variant="primary" onClick={() => onPost(asUser, body)}>
          {`Post as ${asUser}`}
        </Btn>
        {onDraft && (
          <Btn variant="ghost" onClick={() => onDraft(body)}>
            Save draft
          </Btn>
        )}
      </div>
    </div>
  );
}
