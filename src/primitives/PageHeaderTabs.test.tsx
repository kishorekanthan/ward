import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Btn } from "./Btn";
import { PageHeader } from "./PageHeader";
import { Tabs } from "./Tabs";

const sourceRoot = dirname(fileURLToPath(import.meta.url));
const headerCss = readFileSync(join(sourceRoot, "PageHeader.module.css"), "utf8");
const tabsCss = readFileSync(join(sourceRoot, "Tabs.module.css"), "utf8");
const crumbCss = readFileSync(join(sourceRoot, "Crumb.module.css"), "utf8");
const wardCss = readFileSync(join(sourceRoot, "..", "ward.css"), "utf8");
const rootVars = new Map(Array.from(wardCss.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2]]));
const golden = JSON.parse(readFileSync(join(sourceRoot, "..", "goldens", "page-header-tabs.json"), "utf8")) as {
  pageHeader: Record<string, string>;
  tabs: { cap: number; levelOneUnderline: string; levelTwoUnderline: string };
};
const observers: ResizeObserverCallback[] = [];

function rule(css: string, selector: string): string {
  const start = css.indexOf(selector + " {");
  return start === -1 ? "" : css.slice(start, css.indexOf("}", start));
}

// Token references are resolved so a tokenised rule still has to equal the Admin comp's literal value.
function resolved(text: string): string {
  return text.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => rootVars.get(name) ?? whole).replace(/'/g, '"');
}

beforeEach(() => {
  const Stub = class {
    constructor(callback: ResizeObserverCallback) {
      observers.push(callback);
    }
    observe(): void {}
    disconnect(): void {}
    unobserve(): void {}
  };
  vi.stubGlobal("ResizeObserver", Stub);
});

afterEach(() => {
  observers.length = 0;
  vi.unstubAllGlobals();
});

describe("PageHeader", () => {
  it("keeps breadcrumb and chips above the title and consequence", () => {
    const { container } = render(
      <PageHeader
        crumb={[{ label: "Studio", href: "#/studio" }, { label: "Streams" }]}
        chips={[{ label: "Data Eng", role: "stream", streamStep: 1 }]}
        title="Board configuration"
        consequence="Changes affect every person opening this board."
        actions={[<Btn key="save" label="Save board" variant="primary" />]}
      />,
    );

    const header = container.querySelector("header") as HTMLElement;
    const context = header.firstElementChild as HTMLElement;
    expect(context.textContent).toBe("StudioStreamsData Eng");
    expect(header.querySelector("h1")?.textContent).toBe("Board configuration");
    expect(header.querySelector("p")?.textContent).toBe("Changes affect every person opening this board.");
  });

  it("uses the Admin comp head band, title and kicker type, and keeps action gaps stable", () => {
    const root = resolved(rule(headerCss, ".root"));
    const title = resolved(rule(headerCss, ".title"));
    const crumb = resolved(rule(crumbCss, ".item"));
    const measure = rule(headerCss, ".measure");

    expect(root).toContain(`padding: ${golden.pageHeader.padding};`);
    expect(root).toContain(`margin-inline: ${golden.pageHeader.bleed};`);
    expect(resolved(rule(headerCss, ".row"))).toContain(`align-items: ${golden.pageHeader.rowAlign};`);
    expect(title).toContain(`font: ${golden.pageHeader.titleFont};`);
    expect(title).toContain(`letter-spacing: ${golden.pageHeader.titleTracking};`);
    expect(crumb).toContain(`font: ${golden.pageHeader.crumbFont};`);
    expect(crumb).toContain(`letter-spacing: ${golden.pageHeader.crumbTracking};`);
    expect(crumb).toContain(`text-transform: ${golden.pageHeader.crumbTransform};`);
    expect(resolved(rule(headerCss, ".actions"))).toContain(`gap: ${golden.pageHeader.actionGap}`);
    expect(measure).toContain("visibility: hidden");
  });
});

describe("Tabs", () => {
  const sevenTabs = Array.from({ length: 7 }, (_, index) => ({ id: `tab-${index + 1}`, label: `Tab ${index + 1}` }));

  it("supports the seven-section admin cap and level-two current indicator", () => {
    render(<Tabs tabs={sevenTabs} active="tab-4" level={2} onChange={() => {}} label="Admin sections" />);

    expect(screen.getAllByRole("tab")).toHaveLength(golden.tabs.cap);
    expect(screen.getByRole("tab", { name: "Tab 4" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tablist").getAttribute("data-level")).toBe("2");
    expect(rule(tabsCss, '.tab[aria-selected="true"]')).toContain(golden.tabs.levelOneUnderline);
    expect(tabsCss).toContain(golden.tabs.levelTwoUnderline);
  });

  // Web pages render the panel themselves, so the id format is the contract they build against.
  it("points every tab at the panel id its page renders, and labels that panel back", () => {
    render(
      <>
        <Tabs tabs={[{ id: "overview", label: "Overview" }, { id: "policy", label: "Loop policy" }]} active="overview" onChange={() => {}} />
        <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview">
          Overview body
        </div>
      </>,
    );

    const tab = screen.getByRole("tab", { name: "Overview" });
    expect(tab.id).toBe("tab-overview");
    expect(tab.getAttribute("aria-controls")).toBe("panel-overview");
    expect(screen.getByRole("tab", { name: "Loop policy" }).getAttribute("aria-controls")).toBe("panel-policy");
    const panel = screen.getByRole("tabpanel", { name: "Overview" });
    expect(panel.id).toBe(tab.getAttribute("aria-controls"));
  });

  it("rejects an eighth tab instead of wrapping another screen section into the row", () => {
    expect(() => render(<Tabs tabs={[...sevenTabs, { id: "tab-8", label: "Tab 8" }]} active="tab-1" onChange={() => {}} />)).toThrow(`Tabs: 8 tabs exceeds the cap of ${golden.tabs.cap} — the set is fixed`);
  });
});
