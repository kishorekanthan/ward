export type MarkState = "met" | "unmet" | "failed";
export type MarkProps = {
    state: MarkState;
    label?: string;
};
export declare function Mark({ state, label }: MarkProps): import("react").JSX.Element;
