import { useEffect } from "react";
import { useRovingTabindex } from "../a11y/useRovingTabindex";
import s from "./Tabs.module.css";

export type Tab = { id: string; label: string; count?: number };
export type TabDef = Tab;

export type TabsProps = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  label?: string;
  level?: 1 | 2;
};

const MAX_TABS = 7;

function selectedIndex(tabs: Tab[], active: string): number {
  const index = tabs.findIndex((tab) => tab.id === active);
  return index < 0 ? 0 : index;
}

function tabClass(level: 1 | 2): string {
  return `${s.strip} ward-tabs${level === 2 ? " ward-tabs--level2" : ""}`;
}

export function Tabs({ tabs, active, onChange, label = "Tabs", level = 1 }: TabsProps) {
  if (tabs.length > MAX_TABS) throw new Error(`Tabs: ${tabs.length} tabs exceeds the cap of ${MAX_TABS} — the set is fixed`);
  const roving = useRovingTabindex({ orientation: "horizontal" });
  const index = selectedIndex(tabs, active);
  useEffect(() => roving.setActive(index), [roving.setActive, index]);
  return (
    <div
      className={tabClass(level)}
      role="tablist"
      aria-label={label}
      data-level={level}
      {...roving.containerProps}
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          type="button"
          role="tab"
          className={`${s.tab} ward-tab`}
          aria-selected={tab.id === active}
          aria-controls={`panel-${tab.id}`}
          onClick={() => onChange(tab.id)}
          {...roving.itemProps(index)}
        >
          {tab.label}
          {tab.count === undefined ? null : <> <span className={s.count}>{`· ${tab.count}`}</span></>}
        </button>
      ))}
    </div>
  );
}
