export type InfoTipProps = {
    /** The label the tip explains; the button is named "What <label> counts". */
    label: string;
    text: string;
    /** end keeps the bubble inside a right-hand column, such as a table's last head cell. */
    align?: "center" | "end";
};
/** A small icon button beside a label; its text shows on hover and on focus, and Escape shuts it. */
export declare function InfoTip({ label, text, align }: InfoTipProps): import("react").JSX.Element;
