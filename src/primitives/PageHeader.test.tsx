import { act, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ruleBody } from "../test-css";
import { Btn } from "./Btn";
import { PageHeader } from "./PageHeader";

const crumb = [{ label: "Studio", href: "/studio" }, { label: "Data engineering" }];

describe("PageHeader", () => {
  it("carries the page's only h1", () => {
    render(<PageHeader crumb={crumb} title="Data engineering" actions={[]} />);
    expect(screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent)).toEqual(["Data engineering"]);
  });

  it("shows every action while they fit", () => {
    render(
      <PageHeader crumb={crumb} title="Data engineering" actions={[<Btn key="a">Configure</Btn>, <Btn key="b" variant="primary">New stream</Btn>]} />,
    );
    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual(["Configure", "New stream"]);
  });

  it("owns the connection marker the top bar refuses to carry", () => {
    render(<PageHeader crumb={crumb} title="Data engineering" actions={[]} connection={{ connection: "live", since: "2026-09-06T02:14:00Z" }} />);
    expect(screen.getByRole("status").textContent).toContain("LIVE");
  });

  it("leaves the marker out when the page has no feed", () => {
    render(<PageHeader crumb={crumb} title="Data engineering" actions={[]} />);
    expect(screen.queryByRole("status")).toBeNull();
  });
});

// A 300px row whose actions measure 400px: the header has to collapse them.
function narrowLayout(): void {
  vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} unobserve() {} });
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(300);
  vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(function (this: HTMLElement) {
    return this.getAttribute("aria-hidden") === "true" ? 400 : 0;
  });
}

const twoActions = [<Btn key="a">Configure</Btn>, <Btn key="b" variant="primary">New stream</Btn>];

describe("PageHeader on a narrow row", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("folds the actions behind a closed disclosure", () => {
    narrowLayout();
    render(<PageHeader crumb={crumb} title="Data engineering" actions={twoActions} />);
    const more = screen.getByRole("button", { name: "More actions" });
    expect(more.getAttribute("aria-expanded")).toBe("false");
    expect(more.hasAttribute("aria-haspopup")).toBe(false);
    expect(screen.queryByRole("button", { name: "Configure" })).toBeNull();
  });

  it("opens a panel holding every action, and Escape closes it back onto the toggle", () => {
    narrowLayout();
    render(<PageHeader crumb={crumb} title="Data engineering" actions={twoActions} />);
    const more = screen.getByRole("button", { name: "More actions" });
    fireEvent.click(more);
    expect(more.getAttribute("aria-expanded")).toBe("true");
    const panel = document.getElementById(more.getAttribute("aria-controls") ?? "");
    expect(Array.from(panel?.querySelectorAll("button") ?? [], (b) => b.textContent)).toEqual(["Configure", "New stream"]);
    fireEvent.keyDown(screen.getByRole("button", { name: "Configure" }), { key: "Escape" });
    expect(more.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(more);
  });

  it("hands the click to onOverflow and renders no panel of its own", () => {
    narrowLayout();
    const onOverflow = vi.fn();
    render(<PageHeader crumb={crumb} title="Data engineering" actions={twoActions} onOverflow={onOverflow} />);
    const more = screen.getByRole("button", { name: "More actions" });
    fireEvent.click(more);
    expect(onOverflow).toHaveBeenCalledTimes(1);
    expect(more.getAttribute("aria-haspopup")).toBe("menu");
    expect(document.querySelector("[data-ward-overflow-panel]")).toBeNull();
  });
});

const advisor = <a key="advisor" href="/advisor">Ask the advisor first</a>;

describe("PageHeader with link actions on a narrow row", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("shows a lone link instead of folding it behind ···", () => {
    narrowLayout();
    render(<PageHeader crumb={crumb} title="New request" actions={[advisor]} />);
    expect(screen.getByRole("link", { name: "Ask the advisor first" }).closest("[data-ward-actions]")).not.toBeNull();
    expect(screen.queryByRole("button", { name: "More actions" })).toBeNull();
  });

  it("treats any element carrying an href as a link", () => {
    narrowLayout();
    const RouterLink = ({ href, children }: { href: string; children: string }) => <a href={href}>{children}</a>;
    render(<PageHeader crumb={crumb} title="Advisor" actions={[<RouterLink key="raise" href="/raise">Write the request yourself</RouterLink>]} />);
    expect(screen.getByRole("link", { name: "Write the request yourself" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "More actions" })).toBeNull();
  });

  it("still folds two links behind ···", () => {
    narrowLayout();
    render(<PageHeader crumb={crumb} title="Intake" actions={[advisor, <a key="raise" href="/raise">Write the request yourself</a>]} />);
    expect(screen.getByRole("button", { name: "More actions" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Ask the advisor first" })).toBeNull();
  });

  it("still folds a lone button, and a lone link with more items", () => {
    narrowLayout();
    const { unmount } = render(<PageHeader crumb={crumb} title="Data engineering" actions={[<Btn key="a">Configure</Btn>]} />);
    expect(screen.getByRole("button", { name: "More actions" })).toBeTruthy();
    unmount();
    render(<PageHeader crumb={crumb} title="New request" actions={[advisor]} more={[<Btn key="rules">Rule builder</Btn>]} />);
    expect(screen.getByRole("button", { name: "More actions" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Ask the advisor first" })).toBeNull();
  });
});

const moreItems = [<Btn key="rules">Rule builder</Btn>, <Btn key="intake">Intake</Btn>];

function panelOf(toggle: HTMLElement): string[] {
  const panel = document.getElementById(String(toggle.getAttribute("aria-controls"))) as HTMLElement;
  return panel.hidden ? [] : Array.from(panel.querySelectorAll("button"), (b) => String(b.textContent));
}

describe("PageHeader with more items", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("draws one ··· before the actions that shows and hides the more items", () => {
    render(<PageHeader crumb={crumb} title="Data engineering" actions={twoActions} more={moreItems} />);
    const strip = document.querySelector("[data-ward-actions]") as HTMLElement;
    expect(Array.from(strip.querySelectorAll("button"), (b) => b.getAttribute("aria-label") ?? b.textContent)).toEqual(["More actions", "Configure", "New stream"]);
    const more = screen.getByRole("button", { name: "More actions" });
    expect(panelOf(more)).toEqual([]);
    fireEvent.click(more);
    expect(more.getAttribute("aria-expanded")).toBe("true");
    expect(panelOf(more)).toEqual(["Rule builder", "Intake"]);
    fireEvent.click(more);
    expect(more.getAttribute("aria-expanded")).toBe("false");
    expect(panelOf(more)).toEqual([]);
  });

  it("closes on Escape and hands focus back to ···", () => {
    render(<PageHeader crumb={crumb} title="Data engineering" actions={twoActions} more={moreItems} />);
    const more = screen.getByRole("button", { name: "More actions" });
    fireEvent.click(more);
    fireEvent.keyDown(screen.getByRole("button", { name: "Intake" }), { key: "Escape" });
    expect(more.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(more);
  });

  it("keeps a single ··· when collapsed, listing the more items then the actions", () => {
    narrowLayout();
    render(<PageHeader crumb={crumb} title="Data engineering" actions={twoActions} more={moreItems} />);
    const toggles = screen.getAllByRole("button", { name: "More actions" });
    expect(toggles).toHaveLength(1);
    fireEvent.click(toggles[0] as HTMLElement);
    expect(panelOf(toggles[0] as HTMLElement)).toEqual(["Rule builder", "Intake", "Configure", "New stream"]);
  });

  it("draws no ··· without more items while the actions fit", () => {
    render(<PageHeader crumb={crumb} title="Data engineering" actions={twoActions} more={[]} />);
    expect(screen.queryByRole("button", { name: "More actions" })).toBeNull();
    expect(document.querySelector("[data-ward-overflow-panel]")).toBeNull();
  });
});

describe("PageHeader deciding to collapse with more items", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  // Each measured control is 120px on a 300px row: two actions fit, two plus ··· do not.
  it("counts the ··· when measuring whether the actions fit", () => {
    vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} unobserve() {} });
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(300);
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(function (this: HTMLElement) {
      return this.getAttribute("aria-hidden") === "true" ? this.childElementCount * 120 : 0;
    });
    render(<PageHeader crumb={crumb} title="Data engineering" actions={twoActions} more={moreItems} />);
    expect(screen.queryByRole("button", { name: "Configure" })).toBeNull();
    expect(screen.getAllByRole("button", { name: "More actions" })).toHaveLength(1);
  });
});

// Like a real ResizeObserver, resize() reports only to observers watching that element.
function watchedLayout(headingWidth = 0): { measureWidth: { value: number }; resize: (target: Element) => void } {
  const observers: Array<{ callback: () => void; targets: Element[] }> = [];
  vi.stubGlobal("ResizeObserver", class {
    targets: Element[] = [];
    constructor(callback: () => void) { observers.push({ callback, targets: this.targets }); }
    observe(target: Element) { this.targets.push(target); }
    disconnect() { this.targets.length = 0; }
    unobserve() {}
  });
  const measureWidth = { value: 400 };
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(300);
  vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(function (this: HTMLElement) {
    if (this.querySelector(":scope > div > h1")) return headingWidth;
    return this.getAttribute("aria-hidden") === "true" ? measureWidth.value : 0;
  });
  const resize = (target: Element) => observers.filter((o) => o.targets.includes(target)).forEach((o) => act(o.callback));
  return { measureWidth, resize };
}

describe("PageHeader measuring its row", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  // Measured in a 400px fallback font the actions fold; the web font narrows them to 250px, which fits the 300px row.
  it("shows the actions again when the loaded font narrows them to fit", () => {
    const { measureWidth, resize } = watchedLayout();
    const { container } = render(<PageHeader crumb={crumb} title="Data engineering" actions={twoActions} />);
    expect(screen.queryByRole("button", { name: "Configure" })).toBeNull();
    measureWidth.value = 250;
    resize(container.querySelector("[data-ward-measure]") as Element);
    expect(screen.getByRole("button", { name: "Configure" })).toBeTruthy();
  });

  // A 200px heading beside 150px of actions overflows a 300px row; stacked at phone width, they fit under it.
  it("counts the heading beside the actions, but not above them", () => {
    const { measureWidth, resize } = watchedLayout(200);
    measureWidth.value = 150;
    const { container } = render(<PageHeader crumb={crumb} title="Data engineering" actions={twoActions} />);
    expect(screen.queryByRole("button", { name: "Configure" })).toBeNull();
    const row = container.querySelector("h1")?.closest("[data-density] > div:nth-child(2)") as HTMLElement;
    row.style.flexDirection = "column";
    resize(row);
    expect(screen.getByRole("button", { name: "Configure" })).toBeTruthy();
  });
});

describe("PageHeader consequence hint", () => {
  const consequence = "14 in flight across 3 streams";

  it("puts the hint on the consequence line, leaving its text as is", () => {
    render(<PageHeader crumb={crumb} title="Data engineering" consequence={consequence} consequenceHint="Items running, held or blocked" />);
    const line = screen.getByText(consequence);
    expect(line.getAttribute("title")).toBe("Items running, held or blocked");
    expect(line.textContent).toBe(consequence);
  });

  it("adds no title without a hint", () => {
    render(<PageHeader crumb={crumb} title="Data engineering" consequence={consequence} />);
    expect(screen.getByText(consequence).hasAttribute("title")).toBe(false);
  });
});

describe("PageHeader keeps the way back when the crumb stops at the parent", () => {
  const trail = [{ label: "Admin", href: "/admin" }, { label: "Credentials", href: "/admin/credentials" }];
  const links = () => screen.queryAllByRole("link").map((a) => [a.textContent, a.getAttribute("href")]);
  const currentSteps = () => document.querySelectorAll("nav[aria-label='Breadcrumb'] [aria-current]").length;

  it("links every step left after it drops the leaf that repeats the title, and marks none current", () => {
    render(<PageHeader crumb={[...trail, { label: "Secret storage", href: "/admin/credentials/storage" }]} title="Secret storage" />);
    expect(links()).toEqual([["Admin", "/admin"], ["Credentials", "/admin/credentials"]]);
    expect(currentSteps()).toBe(0);
  });

  it("keeps the leaf current and unlinked when it differs from the title", () => {
    render(<PageHeader crumb={[...trail, { label: "Secret storage", href: "/admin/credentials/storage" }]} title="Where secrets live" />);
    expect(links()).toEqual([["Admin", "/admin"], ["Credentials", "/admin/credentials"]]);
    expect(document.querySelector("nav[aria-label='Breadcrumb'] [aria-current='page']")?.textContent).toBe("Secret storage");
  });

  it("links the last step of a crumb the app already trimmed, when told it stops at the parent", () => {
    render(<PageHeader crumb={trail} crumbCurrent={false} title="Secret storage" />);
    expect(links()).toEqual([["Admin", "/admin"], ["Credentials", "/admin/credentials"]]);
    expect(currentSteps()).toBe(0);
  });

  it("keeps the last step current when told the crumb ends at this page", () => {
    render(<PageHeader crumb={trail} crumbCurrent title="Where secrets live" />);
    expect(links()).toEqual([["Admin", "/admin"]]);
    expect(currentSteps()).toBe(1);
  });
});

describe("PageHeader says its name once", () => {
  const steps = () => Array.from(document.querySelectorAll("nav[aria-label='Breadcrumb'] li")).map((li) => li.textContent?.replace("›", "").trim());
  const chips = [{ role: "meta" as const, label: "Relay only" }, { role: "running" as const, label: "Draft" }];

  it("drops a crumb leaf that repeats the title, in any case or spacing", () => {
    render(<PageHeader crumb={[{ label: "Studio", href: "/studio" }, { label: " data Engineering" }]} title="Data engineering" />);
    expect(steps()).toEqual(["Studio"]);
  });

  it("keeps a leaf that differs from the title", () => {
    render(<PageHeader crumb={[{ label: "Board", href: "/board" }, { label: "DE-008" }]} title="Claim line dedup thresholds" />);
    expect(steps()).toEqual(["Board", "DE-008"]);
  });

  it("keeps a leaf that is only part of the title, or the title only part of the leaf", () => {
    const { unmount } = render(<PageHeader crumb={[{ label: "Find" }]} title="Find item" />);
    expect(steps()).toEqual(["Find"]);
    unmount();
    render(<PageHeader crumb={[{ label: "Find item" }]} title="Find" />);
    expect(steps()).toEqual(["Find item"]);
  });

  it("drops only the leaf, not an earlier step with the title's words", () => {
    render(<PageHeader crumb={[{ label: "Tracker", href: "/tracker" }, { label: "Backlog" }]} title="Tracker" />);
    expect(steps()).toEqual(["Tracker", "Backlog"]);
  });

  it("renders no Breadcrumb when the only step is the title", () => {
    render(<PageHeader crumb={[{ label: "Find item" }]} title="Find item" />);
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("renders no Breadcrumb for an empty or missing crumb", () => {
    const { unmount } = render(<PageHeader crumb={[]} title="Queue" />);
    expect(screen.queryByRole("navigation")).toBeNull();
    unmount();
    render(<PageHeader title="Queue" />);
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("puts the chips on the line under the title, before the consequence", () => {
    const { container } = render(<PageHeader crumb={crumb} chips={chips} title="Data engineering" consequence="Priya Nayar · 16 members" />);
    const order = Array.from(container.querySelectorAll("h1, [class*='chip'], p")).map((el) => el.textContent);
    expect(order[0]).toBe("Data engineering");
    expect(order.at(-1)).toBe("Priya Nayar · 16 members");
    expect(order).toContain("Relay only");
    expect(container.querySelector("header")?.firstElementChild?.textContent).toBe("Studio");
  });

  it("shows the chips under the title with no consequence and no crumb", () => {
    const { container } = render(<PageHeader chips={chips} title="Session 12" />);
    const h1 = container.querySelector("h1") as HTMLElement;
    expect(h1.nextElementSibling?.textContent).toBe("Relay onlyDraft");
  });

  it("renders no empty meta line or chip row", () => {
    const { container, unmount } = render(<PageHeader title="Queue" />);
    expect(container.querySelector("[class*='meta'], [class*='chips']")).toBeNull();
    unmount();
    const withConsequence = render(<PageHeader title="Queue" consequence="Two open" />);
    expect(withConsequence.container.querySelector("[class*='chips']")).toBeNull();
  });

  it("wraps the meta line and its chips, so no chip is cut", () => {
    const path = "src/primitives/PageHeader.module.css";
    expect(ruleBody(path, ".meta")).toBe("display: flex;\nflex-wrap: wrap;\nalign-items: center;\ngap: var(--ward-space-2);\nmin-width: 0");
    expect(ruleBody(path, ".chips")).toBe("display: flex;\nflex-wrap: wrap;\ngap: var(--ward-space-2);\nmin-width: 0");
  });
});

describe("PageHeader chips beside a long crumb", () => {
  it("wrap under the crumb in place of shrinking under a rail", () => {
    const css = join(dirname(fileURLToPath(import.meta.url)), "PageHeader.module.css");
    expect(ruleBody(css, ".context")).toContain("flex-wrap: wrap");
    expect(readFileSync(css, "utf8")).toMatch(/\n\.chips \{[^}]*flex-wrap: wrap;/);
  });
});
