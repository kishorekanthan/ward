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
};

// Two words give their first letters, one word its first two: "Data Engineering" is DE, "Integration" IN.
export function streamInitials(name: string): string {
  const words = name.trim().split(/[\s_-]+/).filter(Boolean);
  const letters = words.length > 1 ? (words[0] ?? "").charAt(0) + (words[1] ?? "").charAt(0) : (words[0] ?? "").slice(0, 2);
  return letters.toUpperCase();
}

function colourOf(step: number | null | undefined): CSSProperties | undefined {
  return step != null && isValidatedStreamStep(step) ? (streamVars(step) as CSSProperties) : undefined;
}

// Decorative: the stream's name always sits beside it or names its control, so it is hidden from assistive tech.
export function StreamAvatar({ name, step, size = "md" }: StreamAvatarProps) {
  return (
    <span className={s.avatar} data-size={size} aria-hidden="true" style={colourOf(step)}>
      {streamInitials(name)}
    </span>
  );
}
