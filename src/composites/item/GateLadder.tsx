import { Chip } from "../../primitives/Chip";
import type { ChipRole } from "../../tokens";
import s from "./GateLadder.module.css";

export type Rung = {
  name: string;
  state: "passed" | "waiting" | "pending";
  actor?: string;
};

const CHIP: Record<Rung["state"], { role: ChipRole; label: string }> = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" },
};

function RungItem({ rung }: { rung: Rung }) {
  if (rung.state === "waiting" && !rung.actor)
    throw new Error(`GateLadder: the waiting rung "${rung.name}" names no actor — a wait always names who it waits on`);
  const chip = CHIP[rung.state];
  return (
    <li className={s.rung} data-state={rung.state}>
      <span className={s.name}>{rung.name}</span>
      <Chip role={chip.role} label={chip.label} />
      <span className={`${s.actor} ward-cellmeta`}>{rung.actor ?? "—"}</span>
    </li>
  );
}

export function GateLadder({ rungs }: { rungs: Rung[] }) {
  return (
    <ol className={`${s.list} ward-gateladder`}>
      {rungs.map((r) => (
        <RungItem rung={r} key={r.name} />
      ))}
    </ol>
  );
}
