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

/** A button item calls onSelect; an item with href is a link, and onSelect still runs before it opens. */
export type MenuItem = { label: string; onSelect?: () => void; href?: string; disabled?: boolean };
export type MenuGroup = { heading: string; items: MenuItem[] };
export type MenuEntry = MenuItem | MenuGroup | "separator";

export type MenuProps = {
  entries: MenuEntry[];
  /** A plain line under the items, such as who is signed in; never focusable. */
  footer?: string;
  align?: "start" | "end";
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

function triggerProps(button: RefObject<HTMLButtonElement | null>, trigger: MenuTrigger = {}) {
  const { ref, className, ...rest } = trigger;
  const attach = (el: HTMLButtonElement | null) => {
    button.current = el;
    ref?.(el);
  };
  return { ...rest, ref: attach, className: classes(s.trigger, className) };
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
        {...triggerProps(button, props.trigger)}
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

// Tab is never prevented: the browser moves focus on, and the menu closes as it loses focus.
function useMenuKeys(nav: Nav, popup: Popup) {
  const leaving = useRef(false);
  const typed = useTypeahead();
  const keys = moveKeys(nav, popup);
  const onType = (event: KeyboardEvent) => {
    if (printable(event)) nav.focus(typedMatch(nav.items, nav.current(), typed(event.key)));
  };
  return {
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === "Tab") leaving.current = true;
      const action = keys.get(event.key);
      if (!action) return onType(event);
      event.preventDefault();
      event.stopPropagation();
      action();
    },
    onKeyUp: (event: KeyboardEvent) => {
      if (event.key === " ") event.preventDefault();
    },
    onBlur: () => {
      if (leaving.current) popup.close(false);
    },
  };
}

// Focus moves in only when a person opens the menu, never on a first render held open; request numbers each open.
function useOpenFocus(nav: Nav, popup: Popup) {
  const { start, request } = popup;
  const latest = useRef(nav);
  latest.current = nav;
  useEffect(() => {
    const { items, focus } = latest.current;
    if (start) focus(start === "first" ? nextEnabled(items, -1, 1) : nextEnabled(items, items.length, -1));
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

function ItemRow(props: ItemProps) {
  const { item, at } = props.row;
  const common = {
    ref: (el: HTMLElement | null) => {
      props.nav.refs.current[at] = el;
    },
    role: "menuitem",
    tabIndex: -1,
    className: s.item,
    "aria-disabled": item.disabled ? ("true" as const) : undefined,
    ...itemHandlers(props),
  };
  if (item.href && !item.disabled) return <a href={safeHref(item.href)} {...common}>{item.label}</a>;
  return <button type="button" {...common}>{item.label}</button>;
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

export function Menu({ entries, footer, align = "start" }: MenuProps) {
  const { popup, menuId, buttonId, button } = useShared();
  const panel = useRef<HTMLDivElement>(null);
  useAnchoredMenu(button, panel, align);
  const blocks = blocksOf(entries);
  const nav = useNav(blocks.flatMap(rowsOf).map((row) => row.item));
  const keys = useMenuKeys(nav, popup);
  useOpenFocus(nav, popup);
  return (
    <div ref={panel} className={s.panel}>
      <div role="menu" id={menuId} aria-labelledby={buttonId} className={s.menu} {...keys}>
        {blocks.map((block, i) => (
          <BlockView key={i} block={block} nav={nav} popup={popup} />
        ))}
      </div>
      {footer && <p className={s.footer}>{footer}</p>}
    </div>
  );
}
