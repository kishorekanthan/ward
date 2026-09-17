export type CheckboxProps = {
    label: string;
    consequence?: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    locked?: boolean;
    describedBy?: string;
    variant?: "cell";
    sample?: string;
};
export declare function Checkbox(props: CheckboxProps): import("react").JSX.Element;
