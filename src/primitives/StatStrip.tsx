import s from "./StatStrip.module.css";
import { safeHref } from "./safeHref";

export type StatCell = { value: string; label: string; accent?: "blue" | "amber"; href?: string; hint?: string };

function validate(cells: StatCell[]): void {
  if (cells.length < 2 || cells.length > 4) {
    throw new Error(`StatStrip: ${cells.length} cells — the strip takes two to four`);
  }
  if (cells.filter((c) => c.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}

const valueClass = (c: StatCell): string => `${s.value} ward-stat-value${c.accent ? ` ward-stat-accent--${c.accent}` : ""}`;

function PlainCell({ cell }: { cell: StatCell }) {
  return (
    <div className={s.cell} data-accent={cell.accent}>
      <dd className={valueClass(cell)} title={cell.hint}>{cell.value}</dd>
      <dt className={`${s.label} ward-stat-label`}>{cell.label}</dt>
    </div>
  );
}

// One link holds value and label; the term stays for assistive tech, and the link's name keeps the label.
function LinkedCell({ cell, href }: { cell: StatCell; href: string }) {
  return (
    <div className={s.cell} data-accent={cell.accent} data-ward-rowlink>
      <dt className="ward-visually-hidden">{cell.label}</dt>
      <dd className={valueClass(cell)} title={cell.hint}>
        <a className={`${s.link} ward-stat-link`} href={safeHref(href)} aria-label={`${cell.label}: ${cell.value}`}>
          <span>{cell.value}</span>
          <span className={`${s.label} ward-stat-label`}>{cell.label}</span>
        </a>
      </dd>
    </div>
  );
}

// `divided` is the comp's split metric cells under Studio's dry-run trace: same content model, ruled equal columns.
export function StatStrip({ cells, divided = false }: { cells: StatCell[]; divided?: boolean }) {
  validate(cells);
  return (
    <dl className={`${s.strip} ward-statstrip`} data-divided={divided || undefined}>
      {cells.map((c) => (c.href === undefined ? <PlainCell key={c.label} cell={c} /> : <LinkedCell key={c.label} cell={c} href={c.href} />))}
    </dl>
  );
}
