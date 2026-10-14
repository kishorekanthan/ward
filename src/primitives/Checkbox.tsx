import { useId } from "react";
import { joinIds } from "../a11y/joinIds";
import { describedByScope, useDisabledScope, type ScopeReason } from "./DisabledScope";
import s from "./Checkbox.module.css";

export type CheckboxProps = {
  label: string;
  consequence?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  locked?: boolean;
  describedBy?: string;
  /** Why a disabled or locked box cannot change; a scope's reason replaces it. */
  disabledReason?: string;
  // cell: Studio 4a's bordered card-anatomy cell, with the field's sample value trailing in mono.
  variant?: "cell";
  sample?: string;
  // For a grid cell whose column header already names the box: the label stays its accessible name.
  labelHidden?: boolean;
};

function checkboxState(props: CheckboxProps, scope: ScopeReason | null): { checked: boolean; disabled: boolean } {
  if (props.locked) return { checked: true, disabled: true };
  return { checked: props.checked, disabled: Boolean(props.disabled || scope) };
}

function Consequence({ id, text }: { id?: string; text?: string }) {
  if (!text) return null;
  return <p id={id} className={`${s.consequence} ward-check-consequence`}>{text}</p>;
}

function LockedNote({ locked }: { locked?: boolean }) {
  if (!locked) return null;
  return <span className={`${s.lockedNote} ward-check-note`}>always shown</span>;
}

// A scope says its reason once for the page, so a box's own reason shows only outside one.
function ownReason(props: CheckboxProps, disabled: boolean, scope: ScopeReason | null): string | undefined {
  return disabled && !scope && props.disabledReason ? props.disabledReason : undefined;
}

function boxAria(props: CheckboxProps, id: string, disabled: boolean, scope: ScopeReason | null) {
  const noteId = props.consequence ? `${id}-note` : undefined;
  const reason = ownReason(props, disabled, scope);
  const reasonId = reason ? `${id}-reason` : undefined;
  const describedBy = describedByScope(joinIds(noteId, props.describedBy, reasonId), scope);
  return { noteId, reason, reasonId: `${id}-reason`, input: { "aria-describedby": describedBy, title: scope?.reason ?? reason } };
}

function Reason({ id, reason }: { id: string; reason?: string }) {
  if (!reason) return null;
  return (
    <span id={id} className="ward-visually-hidden">
      {reason}
    </span>
  );
}

function Sample({ text }: { text?: string }) {
  if (!text) return null;
  return <span className={s.sample} aria-hidden="true">{text}</span>;
}

export function Checkbox(props: CheckboxProps) {
  const id = useId();
  const scope = useDisabledScope();
  const state = checkboxState(props, scope);
  const aria = boxAria(props, id, state.disabled, scope);
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
          {...aria.input}
        />
        <label htmlFor={id} className={props.labelHidden ? s.labelHidden : s.label}>
          {props.label}
          <LockedNote locked={props.locked} />
        </label>
        <Sample text={props.sample} />
      </span>
      <Reason id={aria.reasonId} reason={aria.reason} />
      <Consequence id={aria.noteId} text={props.consequence} />
    </div>
  );
}
