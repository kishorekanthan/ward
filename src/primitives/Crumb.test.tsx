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

  it("shows every step's full label on hover, linked or not", () => {
    const { container } = render(<Crumb path={[{ label: "Studio" }, ...path.slice(1)]} />);
    const titled = [...container.querySelectorAll("li [title]")].map((el) => [el.getAttribute("title"), el.textContent]);
    expect(titled).toEqual([
      ["Studio", "Studio"],
      ["Streams", "Streams"],
      ["Data engineering", "Data engineering"],
    ]);
  });

  it("lets the step list shrink in its row, so a long step cuts rather than widening the header", () => {
    expect(ruleBlock(".root")).toMatch(/min-width:\s*0;/);
    expect(ruleBlock(".list")).toMatch(/min-width:\s*0;/);
    expect(ruleBlock(".item")).toMatch(/text-overflow:\s*ellipsis;/);
  });

  it("draws a step you can go back to as a link with no underline and a tinted hover", () => {
    expect(ruleBlock(".link")).toMatch(/color:\s*var\(--ward-color-link\);/);
    expect(ruleBlock(".link")).toMatch(/text-decoration:\s*none;/);
    expect(ruleBlock(".link:hover")).toMatch(/background:\s*var\(--ward-color-accentTint\);/);
  });
});
