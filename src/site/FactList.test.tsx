import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FactList } from "./FactList";
import { LinkList } from "./LinkList";

describe("FactList (#310)", () => {
  it("renders dt and dd pairs in the order given", () => {
    const { container } = render(
      <FactList
        facts={[
          { term: "Role", value: "Lead engineer" },
          { term: "Period", value: "2024 to 2026" },
          { term: "Stack", value: <strong>Postgres</strong> },
        ]}
      />,
    );
    const dl = container.querySelector("dl");
    expect(dl).not.toBeNull();
    const cells = Array.from(dl?.querySelectorAll("dt, dd") ?? [], (el) => `${el.tagName}:${el.textContent}`);
    expect(cells).toEqual(["DT:Role", "DD:Lead engineer", "DT:Period", "DD:2024 to 2026", "DT:Stack", "DD:Postgres"]);
  });
});

describe("LinkList (#310)", () => {
  it("renders a labelled nav with one item per link", () => {
    render(
      <LinkList
        label="Related"
        links={[
          { href: "/a", label: "First", note: "Article" },
          { href: "/b", label: "Second" },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Related" });
    const items = within(nav).getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual(["FirstArticle", "Second"]);
    expect(within(nav).getByRole("link", { name: "First" }).getAttribute("href")).toBe("/a");
  });

  it("refuses a script href", () => {
    render(<LinkList label="Bad" links={[{ href: "javascript:alert(1)", label: "Run" }]} />);
    expect(screen.getByRole("link", { name: "Run" }).getAttribute("href")).toBe("#");
  });
});
