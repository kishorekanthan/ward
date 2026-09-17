import { useId, type KeyboardEventHandler } from "react";
import { Chip } from "../../primitives/Chip";
import { OverCapNote } from "./OverCapNote";
import { WorkCard, type WorkCardFeed } from "./WorkCard";
import type { BoardColumnConfig, BoardField, BoardItem } from "./types";
import s from "./BoardColumn.module.css";

export type BoardColumnProps = {
  column: BoardColumnConfig;
  items: BoardItem[];
  fields?: BoardField[];
  sort: "oldest" | "newest";
  onOpen: (key: string, source: HTMLElement) => void;
  selectedKey?: string;
  feed?: WorkCardFeed | null;
  roving?: { base: number; itemProps: (i: number) => Record<string, unknown> };
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
};

export function ordered(items: BoardItem[], sort: "oldest" | "newest") {
  return [...items].sort((a, b) => (sort === "oldest" ? b.timeInStage - a.timeInStage : a.timeInStage - b.timeInStage));
}

function ColumnHead({ column, count, id }: { column: BoardColumnConfig; count: number; id: string }) {
  return (
    <div className={s.head}>
      <h2 className={s.label} id={id} title={column.label}>{column.label}</h2>
      {column.gate && <Chip role="gate" label="GATE" />}
      <span className={s.count}>{count}{column.cap === undefined ? null : ` / ${column.cap}`}</span>
    </div>
  );
}

function CardList(props: BoardColumnProps & { rows: BoardItem[] }) {
  return (
    <div className={s.list} role="list">
      {props.rows.map((item, index) => (
        <WorkCard
          key={item.key}
          item={item}
          fields={props.fields}
          onOpen={props.onOpen}
          selected={item.key === props.selectedKey}
          feed={props.feed}
          rovingProps={props.roving?.itemProps(props.roving.base + index)}
          inList
        />
      ))}
    </div>
  );
}

export function BoardColumn({ column, items, fields, sort, onOpen, selectedKey, feed, roving, onKeyDown }: BoardColumnProps) {
  const headId = useId();
  const overCap = column.cap !== undefined && items.length > column.cap;
  const rows = ordered(items, sort);
  return (
    <section className={s.column} aria-labelledby={headId} data-gate={column.gate ? true : undefined} data-overcap={overCap ? true : undefined} onKeyDown={onKeyDown}>
      <ColumnHead column={column} count={items.length} id={headId} />
      <CardList column={column} items={items} fields={fields} sort={sort} onOpen={onOpen} selectedKey={selectedKey} feed={feed} roving={roving} rows={rows} />
      {overCap && <OverCapNote label={column.label} count={items.length} cap={column.cap as number} />}
    </section>
  );
}
