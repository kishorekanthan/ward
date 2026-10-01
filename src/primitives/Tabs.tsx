import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
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

type Edges = { start: boolean; end: boolean };

function hiddenEdges(strip: HTMLElement): Edges {
  const end = strip.scrollWidth - strip.clientWidth - strip.scrollLeft;
  return { start: strip.scrollLeft > 1, end: end > 1 };
}

// Data attributes, not state, so scrolling never re-renders the strip.
function markEdges(strip: HTMLElement): void {
  const edges = hiddenEdges(strip);
  strip.toggleAttribute("data-fade-start", edges.start);
  strip.toggleAttribute("data-fade-end", edges.end);
}

function useEdgeFades(stripRef: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const mark = () => markEdges(strip);
    strip.addEventListener("scroll", mark, { passive: true });
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(mark);
    ro?.observe(strip);
    mark();
    return () => {
      strip.removeEventListener("scroll", mark);
      ro?.disconnect();
    };
  }, [stripRef]);
}

// The fade width is the strip's scroll-padding, so a revealed tab clears the fade too.
function revealedScrollLeft(strip: HTMLElement, tab: HTMLElement): number | null {
  const inset = Number.parseFloat(getComputedStyle(strip).scrollPaddingInlineStart) || 0;
  const left = tab.getBoundingClientRect().left - strip.getBoundingClientRect().left;
  const right = left + tab.getBoundingClientRect().width;
  if (left < inset) return strip.scrollLeft + left - inset;
  if (right > strip.clientWidth - inset) return strip.scrollLeft + right - strip.clientWidth + inset;
  return null;
}

// Scrolls the strip only, never the page, so a selected tab off the right edge is in view on mount.
function useRevealActive(stripRef: RefObject<HTMLDivElement | null>, index: number): void {
  useLayoutEffect(() => {
    const strip = stripRef.current;
    const tab = strip?.querySelectorAll<HTMLElement>('[role="tab"]')[index];
    if (!strip || !tab) return;
    const next = revealedScrollLeft(strip, tab);
    if (next !== null) strip.scrollLeft = Math.max(0, next);
    markEdges(strip);
  }, [stripRef, index]);
}

export function Tabs({ tabs, active, onChange, label = "Tabs", level = 1 }: TabsProps) {
  if (tabs.length > MAX_TABS) throw new Error(`Tabs: ${tabs.length} tabs exceeds the cap of ${MAX_TABS} — the set is fixed`);
  const roving = useRovingTabindex({ orientation: "horizontal" });
  const index = selectedIndex(tabs, active);
  useEffect(() => roving.setActive(index), [roving.setActive, index]);
  const stripRef = useRef<HTMLDivElement>(null);
  useEdgeFades(stripRef);
  useRevealActive(stripRef, index);
  return (
    <div
      ref={stripRef}
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
