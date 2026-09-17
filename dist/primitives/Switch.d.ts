export type SwitchProps = {
    label: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    locked?: boolean;
    describedBy?: string;
    labelHidden?: boolean;
};
export declare function Switch({ label, checked, onChange, disabled, locked, describedBy, labelHidden }: SwitchProps): import("react").JSX.Element;
