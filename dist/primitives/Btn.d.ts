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
};
export type BtnProps = (Base & {
    disabled?: false;
    describedBy?: string;
}) | (Base & {
    disabled: true;
    describedBy: string;
});
export declare function Btn(props: BtnProps): import("react").JSX.Element;
export {};
