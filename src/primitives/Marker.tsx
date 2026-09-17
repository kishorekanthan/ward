import type { CSSProperties } from "react";
import type { MarkerKind as TokenMarkerKind, MarkerSize } from "../tokens";
import s from "./Marker.module.css";

export type MarkerKind = TokenMarkerKind | "ok" | "finding" | "action" | "hollow" | "attention" | "tick" | "box";

const KIND_VAR: Record<MarkerKind, string> = {
  stream: "var(--stream)",
  green: "var(--ward-color-green)",
  blue: "var(--ward-color-blue)",
  orange: "var(--ward-color-orange)",
  red: "var(--ward-color-red)",
  amber: "var(--ward-color-amber)",
  neutral: "var(--ward-color-faint)",
  // Fill hues, not ink hues: greenFill is 4.32:1 on white, so a Marker using it stays decorative.
  greenFill: "var(--ward-color-greenFill)",
  orangeFill: "var(--ward-color-orangeFill)",
  ok: "var(--ward-color-green)",
  finding: "var(--ward-color-orange)",
  action: "var(--ward-color-text)",
  hollow: "var(--ward-color-faint)",
  attention: "var(--ward-color-amber)",
  tick: "var(--ward-color-green)",
  box: "var(--ward-color-line2)",
};

export type MarkerProps = {
  size: MarkerSize;
  kind: MarkerKind;
  label?: string;
};

export function Marker({ size, kind, label }: MarkerProps) {
  const style = { "--marker": KIND_VAR[kind], width: size, height: size } as CSSProperties;
  return (
    <span
      className={`${s.marker} ward-marker ward-marker--${kind}`}
      style={style}
      data-testid="marker"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
