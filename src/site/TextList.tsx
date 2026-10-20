import { Children, type ReactNode } from "react";
import s from "./TextList.module.css";

export type TextListProps = {
  children: ReactNode;
  rules?: boolean;
  label?: string;
};

// A short list of text: each child becomes a list item, with optional rules between them.
export function TextList({ children, rules = false, label }: TextListProps) {
  return (
    <ul className={s.list} role="list" aria-label={label} data-rules={rules}>
      {Children.toArray(children).map((child, i) => (
        <li className={s.item} key={i}>
          {child}
        </li>
      ))}
    </ul>
  );
}
