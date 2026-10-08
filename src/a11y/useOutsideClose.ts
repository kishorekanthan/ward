import { useEffect, useRef, type RefObject } from "react";

// A press outside root closes the popup it holds; the latest close is read, so a caller need not memoise it.
export function useOutsideClose(open: boolean, root: RefObject<HTMLElement | null>, close: () => void) {
  const latest = useRef(close);
  latest.current = close;
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) latest.current();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, root]);
}
