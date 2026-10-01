import { RefObject } from 'react';
type Edges = {
    start: boolean;
    end: boolean;
};
export declare function markEdges(scroller: HTMLElement): Edges;
export declare function useEdgeFades(scrollerRef: RefObject<HTMLElement | null>, count: number, onOverflow?: (overflows: boolean) => void): void;
export {};
