export type PeriodPreset = "7d" | "4w" | "8w" | "q";
/** A preset window, or a custom range of two days as YYYY-MM-DD, both ends included. */
export type Period = {
    preset: PeriodPreset;
} | {
    from: string;
    to: string;
};
export type PeriodPickerProps = {
    value: Period;
    onChange: (period: Period) => void;
    /** The latest day a range may end on, as YYYY-MM-DD. */
    today: string;
};
/** The Period dropdown; Custom range adds From and To, and only a range in order is sent. */
export declare function PeriodPicker({ value, onChange, today }: PeriodPickerProps): import("react").JSX.Element;
