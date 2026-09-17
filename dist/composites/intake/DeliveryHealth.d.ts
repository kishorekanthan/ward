export type DeliveryRow = {
    label: string;
    n: number;
    failed?: boolean;
    cause?: string;
};
export interface DeliveryHealthProps {
    rows: DeliveryRow[];
    /** Allows consumers with an established numeric-text contract to opt out of count formatting. */
    formatNumber?: (value: number) => string;
}
export declare function DeliveryHealth({ rows, formatNumber }: DeliveryHealthProps): import("react").JSX.Element;
