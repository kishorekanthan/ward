import { useEffect } from "react";
import { useRovingTabindex } from "../a11y/useRovingTabindex";
import s from "./SegmentedControl.module.css";

export type Segment = { value: string; label: string };
export type SegmentOption = Segment;

export type SegmentedControlProps = {
  options: Segment[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  describedBy?: string;
};

export function SegmentedControl({ options, value, onChange, label = "Options", disabled = false, describedBy }: SegmentedControlProps) {
  if (options.length < 2 || options.length > 3)
    throw new Error(`SegmentedControl: ${options.length} options — the control takes 2 or 3`);
  const roving = useRovingTabindex({ orientation: "horizontal" });
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  useEffect(() => roving.setActive(selectedIndex), [roving.setActive, selectedIndex]);
  return (
    <div className={`${s.root} ward-segmented`} role="radiogroup" aria-label={label} {...roving.containerProps}>
      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          className={s.segment}
          aria-checked={option.value === value}
          disabled={disabled}
          aria-describedby={describedBy}
          onClick={() => onChange(option.value)}
          {...roving.itemProps(index)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
