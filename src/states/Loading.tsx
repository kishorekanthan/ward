import { useEffect, useRef, useState } from "react";
import { elapsed } from "../fmt/elapsed";
import { useTicker } from "../live/useTicker";
import { ms } from "../tokens";
import s from "./states.module.css";

export type LoadingProps = { label: string; startedAt?: string };
export function Loading({ label, startedAt }: LoadingProps) {
  const startedRef = useRef(startedAt ?? new Date().toISOString());
  const [patient, setPatient] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setPatient(true), ms.load);
    return () => window.clearTimeout(timer);
  }, []);
  const waited = useTicker(startedRef.current, patient);
  return (
    <div className={`${s.loading} ward-state`} aria-busy="true" role="status">
      <span className={s.label}>{label}</span>
      {patient ? <span className={s.counter}>{elapsed(waited)}</span> : null}
    </div>
  );
}
