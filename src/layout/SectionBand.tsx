import type { ReactNode } from "react";
import s from "./layout.module.css";

export type SectionBandProps = {
  children: ReactNode;
  actions?: ReactNode;
  label?: string;
};

export function SectionBand({ children, actions, label }: SectionBandProps) {
  return (
    <section className={s.band} aria-label={label} data-ward-section-band="">
      <div className={s.bandBody}>{children}</div>
      {actions === undefined ? null : <div className={s.bandActions}>{actions}</div>}
    </section>
  );
}
