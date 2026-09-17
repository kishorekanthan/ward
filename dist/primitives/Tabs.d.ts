export type Tab = {
    id: string;
    label: string;
    count?: number;
};
export type TabDef = Tab;
export type TabsProps = {
    tabs: Tab[];
    active: string;
    onChange: (id: string) => void;
    label?: string;
    level?: 1 | 2;
};
export declare function Tabs({ tabs, active, onChange, label, level }: TabsProps): import("react").JSX.Element;
