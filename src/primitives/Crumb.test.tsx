import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Crumb } from "./Crumb";

const crumbCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "Crumb.module.css"), "utf8");

function ruleBlock(selector: string): string {
  return crumbCss.match(new RegExp(`(?:^|\\n)\\${selector}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
}

const path = [
  { label: "Studio", href: "/studio" },
  { label: "Streams", href: "/studio/streams" },
  { label: "Data engineering" },
];

describe("Crumb", () => {
  it("marks only the last step as the current page", () => {
    render(<Crumb path={path} />);
    const current = screen.getAllByRole("listitem").filter((li) => li.querySelector('[aria-current="page"]'));
    expect(current.map((li) => li.querySelector('[aria-current="page"]')?.textContent)).toEqual(["Data engineering"]);
    expect(current).toEqual([screen.getAllByRole("listitem")[2]]);
  });

  it("does not link the current page", () => {
    render(<Crumb path={path} />);
    expect(screen.getAllByRole("link").map((a) => a.textContent)).toEqual(["Studio", "Streams"]);
  });

  it("does not link the current page even when it carries an href", () => {
    render(<Crumb path={[...path.slice(0, 2), { label: "Data engineering", href: "/studio/streams/de" }]} />);
    expect(screen.queryByRole("link", { name: "Data engineering" })).toBeNull();
  });

  it("carries inline chips inside the breadcrumb landmark", () => {
    render(<Crumb path={path} chips={[{ role: "stream", label: "DATA-ENG", streamStep: 1 }]} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.textContent).toContain("DATA-ENG");
  });

  it("separates the steps with a chevron that screen readers skip", () => {
    const { container } = render(<Crumb path={path} />);
    expect(screen.getByRole("list").textContent).toBe("Studio›Streams›Data engineering");
    const chevrons = [...container.querySelectorAll('[aria-hidden="true"]')].map((el) => el.textContent);
    expect(chevrons).toEqual(["›", "›"]);
    expect(screen.getByRole("link", { name: "Studio" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Streams" })).toBeTruthy();
  });

  it("draws a step you can go back to as an underlined link", () => {
    expect(ruleBlock(".link")).toMatch(/color:\s*var\(--ward-color-blue\);/);
    expect(ruleBlock(".link")).toMatch(/text-decoration:\s*underline;/);
  });
});
