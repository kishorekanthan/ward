export type GateItem = {
    met: boolean;
    text: string;
};
export type GateChecklistProps = {
    items: GateItem[];
    note?: string;
    density?: "compact" | "rail";
};
export declare function GateChecklist({ items, note, density }: GateChecklistProps): import("react").JSX.Element;
