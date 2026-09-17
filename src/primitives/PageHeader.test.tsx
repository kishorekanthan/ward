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
