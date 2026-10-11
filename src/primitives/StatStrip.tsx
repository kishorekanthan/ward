import type { CSSProperties } from "react";
import s from "./StatStrip.module.css";
import { safeHref } from "./safeHref";

export type StatCell = { value: string; label: string; accent?: "blue" | "amber"; href?: string; hint?: string };

function validate(owner: string, cells: StatCell[], [min, max]: [number, number]): void {
  if (cells.length < min || cells.length > max) {
    throw new Error(`${owner}: ${cells.length} cells — it takes ${min} to ${max}`);
  }
  if (cells.filter((c) => c.accent).length > 1) throw new Error(`${owner}: only the cell carrying the argument may be accented`);
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

const statCell = (c: StatCell) => (c.href === undefined ? <PlainCell key={c.label} cell={c} /> : <LinkedCell key={c.label} cell={c} href={c.href} />);

// `divided` is the comp's split metric cells under Studio's dry-run trace: same content model, ruled equal columns.
export function StatStrip({ cells, divided = false }: { cells: StatCell[]; divided?: boolean }) {
  validate("StatStrip", cells, [2, 4]);
  return (
    <dl className={`${s.strip} ward-statstrip`} data-divided={divided || undefined}>
      {cells.map(statCell)}
    </dl>
  );
}

const TILES_A_ROW = 6;

// Tiles fill the row in equal widths, six at most; more wrap below at the same width, so no row mixes widths (#262).
export function StatTiles({ cells }: { cells: StatCell[] }) {
  validate("StatTiles", cells, [1, 2 * TILES_A_ROW]);
  const style = { "--ward-stat-tiles-columns": Math.min(cells.length, TILES_A_ROW) } as CSSProperties;
  return (
    <dl className={`${s.tiles} ward-stattiles`} style={style}>
      {cells.map(statCell)}
    </dl>
  );
}
