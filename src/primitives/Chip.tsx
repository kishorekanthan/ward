import type { CSSProperties } from "react";
import { isValidatedStreamStep, stream, v, type ChipRole, type StreamStep } from "../tokens";
import s from "./Chip.module.css";

// The scale a page picks a status tone from; every tone is the same filled shape.
export type ChipTone = "neutral" | "info" | "success" | "warning" | "danger";

export type ChipSemantic = ChipRole | ChipTone | "stream";

const LOOKUP: Record<ChipRole | ChipTone, { bg: string; fg: string; line: string }> = {
  gate: v.chip.gate,
  system: v.chip.system,
  write: v.chip.write,
  drift: v.chip.drift,
  done: v.chip.done,
  attention: v.chip.attention,
  failed: v.chip.failed,
  pending: v.chip.pending,
  running: v.chip.running,
  warn: v.chip.warn,
  meta: v.chip.meta,
  soft: v.chip.soft,
  quiet: v.chip.quiet,
  owed: v.chip.owed,
  neutral: v.chip.quiet,
  info: v.chip.running,
  success: v.chip.done,
  warning: v.chip.attention,
  danger: v.chip.failed,
};

export type ChipProps = {
  role: ChipSemantic;
  label: string;
  streamStep?: StreamStep;
  size?: "tag";
};

function styleFor(role: ChipSemantic, step?: StreamStep): CSSProperties {
  if (role === "stream") return streamStyle(step);
  if (step) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const c = LOOKUP[role];
  return { "--ward-chip-bg": c.bg, "--ward-chip-fg": c.fg, "--ward-chip-line": c.line } as CSSProperties;
}

function streamStyle(step?: StreamStep): CSSProperties {
  if (!step || !isValidatedStreamStep(step))
    throw new Error(`Chip: stream step ${String(step)} is not validated — add its measured dark pair to tokens.json first`);
  const c = stream(step);
  return { "--ward-chip-bg": c.chip, "--ward-chip-fg": c.chipText, "--ward-chip-line": c.chip } as CSSProperties;
}

export function Chip({ role, label, streamStep, size }: ChipProps) {
  if (!label) throw new Error("Chip: label is required");
  return (
    <span className={`${s.chip} ward-chip ward-chip--${role}`} style={styleFor(role, streamStep)} data-ward-chip={role} data-size={size}>
      {label}
    </span>
  );
}
