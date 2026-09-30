import type { CSSProperties } from "react";
import { count } from "../fmt/count";
import s from "./BarChart.module.css";

export type BarSeries = { name: string; values: (number | null)[] };

export type BarChartProps = {
  title: string;
  categories: string[];
  series: BarSeries[];
  format?: (value: number) => string;
  categoryHead?: string;
  empty?: string;
  missing?: string;
};

const EMPTY_MARK = "—";
const MAX_SERIES = 6;

function validate(categories: string[], series: BarSeries[]): void {
  if (series.length < 1 || series.length > MAX_SERIES) {
    throw new Error(`BarChart: ${series.length} series; the chart takes one to ${MAX_SERIES}`);
  }
  const ragged = series.find((row) => row.values.length !== categories.length);
  if (ragged) throw new Error(`BarChart: series "${ragged.name}" has ${ragged.values.length} values for ${categories.length} categories`);
}

function largest(series: BarSeries[]): number {
  return Math.max(0, ...series.flatMap((row) => row.values.map((value) => value ?? 0)));
}

// One series draws in the text colour; two or more take a series step each.
function stepOf(index: number, total: number): number | undefined {
  return total > 1 ? index + 1 : undefined;
}

type CellProps = { value: number | null; top: number; step?: number; format: (value: number) => string; missing: string };

function shareOf(value: number | null, top: number): number {
  return value !== null && top > 0 ? (value / top) * 100 : 0;
}

function Cell({ value, top, step, format, missing }: CellProps) {
  const percent = shareOf(value, top);
  const share = { "--share": `${percent}%` } as CSSProperties;
  return (
    <td className={s.cell}>
      <span className={s.track}>
        <span className={s.lane}>
          {percent > 0 ? <span className={`${s.bar} ward-barchart-bar`} data-step={step} style={share} aria-hidden="true" /> : null}
        </span>
        <span className={s.value}>{value === null ? missing : format(value)}</span>
      </span>
    </td>
  );
}

function Head({ series }: { series: BarSeries[] }) {
  return (
    <>
      {series.map((row, index) => (
        <th scope="col" className={s.series} key={row.name}>
          {series.length > 1 ? <span className={s.swatch} data-step={stepOf(index, series.length)} aria-hidden="true" /> : null}
          {row.name}
        </th>
      ))}
    </>
  );
}

function EmptyChart({ title, empty = "Nothing to chart yet." }: Pick<BarChartProps, "title" | "empty">) {
  return (
    <section className={`${s.root} ward-barchart`} aria-label={title}>
      <p className={s.caption}>{title}</p>
      <p className={s.empty}>{empty}</p>
    </section>
  );
}

function Chart({ title, categories, series, top, format = count, categoryHead = "Category", missing = EMPTY_MARK }: BarChartProps & { top: number }) {
  return (
    <div className={`${s.root} ward-barchart`}>
      <table className={s.table}>
        <caption className={s.caption}>{title}</caption>
        <thead>
          <tr>
            <th scope="col" className={s.series}>
              <span className="ward-visually-hidden">{categoryHead}</span>
            </th>
            <Head series={series} />
          </tr>
        </thead>
        <tbody>
          {categories.map((category, row) => (
            <tr key={category}>
              <th scope="row" className={s.category}>{category}</th>
              {series.map((line, index) => (
                <Cell key={line.name} value={line.values[row]} top={top} step={stepOf(index, series.length)} format={format} missing={missing} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BarChart(props: BarChartProps) {
  validate(props.categories, props.series);
  const top = largest(props.series);
  return top === 0 ? <EmptyChart title={props.title} empty={props.empty} /> : <Chart {...props} top={top} />;
}
