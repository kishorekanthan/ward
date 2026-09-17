export type CostMeterProps = {
    spent: number;
    ceiling: number;
    breakdown?: {
        label: string;
        amount: number;
    }[];
};
export declare function CostMeter({ spent, ceiling, breakdown }: CostMeterProps): import("react").JSX.Element;
