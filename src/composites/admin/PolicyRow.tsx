import { useId, type ReactElement, type ReactNode } from "react";
import { Chip } from "../../primitives/Chip";
import { SegmentedControl, type Segment } from "../../primitives/SegmentedControl";
import { Switch } from "../../primitives/Switch";
import type { ChipRole } from "../../tokens";
import s from "./PolicyRow.module.css";

export type PolicyInheritance = "inherited" | "overridden" | "locked" | "derived";

export type PolicyControl =
  | { kind: "switch"; checked: boolean; onChange: (checked: boolean) => void }
  | { kind: "segment"; options: Segment[]; value: string; onChange: (value: string) => void }
  | { kind: "value"; text: string };

export type PolicySetting = { name: string; consequence: string };

export type WebPolicyControl = {
  kind: "switch" | "segment" | "value";
  value?: boolean | string;
  options?: Segment[];
};

export type WebPolicyRowProps = {
  presentation: "web";
  setting: PolicySetting;
  control: WebPolicyControl;
  inheritance: PolicyInheritance;
  reason?: string;
  onChange?: (value: boolean | string) => void;
  // Replaces the drawn control, e.g. a typed field; it receives the consequence line's id to describe itself by.
  renderControl?: (describedBy: string) => ReactNode;
};

type CompactPolicyRowProps = {
  setting: PolicySetting;
  control: PolicyControl;
  inheritance: PolicyInheritance;
  reason?: string;
};

export const POLICY_CHIP_WIDTH = 104;

const INHERITANCE: Record<PolicyInheritance, { role: ChipRole; label: string }> = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" },
};

type ControlProps = { control: PolicyControl; name: string; locked: boolean; describedBy?: string };

function Control({ control, name, locked, describedBy }: ControlProps) {
  if (control.kind === "switch") {
    return <Switch label={name} checked={control.checked} locked={locked || undefined} onChange={control.onChange} describedBy={describedBy} />;
  }
  if (control.kind === "segment") {
    return <SegmentedControl label={name} options={control.options} value={control.value} onChange={control.onChange} disabled={locked} describedBy={describedBy} />;
  }
  return (
    <span className={s.value} data-locked={locked ? true : undefined}>
      {control.text}
    </span>
  );
}

function CompactPolicyRow({ setting, control, inheritance, reason }: CompactPolicyRowProps): ReactElement {
  if (inheritance === "locked" && !reason) throw new Error("PolicyRow: a locked setting must say why in the row");
  const reasonId = useId();
  const chip = INHERITANCE[inheritance];
  const locked = inheritance === "locked";
  return (
    <tr className={s.row} data-inheritance={inheritance}>
      <th scope="row" className={s.headCell}>
        <span className={s.name}>{setting.name}</span>
        <span className={s.consequence}>{setting.consequence}</span>
        {reason && (
          <span id={reasonId} className={s.reason}>
            {reason}
          </span>
        )}
      </th>
      <td className={s.cell}>
        <Control control={control} name={setting.name} locked={locked} describedBy={locked ? reasonId : undefined} />
      </td>
      <td className={s.cell} style={{ width: POLICY_CHIP_WIDTH }}>
        <Chip role={chip.role} label={chip.label} />
      </td>
    </tr>
  );
}

function webText(value: boolean | string | undefined, fallback: string): string {
  return String(value ?? fallback);
}

// A locked segment is never editable; it reads as the chosen option's label instead.
function webEditableOptions(control: WebPolicyControl, locked: boolean): Segment[] | undefined {
  return control.kind === "segment" && !locked ? control.options : undefined;
}

function webChosen(control: WebPolicyControl): string {
  const option = control.kind === "segment" ? control.options?.find((o) => o.value === control.value) : undefined;
  return option?.label ?? webText(control.value, "—");
}

type WebControlProps = { control: WebPolicyControl; name: string; locked: boolean; describedBy?: string; onChange?: (value: boolean | string) => void };

function WebSwitch({ control, name, locked, describedBy, onChange }: WebControlProps): ReactElement {
  const checked = control.value === true;
  return (
    <span className={s.webControl}>
      <Switch label={name} labelHidden checked={checked} locked={locked} describedBy={describedBy} onChange={(next) => onChange?.(next)} />
      <span className={s.webState} aria-hidden="true">{locked || checked ? "on" : "off"}</span>
    </span>
  );
}

function WebControl(props: WebControlProps): ReactElement {
  const { control, locked, onChange } = props;
  if (control.kind === "switch") return <WebSwitch {...props} />;
  const options = webEditableOptions(control, locked);
  if (options !== undefined) {
    return (
      <span className={s.webControl} data-kind="segment">
        <SegmentedControl options={options} value={webText(control.value, "")} onChange={(value) => onChange?.(value)} />
      </span>
    );
  }
  return <span className={`${s.webControl} ${s.value} ward-envmeta`} data-locked={locked ? true : undefined}>{webChosen(control)}</span>;
}

// The web row folds the lock reason into its consequence line, so a locked control is described by that line.
function WebPolicyRow({ setting, control, inheritance, reason, onChange, renderControl }: WebPolicyRowProps): ReactElement {
  const consequenceId = useId();
  const locked = inheritance === "locked";
  return (
    <div className={`${s.row} ${s.webRow} ward-policyrow`} data-inheritance={inheritance}>
      <span className={s.webSetting}>
        <span className={`${s.name} ${s.webName}`}>{setting.name}</span>
        <p id={consequenceId} className={`${s.webConsequence} ward-policy-consequence`}>
          {setting.consequence}
          {reason !== undefined ? " " + reason : null}
        </p>
      </span>
      {renderControl ? (
        <span className={s.webControl}>{renderControl(consequenceId)}</span>
      ) : (
        <WebControl control={control} name={setting.name} locked={locked} describedBy={locked ? consequenceId : undefined} onChange={onChange} />
      )}
      <span className={`${s.webChip} ward-policy-chip`} style={{ width: POLICY_CHIP_WIDTH }}>
        <Chip {...INHERITANCE[inheritance]} size="tag" />
      </span>
    </div>
  );
}

export function PolicyRow(props: CompactPolicyRowProps | WebPolicyRowProps): ReactElement {
  return "presentation" in props ? <WebPolicyRow {...props} /> : <CompactPolicyRow {...props} />;
}
