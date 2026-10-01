import { useEffect, type RefObject } from "react";

type Edges = { start: boolean; end: boolean };

function hiddenEdges(scroller: HTMLElement): Edges {
  const end = scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft;
  return { start: scroller.scrollLeft > 1, end: end > 1 };
}

// Data attributes, not state, so scrolling never re-renders the scroller.
export function markEdges(scroller: HTMLElement): void {
  const edges = hiddenEdges(scroller);
  scroller.toggleAttribute("data-fade-start", edges.start);
  scroller.toggleAttribute("data-fade-end", edges.end);
}

export function useEdgeFades(scrollerRef: RefObject<HTMLElement | null>, count: number): void {
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const mark = () => markEdges(scroller);
    scroller.addEventListener("scroll", mark, { passive: true });
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(mark);
    // The children too: a web font swapping in changes scrollWidth without resizing the scroller.
    for (const el of [scroller, ...scroller.children]) ro?.observe(el);
    mark();
    return () => {
      scroller.removeEventListener("scroll", mark);
      ro?.disconnect();
    };
  }, [scrollerRef, count]);
}
