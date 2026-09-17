import type { ReactNode } from "react";
import s from "./Band.module.css";

export type BandCell = {
  title: string;
  body: ReactNode;
  /** The comp's `.tag` — pass a Chip. Optional so a cell can carry no verdict. */
  tag?: ReactNode;
};

export type BandProps = {
  /** The comp's `.k`, a zero-padded ordinal such as "01". A string, so the padding survives. */
  index: string;
  title: string;
  note: string;
  cells: BandCell[];
};

/** Every band in the comp is one head plus exactly four cells (repeat(4, …)), so the count is shape, not default. */
const CELLS = 4;

export function Band({ index, title, note, cells }: BandProps) {
  if (cells.length !== CELLS) {
    throw new Error(`Band: ${cells.length} cells — the band is a fixed ${CELLS}-cell grid`);
  }
  return (
    <section className={s.band} aria-label={`${index} ${title}`}>
      <div className={s.head}>
        <span className={s.index}>{index}</span>
        <span className={s.title}>{title}</span>
        <span className={s.note}>{note}</span>
      </div>
      {cells.map((c) => (
        <div key={c.title} className={s.cell}>
          <span className={s.cellTitle}>{c.title}</span>
          <span className={s.cellBody}>{c.body}</span>
          {c.tag !== undefined && <span className={s.tag}>{c.tag}</span>}
        </div>
      ))}
    </section>
  );
}
