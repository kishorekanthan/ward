export type CheckboxProps = {
    label: string;
    consequence?: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    locked?: boolean;
    describedBy?: string;
    /** Why a disabled or locked box cannot change; a scope's reason replaces it. */
    disabledReason?: string;
    variant?: "cell";
    sample?: string;
    labelHidden?: boolean;
};
export declare function Checkbox(props: CheckboxProps): import("react").JSX.Element;
