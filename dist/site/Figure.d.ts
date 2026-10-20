import { ReactNode } from 'react';
export type FigureRatio = "16/9" | "4/3" | "3/2" | "2/1" | "1/1";
type Image = {
    src: string;
    alt: string;
    width: number;
    height: number;
    children?: never;
};
type Media = {
    children: ReactNode;
    src?: never;
    alt?: never;
    width?: never;
    height?: never;
};
export type FigureProps = (Image | Media) & {
    ratio?: FigureRatio;
    caption?: ReactNode;
};
export declare function Figure(props: FigureProps): import("react").JSX.Element;
export {};
