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
  // "inline": the children are the empty sentence, set beside the title in one row with no body.
  empty?: "inline";
  // "prose" caps the body's text at a 72ch reading measure.
  measure?: "prose";
  // A card section stands alone on the page: a bordered card with a small heading.
  surface?: "card";
};

export function RecordSection({ title, children, note, trailing, pad = "block", label, empty, measure, surface }: RecordSectionProps) {
  if (empty === "inline") {
    return (
      <section className={s.record} aria-label={label} data-ward-record-section="" data-empty="inline" data-surface={surface}>
        <SectionHeader kind="key" title={title} note={children} trailing={trailing} />
      </section>
    );
  }
  return (
    <section className={s.record} aria-label={label} data-ward-record-section="" data-surface={surface}>
      <SectionHeader kind="key" title={title} note={note} trailing={trailing} />
      <div className={s.recordBody} data-pad={pad} data-measure={measure}>
        {children}
      </div>
    </section>
  );
}
