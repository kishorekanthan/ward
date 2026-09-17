import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LiveConnection } from "../../live/types";
import s from "./ActivityConsole.module.css";

export type ConsoleKind = "tool" | "warn" | "ok" | "dim";
export type ConsoleLine = { at: string; kind: ConsoleKind; text: string };

export type ActivityConsoleProps = {
  lines: ConsoleLine[];
  connection: LiveConnection;
  idleSince?: string;
  label?: string;
};

const secondsClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function time(iso: string): string {
  if (Number.isNaN(Date.parse(iso))) return "";
  return secondsClock.format(new Date(iso));
}

const KIND_WORD: Partial<Record<ConsoleKind, string>> = { warn: "warning", ok: "ok" };

// Warn and ok lines differ from tool lines only by ink, so the kind is also spoken.
function KindWord({ kind }: { kind: ConsoleKind }) {
  const word = KIND_WORD[kind];
  return word === undefined ? null : <span className="ward-visually-hidden">{word}</span>;
}

type IdleLineProps = Pick<ActivityConsoleProps, "connection" | "idleSince"> & { last?: ConsoleLine; children: ReactNode };

function LastEventTime({ at }: { at?: string }) {
  if (at === undefined) return null;
  return <span>{`last event ${time(at)}`}</span>;
}

function IdleLine({ connection, idleSince, last, children }: IdleLineProps) {
  const idleAt = [idleSince, last?.at, ""].find(Boolean) as string;
  const copy = {
    stale: `no new events — as of ${time(idleAt)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…",
  }[connection];
  return (
    <p className={`${s.foot} ward-consline ward-consline--dim`}>
      <span className={`${s.caret} ward-caret`} aria-hidden="true" />
      <span className={s.idle}>{copy}</span>
      <LastEventTime at={last?.at} />
      {children}
    </p>
  );
}

export function ActivityConsole({ lines, connection, idleSince, label = "Live activity" }: ActivityConsoleProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const [revealed, setRevealed] = useState(0);
  const last = lines.at(-1);

  useEffect(() => {
    setRevealed(lines.length);
  }, [lines.length]);

  const jump = () => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
    const eventTexts = list.querySelectorAll<HTMLElement>("[data-consline-text]");
    eventTexts.item(eventTexts.length - 1)?.focus();
  };

  return (
    <div className={s.root}>
      <ol className={s.list} ref={listRef} aria-live="off" aria-label={label}>
        {lines.map((l, i) => (
          <li className={`${s.line} ward-consline ward-reveal ward-consline--${l.kind}`} key={`${l.at}-${i}`} data-kind={l.kind} data-revealed={i < revealed}>
            <span className={s.at}>{time(l.at)}</span>
            <KindWord kind={l.kind} />
            <span className={s.text} data-consline-text tabIndex={-1}>{l.text}</span>
          </li>
        ))}
      </ol>
      <IdleLine connection={connection} idleSince={idleSince} last={last}>
        <button type="button" className={`${s.jump} ward-consjump`} onClick={jump}>Jump to latest</button>
      </IdleLine>
    </div>
  );
}
