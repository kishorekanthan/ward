import { ReactNode } from 'react';
export type SubjectRailProps = {
    children: ReactNode;
    rail: ReactNode;
    width?: "dryrun" | "preview" | "split";
    railLabel?: string;
    sticky?: boolean;
    ruled?: boolean;
};
export declare function SubjectRail({ children, rail, width, railLabel, sticky, ruled }: SubjectRailProps): import("react").JSX.Element;
