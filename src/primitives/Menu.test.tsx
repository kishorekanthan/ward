import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import { contrast } from "../../scripts/contrast.mjs";
import { stubLayout, unstubLayout } from "../test-layout";
import { findEntries, Menu, MenuButton, type MenuEntry, type MenuItem } from "./Menu";

const HERE = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(HERE, "..", "..", "tokens.json"), "utf8"));

// Spike is disabled between two enabled items, so every move has to step over it.
function requestItems(onSelect = vi.fn()): MenuItem[] {
  return [
    { label: "Story", onSelect: () => onSelect("story") },
    { label: "Bug", onSelect: () => onSelect("bug") },
    { label: "Spike", onSelect: () => onSelect("spike"), disabled: true },
    { label: "Epic", onSelect: () => onSelect("epic") },
    { label: "Support", onSelect: () => onSelect("support") },
  ];
}

// Disabled at both ends, so Home, End and the openers must look past them.
const guarded: MenuItem[] = [
  { label: "Archive", disabled: true },
  { label: "Rename" },
  { label: "Move" },
  { label: "Delete", disabled: true },
];

function NewRequest({ entries = requestItems(), defaultOpen }: { entries?: MenuEntry[]; defaultOpen?: boolean }) {
  return (
    <>
      <MenuButton label="New request" defaultOpen={defaultOpen}>
        <Menu entries={entries} />
      </MenuButton>
      <button type="button">After</button>
    </>
  );
}

const button = () => screen.getByRole("button", { name: "New request" });
const focusedText = () => document.activeElement?.textContent;
const press = (key: string) => fireEvent.keyDown(document.activeElement as Element, { key });

function openWith(key: string) {
  button().focus();
  press(key);
}

afterEach(() => {
  vi.useRealTimers();
  unstubLayout();
});

describe("Menu button roles and names", () => {
  it("marks the button as a closed menu button that controls nothing yet", () => {
    render(<NewRequest />);
    expect(button().getAttribute("aria-haspopup")).toBe("menu");
    expect(button().getAttribute("aria-expanded")).toBe("false");
    expect(button().hasAttribute("aria-controls")).toBe(false);
    expect(screen.queryByRole("menu")).toBeNull();
    expect(screen.queryAllByRole("menuitem")).toEqual([]);
  });

  it("opens a menu labelled by the button, which then controls it", () => {
    render(<NewRequest />);
    fireEvent.click(button());
    const menu = screen.getByRole("menu", { name: "New request" });
    expect(button().getAttribute("aria-expanded")).toBe("true");
    expect(button().getAttribute("aria-controls")).toBe(menu.id);
    expect(menu.getAttribute("aria-labelledby")).toBe(button().id);
    expect(within(menu).getAllByRole("menuitem").map((item) => item.textContent)).toEqual(["Story", "Bug", "Spike", "Epic", "Support"]);
  });

  it("keeps every item out of the page tab order, so the button is the only tab stop", () => {
    render(<NewRequest />);
    fireEvent.click(button());
    expect(screen.getAllByRole("menuitem").map((item) => item.getAttribute("tabindex"))).toEqual(["-1", "-1", "-1", "-1", "-1"]);
  });

  it("groups items under a heading, draws a separator and keeps the footer out of the items", () => {
    const entries: MenuEntry[] = [
      { heading: "Account", items: [{ label: "Settings" }, { label: "Profile" }] },
      "separator",
      { label: "Sign out" },
    ];
    render(
      <MenuButton label="Sam Lee" defaultOpen>
        <Menu entries={entries} footer="Signed in as Sam Lee" />
      </MenuButton>,
    );
    const group = screen.getByRole("group", { name: "Account" });
    expect(within(group).getAllByRole("menuitem").map((item) => item.textContent)).toEqual(["Settings", "Profile"]);
    expect(within(screen.getByRole("menu")).getAllByRole("separator")).toHaveLength(1);
    const footer = screen.getByText("Signed in as Sam Lee");
    expect(footer.closest("[role='menu']")).toBeNull();
    expect(footer.closest("[role='menuitem']")).toBeNull();
    expect(footer.hasAttribute("tabindex")).toBe(false);
    expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toEqual(["Settings", "Profile", "Sign out"]);
  });

  it("renders a link item as a link that is still a menu item", () => {
    render(
      <MenuButton label="Help" defaultOpen>
        <Menu entries={[{ label: "Guides", href: "/help/guides" }, { label: "Report a problem" }]} />
      </MenuButton>,
    );
    const link = screen.getByRole("menuitem", { name: "Guides" });
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/help/guides");
    expect(screen.getByRole("menuitem", { name: "Report a problem" }).tagName).toBe("BUTTON");
  });

  it("lines the panel up with the button's start edge, or its end edge when asked", () => {
    const layout = stubLayout({ width: 1024, height: 768 }, { width: 160, height: 120 });
    const account = (align?: "end") => (
      <MenuButton label="Account">
        <Menu entries={[{ label: "Settings" }]} align={align} />
      </MenuButton>
    );
    const { rerender } = render(account());
    const opener = screen.getByRole("button", { name: "Account" });
    layout.place(opener, { left: 600, top: 100, width: 100, height: 32 });
    fireEvent.click(opener);
    const panel = () => screen.getByRole("menu").parentElement as HTMLElement;
    expect([panel().style.top, panel().style.left]).toEqual(["136px", "600px"]);
    rerender(account("end"));
    expect([panel().style.top, panel().style.left]).toEqual(["136px", "540px"]);
  });

  it("does not take focus when it is rendered open", () => {
    render(<NewRequest defaultOpen />);
    expect(screen.getByRole("menu")).toBeDefined();
    expect(document.activeElement).toBe(document.body);
  });

  it("refuses a Menu outside a MenuButton", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<Menu entries={[{ label: "Settings" }]} />)).toThrow("MenuButton");
  });
});

describe("Opening the menu", () => {
  it.each(["Enter", " ", "ArrowDown"])("opens on %j and focuses the first enabled item", (key) => {
    render(<NewRequest entries={guarded} />);
    openWith(key);
    expect(button().getAttribute("aria-expanded")).toBe("true");
    expect(focusedText()).toBe("Rename");
  });

  it("opens on ArrowUp and focuses the last enabled item", () => {
    render(<NewRequest entries={guarded} />);
    openWith("ArrowUp");
    expect(focusedText()).toBe("Move");
  });

  it("opens on a click and focuses the first item", () => {
    render(<NewRequest />);
    fireEvent.click(button());
    expect(screen.getByRole("menu")).toBeDefined();
    expect(focusedText()).toBe("Story");
  });

  it("moves focus in when a key opens a menu that was rendered open", () => {
    render(<NewRequest defaultOpen />);
    openWith("ArrowUp");
    expect(focusedText()).toBe("Support");
  });

  it("closes again on a second click without moving focus", () => {
    render(<NewRequest />);
    fireEvent.click(button());
    button().focus();
    fireEvent.click(button());
    expect(screen.queryByRole("menu")).toBeNull();
    expect(button().getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(button());
  });
});

describe("Moving between items", () => {
  it("steps down past the disabled item and wraps from the last to the first", () => {
    render(<NewRequest />);
    openWith("ArrowDown");
    const seen = [focusedText()];
    for (let i = 0; i < 4; i++) {
      press("ArrowDown");
      seen.push(focusedText());
    }
    expect(seen).toEqual(["Story", "Bug", "Epic", "Support", "Story"]);
  });

  it("steps up past the disabled item and wraps from the first to the last", () => {
    render(<NewRequest />);
    openWith("ArrowDown");
    const seen = [];
    for (let i = 0; i < 4; i++) {
      press("ArrowUp");
      seen.push(focusedText());
    }
    expect(seen).toEqual(["Support", "Epic", "Bug", "Story"]);
  });

  it("goes to the first and last enabled items on Home and End", () => {
    render(<NewRequest entries={guarded} />);
    openWith("ArrowDown");
    press("End");
    expect(focusedText()).toBe("Move");
    press("Home");
    expect(focusedText()).toBe("Rename");
  });

  it("jumps to the next item starting with a typed letter, in any case, and wraps", () => {
    vi.useFakeTimers();
    render(<NewRequest />);
    openWith("ArrowDown");
    press("s");
    expect(focusedText()).toBe("Support");
    act(() => vi.advanceTimersByTime(600));
    press("S");
    expect(focusedText()).toBe("Story");
    act(() => vi.advanceTimersByTime(600));
    press("e");
    expect(focusedText()).toBe("Epic");
  });

  it("cycles through matches when the same letter is typed quickly", () => {
    render(<NewRequest />);
    openWith("ArrowDown");
    press("s");
    press("s");
    expect(focusedText()).toBe("Story");
  });

  it("stays put when no enabled item starts with the letter", () => {
    render(<NewRequest />);
    openWith("ArrowDown");
    press("b");
    press("x");
    expect(focusedText()).toBe("Bug");
  });
});

describe("Closing the menu", () => {
  it("closes on Escape and returns focus to the button", () => {
    render(<NewRequest />);
    openWith("ArrowDown");
    press("Escape");
    expect(screen.queryByRole("menu")).toBeNull();
    expect(button().getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(button());
  });

  it("lets Tab move focus on and closes without pulling focus back", () => {
    render(<NewRequest />);
    openWith("ArrowDown");
    const notPrevented = press("Tab");
    // jsdom has no default Tab action, so move focus as the browser would.
    act(() => screen.getByRole("button", { name: "After" }).focus());
    expect(notPrevented).toBe(true);
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "After" }));
  });

  it("stays open when focus leaves an item without a Tab", () => {
    render(<NewRequest />);
    openWith("ArrowDown");
    act(() => (document.activeElement as HTMLElement).blur());
    expect(screen.getByRole("menu")).toBeDefined();
  });

  it("closes on a press outside and leaves focus alone", () => {
    render(<NewRequest />);
    fireEvent.click(button());
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).not.toBe(button());
  });

  it("stays open on a press inside the panel", () => {
    render(
      <MenuButton label="Account" defaultOpen>
        <Menu entries={[{ label: "Settings" }]} footer="Signed in as Sam Lee" />
      </MenuButton>,
    );
    fireEvent.mouseDown(screen.getByText("Signed in as Sam Lee"));
    expect(screen.getByRole("menu")).toBeDefined();
  });

  it("calls onSelect once on a click, closes and returns focus to the button", () => {
    const chosen = vi.fn();
    render(<NewRequest entries={requestItems(chosen)} />);
    fireEvent.click(button());
    fireEvent.click(screen.getByRole("menuitem", { name: "Epic" }));
    expect(chosen.mock.calls).toEqual([["epic"]]);
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(button());
  });

  it.each(["Enter", " "])("chooses the focused item on %j and returns focus to the button", (key) => {
    const chosen = vi.fn();
    render(<NewRequest entries={requestItems(chosen)} />);
    openWith("ArrowDown");
    press("ArrowDown");
    const prevented = !press(key);
    expect(prevented).toBe(true);
    expect(chosen.mock.calls).toEqual([["bug"]]);
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(button());
  });

  it("chooses a link item on Enter, running its onSelect too", () => {
    const chosen = vi.fn();
    render(
      <MenuButton label="Help">
        <Menu entries={[{ label: "Guides", href: "#guides", onSelect: chosen }]} />
      </MenuButton>,
    );
    screen.getByRole("button", { name: "Help" }).focus();
    press("ArrowDown");
    expect(focusedText()).toBe("Guides");
    press("Enter");
    expect(chosen).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });
});

describe("Disabled items", () => {
  it("marks a disabled item aria-disabled and gives it no link", () => {
    render(
      <MenuButton label="Help" defaultOpen>
        <Menu entries={[{ label: "Guides", href: "/help", disabled: true }, { label: "Bug" }]} />
      </MenuButton>,
    );
    const item = screen.getByRole("menuitem", { name: "Guides" });
    expect(item.getAttribute("aria-disabled")).toBe("true");
    expect(item.hasAttribute("href")).toBe(false);
    expect(screen.getByRole("menuitem", { name: "Bug" }).hasAttribute("aria-disabled")).toBe(false);
  });

  it("is skipped by typeahead", () => {
    render(<NewRequest />);
    openWith("ArrowDown");
    press("s");
    expect(focusedText()).toBe("Support");
  });

  it("ignores a click: no onSelect and the menu stays open", () => {
    const chosen = vi.fn();
    render(<NewRequest entries={requestItems(chosen)} />);
    fireEvent.click(button());
    fireEvent.click(screen.getByRole("menuitem", { name: "Spike" }));
    expect(chosen).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeDefined();
  });

  it("ignores Enter: no onSelect and the menu stays open", () => {
    const chosen = vi.fn();
    render(<NewRequest entries={requestItems(chosen)} />);
    fireEvent.click(button());
    const spike = screen.getByRole("menuitem", { name: "Spike" });
    spike.focus();
    fireEvent.keyDown(spike, { key: "Enter" });
    expect(chosen).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeDefined();
  });

  it("does not take focus when the pointer moves over it", () => {
    render(<NewRequest />);
    openWith("ArrowDown");
    fireEvent.mouseMove(screen.getByRole("menuitem", { name: "Spike" }));
    expect(focusedText()).toBe("Story");
    fireEvent.mouseMove(screen.getByRole("menuitem", { name: "Epic" }));
    expect(focusedText()).toBe("Epic");
  });
});

// jsdom has no layout, so sizes come from the stylesheet with Ward's tokens resolved; the rendered sweep measures the same in a browser.
const wardCss = readFileSync(join(HERE, "..", "ward.css"), "utf8");
const menuCss = readFileSync(join(HERE, "Menu.module.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const rootVars = new Map(Array.from(wardCss.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2].trim()]));

function declared(selector: string, property: string): string | undefined {
  const block = menuCss.match(new RegExp(`(?:^|\\n)${selector.replace(".", "\\.")} \\{([^}]*)\\}`))?.[1] ?? "";
  return block.match(new RegExp(`(?:^|\\s)${property}: ([^;]+);`))?.[1];
}

function pixels(value: string | undefined): number {
  const resolved = (value ?? "").replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => rootVars.get(name) ?? whole);
  return Array.from(resolved.matchAll(/(\d+)px/g), (m) => Number(m[1])).reduce((sum, n) => sum + n, 0);
}

describe("Menu sizes and focus ring", () => {
  it("makes each item 28px tall and the button at least 24px", () => {
    expect(declared(".item", "min-height")).toBe("calc(var(--ward-height-target) + var(--ward-space-1))");
    expect(pixels(declared(".item", "min-height"))).toBe(28);
    expect(pixels(declared(".trigger", "height"))).toBeGreaterThanOrEqual(24);
  });

  it("leaves the outline to Ward's global focus ring", () => {
    expect(menuCss).not.toMatch(/outline/);
    expect(wardCss).toContain(":focus-visible {\n  outline: var(--ward-focus-ring) solid var(--ward-color-focus);");
  });

  it("draws the ring at 3:1 on the panel and on a focused item in both themes", () => {
    const ratios = [tokens.color, tokens.dark].flatMap((theme) => [contrast(theme.focus, theme.surface), contrast(theme.focus, theme.accentTint)]);
    expect(ratios.every((ratio) => ratio >= 3)).toBe(true);
  });
});

// "Feed" starts only a description, so type-ahead on "f" must not land on that row.
const described: MenuItem[] = [
  { label: "Bring in new data", description: "Feed a new source in on a schedule." },
  { label: "Change data we load", description: "Add or fix fields in a feed you have." },
  { label: "Ask a question" },
];

describe("Described items", () => {
  it("names the item by its label and describes it by the line below", () => {
    render(<NewRequest entries={described} defaultOpen />);
    const item = screen.getByRole("menuitem", { name: "Bring in new data" });
    expect(item.getAttribute("aria-describedby")).not.toBeNull();
    expect(document.getElementById(item.getAttribute("aria-describedby") ?? "")?.textContent).toBe("Feed a new source in on a schedule.");
    expect(screen.getByRole("menuitem", { name: "Ask a question" }).hasAttribute("aria-describedby")).toBe(false);
  });

  it("matches type-ahead on the label only", () => {
    render(<NewRequest entries={described} />);
    openWith("ArrowUp");
    press("f");
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Ask a question" }));
  });

  it("reads the description at 4.5:1 on the panel and on a hovered row in both themes", () => {
    const ratios = [tokens.color, tokens.dark].flatMap((theme) => [contrast(theme.muted, theme.surface), contrast(theme.muted, theme.accentTint)]);
    expect(ratios.every((ratio) => ratio >= 4.5)).toBe(true);
    expect(declared(".description", "color")).toBe("var(--ward-color-muted)");
  });

  it("stacks the description under the label in the meta type, with a gap and block padding", () => {
    expect(declared(".text", "flex-direction")).toBe("column");
    expect(declared(".text", "gap")).toBe("calc(var(--ward-space-1) / 2)");
    expect(menuCss.match(/\.item:has\(\.description\) \{([^}]*)\}/)?.[1]).toContain("padding-block: var(--ward-space-1);");
    expect(declared(".description", "font")).toBe("var(--ward-type-meta)");
  });
});

const streams: MenuItem[] = [
  { label: "Data Engineering", href: "#/s/de" },
  { label: "Demo", href: "#/s/demo", current: true },
  { label: "Finance", href: "#/s/finance" },
];

describe("Current item", () => {
  it("marks only the current item, with a check mark and aria-current", () => {
    render(<NewRequest entries={streams} defaultOpen />);
    const demo = screen.getByRole("menuitem", { name: "Demo" });
    expect(demo.getAttribute("aria-current")).toBe("true");
    expect(demo.querySelectorAll("svg[aria-hidden='true']")).toHaveLength(1);
    for (const name of ["Data Engineering", "Finance"]) {
      const other = screen.getByRole("menuitem", { name });
      expect(other.hasAttribute("aria-current")).toBe(false);
      expect(other.querySelector("svg")).toBeNull();
    }
  });

  it("opens on the current item", () => {
    render(<NewRequest entries={streams} />);
    openWith("Enter");
    expect(focusedText()).toBe("Demo");
  });

  it("opens on the first enabled item when the current one is disabled", () => {
    render(<NewRequest entries={streams.map((item) => (item.current ? { ...item, disabled: true } : item))} />);
    openWith("Enter");
    expect(focusedText()).toBe("Data Engineering");
  });

  it("draws the check after the label and indents no row, so labels line up", () => {
    render(<NewRequest entries={streams} defaultOpen />);
    expect(screen.getByRole("menuitem", { name: "Demo" }).lastElementChild?.tagName).toBe("svg");
    const classes = screen.getAllByRole("menuitem").map((item) => item.className);
    expect(classes.every((each) => each === classes[0] && !each.includes(" "))).toBe(true);
    expect(menuCss).not.toMatch(/\.marked|position: absolute/);
  });

  it("fills the current row with sageTint, kept under the pointer, while other rows hover in accentTint", () => {
    const current = (state: string) => menuCss.match(new RegExp(`\\.item\\[aria-current="true"\\]${state}[^{]*\\{([^}]*)\\}`))?.[1] ?? "";
    expect(current("")).toContain("background-color: var(--ward-color-sageTint);");
    expect(current("")).toContain("color: var(--ward-color-sageInk);");
    expect(current(":hover")).toContain("background-color: var(--ward-color-sageTint);");
    expect(menuCss).toMatch(/\.item:hover,\n\.item:focus \{\n  background-color: var\(--ward-color-accentTint\);/);
  });

  it("reads sageInk on sageTint at 4.5:1 in both themes", () => {
    const ratios = [tokens.color, tokens.dark].map((theme) => contrast(theme.sageInk, theme.sageTint));
    expect(ratios.every((ratio) => ratio >= 4.5)).toBe(true);
  });

  it("leaves a menu with no current item unindented", () => {
    render(<NewRequest defaultOpen />);
    expect(screen.getAllByRole("menuitem").every((item) => item.className.split(" ").length === 1)).toBe(true);
    expect(screen.getAllByRole("menuitem").some((item) => item.hasAttribute("aria-current"))).toBe(false);
    expect(screen.getByRole("menu").querySelector("svg")).toBeNull();
  });

  it("draws the check at 3:1 on the panel and on a hovered row in both themes", () => {
    const ratios = [tokens.color, tokens.dark].flatMap((theme) => [contrast(theme.sageInk, theme.surface), contrast(theme.sageInk, theme.accentTint)]);
    expect(ratios.every((ratio) => ratio >= 3)).toBe(true);
    expect(declared(".check", "color")).toBe("var(--ward-color-sageInk)");
  });
});

const parted: MenuItem = { label: "KPI Config", description: "3 waiting for you", icon: <i data-testid="avatar" />, trailing: <b>3</b>, current: true };

describe("Icon and trailing parts", () => {
  it("draws the icon, the label and description, the trailing node, then the check, named by the label", () => {
    render(<NewRequest entries={[parted, { label: "Demo" }]} defaultOpen />);
    const row = screen.getByRole("menuitem", { name: "KPI Config" });
    const parts = Array.from(row.children);
    expect(parts.map((part) => part.getAttribute("class"))).toEqual(["icon", "text", "trailing", "check"].map((name) => expect.stringContaining(name)));
    expect(parts[0].getAttribute("aria-hidden")).toBe("true");
    expect(within(row).getByTestId("avatar")).toBeDefined();
    expect(document.getElementById(row.getAttribute("aria-describedby") ?? "")?.textContent).toBe("3 waiting for you");
  });

  it("names a row with only an icon by its label, with no description", () => {
    render(<NewRequest entries={[{ label: "Demo", icon: <i /> }]} defaultOpen />);
    const row = screen.getByRole("menuitem", { name: "Demo" });
    expect(row.hasAttribute("aria-describedby")).toBe(false);
  });

  it("keeps the icon in a 22px column and the trailing node at the end", () => {
    expect(pixels(declared(".icon", "width"))).toBe(22);
    expect(declared(".icon", "flex")).toBe("none");
    expect(declared(".label", "flex")).toBe("1");
    expect(declared(".trailing", "flex")).toBe("none");
  });
});

describe("Ghost trigger", () => {
  it("drops the ring and chevron and fills with selected while open", () => {
    render(
      <MenuButton label="Switch" variant="ghost">
        <Menu entries={[{ label: "Demo" }]} />
      </MenuButton>,
    );
    const opener = screen.getByRole("button", { name: "Switch" });
    expect(opener.className.split(" ")).toHaveLength(2);
    expect(declared(".ghost", "box-shadow")).toBe("none");
    expect(declared(".ghost", "background-image")).toBe("none");
    expect(menuCss).toMatch(/\.ghost\[aria-expanded="true"\] \{\n  background-color: var\(--ward-color-selected\);/);
  });

  it("keeps the field ring when no variant is asked for", () => {
    render(<NewRequest />);
    expect(button().className.split(" ")).toHaveLength(1);
  });
});

const many: MenuItem[] = ["Data Engineering", "Demo", "Finance", "KPI Config", "Marketing", "Payroll", "Risk", "Sales", "Treasury"].map((label) => ({ label, href: `#/s/${label}` }));

function Streams({ entries, onPick = vi.fn() }: { entries: MenuEntry[]; onPick?: (label: string) => void }) {
  const picked = entries.map((entry) => (entry === "separator" || "items" in entry ? entry : { ...entry, onSelect: () => onPick(entry.label), href: undefined }));
  return (
    <MenuButton label="Switch stream">
      <Menu entries={picked} find={{ placeholder: "Find a stream" }} />
    </MenuButton>
  );
}

const find = () => screen.getByRole("searchbox", { name: "Find a stream" }) as HTMLInputElement;
const labels = () => screen.getAllByRole("menuitem").map((item) => item.textContent);
const openStreams = () => fireEvent.click(screen.getByRole("button", { name: "Switch stream" }));

describe("Find row", () => {
  it("shows first once the menu has eight items, and filters rows by label", () => {
    render(<Streams entries={many} />);
    openStreams();
    expect(screen.getByRole("menu").previousElementSibling?.contains(find())).toBe(true);
    fireEvent.change(find(), { target: { value: "kp" } });
    expect(labels()).toEqual(["KPI Config"]);
  });

  it("does not show with fewer items than from", () => {
    render(<Streams entries={many.slice(0, 7)} />);
    openStreams();
    expect(screen.queryByRole("searchbox")).toBeNull();
  });

  it("keeps a keep group whole, hides a hide group and drops a group with no match while a query is typed", () => {
    const entries: MenuEntry[] = [
      { heading: "Recent", items: many.slice(0, 2), whileFinding: "hide" },
      { heading: "All", items: many },
      "separator",
      { heading: "More", items: [{ label: "All streams" }], whileFinding: "keep" },
    ];
    render(<Streams entries={entries} />);
    openStreams();
    expect(screen.getAllByRole("group")).toHaveLength(3);
    fireEvent.change(find(), { target: { value: "kp" } });
    expect(labels()).toEqual(["KPI Config", "All streams"]);
    expect(screen.getAllByRole("separator")).toHaveLength(1);
    fireEvent.change(find(), { target: { value: "demo" } });
    expect(labels()).toEqual(["Demo", "All streams"]);
    fireEvent.change(find(), { target: { value: "zz" } });
    expect(labels()).toEqual(["All streams"]);
    expect(screen.queryByRole("separator")).toBeNull();
  });

  it("drops a separator left at either end or beside another", () => {
    const entries: MenuEntry[] = ["separator", { label: "Alpha" }, "separator", { label: "Beta" }, "separator", { label: "Gamma" }];
    expect(findEntries(entries, "a")).toEqual([{ label: "Alpha" }, "separator", { label: "Beta" }, "separator", { label: "Gamma" }]);
    expect(findEntries(entries, "alp")).toEqual([{ label: "Alpha" }]);
    expect(findEntries(entries, "gam")).toEqual([{ label: "Gamma" }]);
  });

  it("says no matches when nothing is left", () => {
    render(<Streams entries={many} />);
    openStreams();
    fireEvent.change(find(), { target: { value: "zz" } });
    expect(screen.queryAllByRole("menuitem")).toHaveLength(0);
    expect(screen.getByText("No matches")).toBeDefined();
  });
});

describe("Find row keys", () => {
  it("takes a printable key typed on a row, instead of type-ahead", () => {
    render(<Streams entries={many} />);
    screen.getByRole("button", { name: "Switch stream" }).focus();
    press("Enter");
    expect(focusedText()).toBe("Data Engineering");
    press("k");
    expect(document.activeElement).toBe(find());
    expect(find().value).toBe("k");
  });

  it("moves to the first row on ArrowDown and the last on ArrowUp, leaving the arrows to the list", () => {
    render(<Streams entries={many} />);
    openStreams();
    find().focus();
    press("ArrowDown");
    expect(focusedText()).toBe("Data Engineering");
    press("ArrowDown");
    expect(focusedText()).toBe("Demo");
    find().focus();
    press("ArrowUp");
    expect(focusedText()).toBe("Treasury");
  });

  it("picks the first row on Enter and closes on Escape", () => {
    const onPick = vi.fn();
    render(<Streams entries={many} onPick={onPick} />);
    openStreams();
    fireEvent.change(find(), { target: { value: "fin" } });
    find().focus();
    press("Enter");
    expect(onPick).toHaveBeenCalledWith("Finance");
    expect(screen.queryByRole("menu")).toBeNull();
    openStreams();
    find().focus();
    press("Escape");
    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Switch stream" }));
  });

  it("closes when Tab leaves the find row", () => {
    render(<Streams entries={many} />);
    openStreams();
    find().focus();
    press("Tab");
    fireEvent.blur(find());
    expect(screen.queryByRole("menu")).toBeNull();
  });
});

describe("Edges box and row sizes", () => {
  it("takes the edges box's left and width, and still opens under the trigger", () => {
    const layout = stubLayout({ width: 1024, height: 768 }, { width: 160, height: 120 });
    const box = { current: null as HTMLDivElement | null };
    render(
      <div ref={(el) => void (box.current = el)}>
        <MenuButton label="Switch">
          <Menu entries={[{ label: "Demo" }]} edges={box} />
        </MenuButton>
      </div>,
    );
    const opener = screen.getByRole("button", { name: "Switch" });
    layout.place(box.current as HTMLElement, { left: 20, top: 90, width: 220, height: 120 });
    layout.place(opener, { left: 28, top: 100, width: 204, height: 36 });
    fireEvent.click(opener);
    const panel = screen.getByRole("menu").parentElement as HTMLElement;
    expect([panel.style.top, panel.style.left, panel.style.getPropertyValue("--ward-anchor-width")]).toEqual(["140px", "20px", "220px"]);
    expect(declared(".edged", "width")).toBe("var(--ward-anchor-width)");
    expect(declared(".edged", "max-width")).toBe("none");
  });

  it("makes rows 36px when large and 44px when touch", () => {
    const rule = (size: string) => menuCss.match(new RegExp(`\\.${size} \\.item \\{([^}]*)\\}`))?.[1]?.match(/min-height: ([^;]+);/)?.[1];
    expect(pixels(rule("large"))).toBe(36);
    expect(pixels(rule("touch"))).toBe(44);
    render(
      <MenuButton label="Switch" defaultOpen>
        <Menu entries={[{ label: "Demo" }]} size="touch" />
      </MenuButton>,
    );
    expect((screen.getByRole("menu").parentElement as HTMLElement).className).toContain("touch");
  });
});
