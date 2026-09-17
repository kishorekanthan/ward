import { Fragment, useState, type ReactNode } from "react";
import { Field } from "../primitives/Field";
import s from "./layout.module.css";
import { useMediaQuery } from "./useMediaQuery";

export type BoardLane = { id: string; label: string; count: number; content: ReactNode };

export type BoardScrollerProps = {
  children?: ReactNode;
  label?: string;
  lanes?: BoardLane[];
  laneLabel?: string;
};

// Same phone edge as the 767.98px rules in layout.module.css.
const BOARD_PHONE_QUERY = "(max-width: 767.98px)";

function Scroller({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.scroller} role="region" aria-label={label} tabIndex={0} data-ward-board-scroller="">
      {children}
    </div>
  );
}

function PhoneLanes({ lanes, label, laneLabel }: { lanes: BoardLane[]; label: string; laneLabel: string }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const visible = lanes.find((lane) => lane.id === chosen) ?? lanes[0];
  const options = lanes.map((lane) => ({ value: lane.id, label: `${lane.label} · ${lane.count}` }));
  return (
    <div className={s.lanes} data-ward-board-lanes="">
      <Field kind="select" label={laneLabel} value={visible?.id ?? ""} options={options} onChange={setChosen} />
      <Scroller label={label}>{visible?.content}</Scroller>
    </div>
  );
}

export function BoardScroller({ children, label = "Workflow board", lanes, laneLabel = "Column" }: BoardScrollerProps) {
  const phone = useMediaQuery(BOARD_PHONE_QUERY);
  if (lanes === undefined) return <Scroller label={label}>{children}</Scroller>;
  if (phone) return <PhoneLanes lanes={lanes} label={label} laneLabel={laneLabel} />;
  return <Scroller label={label}>{lanes.map((lane) => <Fragment key={lane.id}>{lane.content}</Fragment>)}</Scroller>;
}
