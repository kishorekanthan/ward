export type FieldVariant = "form" | "inline" | "tag" | "tagGate" | "reply";
export type FieldOption = {
    value: string;
    label: string;
};
export type FieldProps = {
    kind?: "input" | "select" | "textarea";
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
};
export declare function Field(props: FieldProps): import("react").JSX.Element;
