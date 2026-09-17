export type Segment = {
    value: string;
    label: string;
};
export type SegmentOption = Segment;
export type SegmentedControlProps = {
    options: Segment[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    disabled?: boolean;
    describedBy?: string;
};
export declare function SegmentedControl({ options, value, onChange, label, disabled, describedBy }: SegmentedControlProps): import("react").JSX.Element;
