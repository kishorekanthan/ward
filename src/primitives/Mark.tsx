import s from "./Mark.module.css";

// met/unmet are the comp's `.ok`/`.no`; failed is unsourced, because "checked and failed" differs from "not yet met".
export type MarkState = "met" | "unmet" | "failed";

const GLYPH: Record<MarkState, string> = { met: "✓", unmet: "", failed: "✕" };

export type MarkProps = {
  state: MarkState;
  // Omit when an ancestor already announces the state, or it is said twice.
  label?: string;
};

export function Mark({ state, label }: MarkProps) {
  return (
    <span
      className={s.mark}
      data-state={state}
      data-testid="mark"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {GLYPH[state]}
    </span>
  );
}
