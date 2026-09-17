import { ChipRole, StreamStep } from '../tokens';
export type ChipSemantic = ChipRole | "stream";
export type ChipProps = {
    role: ChipSemantic;
    label: string;
    streamStep?: StreamStep;
    size?: "tag";
};
export declare function Chip({ role, label, streamStep, size }: ChipProps): import("react").JSX.Element;
