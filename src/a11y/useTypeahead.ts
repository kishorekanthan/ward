import { useEffect, useRef } from "react";

const RESET_MS = 500;

type Keyed = { key: string; ctrlKey: boolean; metaKey: boolean; altKey: boolean };

export function printable(event: Keyed): boolean {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
}

// Keys typed within half a second build one lower-case search string; a pause starts a new one.
export function useTypeahead(): (key: string) => string {
  const buffer = useRef("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (key: string) => {
    clearTimeout(timer.current);
    buffer.current += key.toLowerCase();
    timer.current = setTimeout(() => {
      buffer.current = "";
    }, RESET_MS);
    return buffer.current;
  };
}
