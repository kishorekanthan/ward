import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import s from "./InfoTip.module.css";

export type InfoTipProps = {
  /** The label the tip explains; the button is named "What <label> counts". */
  label: string;
  text: string;
  /** end keeps the bubble inside a right-hand column, such as a table's last head cell. */
  align?: "center" | "end";
};

// The bubble keeps this far (--ward-space-4) inside the window.
const GUTTER = 16;

/** How far to move a bubble at these edges so it stays inside a window this wide. */
export function edgeShift(left: number, right: number, width: number): number {
  if (left < GUTTER) return GUTTER - left;
  if (right > width - GUTTER) return Math.max(width - GUTTER - right, GUTTER - left);
  return 0;
}

// Measured as it opens, before paint, so the bubble never shows off screen.
function useOnScreen(open: boolean) {
  const bubble = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);
  useLayoutEffect(() => {
    const el = bubble.current;
    if (!open || el === null) {
      setShift(0);
      return;
    }
    const rect = el.getBoundingClientRect();
    setShift((prev) => prev + edgeShift(rect.left, rect.right, window.innerWidth));
  }, [open]);
  return { bubble, style: { "--ward-tip-shift": `${shift}px` } as CSSProperties };
}

/** A small icon button beside a label; its text shows on hover and on focus, and Escape shuts it. */
export function InfoTip({ label, text, align = "center" }: InfoTipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const onScreen = useOnScreen(open);
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !open) return;
    event.stopPropagation();
    setOpen(false);
  };
  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  return (
    <button
      type="button"
      className={`${s.tip} ward-infotip`}
      aria-label={`What ${label} counts`}
      aria-describedby={id}
      data-open={open ? "" : undefined}
      data-align={align}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={onKeyDown}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </svg>
      <span className={s.bubble} role="tooltip" id={id} ref={onScreen.bubble} style={onScreen.style}>
        {text}
      </span>
    </button>
  );
}
