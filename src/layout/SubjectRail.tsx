import type { ReactNode } from "react";
import s from "./layout.module.css";

export type SubjectRailProps = {
  children: ReactNode;
  rail: ReactNode;
  // split: Intake 12c — record and rail share the width 1.4 : 1.
  width?: "dryrun" | "preview" | "split";
  railLabel?: string;
  sticky?: boolean;
  // Board Item 8b: the record and rail run full-bleed under one rule, the record ruled off from the rail.
  ruled?: boolean;
};

function flag(on?: boolean): "true" | undefined {
  return on ? "true" : undefined;
}

export function SubjectRail({ children, rail, width = "preview", railLabel = "Supporting details", sticky, ruled }: SubjectRailProps) {
  return (
    <div className={s.subjectRail} data-ward-subject-rail={width} data-ruled={flag(ruled)}>
      <div className={s.subject}>{children}</div>
      <aside className={s.rail} data-sticky={flag(sticky)} aria-label={railLabel}>
        {rail}
      </aside>
    </div>
  );
}
