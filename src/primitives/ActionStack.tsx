import type { ReactNode } from "react";
import s from "./ActionStack.module.css";

export type ActionStackProps = { children: ReactNode };

// An action over the line that explains it ("No Jira issue yet", "Nudge sent.").
export function ActionStack({ children }: ActionStackProps) {
  return (
    <span className={s.stack} data-ward-action-stack="">
      {children}
    </span>
  );
}
