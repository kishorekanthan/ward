export type StatCell = {
    value: string;
    label: string;
    accent?: "blue" | "amber";
    href?: string;
    hint?: string;
};
export declare function StatStrip({ cells, divided }: {
    cells: StatCell[];
    divided?: boolean;
}): import("react").JSX.Element;
