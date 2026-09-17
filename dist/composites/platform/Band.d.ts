import { ReactNode } from 'react';
export type BandCell = {
    title: string;
    body: ReactNode;
    /** The comp's `.tag` — pass a Chip. Optional so a cell can carry no verdict. */
    tag?: ReactNode;
};
export type BandProps = {
    /** The comp's `.k`, a zero-padded ordinal such as "01". A string, so the padding survives. */
    index: string;
    title: string;
    note: string;
    cells: BandCell[];
};
export declare function Band({ index, title, note, cells }: BandProps): import("react").JSX.Element;
