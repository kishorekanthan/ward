import { useId } from "react";
import { joinIds } from "../a11y/joinIds";
import s from "./Field.module.css";

// form: Studio 3b labelled inputs; inline: a borderless row name; tag/tagGate: a select drawn as a stage tag; reply: Intake 12c's reply line.
export type FieldVariant = "form" | "inline" | "tag" | "tagGate" | "reply";

export type FieldOption = { value: string; label: string };

export type FieldProps = {
  kind?: "input" | "select" | "textarea";
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
};

type ControlProps = {
  id: string;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  "aria-invalid"?: "true";
  "aria-describedby"?: string;
  onChange: (event: { target: { value: string } }) => void;
};

type FieldControlProps = { props: FieldProps; controlProps: ControlProps; cls: string };

function InputControl({ controlProps, cls }: FieldControlProps) {
  return <input className={cls} {...controlProps} />;
}

function SelectControl({ props, controlProps, cls }: FieldControlProps) {
  return (
    <select className={cls} {...controlProps}>
      {(props.options ?? []).map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function TextareaControl({ props, controlProps, cls }: FieldControlProps) {
  return <textarea className={cls} rows={props.rows ?? 3} {...controlProps} />;
}

const CONTROLS = { input: InputControl, select: SelectControl, textarea: TextareaControl };

function FieldControl(props: FieldProps, controlProps: ControlProps, cls: string) {
  const Control = CONTROLS[props.kind ?? "input"];
  return <Control props={props} controlProps={controlProps} cls={cls} />;
}

function controlPropsFor(props: FieldProps, id: string, msgId: string): ControlProps {
  const invalid = props.invalid ? "true" : undefined;
  return {
    id,
    value: props.value,
    disabled: props.disabled,
    placeholder: props.placeholder,
    "aria-invalid": invalid,
    "aria-describedby": joinIds(invalid ? msgId : undefined, props.describedBy),
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
  const controlProps = controlPropsFor(props, id, msgId);
  const cls = fieldClasses(props);
  return (
    <div className={`${s.field} ward-field`} data-ward-field="" data-variant={props.variant}>
      <label className={labelClasses(props.labelHidden)} htmlFor={id}>
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
