export type DiagramNode = {
    id: string;
    label: string;
    col: number;
    row: number;
};
export type DiagramEdge = {
    from: string;
    to: string;
};
export type Box = {
    x: number;
    y: number;
    w: number;
    h: number;
};
export type Segment = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export declare const CELL: {
    w: number;
    h: number;
};
export declare const NODE: {
    w: number;
    h: number;
};
export declare const PAD = 16;
export declare function nodeBox(node: DiagramNode): Box;
export declare function canvasSize(nodes: DiagramNode[]): {
    w: number;
    h: number;
};
export declare function edgeSegment(a: Box, b: Box): Segment;
