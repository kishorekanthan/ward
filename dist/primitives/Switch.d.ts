export type SwitchProps = {
    label: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    locked?: boolean;
    describedBy?: string;
    labelHidden?: boolean;
    /** Why a disabled or locked switch cannot change; a scope's reason replaces it. */
    disabledReason?: string;
};
export declare function Switch({ label, checked, onChange, disabled, locked, describedBy, labelHidden, disabledReason }: SwitchProps): import("react").JSX.Element;
