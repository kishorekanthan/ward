import { useRef, type CSSProperties, type ReactNode } from "react";
import s from "./layout.module.css";
import { useEdgeFades } from "./useEdgeFades";

export type StageGridProps = {
  columns: number;
  children: ReactNode;
  label?: string;
  // "stage" floors each column at the stage-column width; "column" at the wider board-column floor.
  floor?: "stage" | "column";
};

export function StageGrid({ columns, children, label = "Stages", floor = "stage" }: StageGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const count = Math.max(columns, 1);
  useEdgeFades(gridRef, count);
  const style = { "--ward-stage-grid-columns": count } as CSSProperties;
  return (
    <div ref={gridRef} className={s.stageGrid} role="region" aria-label={label} tabIndex={0} data-ward-stage-grid="" data-floor={floor} style={style}>
      {children}
    </div>
  );
}
