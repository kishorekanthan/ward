import { money } from "../../fmt/money";
import { stamp } from "../../fmt/stamp";
import { Chip } from "../../primitives/Chip";
import type { ChipRole } from "../../tokens";
import s from "./SessionRow.module.css";

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
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" },
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
const TABLE_LABEL: Partial<Record<Session["state"], string>> = { duplicate: "CLOSED · DUPLICATE" };

function WaitingOn({ value }: { value?: string }) {
  return value === undefined ? null : <span className={s.tableMeta}>{`waiting on ${value}`}</span>;
}

function SessionCost({ value }: { value?: number }) {
  return <td className={s.tableCost}>{value === undefined ? null : money(value)}</td>;
}

function LinkedRecord({ link }: { link?: Session["link"] }) {
  return link === undefined ? null : <a className={s.tableRecord} href={link.href}>{`→ ${link.key}`}</a>;
}

function TableSessionRow({ session, href }: { session: Session; href: string }) {
  const chip = CHIP[session.state];
  return (
    <tr className={s.tableRow} data-state={session.state}>
      <td className={s.tableTitle}>
        <a className={s.tableLink} href={href}>{session.title}</a>
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
      <span className={s.title}>{session.title}</span>
      <span className={s.turns}>{`${session.turns} turns`}</span>
      <span className={s.waiting}>{session.waitingOn ?? ""}</span>
      <span className={s.resolved}>{session.resolved.join(" · ")}</span>
      <span className={s.cost} data-testid="session-cost">
        {session.cost === undefined ? "" : money(session.cost)}
      </span>
      <span className={s.activity}>{stamp(session.lastActivity)}</span>
      {session.link && (
        <a className={s.link} href={session.link.href}>
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
