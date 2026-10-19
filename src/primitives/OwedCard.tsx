import type { ReactNode } from "react";
import s from "./OwedCard.module.css";

export type OwedCardProps = { title: string; sentence: string; actions?: ReactNode; label?: string };

// Peach marks only what the viewer still owes, so a page shows this card only then.
export function OwedCard({ title, sentence, actions, label = "Needs you" }: OwedCardProps) {
  return (
    <section className={s.root} aria-label={label} data-ward-owed="">
      <div className={s.words}>
        <strong className={s.title}>{title}</strong>
        <span>{sentence}</span>
      </div>
      {actions === undefined ? null : <div className={s.actions}>{actions}</div>}
    </section>
  );
}
