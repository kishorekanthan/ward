import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import { useRovingTabindex } from "../a11y/useRovingTabindex";
import s from "./Tree.module.css";

type ItemProps = ReturnType<ReturnType<typeof useRovingTabindex>["itemProps"]>;

const TreeContext = createContext<((index: number) => ItemProps) | null>(null);

export function Tree({ label, children }: { label: string; children: ReactNode }) {
  const { containerProps, itemProps } = useRovingTabindex({ orientation: "vertical" });
  return (
    <TreeContext.Provider value={itemProps}>
      <ul className={s.tree} role="tree" aria-label={label} {...containerProps}>
        {children}
      </ul>
    </TreeContext.Provider>
  );
}

export type TreeRowProps = {
  index: number;
  depth: 0 | 1 | 2;
  label: ReactNode;
  detail?: ReactNode;
  expanded?: boolean;
  leaf?: boolean;
  unresolved?: boolean;
  inherited?: boolean;
  onToggle?: () => void;
  onSelect?: () => void;
  children?: ReactNode;
};

const KEY_STATE: Record<string, boolean> = { ArrowRight: true, ArrowLeft: false };

function flag(value?: boolean): true | undefined {
  return value ? true : undefined;
}

function toggleForKey(event: React.KeyboardEvent, props: TreeRowProps): void {
  const requested = KEY_STATE[event.key];
  if (!props.leaf && props.onToggle && requested !== undefined && Boolean(props.expanded) !== requested) props.onToggle();
}

function activate(props: TreeRowProps): void {
  if (!props.leaf) props.onToggle?.();
  props.onSelect?.();
}

function rowClass(props: TreeRowProps): string {
  const classes = [s.row, "ward-treerow"];
  if (props.unresolved) classes.push("ward-treerow--unresolved");
  if (props.inherited) classes.push("ward-treerow--inherited");
  return classes.join(" ");
}

function expandedState(props: TreeRowProps): boolean | undefined {
  return props.leaf ? undefined : Boolean(props.expanded);
}

function disclosureMark(props: TreeRowProps): string {
  if (props.leaf) return "·";
  return props.expanded ? "▾" : "▸";
}

function labelTitle(label: ReactNode): string | undefined {
  return typeof label === "string" ? label : undefined;
}

function Detail({ value }: { value?: ReactNode }) {
  return value === undefined ? null : <span className="ward-treeitem-mark ward-truncate">{value}</span>;
}

// Unresolved and inherited rows are marked only by ink and rule, so the state is also spoken.
function StateWords({ unresolved, inherited }: Pick<TreeRowProps, "unresolved" | "inherited">) {
  const words = [unresolved ? "unresolved" : "", inherited ? "inherited" : ""].filter(Boolean).join(", ");
  return words === "" ? null : <span className="ward-visually-hidden">{words}</span>;
}

export function TreeRow(props: TreeRowProps) {
  const itemProps = useContext(TreeContext);
  if (!itemProps) throw new Error("TreeRow: must be rendered inside a Tree");
  const expanded = expandedState(props);
  return (
    <li className={s.item} role="none">
      <div
        className={rowClass(props)}
        role="treeitem"
        style={{ "--depth": props.depth } as CSSProperties}
        aria-level={props.depth + 1}
        aria-expanded={expanded}
        data-depth={props.depth}
        data-unresolved={flag(props.unresolved)}
        data-inherited={flag(props.inherited)}
      >
        <button
          type="button"
          className={`${s.button} ward-treeitem-btn`}
          onClick={() => activate(props)}
          onKeyDown={(event) => toggleForKey(event, props)}
          {...itemProps(props.index)}
        >
          <span className="ward-treeitem-mark" aria-hidden="true">{disclosureMark(props)}</span>
          <span className="ward-truncate" title={labelTitle(props.label)}>{props.label}</span>
          <Detail value={props.detail} />
          <StateWords unresolved={props.unresolved} inherited={props.inherited} />
        </button>
      </div>
      {/* Child rows are <li>, so they need a group list between them and this one. */}
      {expanded && props.children ? <ul role="group">{props.children}</ul> : null}
    </li>
  );
}
