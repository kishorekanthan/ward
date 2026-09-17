import { ReactNode } from 'react';
export type BoardLane = {
    id: string;
    label: string;
    count: number;
    content: ReactNode;
};
export type BoardScrollerProps = {
    children?: ReactNode;
    label?: string;
    lanes?: BoardLane[];
    laneLabel?: string;
};
export declare function BoardScroller({ children, label, lanes, laneLabel }: BoardScrollerProps): import("react").JSX.Element;
