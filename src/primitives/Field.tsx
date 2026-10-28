import { useId } from "react";
import { joinIds } from "../a11y/joinIds";
import { describedByScope, useDisabledScope, type ScopeReason } from "./DisabledScope";
import { Select } from "./Select";
import s from "./Field.module.css";

// form: Studio 3b labelled inputs; inline: a borderless row name; tag/tagGate: a select drawn as a stage tag; reply: Intake 12c's reply line;
// toolbar: a header or toolbar row, label beside a box the size of the buttons next to it.
export type FieldVariant = "form" | "inline" | "tag" | "tagGate" | "reply" | "toolbar";

export type FieldOption = { value: string; label: string };

export type FieldProps = {
  kind?: "input" | "select" | "textarea" | "date";
  label: string;
  value: string;
  onChange?: (value: string) => void;
  options?: FieldOption[];
  invalid?: string;
  mono?: boolean;
  disabled?: boolean;
  rows?: number;
  describedBy?: string;
  labelHidden?: boolean;
  variant?: FieldVariant;
  placeholder?: string;
  // Masks an input and keeps it out of autofill and spell check, for write-only keys.
  secret?: boolean;
  /** Earliest and latest day a date field takes, as YYYY-MM-DD. */
  min?: string;
  max?: string;
};

type ControlProps = {
  id: string;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  title?: string;
  "aria-invalid"?: "true";
  "aria-describedby"?: string;
  onChange: (event: { target: { value: string } }) => void;
};

type FieldControlProps = { props: FieldProps; controlProps: ControlProps; cls: string };

// Password managers ignore autocomplete="off" on password fields; these opt-outs they honour.
const SECRET_INPUT = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: false,
  "data-1p-ignore": "",
  "data-lpignore": "true",
} as const;

const labelIdFor = (id: string) => `${id}-label`;

function InputControl({ props, controlProps, cls }: FieldControlProps) {
  const secret = props.secret ? SECRET_INPUT : {};
  return <input className={cls} {...secret} {...controlProps} />;
}

function SelectControl({ props, controlProps, cls }: FieldControlProps) {
  return (
    <Select
      id={controlProps.id}
      triggerClassName={cls}
      aria-labelledby={labelIdFor(controlProps.id)}
      aria-invalid={controlProps["aria-invalid"]}
      aria-describedby={controlProps["aria-describedby"]}
      value={props.value}
      options={props.options ?? []}
      disabled={controlProps.disabled}
      placeholder={props.placeholder}
      onChange={props.onChange}
      size={props.variant === "toolbar" ? "md" : undefined}
    />
  );
}

function TextareaControl({ props, controlProps, cls }: FieldControlProps) {
  return <textarea className={cls} rows={props.rows ?? 3} {...controlProps} />;
}

function DateControl({ props, controlProps, cls }: FieldControlProps) {
  return <input className={cls} type="date" min={props.min} max={props.max} {...controlProps} />;
}

const CONTROLS = { input: InputControl, select: SelectControl, textarea: TextareaControl, date: DateControl };

function FieldControl(props: FieldProps, controlProps: ControlProps, cls: string) {
  const Control = CONTROLS[props.kind ?? "input"];
  return <Control props={props} controlProps={controlProps} cls={cls} />;
}

function controlPropsFor(props: FieldProps, id: string, msgId: string, scope: ScopeReason | null): ControlProps {
  const invalid = props.invalid ? "true" : undefined;
  return {
    id,
    value: props.value,
    disabled: Boolean(props.disabled || scope),
    placeholder: props.placeholder,
    title: scope?.reason,
    "aria-invalid": invalid,
    "aria-describedby": describedByScope(joinIds(invalid ? msgId : undefined, props.describedBy), scope),
    onChange: (event) => props.onChange?.(event.target.value),
  };
}

function fieldClasses(props: FieldProps): string {
  const mono = props.mono ? [s.mono, "ward-field-input--mono"] : [];
  const area = props.kind === "textarea" ? [s.area] : [];
  return [s.control, "ward-field-input", ...mono, ...area].filter(Boolean).join(" ");
}

function labelClasses(labelHidden?: boolean): string {
  return labelHidden ? `${s.label} ${s.labelHidden} ward-field-label` : `${s.label} ward-field-label`;
}

export function Field(props: FieldProps) {
  const id = useId();
  const msgId = `${id}-msg`;
  const controlProps = controlPropsFor(props, id, msgId, useDisabledScope());
  const cls = fieldClasses(props);
  return (
    <div className={`${s.field} ward-field`} data-ward-field="" data-variant={props.variant}>
      <label id={labelIdFor(id)} className={labelClasses(props.labelHidden)} htmlFor={id}>
        {props.label}
      </label>
      {FieldControl(props, controlProps, cls)}
      {props.invalid && (
        <p id={msgId} className={`${s.invalid} ward-field-error`}>
          {props.invalid}
        </p>
      )}
    </div>
  );
}
