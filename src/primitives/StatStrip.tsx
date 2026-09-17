import s from "./StatStrip.module.css";

export type StatCell = { value: string; label: string; accent?: "blue" | "amber" };

function validate(cells: StatCell[]): void {
  if (cells.length < 2 || cells.length > 4) {
    throw new Error(`StatStrip: ${cells.length} cells — the strip takes two to four`);
  }
  if (cells.filter((c) => c.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}

// `divided` is the comp's split metric cells under Studio's dry-run trace: same content model, ruled equal columns.
export function StatStrip({ cells, divided = false }: { cells: StatCell[]; divided?: boolean }) {
  validate(cells);
  return (
    <dl className={`${s.strip} ward-statstrip`} data-divided={divided || undefined}>
      {cells.map((c) => (
        <div className={s.cell} key={c.label} data-accent={c.accent}>
          <dd className={`${s.value} ward-stat-value${c.accent ? ` ward-stat-accent--${c.accent}` : ""}`}>{c.value}</dd>
          <dt className={`${s.label} ward-stat-label`}>{c.label}</dt>
        </div>
      ))}
    </dl>
  );
}
