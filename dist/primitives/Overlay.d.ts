import { ReactNode } from 'react';
export type OverlayKind = "drawer" | "sheet" | "modal";
export declare const OverlayContainerContext: import('react').Context<HTMLElement | null>;
export type OverlayProps = {
    kind: OverlayKind;
    labelledBy?: string;
    label?: string;
    title?: string;
    onClose: () => void;
    closeLabel?: string;
    returnFocusTo?: HTMLElement | null;
    wide?: boolean;
    flush?: boolean;
    container?: HTMLElement | null;
    children: ReactNode;
};
export declare function Overlay(props: OverlayProps): import('react').ReactPortal;
