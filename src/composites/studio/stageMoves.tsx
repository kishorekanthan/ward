import { useEffect, useRef, useState, type ReactElement, type RefObject } from "react";

export type Direction = "up" | "down";

export type MoveTarget = { id: string; direction: Direction };

export function moveRow<T>(rows: T[], from: number, to: number): T[] {
  if (to < 0 || to >= rows.length) return rows;
  const next = rows.slice();
  const [row] = next.splice(from, 1);
  next.splice(to, 0, row);
  return next;
}

export function moveTo(index: number, direction: Direction): number {
  return direction === "up" ? index - 1 : index + 1;
}

export function moveAnnouncement(name: string, to: number, total: number): string {
  return `${name} moved to position ${to + 1} of ${total}.`;
}

function moveButton(root: HTMLElement, id: string, direction: Direction): HTMLButtonElement | null {
  return root.querySelector<HTMLButtonElement>(`[data-move="${id}-${direction}"]`);
}

function opposite(direction: Direction): Direction {
  return direction === "up" ? "down" : "up";
}

// The row may now sit at an end, where its button for that direction is gone, so fall back to the other.
function focusMove(root: HTMLElement, target: MoveTarget): void {
  const button = moveButton(root, target.id, target.direction) ?? moveButton(root, target.id, opposite(target.direction));
  button?.focus();
}

// A moved row re-renders in a new slot, so focus follows its id instead of the unmounted button.
export function useMoveFocus<T extends HTMLElement>(): {
  root: RefObject<T | null>;
  announcement: string;
  moved: (target: MoveTarget, announcement: string) => void;
} {
  const root = useRef<T>(null);
  const [target, setTarget] = useState<MoveTarget | null>(null);
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    if (root.current !== null && target !== null) focusMove(root.current, target);
  }, [target]);
  const moved = (next: MoveTarget, text: string) => {
    setTarget(next);
    setAnnouncement(text);
  };
  return { root, announcement, moved };
}

export function MoveAnnouncer({ text }: { text: string }): ReactElement {
  return <p role="status" aria-live="polite" className="ward-visually-hidden">{text}</p>;
}

export function MoveButton({ id, name, direction, onMove }: { id: string; name: string; direction: Direction; onMove: () => void }): ReactElement {
  return (
    <button type="button" className="ward-btn ward-btn--sm ward-btn--ghost" data-move={`${id}-${direction}`} aria-label={`Move ${name} ${direction}`} onClick={onMove}>
      <span aria-hidden="true">{direction === "up" ? "↑" : "↓"}</span>
    </button>
  );
}
