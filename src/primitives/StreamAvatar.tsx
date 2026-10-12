import type { CSSProperties } from "react";
import s from "./StreamAvatar.module.css";
import { isValidatedStreamStep, streamVars } from "../tokens";

export type StreamAvatarProps = {
  /** The stream's full name; its initials are drawn. */
  name: string;
  /** The stream's colour step; none, or one without a validated colour, draws neutral. */
  step?: number | null;
  /** md is 22px, beside a name; lg is 26px, alone in a folded sidebar. */
  size?: "md" | "lg";
  /** Drawn in place of the name's own initials, such as one from uniqueStreamInitials. */
  initials?: string;
};

// Two words give their first letters, one word its first two: "Data Engineering" is DE, "Integration" IN.
export function streamInitials(name: string): string {
  const words = name.trim().split(/[\s_-]+/).filter(Boolean);
  const letters = words.length > 1 ? (words[0] ?? "").charAt(0) + (words[1] ?? "").charAt(0) : (words[0] ?? "").slice(0, 2);
  return letters.toUpperCase();
}

// The first letter, then each later letter in turn: "Demo" offers DE, DM, DO.
function candidates(name: string): string[] {
  const letters = name.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase();
  const first = letters.charAt(0);
  return [streamInitials(name), ...[...letters.slice(1)].map((letter) => first + letter)];
}

function firstFree(name: string, taken: Set<string>): string {
  const free = candidates(name).find((letters) => !taken.has(letters));
  if (free !== undefined) return free;
  let n = 2;
  while (taken.has(streamInitials(name).charAt(0) + String(n))) n += 1;
  return streamInitials(name).charAt(0) + String(n);
}

/** Initials for each name, none shared: in the order given, a name whose initials are taken gets its next free pair. */
export function uniqueStreamInitials(names: readonly string[]): Map<string, string> {
  const taken = new Set<string>();
  const out = new Map<string, string>();
  for (const name of names) {
    if (out.has(name)) continue;
    const letters = firstFree(name, taken);
    taken.add(letters);
    out.set(name, letters);
  }
  return out;
}

function colourOf(step: number | null | undefined): CSSProperties | undefined {
  return step != null && isValidatedStreamStep(step) ? (streamVars(step) as CSSProperties) : undefined;
}

// Decorative: the stream's name always sits beside it or names its control, so it is hidden from assistive tech.
export function StreamAvatar({ name, step, size = "md", initials }: StreamAvatarProps) {
  return (
    <span className={s.avatar} data-size={size} aria-hidden="true" style={colourOf(step)}>
      {initials ?? streamInitials(name)}
    </span>
  );
}
