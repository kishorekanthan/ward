export type SelectOption = {
    value: string;
    label: string;
};
export type SelectProps = {
    options: SelectOption[];
    value: string;
    onChange?: (value: string) => void;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: "true";
    id?: string;
    name?: string;
    disabled?: boolean;
    placeholder?: string;
    defaultOpen?: boolean;
    className?: string;
    triggerClassName?: string;
    size?: "md" | "sm";
};
export declare function Select(given: SelectProps): import("react").JSX.Element;
