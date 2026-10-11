import { useEffect, useRef, type RefObject } from "react";
import { useRovingTabindex } from "../a11y/useRovingTabindex";
import { Menu, MenuButton, type MenuTrigger } from "./Menu";
import menuCss from "./Menu.module.css";
import { useShownTabs } from "./tabsFit";
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

const MORE = "More";

function selectedIndex(tabs: Tab[], active: string): number {
  const index = tabs.findIndex((tab) => tab.id === active);
  return index < 0 ? 0 : index;
}

const labelOf = (tab: Tab) => (tab.count === undefined ? tab.label : `${tab.label} · ${tab.count}`);

export function tabClass(level: 1 | 2): string {
  return `${s.strip} ward-tabs${level === 2 ? " ward-tabs--level2" : ""}`;
}

type Roving = ReturnType<typeof useRovingTabindex>;

// A tab waiting in More stays mounted, unseen, so the strip can measure it.
const WAITING = { tabIndex: -1, "aria-hidden": true, "data-overflow": "" } as const;

function TabButton({ tab, active, place, onChange }: { tab: Tab; active: string; place: object; onChange: (id: string) => void }) {
  return (
    <button
      id={`tab-${tab.id}`}
      type="button"
      role="tab"
      className={`${s.tab} ward-tab`}
      aria-selected={tab.id === active}
      aria-controls={`panel-${tab.id}`}
      onClick={() => onChange(tab.id)}
      {...place}
    >
      {tab.label}
      {tab.count === undefined ? null : <> <span className={s.count}>{`· ${tab.count}`}</span></>}
    </button>
  );
}

// Picking from More selects the tab, then moves focus onto it once it is back in the strip.
function picker(strip: RefObject<HTMLElement | null>, onChange: (id: string) => void) {
  return (id: string) => {
    onChange(id);
    requestAnimationFrame(() => {
      const tab = Array.from(strip.current?.children ?? []).find((el) => el.id === `tab-${id}`);
      if (tab instanceof HTMLElement) tab.focus();
    });
  };
}

function MoreTabs({ tabs, trigger, onPick }: { tabs: Tab[]; trigger: MenuTrigger; onPick: (id: string) => void }) {
  return (
    <MenuButton label={MORE} className={s.moreRoot} trigger={{ ...trigger, role: "tab", "aria-selected": false, className: s.more }}>
      <Menu align="end" entries={tabs.map((tab) => ({ label: labelOf(tab), onSelect: () => onPick(tab.id) }))} />
    </MenuButton>
  );
}

function placeOf(roving: Roving, shown: number[] | null, index: number): object {
  return !shown || shown.includes(index) ? roving.itemProps(index) : WAITING;
}

export function Tabs({ tabs, active, onChange, label = "Tabs", level = 1 }: TabsProps) {
  const roving = useRovingTabindex({ orientation: "horizontal" });
  const index = selectedIndex(tabs, active);
  useEffect(() => roving.setActive(index), [roving.setActive, index]);
  const stripRef = useRef<HTMLDivElement>(null);
  const shown = useShownTabs(stripRef, index, tabs.map(labelOf).join("\n"));
  const waiting = shown ? tabs.filter((_, i) => !shown.includes(i)) : [];
  return (
    <div ref={stripRef} className={`${tabClass(level)} ${s.fits}`} role="tablist" aria-label={label} data-level={level} {...roving.containerProps}>
      {tabs.map((tab, i) => (
        <TabButton key={tab.id} tab={tab} active={active} place={placeOf(roving, shown, i)} onChange={onChange} />
      ))}
      <span aria-hidden="true" data-more-probe="" className={`${menuCss.trigger} ${s.more} ${s.probe}`}>
        {MORE}
      </span>
      {waiting.length > 0 && <MoreTabs tabs={waiting} trigger={roving.itemProps(tabs.length)} onPick={picker(stripRef, onChange)} />}
    </div>
  );
}
