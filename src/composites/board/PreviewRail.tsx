import type { ReactNode } from "react";
import { BoardColumn, ordered } from "./BoardColumn";
import { WorkCard } from "./WorkCard";
import { GateChecklist, type GateItem } from "../studio/GateChecklist";
import type { BoardColumnConfig, BoardConfig, BoardItem } from "./types";
import type { WorkCardFeed } from "./WorkCard";
import s from "./PreviewRail.module.css";

// cards: the board's own columns; skeleton: Studio 4a's outline columns, one bar per sample item.
export type PreviewStrip = "cards" | "skeleton";

export type PreviewRailProps = {
  draft: BoardConfig;
  sample: BoardItem[];
  effects: GateItem[];
  onOpen?: (key: string) => void;
  feed?: WorkCardFeed | null;
  strip?: PreviewStrip;
  columnsNote?: string;
};

// Cards also hand back their hit button; the preview's contract stays key-only.
function keyOnly(onOpen?: (key: string) => void): (key: string) => void {
  return (key) => onOpen?.(key);
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={s.section} aria-label={title}>
      <h3 className={s.k}>{title}</h3>
      {children}
    </section>
  );
}

function SkeletonColumn({ column, count }: { column: BoardColumnConfig; count: number }) {
  return (
    <div className={s.skeleton} data-kind={column.gate ? "gate" : undefined}>
      <span className={s.skeletonLabel}>{column.label}</span>
      <span className="ward-visually-hidden">{`${count} ${count === 1 ? "item" : "items"}`}</span>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className={s.bar} aria-hidden="true" />
      ))}
    </div>
  );
}

function CardStrip({ draft, sample, open, feed }: { draft: BoardConfig; sample: BoardItem[]; open: (key: string) => void; feed?: WorkCardFeed | null }) {
  return draft.columns.map((column) => (
    <BoardColumn key={column.id} column={column} items={sample.filter((i) => i.stage === column.id)} fields={draft.fields} sort={draft.sort} onOpen={open} feed={feed} />
  ));
}

function Strip(props: PreviewRailProps & { open: (key: string) => void }) {
  if (props.strip !== "skeleton") return <CardStrip draft={props.draft} sample={props.sample} open={props.open} feed={props.feed} />;
  return props.draft.columns.map((column) => (
    <SkeletonColumn key={column.id} column={column} count={props.sample.filter((i) => i.stage === column.id).length} />
  ));
}

export function PreviewRail(props: PreviewRailProps) {
  const open = keyOnly(props.onOpen);
  // The card that would head a column under the chosen sort.
  const first = ordered(props.sample, props.draft.sort)[0];
  return (
    <aside className={s.rail} aria-label="Preview">
      <h2 className={`${s.k} ${s.head}`}>Live preview</h2>
      <Section title="Card">
        <div className={s.card}>{first && <WorkCard item={first} fields={props.draft.fields} onOpen={open} feed={props.feed} />}</div>
      </Section>
      <Section title={`Columns · ${props.draft.columns.length} shown`}>
        {/* .strip scrolls on overflow, so it needs a named tab stop. */}
        <div className={s.strip} role="group" aria-label="Column preview" tabIndex={0} data-strip={props.strip ?? "cards"}>
          <Strip {...props} open={open} />
        </div>
        {props.columnsNote === undefined ? null : <p className={s.note}>{props.columnsNote}</p>}
      </Section>
      <Section title="Effect of this config">
        <GateChecklist items={props.effects} density="compact" />
      </Section>
    </aside>
  );
}
