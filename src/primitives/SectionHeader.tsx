import type { ReactNode } from "react";
import s from "./SectionHeader.module.css";

export type SectionHeaderProps = {
  title: string;
  // Optional: the comp's `.sec` is an unnumbered label; Studio's ordered sections add the number.
  index?: string;
  note?: string;
  counter?: string;
  // "key" is Board Item's `.k` label; "micro" is the Studio section head; "bare" is Studio 4a's unbanded head.
  kind?: "micro" | "key" | "bare";
  trailing?: ReactNode;
};

function Index({ index }: { index?: string }) {
  if (!index) return null;
  return (
    <>
      <span className={`${s.index} ward-sh-index`}>{index}</span>
      <span className={s.dot} aria-hidden="true">
        ·
      </span>
    </>
  );
}

function Counter({ counter }: { counter?: string }) {
  if (!counter) return null;
  return (
    <span className={s.counter} aria-hidden="true">
      {counter}
    </span>
  );
}

export function SectionHeader({ title, index, note, counter, kind = "micro", trailing }: SectionHeaderProps) {
  return (
    <div className={`${s.root} ward-sh`} data-kind={kind}>
      <h2 className={s.head}>
        <Index index={index} />
        {title}
        {counter && <span className="ward-visually-hidden"> · {counter}</span>}
      </h2>
      {note && <span className={s.note}>{note}</span>}
      <Counter counter={counter} />
      {trailing === undefined ? null : <span className={s.trailing}>{trailing}</span>}
    </div>
  );
}
