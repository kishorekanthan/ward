import { money } from "../fmt/money";
import s from "./CostMeter.module.css";

export type CostMeterProps = {
  spent: number;
  ceiling: number;
  breakdown?: { label: string; amount: number }[];
};

export function CostMeter({ spent, ceiling, breakdown }: CostMeterProps) {
  const share = ceiling > 0 ? Math.min(spent / ceiling, 1) : 0;
  return (
    <div className={`${s.root} ward-costmeter`}>
      <p className={`${s.figure} ward-stat-value`}>
        {money(spent)} <span className={s.of}>of {money(ceiling)}</span>
      </p>
      <meter
        className={`${s.bar} ward-costbar`}
        min={0}
        max={ceiling}
        value={spent}
        aria-valuetext={`${money(spent)} of ${money(ceiling)}`}
        style={{ "--share": `${share * 100}%` } as React.CSSProperties}
      />
      {breakdown && (
        <ul className={s.rows}>
          {breakdown.map((b) => (
            <li className={`${s.row} ward-costrow`} key={b.label}>
              <span className={s.label}>{b.label}</span>
              <span className={s.amount}>{money(b.amount)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
