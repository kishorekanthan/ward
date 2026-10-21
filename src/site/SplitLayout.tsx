import type { ReactNode } from "react";
import s from "./SplitLayout.module.css";

export type SplitLayoutProps = {
  children: ReactNode;
  aside: ReactNode;
  asideLabel: string;
};

// Main content with a labelled side column; the two stack when the main column would drop below its min width.
export function SplitLayout({ children, aside, asideLabel }: SplitLayoutProps) {
  return (
    <div className={s.split}>
      <div className={s.main}>{children}</div>
      <aside className={s.aside} aria-label={asideLabel}>
        {aside}
      </aside>
    </div>
  );
}
