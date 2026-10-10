import { useEffect, useId, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { flushSync } from "react-dom";
import { joinIds } from "../a11y/joinIds";
import { useOutsideClose } from "../a11y/useOutsideClose";
import { printable, useTypeahead } from "../a11y/useTypeahead";
import { useAnchoredMenu } from "./anchorMenu";
import s from "./Select.module.css";

export type SelectOption = { value: string; label: string };

export type SelectProps = {
  options: SelectOption[];
  value: string;
  onChange?: (value: string) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: "true";
  id?: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultOpen?: boolean;
  className?: string;
  triggerClassName?: string;
};

// A list longer than this gets a Find box; a shorter one is quicker to scan or type-ahead.
const FIND_AFTER = 7;

type Entry = { option: SelectOption; index: number };

type Menu = {
  open: boolean;
  query: string;
  active: number;
  entries: Entry[];
  findable: boolean;
  show: () => void;
  close: (refocus: boolean) => void;
  to: (at: number) => void;
  pick: (entry: Entry | undefined) => void;
  find: (query: string) => void;
};

function matching(options: SelectOption[], query: string): Entry[] {
  const needle = query.trim().toLowerCase();
  return options.map((option, index) => ({ option, index })).filter(({ option }) => option.label.toLowerCase().includes(needle));
}

function selectedAt(options: SelectOption[], value: string): number {
  return Math.max(0, options.findIndex((option) => option.value === value));
}

function useMenu(props: SelectProps, trigger: RefObject<HTMLButtonElement | null>): Menu {
  const [open, setOpen] = useState(props.defaultOpen === true);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(() => selectedAt(props.options, props.value));
  const close = (refocus: boolean) => {
    flushSync(() => setOpen(false));
    if (refocus) trigger.current?.focus();
  };
  return {
    open,
    query,
    active,
    entries: matching(props.options, query),
    findable: props.options.length > FIND_AFTER,
    show: () => {
      if (props.disabled) return;
      setQuery("");
      setActive(selectedAt(props.options, props.value));
      setOpen(true);
    },
    close,
    to: setActive,
    pick: (entry) => {
      if (entry && entry.option.value !== props.value) props.onChange?.(entry.option.value);
      close(true);
    },
    find: (next) => {
      setQuery(next);
      setActive(0);
    },
  };
}

// The menu takes focus only when a person opens it, never on a first render held open.
function useFocusOnOpen(open: boolean, target: RefObject<HTMLElement | null>) {
  const wanted = useRef(false);
  useEffect(() => {
    if (open && wanted.current) target.current?.focus();
    wanted.current = false;
  });
  return () => {
    wanted.current = true;
  };
}

function useJump(menu: Menu) {
  const typed = useTypeahead();
  return (key: string) => {
    const buffer = typed(key);
    const at = menu.entries.findIndex((entry) => entry.option.label.toLowerCase().startsWith(buffer));
    if (at >= 0) menu.to(at);
  };
}

function moveKeys(menu: Menu): Record<string, () => void> {
  const last = Math.max(0, menu.entries.length - 1);
  return {
    ArrowDown: () => menu.to(Math.min(menu.active + 1, last)),
    ArrowUp: () => menu.to(Math.max(menu.active - 1, 0)),
    Enter: () => menu.pick(menu.entries[menu.active]),
    Escape: () => menu.close(true),
  };
}

function listKeys(menu: Menu): Record<string, () => void> {
  return { ...moveKeys(menu), Home: () => menu.to(0), End: () => menu.to(Math.max(0, menu.entries.length - 1)) };
}

// Tab is not prevented: focus goes back to the trigger first, so the browser moves on from there.
function menuKeyHandler(menu: Menu, keys: Record<string, () => void>, other: (event: KeyboardEvent) => void) {
  return (event: KeyboardEvent) => {
    if (event.key === "Tab") return menu.close(true);
    const action = keys[event.key];
    if (!action) return other(event);
    event.preventDefault();
    event.stopPropagation();
    action();
  };
}

const OPENERS = new Set(["ArrowDown", "ArrowUp", "Enter", " "]);

function triggerHandlers(menu: Menu, wantFocus: () => void) {
  const show = () => {
    wantFocus();
    menu.show();
  };
  return {
    onClick: () => (menu.open ? menu.close(false) : show()),
    onKeyDown: (event: KeyboardEvent) => {
      if (!OPENERS.has(event.key)) return;
      event.preventDefault();
      show();
    },
  };
}

type Ids = { list: string; value: string; option: (index: number) => string };

function OptionRow({ entry, at, menu, ids, value }: { entry: Entry; at: number; menu: Menu; ids: Ids; value: string }) {
  return (
    <li
      id={ids.option(entry.index)}
      role="option"
      aria-selected={entry.option.value === value}
      data-active={at === menu.active || undefined}
      className={s.option}
      onMouseDown={(event) => event.preventDefault()}
      onMouseMove={() => menu.to(at)}
      onClick={() => menu.pick(entry)}
    >
      <span className={s.check} aria-hidden="true" />
      <span className={s.label}>{entry.option.label}</span>
    </li>
  );
}

type MenuViewProps = { props: SelectProps; menu: Menu; ids: Ids; focusRef: RefObject<HTMLElement | null>; trigger: RefObject<HTMLButtonElement | null> };

function activeId(menu: Menu, ids: Ids): string | undefined {
  const entry = menu.entries[menu.active];
  return entry ? ids.option(entry.index) : undefined;
}

function FindBox({ menu, ids, focusRef }: Omit<MenuViewProps, "props" | "trigger">) {
  return (
    <input
      ref={focusRef as RefObject<HTMLInputElement | null>}
      className={s.find}
      type="text"
      placeholder="Find"
      aria-label="Find"
      aria-controls={ids.list}
      aria-autocomplete="list"
      aria-activedescendant={activeId(menu, ids)}
      autoComplete="off"
      spellCheck={false}
      value={menu.query}
      onChange={(event) => menu.find(event.target.value)}
      onKeyDown={menuKeyHandler(menu, moveKeys(menu), () => undefined)}
    />
  );
}

function MenuView({ props, menu, ids, focusRef, trigger }: MenuViewProps) {
  const jump = useJump(menu);
  const box = useRef<HTMLDivElement>(null);
  useAnchoredMenu(trigger, box);
  const onType = (event: KeyboardEvent) => {
    if (printable(event)) jump(event.key);
  };
  return (
    <div ref={box} className={s.menu}>
      {menu.findable && <FindBox menu={menu} ids={ids} focusRef={focusRef} />}
      <ul
        ref={menu.findable ? undefined : (focusRef as RefObject<HTMLUListElement | null>)}
        id={ids.list}
        role="listbox"
        tabIndex={-1}
        className={s.list}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
        aria-activedescendant={menu.findable ? undefined : activeId(menu, ids)}
        onKeyDown={menuKeyHandler(menu, listKeys(menu), onType)}
      >
        {menu.entries.map((entry, at) => (
          <OptionRow key={entry.index} entry={entry} at={at} menu={menu} ids={ids} value={props.value} />
        ))}
      </ul>
      {menu.entries.length === 0 && <p className={s.empty}>No match</p>}
    </div>
  );
}

function useScrollActive(menu: Menu, ids: Ids) {
  const id = menu.open ? activeId(menu, ids) : undefined;
  useEffect(() => {
    if (id) document.getElementById(id)?.scrollIntoView?.({ block: "nearest" });
  }, [id]);
}

function classes(...names: Array<string | undefined>): string {
  return names.filter(Boolean).join(" ");
}

function shownLabel(props: SelectProps): string | undefined {
  return props.options.find((option) => option.value === props.value)?.label ?? props.placeholder;
}

function Trigger({ props, menu, ids, trigger, wantFocus }: { props: SelectProps; menu: Menu; ids: Ids; trigger: RefObject<HTMLButtonElement | null>; wantFocus: () => void }) {
  const placeholder = !props.options.some((option) => option.value === props.value);
  return (
    <button
      ref={trigger}
      type="button"
      id={props.id}
      className={classes(s.trigger, props.triggerClassName)}
      aria-haspopup="listbox"
      aria-expanded={menu.open}
      aria-controls={menu.open ? ids.list : undefined}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      aria-describedby={joinIds(props["aria-describedby"], ids.value)}
      aria-invalid={props["aria-invalid"]}
      disabled={props.disabled}
      {...triggerHandlers(menu, wantFocus)}
    >
      <span id={ids.value} className={s.value} data-placeholder={placeholder || undefined}>
        {shownLabel(props)}
      </span>
    </button>
  );
}

export function Select(props: SelectProps) {
  const base = useId();
  const ids: Ids = { list: `${base}-list`, value: `${base}-value`, option: (index) => `${base}-option-${index}` };
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const focusRef = useRef<HTMLElement>(null);
  const menu = useMenu(props, trigger);
  const wantFocus = useFocusOnOpen(menu.open, focusRef);
  useOutsideClose(menu.open, root, () => menu.close(false));
  useScrollActive(menu, ids);
  return (
    <div ref={root} className={classes(s.root, props.className)} data-ward-select="">
      <Trigger props={props} menu={menu} ids={ids} trigger={trigger} wantFocus={wantFocus} />
      {props.name && <input type="hidden" name={props.name} value={props.value} />}
      {menu.open && <MenuView props={props} menu={menu} ids={ids} focusRef={focusRef} trigger={trigger} />}
    </div>
  );
}
