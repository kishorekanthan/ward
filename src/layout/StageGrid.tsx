import { type CSSProperties, type ReactNode } from "react";
import s from "./layout.module.css";
import { OverflowRow } from "./OverflowRow";

export type StageGridProps = {
  columns: number;
  children: ReactNode;
  label?: string;
  // "stage" floors each column at the stage-column width; "column" at the wider board-column floor.
  floor?: "stage" | "column";
};

export function StageGrid({ columns, children, label = "Stages", floor = "stage" }: StageGridProps) {
  const count = Math.max(columns, 1);
  const style = { "--ward-stage-grid-columns": count } as CSSProperties;
  return (
    <OverflowRow className={s.stageGrid} label={label} count={count} data-ward-stage-grid="" data-floor={floor} style={style}>
      {children}
    </OverflowRow>
  );
}
