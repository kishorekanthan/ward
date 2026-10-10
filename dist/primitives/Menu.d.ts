import { ReactNode } from 'react';
/** A button item calls onSelect; an item with href is a link, and onSelect still runs before it opens. */
export type MenuItem = {
    label: string;
    onSelect?: () => void;
    href?: string;
    disabled?: boolean;
};
export type MenuGroup = {
    heading: string;
    items: MenuItem[];
};
export type MenuEntry = MenuItem | MenuGroup | "separator";
export type MenuProps = {
    entries: MenuEntry[];
    /** A plain line under the items, such as who is signed in; never focusable. */
    footer?: string;
    align?: "start" | "end";
};
/** Lets a host strip take the trigger into its own roving focus, as Tabs does with More. */
export type MenuTrigger = {
    role?: "tab";
    "aria-selected"?: boolean;
    tabIndex?: number;
    onFocus?: () => void;
    ref?: (el: HTMLButtonElement | null) => void;
    className?: string;
};
export type MenuButtonProps = {
    label: ReactNode;
    /** The Menu this button opens. */
    children: ReactNode;
    "aria-label"?: string;
    disabled?: boolean;
    defaultOpen?: boolean;
    className?: string;
    trigger?: MenuTrigger;
};
export declare function MenuButton(props: MenuButtonProps): import("react").JSX.Element;
export declare function Menu({ entries, footer, align }: MenuProps): import("react").JSX.Element;
