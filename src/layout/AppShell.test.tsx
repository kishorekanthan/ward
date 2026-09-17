import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "./AppShell";

const sourceRoot = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(sourceRoot, "AppShell.module.css"), "utf8");
const wardCss = readFileSync(join(sourceRoot, "..", "ward.css"), "utf8");
const golden = JSON.parse(readFileSync(join(sourceRoot, "..", "goldens", "app-shell.json"), "utf8")) as {
  topbar: Record<string, string>;
  mark: Record<string, string>;
  navigation: Record<string, string>;
  active: Record<string, string>;
  pageInset: Record<string, string>;
};

const rootBlock = wardCss.slice(wardCss.indexOf(":root {"), wardCss.indexOf("}", wardCss.indexOf(":root {")));
const rootVars = new Map(Array.from(rootBlock.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2]]));

// Token references are resolved on both sides, so a tokenised value still has to equal the recorded measurement.
function resolved(text: string): string {
  return text.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => rootVars.get(name) ?? whole).replace(/'/g, '"');
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

    // The comps declare no bar or link height; content sets it, so the underline sits 4px under the label.
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
    expect(active).toContain(`calc(-1 * ${g(golden.active.underline)})`);
    expect(active).toContain(`padding-bottom: ${g(golden.active.paddingBottom)}`);
    expect(active).toContain(g("var(--ward-color-blue)"));
    expect(active).toContain(`color: ${g(golden.active.text)}`);
  });

  it("insets both page columns once by the comp page padding and exposes that inset for full-bleed bands", () => {
    for (const column of [rule(".content"), rule(".page")]) {
      expect(column).toContain(`padding: ${golden.pageInset.padding}`);
      expect(column).toContain(`--ward-page-inset: ${golden.pageInset.inset}`);
    }
  });
});
