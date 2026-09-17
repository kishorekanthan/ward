import s from "./OverCapNote.module.css";

export function OverCapNote({ label, count, cap }: { label: string; count: number; cap: number }) {
  return (
    <p className={s.note} role="status">
      {label} is over cap now — {count} items against {cap}
    </p>
  );
}

