import { useCallback, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function wrappingTarget(e: ReactKeyboardEvent, root: HTMLElement, first: HTMLElement, last: HTMLElement): HTMLElement | undefined {
  if (e.shiftKey) return document.activeElement === first ? last : undefined;
  return document.activeElement === last || !root.contains(document.activeElement) ? first : undefined;
}

function moveFocus(e: ReactKeyboardEvent, root: HTMLElement, items: HTMLElement[]): void {
  const first = items[0];
  const last = items[items.length - 1];
  if (!first || !last) {
    e.preventDefault();
    return;
  }
  const target = wrappingTarget(e, root, first, last);
  if (!target) return;
  e.preventDefault();
  target.focus();
}

export function useFocusTrap(ref: RefObject<HTMLElement | null>) {
  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (e.key !== "Tab" || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      moveFocus(e, ref.current, items);
    },
    [ref],
  );
  return { onKeyDown };
}
