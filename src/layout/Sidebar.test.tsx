import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sidebar, type SidebarAgent, type StudioSidebarProps } from "./Sidebar";

const nav = [
  { label: "Board", href: "/board" },
  { label: "Studio", href: "/studio", current: true },
];

const agents: SidebarAgent[] = [
  { label: "Claims Extract Reviewer", href: "/a/1", meta: "v7 draft · edited 12m ago", streamStep: 1, current: true },
  { label: "Component Deprecation", href: "/a/2", meta: "v2 live · 6 runs / 7d", streamStep: 2 },
  { label: "Vendor SLA Digest", href: "/a/3", meta: "paused 3 Sep", streamStep: 1, paused: true },
];

const wrap = (extra: Partial<StudioSidebarProps> = {}) =>
  render(
    <Sidebar
      brand="Trellis"
      nav={nav}
      agentsHeading="Agents"
      agents={agents}
      newAction={{ label: "New", href: "/studio/new" }}
      shared={{ heading: "Shared", links: [{ label: "Run history", href: "/shared/runs" }] }}
      {...extra}
    />,
  );

describe("Sidebar agent column", () => {
  it("names the navigation landmark after the brand so the column is findable", () => {
    wrap();
    expect(screen.getByRole("navigation", { name: "Trellis" })).not.toBeNull();
  });

  it("marks the current page with aria-current rather than styling alone", () => {
    wrap();
    expect(screen.getByRole("link", { name: "Studio" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "Board" }).getAttribute("aria-current")).toBeNull();
  });

  it("derives the agent count from the list so the heading cannot disagree with it", () => {
    const { container } = wrap();
    expect(container.textContent).toContain("Agents · 3");
  });

  it("counts zero agents rather than hiding the heading", () => {
    const { container } = wrap({ agents: [] });
    expect(container.textContent).toContain("Agents · 0");
  });

  it("renders the agents as a real list, not a stack of divs", () => {
    wrap();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("flags a paused agent on the row and its dot, which is what makes the dot hollow", () => {
    const { container } = wrap();
    expect(container.querySelectorAll('[data-paused="true"]')).toHaveLength(2);
  });

  it("takes the dot hue from the agent's stream, not from its state", () => {
    const { container } = wrap();
    const dots = Array.from(container.querySelectorAll("li a > span > span:first-child")) as HTMLElement[];
    expect(dots[0].style.getPropertyValue("--dot")).toBe("var(--ward-stream-1-id)");
    expect(dots[1].style.getPropertyValue("--dot")).toBe("var(--ward-stream-2-id)");
  });

  it("omits the shared footer entirely when there is none, rather than leaving an empty rule", () => {
    const { container } = wrap({ shared: undefined });
    expect(container.textContent).not.toContain("Shared");
  });

  it("refuses to render without a brand, because the landmark would have no name", () => {
    expect(() => wrap({ brand: "" })).toThrow("Sidebar: brand is required");
  });
});

const AGENT_LINKS = [
  { id: "claims-review", label: "Claims Extract Reviewer", href: "#/a/claims-review", note: "v7 draft" },
  { id: "drift-watch", label: "Schema Drift Watcher", href: "#/a/drift-watch", note: "v3 live" },
];

describe("Sidebar destination list", () => {
  it("names its own navigation region and carries a note under each label", () => {
    render(<Sidebar label="Agents" destinations={AGENT_LINKS} active="claims-review" />);
    const region = screen.getByRole("navigation", { name: "Agents" });
    const links = Array.from(region.querySelectorAll("a"));
    expect(links.map((link) => link.textContent)).toEqual(["Claims Extract Reviewerv7 draft", "Schema Drift Watcherv3 live"]);
    expect(links[0].getAttribute("aria-current")).toBe("page");
    expect(links[1].getAttribute("aria-current")).toBe(null);
  });

  it("keeps the default region name and omits the note line when no note is given", () => {
    render(<Sidebar items={[{ id: "home", label: "Home", href: "/" }]} />);
    const link = screen.getByRole("navigation", { name: "Sidebar" }).querySelector("a");
    expect(link?.textContent).toBe("Home");
    expect(link?.querySelectorAll("span")).toHaveLength(1);
  });
});
