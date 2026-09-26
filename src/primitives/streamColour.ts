import type { ChipProps } from "./Chip";
import { isValidatedStreamStep, type ValidatedStreamStep } from "../tokens";

export type StreamColourPart = "id" | "chip";

export function validatedStep(step: number | null | undefined): ValidatedStreamStep | null {
  return typeof step === "number" && isValidatedStreamStep(step) ? step : null;
}

// Only validated steps have a measured dark pair; any other stream draws neutral, like 9a's unclaimed segments.
export function streamColour(step: number | null | undefined, part: StreamColourPart): string {
  const valid = validatedStep(step);
  return valid === null ? "var(--ward-color-line2)" : `var(--ward-stream-${valid}-${part})`;
}

export function streamChipProps(label: string, step: number | null | undefined): ChipProps {
  const valid = validatedStep(step);
  return valid === null ? { role: "meta", label } : { role: "stream", label, streamStep: valid };
}
