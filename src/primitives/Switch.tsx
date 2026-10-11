import { useId } from "react";
import { describedByScope, useDisabledScope } from "./DisabledScope";
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

// A locked switch shows on; a disabled, locked or scoped one ignores clicks.
function switchState(checked: boolean, disabled?: boolean, locked?: boolean, scoped?: boolean): { on: boolean; off: boolean } {
  return { on: locked ? true : checked, off: Boolean(disabled || locked || scoped) };
}

function labelClass(labelHidden?: boolean): string {
  return labelHidden ? `${s.label} ${s.labelHidden}` : s.label;
}

export function Switch({ label, checked, onChange, disabled, locked, describedBy, labelHidden }: SwitchProps) {
  const id = useId();
  const switchId = `${id}switch`;
  const scope = useDisabledScope();
  const { on, off } = switchState(checked, disabled, locked, scope !== null);
  return (
    <span className={`${s.root} ward-switchrow`}>
      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={on}
        aria-label={label}
        aria-labelledby={id}
        aria-describedby={describedByScope(describedBy, scope)}
        title={scope?.reason}
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
