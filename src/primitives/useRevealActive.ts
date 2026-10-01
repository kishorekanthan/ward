import { useLayoutEffect, type RefObject } from "react";
import { markEdges } from "../layout/useEdgeFades";

// The fade width is the strip's scroll-padding, so a revealed tab clears the fade too.
function revealedScrollLeft(strip: HTMLElement, tab: HTMLElement): number | null {
  const inset = Number.parseFloat(getComputedStyle(strip).scrollPaddingInlineStart) || 0;
  const left = tab.getBoundingClientRect().left - strip.getBoundingClientRect().left;
  const right = left + tab.getBoundingClientRect().width;
  if (left < inset) return strip.scrollLeft + left - inset;
  if (right > strip.clientWidth - inset) return strip.scrollLeft + right - strip.clientWidth + inset;
  return null;
}

// Scrolls the strip only, never the page, so an active tab off the right edge is in view on mount.
export function useRevealActive(stripRef: RefObject<HTMLElement | null>, index: number, tabSelector: string): void {
  useLayoutEffect(() => {
    const strip = stripRef.current;
    const tab = strip?.querySelectorAll<HTMLElement>(tabSelector)[index];
    if (!strip || !tab) return;
    const next = revealedScrollLeft(strip, tab);
    if (next !== null) strip.scrollLeft = Math.max(0, next);
    markEdges(strip);
  }, [stripRef, index, tabSelector]);
}
