import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import tokens from "../../tokens.json";
import { Prose, ProseHeading } from "./Prose";
import { slug } from "./slug";
import { declared, resolve } from "../test-site";

describe("Prose (#309)", () => {
  it("holds the text column to 680px", () => {
    expect(declared("Prose.module.css", ".prose", "max-inline-size")).toBe("var(--ward-width-measure)");
    expect(resolve("var(--ward-width-measure)")).toBe("680px");
    expect(tokens.width.measure).toBe(680);
  });

  it("scrolls a code block sideways and never wraps it", () => {
    expect(declared("Prose.module.css", ".prose pre", "overflow-x")).toBe("auto");
    expect(declared("Prose.module.css", ".prose pre", "white-space")).toBe("pre");
  });

  it("sets h2, h3 and h4 at 22, 18 and 15px", () => {
    const size = (sel: string) => Number(/ (\d+)px\//.exec(resolve(declared("Prose.module.css", sel, "font")))?.[1]);
    expect([size(".prose h2"), size(".prose h3"), size(".prose h4")]).toEqual([22, 18, 15]);
  });

  it("never underlines a link", () => {
    expect(declared("Prose.module.css", ".prose a", "text-decoration")).toBe("none");
  });

  it("renders its children", () => {
    render(
      <Prose>
        <p>Body text</p>
      </Prose>,
    );
    expect(screen.getByText("Body text").tagName).toBe("P");
  });

  it("gives a heading an id and a named link to itself", () => {
    render(<ProseHeading level={3}>What changed</ProseHeading>);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading.id).toBe("what-changed");
    const link = screen.getByRole("link", { name: "Link to section: What changed" });
    expect(link.getAttribute("href")).toBe("#what-changed");
  });

  it("keeps an id given by the caller", () => {
    render(<ProseHeading level={2} id="custom">Cost</ProseHeading>);
    expect(screen.getByRole("heading", { level: 2 }).id).toBe("custom");
    expect(screen.getByRole("link").getAttribute("href")).toBe("#custom");
  });
});

describe("slug (#309)", () => {
  it.each([
    ["What changed", "what-changed"],
    ["  Cost & FinOps: 2026 ", "cost-finops-2026"],
    ["Café déjà vu", "cafe-deja-vu"],
    ["Step 1 -- load", "step-1-load"],
    ["???", ""],
  ])("%j becomes %j", (text, id) => {
    expect(slug(text)).toBe(id);
  });
});
