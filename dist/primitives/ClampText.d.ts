export type ClampTextProps = {
    text: string;
    as?: "span" | "p" | "h1" | "h2" | "h3";
    className?: string;
};
export declare function ClampText({ text, as: Tag, className }: ClampTextProps): import("react").JSX.Element;
