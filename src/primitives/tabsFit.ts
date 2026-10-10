import { useLayoutEffect, useState, type RefObject } from "react";

export type Fit = { room: number; widths: number[]; more: number; gap: number };

const span = (widths: number[], gap: number) => widths.reduce((sum, width) => sum + width + gap, -gap);

/** The tabs a strip shows: all when they fit, else a leading run plus the selected tab, with room left for More. */
export function shownTabs({ room, widths, more, gap }: Fit, selected: number): number[] {
  const all = widths.map((_, i) => i);
  if (span(widths, gap) <= room) return all;
  const shown = new Set([selected]);
  let used = widths[selected] + gap + more;
  for (const i of all) {
    if (i === selected) continue;
    used += widths[i] + gap;
    if (used > room) break;
    shown.add(i);
  }
  return all.filter((i) => shown.has(i));
}

const px = (value: string) => Number.parseFloat(value) || 0;
const width = (el: Element) => el.getBoundingClientRect().width;

function readFit(strip: HTMLElement): Fit {
  const style = getComputedStyle(strip);
  const probe = strip.querySelector(":scope > [data-more-probe]");
  return {
    room: strip.clientWidth - px(style.paddingInlineStart) - px(style.paddingInlineEnd),
    widths: Array.from(strip.querySelectorAll(':scope > [role="tab"]'), width),
    more: probe ? width(probe) : 0,
    gap: px(style.columnGap),
  };
}

// The strip and every tab are watched, so a web font that swaps in re-measures the labels.
function watch(strip: HTMLElement, read: () => void): (() => void) | undefined {
  if (typeof ResizeObserver === "undefined") return undefined;
  const observer = new ResizeObserver(read);
  [strip, ...strip.children].forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

const sameFit = (a: Fit | null, b: Fit) => JSON.stringify(a) === JSON.stringify(b);

/** Measures the strip and its tabs; `labels` changes when a tab or its count does. */
export function useShownTabs(strip: RefObject<HTMLElement | null>, selected: number, labels: string): number[] | null {
  const [fit, setFit] = useState<Fit | null>(null);
  useLayoutEffect(() => {
    const el = strip.current;
    if (!el) return undefined;
    const read = () => {
      const next = readFit(el);
      setFit((was) => (sameFit(was, next) ? was : next));
    };
    read();
    return watch(el, read);
  }, [strip, labels]);
  return fit && shownTabs(fit, selected);
}
