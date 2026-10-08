import { readFileSync } from "node:fs";
import type { ReactNode } from "react";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AppShell } from "./AppShell";
import { stubMatchMedia } from "../test-setup";

const sourceRoot = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(sourceRoot, "AppShell.module.css"), "utf8");
const wardCss = readFileSync(join(sourceRoot, "..", "ward.css"), "utf8");
const golden = JSON.parse(readFileSync(join(sourceRoot, "..", "goldens", "app-shell.json"), "utf8")) as {
  topbar: Record<string, string>;
  mark: Record<string, string>;
  navigation: Record<string, string>;
  active: Record<string, string>;
  hover: string;
  pageInset: Record<string, string>;
};

const rootBlock = wardCss.slice(wardCss.indexOf(":root {"), wardCss.indexOf("}", wardCss.indexOf(":root {")));
const rootVars = new Map(Array.from(rootBlock.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2]]));

// Token references are resolved on both sides, so a tokenised value still has to equal the recorded measurement.
function resolved(text: string): string {
  return text.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => rootVars.get(name) ?? whole).replace(/'/g, '"');
}

// Bodies of every rule whose selector list names this class on its own.
function rulesFor(className: string): string[] {
  const rules = Array.from(css.matchAll(/([^{}]+)\{([^}]*)\}/g));
  return rules.filter((m) => m[1].split(",").some((sel) => sel.trim() === "." + className)).map((m) => m[2]);
}

function isBordered(el: Element): boolean {
  const names = Array.from(el.classList, (c) => c.replace(/^_(.+)_[0-9a-f]+$/, "$1"));
  return names.some((name) => rulesFor(name).some((body) => /\bborder(-(top|right|bottom|left))?\s*:/.test(body)));
}

function rule(selector: string): string {
  const start = css.indexOf(selector + " {");
  return start === -1 ? "" : resolved(css.slice(start, css.indexOf("}", start)));
}

const slots = {
  sidebar: <nav aria-label="Sections">nav</nav>,
  header: <div>header</div>,
  children: <p>page</p>,
};

describe("AppShell studio grid", () => {
  it("gives the centre column the main landmark and leaves the flanking tracks unlabelled", () => {
    render(<AppShell {...slots} rail={<div>rail</div>} />);
    expect(screen.getByRole("main")).not.toBeNull();
    expect(screen.getByRole("navigation", { name: "Sections" })).not.toBeNull();
    expect(screen.queryByRole("complementary")).toBeNull();
  });

  it("keeps the header outside the page inset so it can carry its own padding", () => {
    const { container } = render(<AppShell {...slots} />);
    const main = screen.getByRole("main");
    const page = container.querySelector("main > div:last-child") as HTMLElement;
    expect(main.firstElementChild?.textContent).toBe("header");
    expect(page.textContent).toBe("page");
    expect(page.contains(screen.getByText("header"))).toBe(false);
  });

  it("does not draw the third track when there is no rail", () => {
    const { container, unmount } = render(<AppShell {...slots} />);
    const shell = container.firstElementChild as HTMLElement;
    expect(shell.getAttribute("data-rail")).toBe("false");
    expect(shell.children).toHaveLength(2);
    unmount();

    const withRail = render(<AppShell {...slots} rail={<div>rail</div>} />);
    const grid = withRail.container.firstElementChild as HTMLElement;
    expect(grid.getAttribute("data-rail")).toBe("true");
    expect(grid.children).toHaveLength(3);
  });

  it("treats a null rail as absent, so a conditional render does not leave an empty column", () => {
    const { container } = render(<AppShell {...slots} rail={null} />);
    const shell = container.firstElementChild as HTMLElement;
    expect(shell.getAttribute("data-rail")).toBe("false");
    expect(shell.children).toHaveLength(2);
  });

  it("renders the page body even with no header", () => {
    render(<AppShell sidebar={slots.sidebar}>{slots.children}</AppShell>);
    expect(screen.getByText("page")).not.toBeNull();
    expect(screen.getByRole("main").children).toHaveLength(1);
  });
});

describe("AppShell studio frame", () => {
  it("is exactly the viewport tall on wide screens, with each column scrolling inside itself", () => {
    expect(rule(".app")).toContain("height: 100dvh;");
    expect(rule(".app")).toContain("grid-template-rows: minmax(0, 1fr);");
    expect(rule(".app")).not.toContain("min-height");
    for (const column of [".side", ".page", ".rail"]) expect(rule(column)).toContain("overflow-y: auto;");
    for (const column of [".side", ".main", ".page", ".rail"]) expect(rule(column)).toContain("min-height: 0;");
  });

  it("lets the document scroll again as one column below 792px", () => {
    const narrow = css.slice(css.indexOf("@media (max-width: 791.98px)"));
    expect(narrow).toMatch(/\.app,\s*\.app\[data-rail="false"\] \{[^}]*grid-template-columns: minmax\(0, 1fr\);[^}]*height: auto;[^}]*min-height: 100dvh;/);
    expect(narrow).toMatch(/\.side,\s*\.rail,\s*\.page \{\s*overflow-y: visible;/);
  });
});

const navLinks = (
  <nav aria-label="Sections">
    <a href="#/board">Board</a>
    <a href="#/studio">Studio</a>
    <span>Agents</span>
  </nav>
);

const drawerShell = (props: { sidebarLabel?: string } = {}) => (
  <AppShell sidebar={navLinks} header={<div>Claims</div>} {...props}>
    <p>page</p>
  </AppShell>
);

function openDrawer(): { toggle: HTMLElement; dialog: HTMLElement } {
  const toggle = screen.getByRole("button", { name: "Menu" });
  fireEvent.click(toggle);
  return { toggle, dialog: screen.getByRole("dialog", { name: "Menu" }) };
}

describe("AppShell sidebar drawer below 792px", () => {
  const original = window.matchMedia;
  afterEach(() => {
    window.matchMedia = original;
  });

  it("puts a collapsed Menu toggle at the start of the header row and keeps the sidebar out of the page", () => {
    stubMatchMedia(true);
    render(drawerShell());
    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("aria-controls")).not.toBeNull();
    expect(screen.getByRole("main").firstElementChild?.textContent).toBe("MenuClaims");
    expect(screen.queryByRole("navigation", { name: "Sections" })).toBeNull();
  });

  it("names the toggle and the drawer from sidebarLabel", () => {
    stubMatchMedia(true);
    render(drawerShell({ sidebarLabel: "Sections" }));
    fireEvent.click(screen.getByRole("button", { name: "Sections" }));
    expect(screen.getByRole("dialog", { name: "Sections" })).not.toBeNull();
  });

  it("opens the sidebar in the modal dialog the toggle controls and moves focus into it", () => {
    stubMatchMedia(true);
    render(drawerShell());
    const { toggle, dialog } = openDrawer();
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(dialog.id).toBe(toggle.getAttribute("aria-controls"));
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.contains(screen.getByRole("navigation", { name: "Sections" }))).toBe(true);
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("traps Tab: from the last link focus wraps to the close button", () => {
    stubMatchMedia(true);
    render(drawerShell());
    const { dialog } = openDrawer();
    screen.getByRole("link", { name: "Studio" }).focus();
    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Close" }));
  });

  it("closes on Escape and returns focus to the toggle", () => {
    stubMatchMedia(true);
    render(drawerShell());
    const { toggle } = openDrawer();
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });

  it("closes from its close button and returns focus to the toggle", () => {
    stubMatchMedia(true);
    render(drawerShell());
    const { toggle } = openDrawer();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(toggle);
  });

  it("closes on a press on the backdrop but not on the panel", () => {
    stubMatchMedia(true);
    render(drawerShell());
    const { toggle, dialog } = openDrawer();
    fireEvent.click(dialog);
    expect(screen.queryByRole("dialog")).not.toBeNull();
    fireEvent.click(dialog.parentElement as HTMLElement);
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(toggle);
  });

  it("closes when a link inside is followed, but not on a press on plain text", () => {
    stubMatchMedia(true);
    render(drawerShell());
    openDrawer();
    fireEvent.click(screen.getByText("Agents"));
    expect(screen.queryByRole("dialog")).not.toBeNull();
    fireEvent.click(screen.getByRole("link", { name: "Board" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes the drawer and puts the sidebar back in its column when the window widens", () => {
    const media = stubMatchMedia(true);
    render(drawerShell());
    openDrawer();
    act(() => media.setMatches(false));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByRole("button", { name: "Menu" })).toBeNull();
    expect(screen.getByRole("navigation", { name: "Sections" }).closest("main")).toBeNull();
    act(() => media.setMatches(true));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("draws no toggle at 792px and wider, where the sidebar keeps its column", () => {
    stubMatchMedia(false);
    render(drawerShell());
    expect(screen.queryByRole("button", { name: "Menu" })).toBeNull();
    expect(screen.getByRole("navigation", { name: "Sections" })).not.toBeNull();
    expect(screen.getByRole("main").firstElementChild?.textContent).toBe("Claims");
  });

  it("folds below 792px, the rail-stack breakpoint, not at another width", () => {
    stubMatchMedia(false);
    const stubbed = window.matchMedia;
    const queries: string[] = [];
    window.matchMedia = ((query: string) => {
      queries.push(query);
      return stubbed(query);
    }) as typeof window.matchMedia;
    render(drawerShell());
    expect(queries).toContain("(max-width: 791.98px)");
  });
});

describe("AppShell top bar", () => {
  it("renders the reference identity and navigation hierarchy", () => {
    render(
      <AppShell
        active="studio"
        actor="P. Nayar"
        metadata="platform admin · DE"
        destinations={[
          { id: "board", label: "Board", href: "#/" },
          { id: "studio", label: "Studio", href: "#/studio" },
        ]}
      >
        Content
      </AppShell>,
    );

    expect(document.querySelector("[data-ward-shell-mark]")).not.toBeNull();
    expect(screen.getByRole("navigation", { name: "Primary" }).textContent).toBe("BoardStudio");
    expect(screen.getByRole("link", { name: "Studio" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByText("P. Nayar")).not.toBeNull();
    expect(screen.getByText("platform admin · DE")).not.toBeNull();
    expect(screen.queryByRole("main")).toBeNull();
  });

  it("draws the name, separator and role inside one chip", () => {
    render(<AppShell actor="P. Nayar" metadata="platform admin · DE">Content</AppShell>);
    const chip = screen.getByText("P. Nayar").parentElement;
    expect(chip).toBe(screen.getByText("platform admin · DE").parentElement);
    expect(chip?.textContent).toBe("P. Nayar · platform admin · DE");
  });

  it("borders only the identity chip, never the name inside it", () => {
    expect(rule(".metadata")).toMatch(/border: 1px solid/);
    const nameRules = rulesFor("actor");
    expect(nameRules.length).toBeGreaterThan(0);
    for (const body of nameRules) expect(body).not.toMatch(/\b(border|padding|min-height)\b/);
  });

  it("draws no border around or inside the identity chip but its own", () => {
    render(<AppShell actor="P. Nayar" metadata="platform admin · DE">Content</AppShell>);
    const chip = screen.getByText("P. Nayar").parentElement as HTMLElement;
    const identity = chip.parentElement as HTMLElement;
    expect([identity, ...identity.querySelectorAll("*")].filter(isBordered)).toEqual([chip]);
  });

  it("places consumer tools in the bar after the identity, not in the page content", () => {
    const { container } = render(
      <AppShell actor="P. Nayar" tools={<button type="button">Sign out</button>}>
        <p>Content</p>
      </AppShell>,
    );
    const header = container.querySelector("header");
    expect(header?.lastElementChild?.textContent).toBe("Sign out");
    expect(screen.getByText("Content").closest("header")).toBeNull();
  });

  it("matches the measurements captured from the reference shell", () => {
    const topbar = rule(".topbar");
    const mark = rule(".mark");
    const navigation = rule(".nav");
    const link = rule(".nav a");
    const active = rule('.nav a[aria-current="page"]');
    const g = (value: string) => resolved(value);

    // The comps declare no bar or link height; content sets it. The current link is a filled pill, never an underline bar.
    expect(topbar).not.toContain("height");
    expect(link).not.toContain("height");
    expect(topbar).toContain(`padding: ${g(golden.topbar.padding)}`);
    expect(topbar).toContain(`gap: ${g(golden.topbar.gap)}`);
    expect(topbar).toContain(`background: ${g(golden.topbar.background)}`);
    expect(topbar).toContain(`border-bottom: ${g(golden.topbar.border)}`);
    expect(topbar).toContain(`overflow: ${golden.topbar.overflow}`);
    expect(mark).toContain(`width: ${g(golden.mark.width)}`);
    expect(mark).toContain(`height: ${g(golden.mark.height)}`);
    expect(mark).toContain(`background: ${g(golden.mark.background)}`);
    expect(navigation).toContain(`gap: ${g(golden.navigation.gap)}`);
    expect(navigation).toContain(`margin-left: ${g(golden.navigation.marginLeft)}`);
    expect(navigation).toContain(`overflow-x: ${golden.navigation.overflow}`);
    expect(navigation).toContain(`font: ${g(golden.navigation.font)}`);
    expect(link).toContain(`color: ${g(golden.navigation.color)}`);
    expect(link).toContain(`border-radius: ${golden.active.radius}`);
    expect(rule(".nav a:hover")).toContain(`background: ${g(golden.hover)}`);
    expect(active).toContain(`background: ${g(golden.active.background)}`);
    expect(active).not.toContain("box-shadow");
    expect(active).toContain(`color: ${g(golden.active.text)}`);
  });

  it("insets both page columns once by the comp page padding and exposes that inset for full-bleed bands", () => {
    for (const column of [rule(".content"), rule(".page")]) {
      expect(column).toContain(`padding: ${golden.pageInset.padding}`);
      expect(column).toContain(`--ward-page-inset: ${golden.pageInset.inset}`);
    }
  });
});

describe("AppShell top-bar tools at phone width", () => {
  const original = window.matchMedia;
  afterEach(() => {
    window.matchMedia = original;
  });

  const shell = (tools?: ReactNode) => (
    <AppShell actor="P. Nayar" tools={tools}>
      <p>Content</p>
    </AppShell>
  );
  const signOut = <button type="button">Sign out</button>;

  it("hides the tools behind a collapsed Settings toggle when narrow", () => {
    stubMatchMedia(true);
    render(shell(signOut));
    const toggle = screen.getByRole("button", { name: "Settings" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("button", { name: "Sign out" })).toBeNull();
    expect(toggle.closest("header")).not.toBeNull();
  });

  it("opens the tools in the panel the toggle controls, under the bar", () => {
    stubMatchMedia(true);
    const { container } = render(shell(signOut));
    const toggle = screen.getByRole("button", { name: "Settings" });
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    const panel = document.getElementById(toggle.getAttribute("aria-controls") ?? "");
    expect(panel?.contains(screen.getByRole("button", { name: "Sign out" }))).toBe(true);
    expect(panel?.closest("header")).toBeNull();
    expect(container.querySelector("header")?.nextElementSibling).toBe(panel);
  });

  it("closes on Escape and returns focus to the toggle", () => {
    stubMatchMedia(true);
    render(shell(signOut));
    const toggle = screen.getByRole("button", { name: "Settings" });
    fireEvent.click(toggle);
    fireEvent.keyDown(screen.getByRole("button", { name: "Sign out" }), { key: "Tab" });
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(screen.getByRole("button", { name: "Sign out" }), { key: "Escape" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("button", { name: "Sign out" })).toBeNull();
    expect(document.activeElement).toBe(toggle);
  });

  it("collapses below 768px, not at another width", () => {
    stubMatchMedia(true);
    const stubbed = window.matchMedia;
    const queries: string[] = [];
    window.matchMedia = ((query: string) => {
      queries.push(query);
      return stubbed(query);
    }) as typeof window.matchMedia;
    render(shell(signOut));
    expect(queries).toContain("(max-width: 767.98px)");
  });

  it("closes again on a second press", () => {
    stubMatchMedia(true);
    render(shell(signOut));
    const toggle = screen.getByRole("button", { name: "Settings" });
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("button", { name: "Sign out" })).toBeNull();
  });

  it("names the toggle from toolsLabel", () => {
    stubMatchMedia(true);
    render(
      <AppShell tools={signOut} toolsLabel="Account">
        <p>Content</p>
      </AppShell>,
    );
    expect(screen.getByRole("button", { name: "Account" })).not.toBeNull();
  });

  it("puts the tools back inline when the bar widens", () => {
    const media = stubMatchMedia(true);
    render(shell(signOut));
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    act(() => media.setMatches(false));
    expect(screen.queryByRole("button", { name: "Settings" })).toBeNull();
    expect(screen.getByRole("button", { name: "Sign out" }).closest("header")).not.toBeNull();
  });

  it("keeps the tools inline with no toggle when wide", () => {
    stubMatchMedia(false);
    render(shell(signOut));
    expect(screen.queryByRole("button", { name: "Settings" })).toBeNull();
    expect(screen.getByRole("button", { name: "Sign out" }).closest("header")).not.toBeNull();
  });

  it("draws no toggle without tools, at either width", () => {
    for (const narrow of [true, false]) {
      stubMatchMedia(narrow);
      const { unmount } = render(shell());
      expect(screen.queryByRole("button")).toBeNull();
      unmount();
    }
  });
});

// Five 64px links on an 80px pitch (16px gap): 384px of links. At 375px the bar leaves the nav 240px; at 1280px it takes all 384.
const NAV = { phone: 240, wide: 384, links: 384 };
const fiveDestinations = ["Home", "Board", "Studio", "Intake", "Admin"].map((label) => ({ id: label.toLowerCase(), label, href: `#/${label.toLowerCase()}` }));

function navRect(left: number, width: number): DOMRect {
  return { left, right: left + width, width, top: 0, bottom: 40, height: 40, x: left, y: 0, toJSON: () => ({}) } as DOMRect;
}

function isPrimaryNav(el: Element | null): el is HTMLElement {
  return el?.getAttribute("aria-label") === "Primary";
}

function mockNavLayout(navWidth: number): void {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
    return isPrimaryNav(this) ? navWidth : 0;
  });
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(function (this: HTMLElement) {
    return isPrimaryNav(this) ? NAV.links : 0;
  });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const nav = this.parentElement;
    if (!isPrimaryNav(nav)) return navRect(0, navWidth);
    return navRect(Array.from(nav.children).indexOf(this) * 80 - nav.scrollLeft, 64);
  });
}

const navShell = (active: string) => (
  <AppShell destinations={fiveDestinations} active={active}>
    <p>Content</p>
  </AppShell>
);

describe("AppShell Primary nav overflow", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const fades = (nav: HTMLElement) => [nav.hasAttribute("data-fade-start"), nav.hasAttribute("data-fade-end")];

  it("fades the end at phone width, then only the start once scrolled to the last link", () => {
    mockNavLayout(NAV.phone);
    render(navShell("home"));
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(fades(nav)).toEqual([false, true]);
    nav.scrollLeft = 72;
    fireEvent.scroll(nav);
    expect(fades(nav)).toEqual([true, true]);
    // 384px of links in a 240px window end at scrollLeft 144.
    nav.scrollLeft = 144;
    fireEvent.scroll(nav);
    expect(fades(nav)).toEqual([true, false]);
  });

  it("shows no fade at 1280px, where every link fits", () => {
    mockNavLayout(NAV.wide);
    render(navShell("admin"));
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(fades(nav)).toEqual([false, false]);
    expect(nav.scrollLeft).toBe(0);
  });

  it("scrolls the current link past the right edge fully into view on mount", () => {
    mockNavLayout(NAV.phone);
    render(navShell("admin"));
    const nav = screen.getByRole("navigation", { name: "Primary" });
    // Admin spans 320-384 in a 240px window: 384 - 240 = 144, which leaves it at 176-240.
    expect(nav.scrollLeft).toBe(144);
    const admin = screen.getByRole("link", { name: "Admin" }).getBoundingClientRect();
    expect([admin.left, admin.right]).toEqual([176, 240]);
    expect(fades(nav)).toEqual([true, false]);
  });

  it("stops the current link clear of the end fade, the nav's 24px scroll-padding", () => {
    mockNavLayout(NAV.phone);
    const computed = window.getComputedStyle;
    vi.spyOn(window, "getComputedStyle").mockImplementation((el) =>
      isPrimaryNav(el) ? ({ scrollPaddingInlineStart: "24px" } as CSSStyleDeclaration) : computed(el),
    );
    render(navShell("intake"));
    // Intake ends at 304: 304 - 240 + 24 = 88.
    expect(document.querySelector<HTMLElement>('nav[aria-label="Primary"]')?.scrollLeft).toBe(88);
  });

  it("masks each faded edge as wide as the scroll-padding that keeps a revealed link clear of it", () => {
    expect(rule(".nav")).toContain("scroll-padding-inline: 24px;");
    expect(rule(".nav[data-fade-start]")).toContain("mask-image: linear-gradient(to right, transparent, currentColor 24px);");
    expect(rule(".nav[data-fade-end]")).toContain("mask-image: linear-gradient(to left, transparent, currentColor 24px);");
    expect(rule(".nav[data-fade-start][data-fade-end]")).toContain(
      "mask-image: linear-gradient(to right, transparent, currentColor 24px, currentColor calc(100% - 24px), transparent);",
    );
  });
});
