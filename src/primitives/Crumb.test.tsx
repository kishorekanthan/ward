import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Crumb } from "./Crumb";

const path = [
  { label: "Studio", href: "/studio" },
  { label: "Streams", href: "/studio/streams" },
  { label: "Data engineering" },
];

describe("Crumb", () => {
  it("marks only the last step as the current page", () => {
    render(<Crumb path={path} />);
    const current = screen.getAllByRole("listitem").filter((li) => li.querySelector('[aria-current="page"]'));
    expect(current.map((li) => li.textContent)).toEqual(["Data engineering"]);
  });

  it("does not link the current page", () => {
    render(<Crumb path={path} />);
    expect(screen.getAllByRole("link").map((a) => a.textContent)).toEqual(["Studio", "Streams"]);
  });

  it("carries inline chips inside the breadcrumb landmark", () => {
    render(<Crumb path={path} chips={[{ role: "stream", label: "DATA-ENG", streamStep: 1 }]} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.textContent).toContain("DATA-ENG");
  });
});
