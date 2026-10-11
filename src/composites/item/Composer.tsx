import { useId, useState, type KeyboardEvent } from "react";
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
  // With value the page owns the text, so it can fill the box from a suggestion.
  value?: string;
  onChange?: (body: string) => void;
  // reply: a chat composer, one rounded field with an icon Send inside; the label stays attached but hidden.
  variant?: "reply";
};

function useBody({ value, onChange }: ComposerProps): [string, (body: string) => void] {
  const [own, setOwn] = useState("");
  return value === undefined ? [own, setOwn] : [value, onChange ?? (() => undefined)];
}

function SendIcon() {
  return (
    <svg className={s.sendIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

// Enter sends and Shift+Enter keeps its new line; the Enter that ends an IME composition stays with the text.
function sendsOnEnter(event: KeyboardEvent<HTMLElement>): boolean {
  return event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing;
}

function ReplyRow(props: ComposerProps) {
  const { placeholder, asUser, onPost } = props;
  const [body, setBody] = useBody(props);
  const sendsAs = useId();
  const send = () => {
    if (body.trim() !== "") onPost(asUser, body);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!sendsOnEnter(event)) return;
    event.preventDefault();
    send();
  };
  return (
    <div className={s.reply} data-ward-composer="reply">
      <div className={s.replyField} data-ward-composer-field="" onKeyDown={onKeyDown}>
        <Field variant="reply" kind="textarea" rows={1} labelHidden placeholder={placeholder} label={placeholder} value={body} onChange={setBody} describedBy={sendsAs} />
        <Btn variant="primary" className={s.send} describedBy={sendsAs} onClick={send}>
          <SendIcon />
          <span className="ward-visually-hidden">Send</span>
        </Btn>
      </div>
      <p id={sendsAs} className={s.sendsAs}>{`Sends as ${asUser}.`}</p>
    </div>
  );
}

export function Composer(props: ComposerProps) {
  return props.variant === "reply" ? <ReplyRow {...props} /> : <PostBox {...props} />;
}

function PostBox(props: ComposerProps) {
  const { placeholder, asUser, attachTo, requeueAfter, onPost, onDraft } = props;
  const [body, setBody] = useBody(props);
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
