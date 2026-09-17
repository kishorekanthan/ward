export type TypedLineKind = "field" | "warn" | "ok" | "dim";
/** `tool` remains accepted for consumers of the pre-canonical Ward shape. */
export type TypedLine = {
    kind: TypedLineKind | "tool";
    text: string;
};
export interface TypedInputBlockProps {
    lines: TypedLine[];
    label?: string;
}
export declare function TypedInputBlock({ lines, label }: TypedInputBlockProps): import("react").JSX.Element;
