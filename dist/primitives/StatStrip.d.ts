export type StatCell = {
    value: string;
    label: string;
    accent?: "blue" | "amber";
};
export declare function StatStrip({ cells, divided }: {
    cells: StatCell[];
    divided?: boolean;
}): import("react").JSX.Element;
