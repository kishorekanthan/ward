import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import { contrast } from "../../scripts/contrast.mjs";
import { Menu, MenuButton, type MenuEntry, type MenuItem } from "./Menu";

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

afterEach(() => vi.useRealTimers());

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

  it("aligns the panel to the button's end edge only when asked", () => {
    const { rerender } = render(
      <MenuButton label="Account" defaultOpen>
        <Menu entries={[{ label: "Settings" }]} />
      </MenuButton>,
    );
    expect(screen.getByRole("menu").parentElement?.getAttribute("data-align")).toBe("start");
    rerender(
      <MenuButton label="Account" defaultOpen>
        <Menu entries={[{ label: "Settings" }]} align="end" />
      </MenuButton>,
    );
    expect(screen.getByRole("menu").parentElement?.getAttribute("data-align")).toBe("end");
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
