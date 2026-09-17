export type Criterion = {
    met: boolean;
    text: string;
    evidence?: string;
    why?: string;
};
export declare function CriteriaList({ criteria }: {
    criteria: Criterion[];
}): import("react").JSX.Element;
