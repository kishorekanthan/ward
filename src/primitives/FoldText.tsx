import { useId, useState, type ReactNode } from "react";
import s from "./FoldText.module.css";

export type FoldTextProps = { children: ReactNode; lines?: 2 | 3 | 4; label?: string };

// The whole text stays in the DOM, so assistive tech reads it all; only the view is cut.
export function FoldText({ children, lines = 3, label }: FoldTextProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={s.root}>
      <div id={id} className={s.body} data-lines={lines} data-open={open || undefined} aria-label={label}>
        {children}
      </div>
      <button type="button" className={s.toggle} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {open ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
