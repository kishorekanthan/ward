import { useId } from "react";
import { joinIds } from "../a11y/joinIds";
import { describedByScope, useDisabledScope, type ScopeReason } from "./DisabledScope";
import s from "./Switch.module.css";

export type SwitchProps = {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  locked?: boolean;
  describedBy?: string;
  labelHidden?: boolean;
  /** Why a disabled or locked switch cannot change; a scope's reason replaces it. */
  disabledReason?: string;
};

// A locked switch shows on; a disabled, locked or scoped one ignores clicks.
function switchState(checked: boolean, disabled?: boolean, locked?: boolean, scoped?: boolean): { on: boolean; off: boolean } {
  return { on: locked ? true : checked, off: Boolean(disabled || locked || scoped) };
}

function labelClass(labelHidden?: boolean): string {
  return labelHidden ? `${s.label} ${s.labelHidden}` : s.label;
}

// A scope says its reason once for the page, so a switch's own reason shows only outside one.
function ownReason(off: boolean, scoped: boolean, reason?: string): string | undefined {
  return off && !scoped && reason ? reason : undefined;
}

function reasonAria(reasonId: string, describedBy: string | undefined, scope: ScopeReason | null, reason?: string) {
  const own = reason ? reasonId : undefined;
  return { "aria-describedby": describedByScope(joinIds(describedBy, own), scope), title: scope?.reason ?? reason };
}

function Reason({ id, reason }: { id: string; reason?: string }) {
  if (!reason) return null;
  return (
    <span id={id} className="ward-visually-hidden">
      {reason}
    </span>
  );
}

export function Switch({ label, checked, onChange, disabled, locked, describedBy, labelHidden, disabledReason }: SwitchProps) {
  const id = useId();
  const switchId = `${id}switch`;
  const reasonId = `${id}reason`;
  const scope = useDisabledScope();
  const { on, off } = switchState(checked, disabled, locked, scope !== null);
  const reason = ownReason(off, scope !== null, disabledReason);
  return (
    <span className={`${s.root} ward-switchrow`}>
      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={on}
        aria-label={label}
        aria-labelledby={id}
        {...reasonAria(reasonId, describedBy, scope, reason)}
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
      </label>
      <Reason id={reasonId} reason={reason} />
    </span>
  );
}
