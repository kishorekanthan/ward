import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Hero } from "./Hero";
import { declared, resolve } from "../test-site";

describe("Hero (#314)", () => {
  it("makes the headline the only h1", () => {
    render(<Hero eyebrow="Data engineer" title="Cheap data platforms" lead="Ten years." />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s.map((h) => h.textContent)).toEqual(["Cheap data platforms"]);
    expect(screen.getAllByRole("heading")).toHaveLength(1);
  });

  it("marks a hero with no visual and gives the text the full width", () => {
    const { container } = render(<Hero title="Cheap data platforms" />);
    expect(container.firstElementChild?.getAttribute("data-visual")).toBe("none");
    expect(declared("Hero.module.css", '.hero[data-visual="none"] .text', "max-inline-size")).toBe("none");
  });

  it("marks a hero with a visual and renders it", () => {
    const { container } = render(<Hero title="Cheap data platforms" visual={<img alt="Diagram" src="/d.png" />} />);
    expect(container.firstElementChild?.getAttribute("data-visual")).toBe("beside");
    expect(screen.getByRole("img", { name: "Diagram" })).toBeTruthy();
  });

  it("renders the first action as the main one", () => {
    render(
      <Hero
        title="Cheap data platforms"
        actions={[
          { href: "/work", label: "See the work" },
          { href: "/about", label: "About me" },
        ]}
      />,
    );
    const [main, quiet] = screen.getAllByRole("link");
    expect([main.textContent, main.getAttribute("href")]).toEqual(["See the work", "/work"]);
    expect(main.className).not.toBe(quiet.className);
  });

  it("renders two actions that share an href without a duplicate key (#323)", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <Hero
        title="Cheap data platforms"
        actions={[
          { href: "mailto:me@example.com", label: "Email me" },
          { href: "mailto:me@example.com", label: "Ask about work" },
        ]}
      />,
    );
    expect(screen.getAllByRole("link").map((a) => a.textContent)).toEqual(["Email me", "Ask about work"]);
    expect(errors.mock.calls.map((call) => String(call[0])).filter((message) => message.includes("same key"))).toEqual([]);
    errors.mockRestore();
  });

  it("sets the headline at the 26px scale top", () => {
    expect(resolve(declared("Hero.module.css", ".title", "font"))).toMatch(/ 26px\//);
  });
});
