import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { flushSync } from "react-dom";
import { useOutsideClose } from "../a11y/useOutsideClose";
import { printable, useTypeahead } from "../a11y/useTypeahead";
import { useAnchoredMenu } from "./anchorMenu";
import { safeHref } from "./safeHref";
import s from "./Menu.module.css";

/** A button item calls onSelect; an item with href is a link, and onSelect still runs before it opens. current marks the choice in use. */
export type MenuItem = {
  label: string;
  description?: string;
  /** Drawn before the label, such as an avatar; decorative, as the label names the row. */
  icon?: ReactNode;
  /** Drawn at the end of the row, such as a count. */
  trailing?: ReactNode;
  onSelect?: () => void;
  href?: string;
  disabled?: boolean;
  current?: boolean;
};
/** While a find query is typed, a group's rows are filtered (default), kept whole (a footer) or hidden (a recent list). */
export type MenuGroup = { heading: string; items: MenuItem[]; whileFinding?: "filter" | "keep" | "hide" };
export type MenuEntry = MenuItem | MenuGroup | "separator";

/** A find row at the top once the menu has from items or more (default 8); empty is the line shown when nothing matches. */
export type MenuFind = { placeholder: string; from?: number; empty?: string };

export type MenuProps = {
  entries: MenuEntry[];
  /** A plain line under the items, such as who is signed in; never focusable. */
  footer?: string;
  align?: "start" | "end";
  find?: MenuFind;
  /** The box whose left and right edges the panel takes; it still opens under the trigger. */
  edges?: RefObject<HTMLElement | null>;
  /** Rows 28px (regular), 36px (large) or 44px (touch) tall. */
  size?: "regular" | "large" | "touch";
};

/** Lets a host strip take the trigger into its own roving focus, as Tabs does with More. */
export type MenuTrigger = {
  role?: "tab";
  "aria-selected"?: boolean;
  tabIndex?: number;
  onFocus?: () => void;
  ref?: (el: HTMLButtonElement | null) => void;
  className?: string;
};

export type MenuButtonProps = {
  label: ReactNode;
  /** The Menu this button opens. */
  children: ReactNode;
  "aria-label"?: string;
  disabled?: boolean;
  defaultOpen?: boolean;
  className?: string;
  trigger?: MenuTrigger;
  /** ghost drops the field ring and chevron, for a trigger that is a row of its host. */
  variant?: "field" | "ghost";
};

type Start = "first" | "last";

type Popup = {
  open: boolean;
  start: Start | null;
  request: number;
  show: (start: Start) => void;
  close: (refocus: boolean) => void;
};

type Shared = { popup: Popup; menuId: string; buttonId: string; button: RefObject<HTMLButtonElement | null> };

const MenuContext = createContext<Shared | null>(null);

function usePopup(defaultOpen: boolean, button: RefObject<HTMLButtonElement | null>): Popup {
  const [state, setState] = useState<{ open: boolean; start: Start | null; request: number }>({ open: defaultOpen, start: null, request: 0 });
  return {
    ...state,
    show: (start) => setState((was) => ({ open: true, start, request: was.request + 1 })),
    close: (refocus) => {
      flushSync(() => setState((was) => ({ ...was, open: false })));
      if (refocus) button.current?.focus();
    },
  };
}

const OPENERS = new Map<string, Start>([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"],
]);

// Space is handled on keydown, so its keyup must not click whatever holds focus by then.
function buttonHandlers(popup: Popup) {
  return {
    onClick: () => (popup.open ? popup.close(false) : popup.show("first")),
    onKeyDown: (event: KeyboardEvent) => {
      const start = OPENERS.get(event.key);
      if (!start) return;
      event.preventDefault();
      popup.show(start);
    },
    onKeyUp: (event: KeyboardEvent) => {
      if (event.key === " ") event.preventDefault();
    },
  };
}

function classes(...names: Array<string | undefined>): string {
  return names.filter(Boolean).join(" ");
}

function triggerProps(button: RefObject<HTMLButtonElement | null>, trigger: MenuTrigger = {}, variant = "field") {
  const { ref, className, ...rest } = trigger;
  const attach = (el: HTMLButtonElement | null) => {
    button.current = el;
    ref?.(el);
  };
  return { ...rest, ref: attach, className: classes(s.trigger, variant === "ghost" ? s.ghost : undefined, className) };
}

export function MenuButton(props: MenuButtonProps) {
  const base = useId();
  const shared = { menuId: `${base}-menu`, buttonId: `${base}-button` };
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const popup = usePopup(props.defaultOpen === true, button);
  useOutsideClose(popup.open, root, () => popup.close(false));
  return (
    <div ref={root} className={classes(s.root, props.className)} data-ward-menu="">
      <button
        {...triggerProps(button, props.trigger, props.variant)}
        id={shared.buttonId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={popup.open}
        aria-controls={popup.open ? shared.menuId : undefined}
        aria-label={props["aria-label"]}
        disabled={props.disabled}
        {...buttonHandlers(popup)}
      >
        {props.label}
      </button>
      {popup.open && <MenuContext.Provider value={{ ...shared, popup, button }}>{props.children}</MenuContext.Provider>}
    </div>
  );
}

type Row = { item: MenuItem; at: number };
type Block = { kind: "item"; row: Row } | { kind: "group"; heading: string; rows: Row[] } | { kind: "separator" };

// Numbers every item in reading order, through groups, so keys can walk one flat list.
function blocksOf(entries: MenuEntry[]): Block[] {
  let next = 0;
  const row = (item: MenuItem): Row => ({ item, at: next++ });
  return entries.map((entry): Block => {
    if (entry === "separator") return { kind: "separator" };
    if ("items" in entry) return { kind: "group", heading: entry.heading, rows: entry.items.map(row) };
    return { kind: "item", row: row(entry) };
  });
}

function rowsOf(block: Block): Row[] {
  if (block.kind === "group") return block.rows;
  return block.kind === "item" ? [block.row] : [];
}

const countItems = (entries: MenuEntry[]) => entries.flatMap((entry) => (entry === "separator" ? [] : "items" in entry ? entry.items : [entry])).length;

function filterGroup(group: MenuGroup, keep: (item: MenuItem) => boolean): MenuGroup | null {
  const mode = group.whileFinding ?? "filter";
  if (mode === "keep") return group;
  const items = mode === "hide" ? [] : group.items.filter(keep);
  return items.length ? { ...group, items } : null;
}

function filterEntry(entry: MenuEntry, keep: (item: MenuItem) => boolean): MenuEntry | null {
  if (entry === "separator") return entry;
  if ("items" in entry) return filterGroup(entry, keep);
  return keep(entry) ? entry : null;
}

// A separator stays only between two shown entries.
function tidy(entries: MenuEntry[]): MenuEntry[] {
  const out = entries.filter((entry, i) => entry !== "separator" || entries[i - 1] !== "separator");
  while (out[0] === "separator") out.shift();
  while (out[out.length - 1] === "separator") out.pop();
  return out;
}

// Rows whose label holds the query, in any case; an empty query shows every entry.
export function findEntries(entries: MenuEntry[], query: string): MenuEntry[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return entries;
  const keep = (item: MenuItem) => item.label.toLowerCase().includes(needle);
  return tidy(entries.map((entry) => filterEntry(entry, keep)).filter((entry): entry is MenuEntry => entry !== null));
}

const wrap = (at: number, count: number) => ((at % count) + count) % count;

// The next enabled item after from, stepping by delta and wrapping; -1 when every item is disabled.
function nextEnabled(items: MenuItem[], from: number, delta: 1 | -1): number {
  for (let k = 1; k <= items.length; k++) {
    const at = wrap(from + delta * k, items.length);
    if (!items[at].disabled) return at;
  }
  return -1;
}

const repeats = (typed: string) => typed.split("").every((char) => char === typed[0]);

// One letter, or the same letter again, steps past the current item; a longer word may stay on it.
function typedMatch(items: MenuItem[], from: number, typed: string): number {
  const cycle = repeats(typed);
  const needle = cycle ? typed[0] : typed;
  const start = cycle ? from : from - 1;
  const matches = (item: MenuItem) => !item.disabled && item.label.toLowerCase().startsWith(needle);
  for (let k = 1; k <= items.length; k++) {
    const at = wrap(start + k, items.length);
    if (matches(items[at])) return at;
  }
  return -1;
}

type Nav = {
  items: MenuItem[];
  refs: RefObject<Array<HTMLElement | null>>;
  current: () => number;
  focus: (at: number) => void;
};

function useNav(items: MenuItem[]): Nav {
  const refs = useRef<Array<HTMLElement | null>>([]);
  refs.current.length = items.length;
  return {
    items,
    refs,
    current: () => refs.current.indexOf(document.activeElement as HTMLElement),
    focus: (at) => refs.current[at]?.focus(),
  };
}

function moveKeys(nav: Nav, popup: Popup): Map<string, () => void> {
  const { items } = nav;
  const activate = () => nav.refs.current[nav.current()]?.click();
  return new Map([
    ["ArrowDown", () => nav.focus(nextEnabled(items, nav.current(), 1))],
    ["ArrowUp", () => nav.focus(nextEnabled(items, nav.current(), -1))],
    ["Home", () => nav.focus(nextEnabled(items, -1, 1))],
    ["End", () => nav.focus(nextEnabled(items, items.length, -1))],
    ["Escape", () => popup.close(true)],
    ["Enter", activate],
    [" ", activate],
  ]);
}

// A printable key types into the find row when there is one; otherwise it moves by type-ahead.
function useMenuKeys(nav: Nav, popup: Popup, toFind?: (key: string) => void) {
  const typed = useTypeahead();
  const keys = moveKeys(nav, popup);
  const onType = (event: KeyboardEvent) => {
    if (!printable(event)) return;
    if (!toFind) return nav.focus(typedMatch(nav.items, nav.current(), typed(event.key)));
    event.preventDefault();
    toFind(event.key);
  };
  return {
    onKeyDown: (event: KeyboardEvent) => {
      const action = keys.get(event.key);
      if (!action) return onType(event);
      event.preventDefault();
      event.stopPropagation();
      action();
    },
    onKeyUp: (event: KeyboardEvent) => {
      if (event.key === " ") event.preventDefault();
    },
  };
}

// Tab is never prevented: the browser moves focus on, and the menu closes as the panel loses focus.
function useTabClose(popup: Popup) {
  const leaving = useRef(false);
  return {
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === "Tab") leaving.current = true;
    },
    onBlur: () => {
      if (leaving.current) popup.close(false);
    },
  };
}

// Opening from the top lands on the current choice when there is one.
function firstFocus(items: MenuItem[]): number {
  const at = items.findIndex((item) => item.current && !item.disabled);
  return at === -1 ? nextEnabled(items, -1, 1) : at;
}

// Focus moves in only when a person opens the menu, never on a first render held open; request numbers each open.
function useOpenFocus(nav: Nav, popup: Popup) {
  const { start, request } = popup;
  const latest = useRef(nav);
  latest.current = nav;
  useEffect(() => {
    const { items, focus } = latest.current;
    if (start) focus(start === "first" ? firstFocus(items) : nextEnabled(items, items.length, -1));
  }, [start, request]);
}

type ItemProps = { row: Row; nav: Nav; popup: Popup };

function itemHandlers({ row, nav, popup }: ItemProps) {
  const { item, at } = row;
  return {
    onMouseDown: (event: MouseEvent) => event.preventDefault(),
    onMouseMove: () => {
      if (!item.disabled && nav.current() !== at) nav.focus(at);
    },
    onClick: (event: MouseEvent) => {
      if (item.disabled) return event.preventDefault();
      item.onSelect?.();
      popup.close(true);
    },
  };
}

const hasParts = (item: MenuItem) => [item.description, item.icon, item.trailing].some(Boolean);

// A row with parts keeps the label as its name and reads the line below, if any, as its description.
function itemAria(item: MenuItem, id: string) {
  if (!hasParts(item)) return {};
  return { "aria-labelledby": id + "-label", "aria-describedby": item.description ? id + "-description" : undefined };
}

function itemText(item: MenuItem, id: string) {
  const label = (
    <span id={id + "-label"} className={s.label}>
      {item.label}
    </span>
  );
  if (!item.description) return label;
  return (
    <span className={s.text}>
      {label}
      <span id={id + "-description"} className={s.description}>
        {item.description}
      </span>
    </span>
  );
}

function CheckMark() {
  return (
    <svg className={s.check} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Icon, label, trailing node, then the check on the current row, so labels share one left edge.
function rowContent(item: MenuItem, id: string) {
  return (
    <>
      {item.icon ? <span className={s.icon} aria-hidden="true">{item.icon}</span> : null}
      {itemText(item, id)}
      {item.trailing ? <span className={s.trailing}>{item.trailing}</span> : null}
      {item.current ? <CheckMark /> : null}
    </>
  );
}

function ItemRow(props: ItemProps) {
  const { item, at } = props.row;
  const id = useId();
  const common = {
    ref: (el: HTMLElement | null) => {
      props.nav.refs.current[at] = el;
    },
    role: "menuitem",
    tabIndex: -1,
    className: s.item,
    "aria-current": item.current ? ("true" as const) : undefined,
    "aria-disabled": item.disabled ? ("true" as const) : undefined,
    ...itemAria(item, id),
    ...itemHandlers(props),
  };
  if (item.href && !item.disabled) return <a href={safeHref(item.href)} {...common}>{rowContent(item, id)}</a>;
  return <button type="button" {...common}>{rowContent(item, id)}</button>;
}

function GroupBlock({ heading, rows, nav, popup }: { heading: string; rows: Row[]; nav: Nav; popup: Popup }) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id} className={s.group}>
      <div id={id} className={s.heading}>
        {heading}
      </div>
      {rows.map((row) => (
        <ItemRow key={row.at} row={row} nav={nav} popup={popup} />
      ))}
    </div>
  );
}

function BlockView({ block, nav, popup }: { block: Block; nav: Nav; popup: Popup }) {
  if (block.kind === "separator") return <div role="separator" className={s.separator} />;
  if (block.kind === "group") return <GroupBlock heading={block.heading} rows={block.rows} nav={nav} popup={popup} />;
  return <ItemRow row={block.row} nav={nav} popup={popup} />;
}

function useShared(): Shared {
  const shared = useContext(MenuContext);
  if (!shared) throw new Error("Menu: render it as the child of a MenuButton");
  return shared;
}

function SearchGlyph() {
  return (
    <svg className={s.findGlyph} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5l3 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Arrow keys leave the find row for the list, so typing never takes them; Enter picks the first row.
function findKeys(nav: Nav, popup: Popup): Map<string, () => void> {
  const first = () => nextEnabled(nav.items, -1, 1);
  return new Map([
    ["ArrowDown", () => nav.focus(first())],
    ["ArrowUp", () => nav.focus(nextEnabled(nav.items, nav.items.length, -1))],
    ["Enter", () => nav.refs.current[first()]?.click()],
    ["Escape", () => popup.close(true)],
  ]);
}

type FindRowProps = { find: MenuFind; query: string; setQuery: (query: string) => void; input: RefObject<HTMLInputElement | null>; nav: Nav; popup: Popup; menuId: string };

function FindRow({ find, query, setQuery, input, nav, popup, menuId }: FindRowProps) {
  const keys = findKeys(nav, popup);
  const onKeyDown = (event: KeyboardEvent) => {
    const action = keys.get(event.key);
    if (!action) return;
    event.preventDefault();
    event.stopPropagation();
    action();
  };
  return (
    <div className={s.find}>
      <SearchGlyph />
      <input ref={input} type="search" className={s.findInput} placeholder={find.placeholder} aria-label={find.placeholder} aria-controls={menuId} autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={onKeyDown} />
    </div>
  );
}

// The find row shows once the whole menu, before any query, has find.from items or more.
function useFind(entries: MenuEntry[], find?: MenuFind) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const shown = find !== undefined && countItems(entries) >= (find.from ?? 8);
  const toFind = (key: string) => {
    setQuery((was) => was + key);
    input.current?.focus();
  };
  if (!shown) return { query, setQuery, input, entries };
  return { find, query, setQuery, input, toFind, entries: findEntries(entries, query) };
}

const SIZES = { regular: undefined, large: s.large, touch: s.touch };

const panelClass = (edges: MenuProps["edges"], size: NonNullable<MenuProps["size"]>) => classes(s.panel, edges ? s.edged : undefined, SIZES[size]);

function NoMatch({ find, count }: { find?: MenuFind; count: number }) {
  if (!find || count > 0) return null;
  return <p className={s.empty}>{find.empty ?? "No matches"}</p>;
}

export function Menu({ entries, footer, align = "start", find, edges, size = "regular" }: MenuProps) {
  const { popup, menuId, buttonId, button } = useShared();
  const panel = useRef<HTMLDivElement>(null);
  useAnchoredMenu(button, panel, align, edges);
  const found = useFind(entries, find);
  const blocks = blocksOf(found.entries);
  const nav = useNav(blocks.flatMap(rowsOf).map((row) => row.item));
  const keys = useMenuKeys(nav, popup, found.toFind);
  const tabClose = useTabClose(popup);
  useOpenFocus(nav, popup);
  return (
    <div ref={panel} className={panelClass(edges, size)} {...tabClose}>
      {found.find && <FindRow find={found.find} query={found.query} setQuery={found.setQuery} input={found.input} nav={nav} popup={popup} menuId={menuId} />}
      <div role="menu" id={menuId} aria-labelledby={buttonId} className={s.menu} {...keys}>
        {blocks.map((block, i) => (
          <BlockView key={i} block={block} nav={nav} popup={popup} />
        ))}
      </div>
      <NoMatch find={found.find} count={nav.items.length} />
      {footer && <p className={s.footer}>{footer}</p>}
    </div>
  );
}
