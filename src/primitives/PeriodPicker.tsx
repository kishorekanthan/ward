import { useState } from "react";
import { Field } from "./Field";
import s from "./PeriodPicker.module.css";

export type PeriodPreset = "7d" | "4w" | "8w" | "q";
/** A preset window, or a custom range of two days as YYYY-MM-DD, both ends included. */
export type Period = { preset: PeriodPreset } | { from: string; to: string };

export type PeriodPickerProps = {
  value: Period;
  onChange: (period: Period) => void;
  /** The latest day a range may end on, as YYYY-MM-DD. */
  today: string;
};

type Range = { from: string; to: string };

const CUSTOM = "custom";
const OPTIONS = [
  { value: "7d", label: "Last 7 days" },
  { value: "4w", label: "Last 4 weeks" },
  { value: "8w", label: "Last 8 weeks" },
  { value: "q", label: "This quarter" },
  { value: CUSTOM, label: "Custom range" },
];

const inOrder = (range: Range): boolean => range.from !== "" && range.to !== "" && range.from <= range.to;
const backwards = (range: Range): boolean => range.from !== "" && range.to !== "" && range.from > range.to;

const EMPTY: Range = { from: "", to: "" };
const choiceOf = (value: Period, range: Range | null): string => (range === null && "preset" in value ? value.preset : CUSTOM);

function RangeFields({ range, today, setEnd }: { range: Range; today: string; setEnd: (end: keyof Range) => (day: string) => void }) {
  return (
    <>
      <Field kind="date" label="From" value={range.from} max={range.to || today} onChange={setEnd("from")} invalid={backwards(range) ? "The start is after the end." : undefined} />
      <Field kind="date" label="To" value={range.to} min={range.from || undefined} max={today} onChange={setEnd("to")} />
    </>
  );
}

/** The Period dropdown; Custom range adds From and To, and only a range in order is sent. */
export function PeriodPicker({ value, onChange, today }: PeriodPickerProps) {
  const [range, setRange] = useState<Range | null>("from" in value ? value : null);
  const pick = (choice: string) => {
    if (choice === CUSTOM) return setRange(range ?? EMPTY);
    setRange(null);
    onChange({ preset: choice as PeriodPreset });
  };
  const setEnd = (end: keyof Range) => (day: string) => {
    const next = { ...(range ?? EMPTY), [end]: day };
    setRange(next);
    if (inOrder(next)) onChange(next);
  };
  return (
    <div className={`${s.row} ward-period`}>
      <Field kind="select" label="Period" value={choiceOf(value, range)} options={OPTIONS} onChange={pick} />
      {range === null ? null : <RangeFields range={range} today={today} setEnd={setEnd} />}
    </div>
  );
}
