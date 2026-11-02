import { useRef, useState } from "react";
import { Btn } from "./Btn";
import s from "./CopyValue.module.css";

export type CopyValueProps = {
  label: string;
  value: string;
};

// A value the user pastes into another system; a refused clipboard selects it so they can copy it by hand.
export function CopyValue({ label, value }: CopyValueProps) {
  const [note, setNote] = useState("");
  const text = useRef<HTMLElement>(null);
  const selectValue = () => {
    const range = document.createRange();
    if (text.current) range.selectNodeContents(text.current);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    setNote("Select it to copy it.");
  };
  const copy = () => {
    const clip = navigator.clipboard;
    if (!clip) return selectValue();
    clip.writeText(value).then(() => setNote("Copied."), selectValue);
  };
  return (
    <div className={`${s.root} ward-copyvalue`} role="group" aria-label={label}>
      <span className={s.label}>{label}</span>
      <code ref={text} className={s.value}>{value}</code>
      <Btn variant="secondary" size="sm" label="Copy" onClick={copy} />
      <span role="status" className={s.note}>{note}</span>
    </div>
  );
}
