import { ChipProps } from './Chip';
import { ValidatedStreamStep } from '../tokens';
export type StreamColourPart = "id" | "chip";
export declare function validatedStep(step: number | null | undefined): ValidatedStreamStep | null;
export declare function streamColour(step: number | null | undefined, part: StreamColourPart): string;
export declare function streamChipProps(label: string, step: number | null | undefined): ChipProps;
