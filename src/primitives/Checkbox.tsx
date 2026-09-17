import { useId } from "react";
import { joinIds } from "../a11y/joinIds";
import s from "./Checkbox.module.css";

export type CheckboxProps = {
  label: string;
  consequence?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  locked?: boolean;
  describedBy?: string;
  // cell: Studio 4a's bordered card-anatomy cell, with the field's sample value trailing in mono.
  variant?: "cell";
  sample?: string;
};

function checkboxState(props: CheckboxProps): { checked: boolean; disabled: boolean } {
  if (props.locked) return { checked: true, disabled: true };
  return { checked: props.checked, disabled: props.disabled ?? false };
}

function Consequence({ id, text }: { id?: string; text?: string }) {
  if (!text) return null;
  return <p id={id} className={`${s.consequence} ward-check-consequence`}>{text}</p>;
}

function LockedNote({ locked }: { locked?: boolean }) {
  if (!locked) return null;
  return <span className={`${s.lockedNote} ward-check-note`}>always shown</span>;
}

function Sample({ text }: { text?: string }) {
  if (!text) return null;
  return <span className={s.sample} aria-hidden="true">{text}</span>;
}

export function Checkbox(props: CheckboxProps) {
  const id = useId();
  const noteId = props.consequence ? `${id}-note` : undefined;
  const state = checkboxState(props);
  return (
    <div className={`${s.root} ward-checkrow`} data-ward-checkbox="" data-locked={props.locked || undefined} data-variant={props.variant}>
      <span className={s.row}>
        <input
          id={id}
          type="checkbox"
          className={`${s.box} ward-field-option`}
          checked={state.checked}
          disabled={state.disabled}
          onChange={(event) => !state.disabled && props.onChange?.(event.target.checked)}
          aria-describedby={joinIds(noteId, props.describedBy)}
        />
        <label htmlFor={id} className={s.label}>
          {props.label}
          <LockedNote locked={props.locked} />
        </label>
        <Sample text={props.sample} />
      </span>
      <Consequence id={noteId} text={props.consequence} />
    </div>
  );
}
