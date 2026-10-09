import { useEffect, useState } from "react";

export const SIDEBAR_COLLAPSED_KEY = "ward:sidebar-collapsed";

const TYPING = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';

// Storage can throw (private mode, a blocked origin): the sidebar then opens expanded and the choice lasts the visit.
function readCollapsed(): boolean {
  try {
    return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
  } catch {
    return false;
  }
}

function writeCollapsed(collapsed: boolean): void {
  try {
    window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
  } catch {
    // Not kept past this page; the toggle still works.
  }
}

function hasModifier(event: KeyboardEvent): boolean {
  return event.ctrlKey || event.metaKey || event.altKey || event.shiftKey;
}

function isTyping(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest(TYPING) !== null;
}

function isShortcut(event: KeyboardEvent): boolean {
  return event.key === "[" && !hasModifier(event) && !isTyping(event.target);
}

// The viewer's choice, kept in one Ward key; `[` flips it while enabled, unless focus is in a field.
export function useSidebarCollapse(enabled: boolean): { collapsed: boolean; toggle: () => void } {
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const toggle = () => {
    writeCollapsed(!collapsed);
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isShortcut(event)) return;
      const panel = event.target instanceof Element ? event.target.closest("[data-ward-shell-side]") : null;
      panel?.querySelector("button")?.focus();
      toggle();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [enabled, collapsed]);
  return { collapsed, toggle };
}
