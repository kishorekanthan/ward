import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
