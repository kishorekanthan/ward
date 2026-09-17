import { useId } from "react";
import { joinIds } from "../a11y/joinIds";
import s from "./Radio.module.css";

export type RadioOption = { value: string; label: string; consequence?: string };

export type RadioProps = {
  legend: string;
  options: RadioOption[];
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  describedBy?: string;
  // cards: Studio 3b write-policy choices, each option a ruled card.
  variant?: "cards";
};

export function Radio({ legend, options, value, onChange, disabled, name, describedBy, variant }: RadioProps) {
  const generatedName = useId();
  const group = name ?? generatedName;
  return (
    <fieldset className={s.set} data-variant={variant}>
      <legend className={s.legend}>{legend}</legend>
      {options.map((o) => {
        const id = `${group}-${o.value}`;
        const noteId = o.consequence ? `${id}-note` : undefined;
        return (
          <div className={s.row} key={o.value}>
            <span className={s.control}>
              <input
                id={id}
                type="radio"
                name={group}
                className={s.input}
                value={o.value}
                checked={value === o.value}
                disabled={disabled}
                aria-describedby={joinIds(noteId, describedBy)}
                onChange={() => !disabled && onChange?.(o.value)}
              />
              <label htmlFor={id} className={s.label}>
                {o.label}
              </label>
            </span>
            {o.consequence && (
              <p id={noteId} className={`${s.consequence} ward-check-consequence`}>
                {o.consequence}
              </p>
            )}
          </div>
        );
      })}
    </fieldset>
  );
}
