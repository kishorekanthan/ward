import { useEffect, type RefObject } from "react";
import type { TabLevel } from "./Tabs";

// A strip is the page strip of its themed root when no page strip comes before it there.
function isFirstPageStrip(el: HTMLElement): boolean {
  const root = el.parentElement?.closest("[data-theme]") ?? document;
  return root.querySelector('[data-level="page"]') === el;
}

// Two page strips read as two current places: every page strip after the first in its themed root names the fix.
export function usePageStrip(strip: RefObject<HTMLElement | null>, level: TabLevel): void {
  useEffect(() => {
    const el = strip.current;
    if (level === "page" && el && !isFirstPageStrip(el)) console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [strip, level]);
}
