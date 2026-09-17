export type RadioOption = {
    value: string;
    label: string;
    consequence?: string;
};
export type RadioProps = {
    legend: string;
    options: RadioOption[];
    value: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    name?: string;
    describedBy?: string;
    variant?: "cards";
};
export declare function Radio({ legend, options, value, onChange, disabled, name, describedBy, variant }: RadioProps): import("react").JSX.Element;
