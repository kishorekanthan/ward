import { ReactNode, RefObject } from 'react';
/** A button item calls onSelect; an item with href is a link, and onSelect still runs before it opens. current marks the choice in use. */
export type MenuItem = {
    label: string;
    description?: string;
    /** Drawn before the label, such as an avatar; decorative, as the label names the row. */
    icon?: ReactNode;
    /** Drawn at the end of the row, such as a count. */
    trailing?: ReactNode;
    onSelect?: () => void;
    href?: string;
    disabled?: boolean;
    current?: boolean;
};
/** While a find query is typed, a group's rows are filtered (default), kept whole (a footer) or hidden (a recent list). */
export type MenuGroup = {
    heading: string;
    items: MenuItem[];
    whileFinding?: "filter" | "keep" | "hide";
};
export type MenuEntry = MenuItem | MenuGroup | "separator";
/** A find row at the top once the menu has from items or more (default 8); empty is the line shown when nothing matches. */
export type MenuFind = {
    placeholder: string;
    from?: number;
    empty?: string;
};
export type MenuProps = {
    entries: MenuEntry[];
    /** A plain line under the items, such as who is signed in; never focusable. */
    footer?: string;
    align?: "start" | "end";
    find?: MenuFind;
    /** The box whose left and right edges the panel takes; it still opens under the trigger. */
    edges?: RefObject<HTMLElement | null>;
    /** Rows 28px (regular), 36px (large) or 44px (touch) tall. */
    size?: "regular" | "large" | "touch";
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
    /** ghost drops the field ring and chevron, for a trigger that is a row of its host. */
    variant?: "field" | "ghost";
};
export declare function MenuButton(props: MenuButtonProps): import("react").JSX.Element;
export declare function findEntries(entries: MenuEntry[], query: string): MenuEntry[];
export declare function Menu({ entries, footer, align, find, edges, size }: MenuProps): import("react").JSX.Element;
