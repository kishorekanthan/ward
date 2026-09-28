import type { ReactElement, ReactNode } from "react";
import { Field } from "../../primitives/Field";
import s from "./KeyPanel.module.css";

export type KeyPanelProps = {
  label: string;
  // The app's sentence about the stored key; the key itself is never read back.
  status: string;
  value: string;
  onChange: (value: string) => void;
  actions: ReactNode;
  note?: string;
};

export function KeyPanel(props: KeyPanelProps): ReactElement {
  return (
    <div className={s.panel}>
      <p className={s.line}>{props.status}</p>
      <Field kind="input" label={"New " + props.label.toLowerCase()} value={props.value} onChange={props.onChange} secret />
      <div className={s.actions}>{props.actions}</div>
      <p role="status" className={s.line}>
        {props.note ?? ""}
      </p>
    </div>
  );
}
