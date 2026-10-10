import { RefObject } from 'react';
export type Fit = {
    room: number;
    widths: number[];
    more: number;
    gap: number;
};
/** The tabs a strip shows: all when they fit, else a leading run plus the selected tab, with room left for More. */
export declare function shownTabs({ room, widths, more, gap }: Fit, selected: number): number[];
/** Measures the strip and its tabs; `labels` changes when a tab or its count does. */
export declare function useShownTabs(strip: RefObject<HTMLElement | null>, selected: number, labels: string): number[] | null;
