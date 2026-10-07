import { money } from "../../fmt/money";
import { stamp } from "../../fmt/stamp";
import { Chip } from "../../primitives/Chip";
import { ClampText } from "../../primitives/ClampText";
import type { ChipRole } from "../../tokens";
import s from "./SessionRow.module.css";
import { safeHref } from "../../primitives/safeHref";

export type Session = {
  title: string;
  turns: number;
  turnsNote?: string;
  waitingOn?: string;
  resolved: string[];
  cost?: number;
  lastActivity: string;
  state: "open" | "draft" | "created" | "duplicate" | "expired";
  link?: { key: string; href: string };
};

export type SessionRowProps =
  | { session: Session; presentation?: "card"; href?: never }
  | { session: Session; presentation: "table"; href: string };

const CHIP: Record<Session["state"], { role: ChipRole; label: string }> = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" },
};

export function agoSince(iso: string): string {
  if (iso === "") return "—";
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
}

function turnsText(session: Session): string {
  return `${session.turns} ${session.turns === 1 ? "turn" : "turns"}${session.turnsNote === undefined ? "" : ` · ${session.turnsNote}`}`;
}

function resolvedText(resolved: string[]): string {
  const text = resolved.join(", ");
  return text === "" ? "nothing resolved" : text;
}

// The list names why a duplicate stopped, so the table says it closed rather than only what it matched.
const TABLE_LABEL: Partial<Record<Session["state"], string>> = { duplicate: "Closed · duplicate" };

function WaitingOn({ value }: { value?: string }) {
  return value === undefined ? null : <ClampText className={s.tableMeta} text={`waiting on ${value}`} />;
}

function SessionCost({ value }: { value?: number }) {
  return <td className={s.tableCost}>{value === undefined ? null : money(value)}</td>;
}

function LinkedRecord({ link }: { link?: Session["link"] }) {
  return link === undefined ? null : <a className={`${s.tableRecord} ward-target`} href={safeHref(link.href)}>{`→ ${link.key}`}</a>;
}

function TableSessionRow({ session, href }: { session: Session; href: string }) {
  const chip = CHIP[session.state];
  return (
    <tr className={s.tableRow} data-state={session.state}>
      <td className={s.tableTitle}>
        <a className={`${s.tableLink} ward-target`} href={safeHref(href)}><ClampText text={session.title} /></a>
        <span className={s.tableMeta}>{turnsText(session)}</span>
      </td>
      <td className={s.tableResolved}>
        {resolvedText(session.resolved)}
        <WaitingOn value={session.waitingOn} />
      </td>
      <SessionCost value={session.cost} />
      <td className={s.tableActivity}>{agoSince(session.lastActivity)}</td>
      <td className={s.tableState}>
        <span>
          <Chip role={chip.role} label={TABLE_LABEL[session.state] ?? chip.label} />
          <LinkedRecord link={session.link} />
        </span>
      </td>
    </tr>
  );
}

function CardSessionRow({ session }: { session: Session }) {
  const chip = CHIP[session.state];
  return (
    <div className={s.row} data-state={session.state} tabIndex={0} role="region" aria-label={session.title}>
      <ClampText className={s.title} text={session.title} />
      <span className={s.turns}>{`${session.turns} turns`}</span>
      <ClampText className={s.waiting} text={session.waitingOn ?? ""} />
      <span className={s.resolved}>{session.resolved.join(" · ")}</span>
      <span className={s.cost} data-testid="session-cost">
        {session.cost === undefined ? "" : money(session.cost)}
      </span>
      <span className={s.activity}>{stamp(session.lastActivity)}</span>
      {session.link && (
        <a className={s.link} href={safeHref(session.link.href)}>
          {session.link.key}
        </a>
      )}
      <Chip role={chip.role} label={chip.label} />
    </div>
  );
}

export function SessionRow(props: SessionRowProps) {
  return props.presentation === "table" ? <TableSessionRow session={props.session} href={props.href} /> : <CardSessionRow session={props.session} />;
}
