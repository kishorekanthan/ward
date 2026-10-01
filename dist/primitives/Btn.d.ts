import { ReactNode } from 'react';
export type BtnVariant = "primary" | "secondary" | "ghost" | "overflow";
type Base = {
    variant?: BtnVariant;
    size?: "md" | "sm";
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    children?: ReactNode;
    label?: ReactNode;
    className?: string;
    /** Disclosure state for a button that shows and hides a panel it controls. */
    expanded?: boolean;
    controls?: string;
};
type Available = Base & {
    disabled?: false;
    describedBy?: string;
    disabledReason?: string;
};
type Unavailable = Base & {
    disabled: true;
} & ({
    describedBy: string;
    disabledReason?: string;
} | {
    describedBy?: string;
    disabledReason: string;
});
export type BtnProps = Available | Unavailable;
export declare function Btn(props: BtnProps): import("react").JSX.Element;
export {};
