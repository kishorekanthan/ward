import { useEffect } from "react";

export function useReturnFocus(
  returnEl: HTMLElement | null | (() => HTMLElement | null),
  active = true,
) {
  useEffect(() => {
    if (!active) return;
    const fallback = document.activeElement as HTMLElement | null;
    return () => {
      const target = typeof returnEl === "function" ? returnEl() : returnEl;
      (target ?? fallback)?.focus?.();
    };
  }, [active, returnEl]);
}
