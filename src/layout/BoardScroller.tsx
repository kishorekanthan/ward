import { Children, Fragment, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Field } from "../primitives/Field";
import s from "./layout.module.css";
import { useEdgeFades } from "./useEdgeFades";
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

type ScrollerProps = { label: string; children: ReactNode; laneCount?: number };

// A lane count lets the lanes share the board width before it scrolls.
function Scroller({ label, children, laneCount }: ScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEdgeFades(ref, laneCount ?? Children.count(children));
  const style = laneCount === undefined ? undefined : ({ "--ward-board-lanes": laneCount } as CSSProperties);
  return (
    <div ref={ref} className={s.scroller} role="region" aria-label={label} tabIndex={0} data-ward-board-scroller="" style={style}>
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

// Lanes beyond an edge show as a fade on that edge, not as a count; each lane keeps its own heading.
function WideLanes({ lanes, label }: { lanes: BoardLane[]; label: string }) {
  return (
    <div className={s.board} data-ward-board="">
      <Scroller label={label} laneCount={lanes.length}>
        {lanes.map((lane) => <Fragment key={lane.id}>{lane.content}</Fragment>)}
      </Scroller>
    </div>
  );
}

export function BoardScroller({ children, label = "Workflow board", lanes, laneLabel = "Column" }: BoardScrollerProps) {
  const phone = useMediaQuery(BOARD_PHONE_QUERY);
  if (lanes === undefined) return <Scroller label={label}>{children}</Scroller>;
  if (phone) return <PhoneLanes lanes={lanes} label={label} laneLabel={laneLabel} />;
  return <WideLanes lanes={lanes} label={label} />;
}
