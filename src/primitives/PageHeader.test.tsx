import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
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
