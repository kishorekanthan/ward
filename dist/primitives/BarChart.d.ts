export type BarSeries = {
    name: string;
    values: (number | null)[];
};
export type BarChartProps = {
    title: string;
    categories: string[];
    series: BarSeries[];
    format?: (value: number) => string;
    categoryHead?: string;
    empty?: string;
};
export declare function BarChart({ title, categories, series, format, categoryHead, empty }: BarChartProps): import("react").JSX.Element;
