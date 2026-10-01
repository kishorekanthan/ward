import type { ReactNode } from "react";
import s from "./PlainList.module.css";

export type PlainListProps = { children: ReactNode; label?: string };

// role="list" keeps list semantics in Safari, which drops them when the bullets go.
export function PlainList({ children, label }: PlainListProps) {
  return (
    <ul className={s.list} role="list" aria-label={label} data-ward-plain-list="">
      {children}
    </ul>
  );
}
