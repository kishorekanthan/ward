import { ReactNode } from 'react';
export declare function Tree({ label, children }: {
    label: string;
    children: ReactNode;
}): import("react").JSX.Element;
export type TreeRowProps = {
    index: number;
    depth: 0 | 1 | 2;
    label: ReactNode;
    detail?: ReactNode;
    expanded?: boolean;
    leaf?: boolean;
    unresolved?: boolean;
    inherited?: boolean;
    onToggle?: () => void;
    onSelect?: () => void;
    children?: ReactNode;
};
export declare function TreeRow(props: TreeRowProps): import("react").JSX.Element;
