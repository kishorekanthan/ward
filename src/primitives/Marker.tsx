import type { CSSProperties } from "react";
import type { MarkerKind as TokenMarkerKind, MarkerSize } from "../tokens";
import s from "./Marker.module.css";

export type MarkerKind = TokenMarkerKind | "ok" | "finding" | "action" | "hollow" | "attention" | "tick" | "box";

// Hue kinds keep their names for consumers and draw the role each hue stood for.
const KIND_VAR: Record<MarkerKind, string> = {
  stream: "var(--stream)",
  green: "var(--ward-color-done)",
  blue: "var(--ward-color-running)",
  orange: "var(--ward-color-waiting)",
  red: "var(--ward-color-danger)",
  amber: "var(--ward-color-waiting)",
  neutral: "var(--ward-color-faint)",
  greenFill: "var(--ward-color-done)",
  orangeFill: "var(--ward-color-waiting)",
  owed: "var(--ward-color-peach)",
  running: "var(--ward-color-running)",
  ok: "var(--ward-color-done)",
  finding: "var(--ward-color-waiting)",
  action: "var(--ward-color-text)",
  hollow: "var(--ward-color-faint)",
  attention: "var(--ward-color-waiting)",
  tick: "var(--ward-color-done)",
  box: "var(--ward-color-line2)",
};

// Only running work moves (TRELLIS-422); the animation and its reduced-motion stop live in ward.css.
const MOTION: Partial<Record<MarkerKind, string>> = { running: " ward-running" };

export type MarkerProps = {
  size: MarkerSize;
  kind: MarkerKind;
  label?: string;
};

export function Marker({ size, kind, label }: MarkerProps) {
  const style = { "--marker": KIND_VAR[kind], width: size, height: size } as CSSProperties;
  return (
    <span
      className={`${s.marker} ward-marker ward-marker--${kind}${MOTION[kind] ?? ""}`}
      style={style}
      data-testid="marker"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
