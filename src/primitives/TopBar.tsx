import type { ReactNode } from "react";
import s from "./TopBar.module.css";

export type Destination = { id: string; label: string; href: string };

export type TopBarProps = {
  wordmark?: string;
  destinations: Destination[];
  active: string;
  actor?: { label: string } | string;
  tagline?: ReactNode;
  onNavigate?: (id: string) => void;
  skipTo?: string;
};

function initials(label: string) {
  return label
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0] ?? "")
    .join("")
    .toUpperCase();
}

function actorLabel(actor: TopBarProps["actor"]): string | undefined {
  return typeof actor === "string" ? actor : actor?.label;
}

export function TopBar({ wordmark = "Trellis", destinations, active, actor, tagline, onNavigate, skipTo = "main" }: TopBarProps) {
  const actorText = actorLabel(actor);
  return (
    <header className={s.bar}>
      <a className={s.skip} href={`#${skipTo}`}>
        Skip to content
      </a>
      <span className={s.mark}>{wordmark}</span>
      {tagline && <span className={s.tagline}>{tagline}</span>}
      <nav className={s.nav} aria-label="Primary">
        <ul className={s.list}>
          {destinations.map((d) => (
            <li key={d.id}>
              <a
                className={s.dest}
                href={d.href}
                aria-current={d.id === active ? "page" : undefined}
                onClick={() => onNavigate?.(d.id)}
              >
                {d.label}
              </a>
            </li>
          ))}
        </ul>
        <select
          className={s.select}
          aria-label="Destination"
          value={active}
          onChange={(e) => onNavigate?.(e.target.value)}
        >
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>
      </nav>
      {actorText && (
        <span className={s.actor}>
          <span className={s.actorLabel}>{actorText}</span>
          <span className={s.actorMark} aria-hidden="true">
            {initials(actorText)}
          </span>
        </span>
      )}
    </header>
  );
}
