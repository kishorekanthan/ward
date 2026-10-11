import type { ReactNode } from "react";
import s from "./layout.module.css";

export type CardGridProps = {
  children: ReactNode;
  // A label makes the grid a named region; without one it is plain layout.
  label?: string;
};

export function CardGrid({ children, label }: CardGridProps) {
  return (
    <div className={`${s.cardGrid} ward-cardgrid`} role={label === undefined ? undefined : "region"} aria-label={label} data-ward-card-grid="">
      {children}
    </div>
  );
}
