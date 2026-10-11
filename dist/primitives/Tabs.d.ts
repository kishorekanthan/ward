export type Tab = {
    id: string;
    label: string;
    count?: number;
};
export type TabDef = Tab;
export type TabLevel = "page" | "section";
export type TabsProps = {
    tabs: Tab[];
    active: string;
    onChange: (id: string) => void;
    label?: string;
    level: TabLevel;
};
export declare function tabClass(level: TabLevel): string;
export declare function Tabs({ tabs, active, onChange, label, level }: TabsProps): import("react").JSX.Element;
