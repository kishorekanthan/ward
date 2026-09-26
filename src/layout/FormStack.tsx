import type { FormEvent, ReactNode } from "react";
import s from "./FormStack.module.css";

export type FormStackProps = {
  label: string;
  children: ReactNode;
  actions?: ReactNode;
  onSubmit?: () => void;
};

export function FormStack({ label, children, actions, onSubmit }: FormStackProps) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };
  return (
    <form className={s.form} aria-label={label} onSubmit={submit} data-ward-form-stack="">
      <div className={s.fields}>{children}</div>
      {actions === undefined || actions === null ? null : (
        <div className={s.actions} role="group" aria-label={`${label} actions`}>
          {actions}
        </div>
      )}
    </form>
  );
}
