import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
    stale: `no new events as of ${time(idleAt)}`,
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

// Within half a console line of the bottom, the reader is on the newest line.
const AT_BOTTOM_SLACK_PX = 8;

function scrolledUp(list: HTMLElement): boolean {
  return list.scrollHeight - list.scrollTop - list.clientHeight > AT_BOTTOM_SLACK_PX;
}

function JumpToLatest({ shown, onJump }: { shown: boolean; onJump: () => void }) {
  if (!shown) return null;
  return <button type="button" className={`${s.jump} ward-consjump`} onClick={onJump}>Jump to latest</button>;
}

type AnnounceShare = { announce: boolean; setAnnounce: (announce: boolean) => void };
const SharedAnnounce = createContext<AnnounceShare | null>(null);

export type ConsoleAnnounceProviderProps = {
  announce?: boolean;
  onAnnounceChange?: (announce: boolean) => void;
  children: ReactNode;
};

// One 'Read new events' preference for every console inside; pass announce to persist it yourself.
export function ConsoleAnnounceProvider({ announce, onAnnounceChange, children }: ConsoleAnnounceProviderProps) {
  const [own, setOwn] = useState(false);
  const share = useMemo<AnnounceShare>(() => ({
    announce: announce ?? own,
    setAnnounce: (next) => {
      setOwn(next);
      onAnnounceChange?.(next);
    },
  }), [announce, own, onAnnounceChange]);
  return <SharedAnnounce.Provider value={share}>{children}</SharedAnnounce.Provider>;
}

function useAnnounce(): [boolean, (announce: boolean) => void] {
  const shared = useContext(SharedAnnounce);
  const [own, setOwn] = useState(false);
  return shared ? [shared.announce, shared.setAnnounce] : [own, setOwn];
}

export function ActivityConsole({ lines, connection, idleSince, label = "Live activity" }: ActivityConsoleProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const [revealed, setRevealed] = useState(0);
  const [announce, setAnnounce] = useAnnounce();
  const [away, setAway] = useState(false);
  const last = lines.at(-1);

  useEffect(() => {
    setRevealed(lines.length);
  }, [lines.length]);

  // Follow the newest line unless the reader has scrolled up to read an older one.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (list && !away) list.scrollTop = list.scrollHeight;
  }, [lines.length, away]);

  const jump = () => {
    const list = listRef.current;
    if (!list) return;
    const eventTexts = list.querySelectorAll<HTMLElement>("[data-consline-text]");
    eventTexts.item(eventTexts.length - 1)?.focus();
    setAway(false);
  };

  return (
    <div className={s.root}>
      <ol className={s.list} ref={listRef} aria-live={announce ? "polite" : "off"} aria-label={label} onScroll={(e) => setAway(scrolledUp(e.currentTarget))}>
        {lines.map((l, i) => (
          <li className={`${s.line} ward-consline ward-reveal ward-consline--${l.kind}`} key={`${l.at}-${i}`} data-kind={l.kind} data-revealed={i < revealed}>
            <span className={s.at}>{time(l.at)}</span>
            <KindWord kind={l.kind} />
            <span className={s.text} data-consline-text tabIndex={-1}>{l.text}</span>
          </li>
        ))}
      </ol>
      <IdleLine connection={connection} idleSince={idleSince} last={last}>
        <button type="button" className={`${s.jump} ward-consannounce`} aria-pressed={announce} onClick={() => setAnnounce(!announce)}>Read new events</button>
        <JumpToLatest shown={away} onJump={jump} />
      </IdleLine>
    </div>
  );
}
