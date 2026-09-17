import { useCallback, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

export type RovingOrientation = "both" | "vertical" | "horizontal";

const VERTICAL: Record<string, number> = { ArrowUp: -1, ArrowDown: 1 };
const HORIZONTAL: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function deltaFor(key: string, orientation: RovingOrientation): number | undefined {
  if (orientation !== "horizontal" && key in VERTICAL) return VERTICAL[key];
  if (orientation !== "vertical" && key in HORIZONTAL) return HORIZONTAL[key];
  return undefined;
}

export function useRovingTabindex({ orientation = "both" }: { orientation?: RovingOrientation } = {}) {
  const [active, setActive] = useState(0);
  const els = useRef(new Map<number, HTMLElement>());
  const removedActive = useRef(false);

  useLayoutEffect(() => {
    const keys = Array.from(els.current.keys());
    if (keys.length === 0 || keys.includes(active)) return;
    const next = keys[0];
    const restoreFocus = removedActive.current;
    removedActive.current = false;
    setActive(next);
    if (restoreFocus) els.current.get(next)?.focus();
  });

  const setActiveIndex = useCallback((index: number) => setActive(index), []);

  const move = useCallback((index: number) => {
    setActive(index);
    els.current.get(index)?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      const keys = Array.from(els.current.keys());
      if (keys.length === 0) return;
      const current = Math.max(0, keys.indexOf(active));
      const delta = deltaFor(e.key, orientation);
      if (delta !== undefined) {
        e.preventDefault();
        move(keys[clamp(current + delta, 0, keys.length - 1)]);
      } else if (e.key === "Home") {
        e.preventDefault();
        move(keys[0]);
      } else if (e.key === "End") {
        e.preventDefault();
        move(keys[keys.length - 1]);
      }
    },
    [active, move, orientation],
  );

  const itemProps = useCallback(
    (i: number) => ({
      tabIndex: (i === active ? 0 : -1) as 0 | -1,
      ref: (el: HTMLElement | null) => {
        if (el) els.current.set(i, el);
        else {
          els.current.delete(i);
          if (i === active) removedActive.current = true;
        }
      },
      onFocus: () => setActive(i),
      "data-ward-roving": true as const,
    }),
    [active],
  );

  return { containerProps: { onKeyDown }, itemProps, setActive: setActiveIndex };
}
