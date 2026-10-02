import { useId } from "react";
import s from "./Switch.module.css";

export type SwitchProps = {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  locked?: boolean;
  describedBy?: string;
  labelHidden?: boolean;
};

function labelClass(labelHidden?: boolean): string {
  return labelHidden ? `${s.label} ${s.labelHidden}` : s.label;
}

export function Switch({ label, checked, onChange, disabled, locked, describedBy, labelHidden }: SwitchProps) {
  const id = useId();
  const switchId = `${id}switch`;
  const on = locked ? true : checked;
  const off = disabled || locked;
  return (
    <span className={`${s.root} ward-switchrow`}>
      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={on}
        aria-label={label}
        aria-labelledby={id}
        aria-describedby={describedBy}
        className={`${s.track} ward-switch`}
        data-on={on}
        data-locked={locked ? true : undefined}
        disabled={off}
        onClick={() => !off && onChange?.(!on)}
      >
        <span className={s.thumb} />
      </button>
      <label id={id} htmlFor={switchId} className={labelClass(labelHidden)}>
        {label}
        {locked && <span className={s.lockedNote}>always on</span>}
      </label>
    </span>
  );
}
