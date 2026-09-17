import type { ReactNode } from "react";
import s from "./Callout.module.css";

export type CalloutProps = {
  variant?: "info" | "warn";
  ticket: string;
  children: ReactNode;
};

export function Callout({ variant = "info", ticket, children }: CalloutProps) {
  if (!ticket) throw new Error("Callout: a callout must cite the ticket that decided it");
  return (
    <aside className={`${s.root} ward-callout${variant === "warn" ? " ward-callout--warn" : ""}`} role="note" data-variant={variant}>
      <span className={`${s.ticket} ward-callout-ticket`}>{ticket}</span>
      <div className={s.body}>{children}</div>
    </aside>
  );
}
