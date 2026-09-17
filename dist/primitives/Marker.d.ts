import { MarkerKind as TokenMarkerKind, MarkerSize } from '../tokens';
export type MarkerKind = TokenMarkerKind | "ok" | "finding" | "action" | "hollow" | "attention" | "tick" | "box";
export type MarkerProps = {
    size: MarkerSize;
    kind: MarkerKind;
    label?: string;
};
export declare function Marker({ size, kind, label }: MarkerProps): import("react").JSX.Element;
