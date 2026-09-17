export type ResolveKind = "clarify" | "requeue" | "override";
export type ResolvePath = {
    kind: ResolveKind;
    title?: string;
    consequence: string;
    requiredRole: string;
    allowed: boolean;
    askInstead?: string;
};
export declare function ResolveBlock({ paths, onChoose }: {
    paths: ResolvePath[];
    onChoose: (kind: ResolveKind) => void;
}): import("react").JSX.Element;
