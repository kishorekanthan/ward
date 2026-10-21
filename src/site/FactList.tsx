import type { ReactNode } from "react";
import s from "./FactList.module.css";

export type Fact = { term: string; value: ReactNode };

export type FactListProps = { facts: Fact[] };

// Key facts as term and value pairs, in the order given.
export function FactList({ facts }: FactListProps) {
  return (
    <dl className={s.list}>
      {facts.map((fact) => (
        <div className={s.pair} key={fact.term}>
          <dt className={s.term}>{fact.term}</dt>
          <dd className={s.value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
