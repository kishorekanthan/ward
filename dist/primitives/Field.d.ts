export type FieldVariant = "form" | "inline" | "tag" | "tagGate" | "reply" | "toolbar";
export type FieldOption = {
    value: string;
    label: string;
};
export type FieldProps = {
    kind?: "input" | "select" | "textarea" | "date";
    label: string;
    value: string;
    onChange?: (value: string) => void;
    options?: FieldOption[];
    invalid?: string;
    mono?: boolean;
    disabled?: boolean;
    rows?: number;
    describedBy?: string;
    labelHidden?: boolean;
    variant?: FieldVariant;
    placeholder?: string;
    secret?: boolean;
    /** Earliest and latest day a date field takes, as YYYY-MM-DD. */
    min?: string;
    max?: string;
};
export declare function Field(props: FieldProps): import("react").JSX.Element;
