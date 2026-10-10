import { RefObject } from 'react';
export type MenuAlign = "start" | "end";
export type Edges = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
export type Extent = {
    width: number;
    height: number;
};
export type Placement = {
    top: number;
    left: number;
    maxHeight: number;
};
export declare function placeMenu(anchor: Edges, menu: Extent, view: Extent, align: MenuAlign): Placement;
/** Holds a mounted menu against its trigger, outside every overflow box, flipping at the viewport edges. */
export declare function useAnchoredMenu(anchor: RefObject<HTMLElement | null>, menu: RefObject<HTMLElement | null>, align?: MenuAlign): void;
