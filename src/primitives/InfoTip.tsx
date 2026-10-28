import { useId, useState, type KeyboardEvent } from "react";
import s from "./InfoTip.module.css";

export type InfoTipProps = {
  /** The label the tip explains; the button is named "What <label> counts". */
  label: string;
  text: string;
  /** end keeps the bubble inside a right-hand column, such as a table's last head cell. */
  align?: "center" | "end";
};

/** A small icon button beside a label; its text shows on hover and on focus, and Escape shuts it. */
export function InfoTip({ label, text, align = "center" }: InfoTipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
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
      <span className={s.bubble} role="tooltip" id={id}>
        {text}
      </span>
    </button>
  );
}
