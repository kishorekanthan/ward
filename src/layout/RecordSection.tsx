import type { ReactNode } from "react";
import { SectionHeader } from "../primitives/SectionHeader";
import s from "./layout.module.css";

export type RecordSectionProps = {
  title: string;
  children: ReactNode;
  note?: string;
  trailing?: ReactNode;
  pad?: "block" | "criteria" | "history" | "rail" | "cost" | "railList" | "placement";
  label?: string;
};

export function RecordSection({ title, children, note, trailing, pad = "block", label }: RecordSectionProps) {
  return (
    <section className={s.record} aria-label={label} data-ward-record-section="">
      <SectionHeader kind="key" title={title} note={note} trailing={trailing} />
      <div className={s.recordBody} data-pad={pad}>
        {children}
      </div>
    </section>
  );
}
