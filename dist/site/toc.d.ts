export type TocHeading = {
    id: string;
    text: string;
    level: number;
};
export type TocNode = TocHeading & {
    children: TocNode[];
};
export declare function tocTree(headings: TocHeading[]): TocNode[];
