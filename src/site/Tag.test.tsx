import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contrast } from "../../scripts/contrast.mjs";
import { Eyebrow } from "./Eyebrow";
import { Tag } from "./Tag";
import { declared, resolve, type Theme } from "../test-site";

const THEMES: Theme[] = ["light", "dark"];
const size = (font: string) => Number(/ (\d+)px\//.exec(font)?.[1]);

describe("Tag and Eyebrow (#307)", () => {
  it("renders a plain tag as text and a linked tag as a link", () => {
    render(
      <>
        <Tag label="Data platforms" />
        <Tag label="Cost" href="/topics/cost" />
      </>,
    );
    expect(screen.getByText("Data platforms").tagName).toBe("SPAN");
    expect(screen.getByRole("link", { name: "Cost" }).getAttribute("href")).toBe("/topics/cost");
  });

  it("renders an eyebrow as a paragraph, linked when given an href", () => {
    render(
      <>
        <Eyebrow>Flagship</Eyebrow>
        <Eyebrow href="/writing">Article</Eyebrow>
      </>,
    );
    expect(screen.getByText("Flagship").tagName).toBe("P");
    expect(screen.getByRole("link", { name: "Article" }).closest("p")).not.toBeNull();
  });

  it("refuses a script href", () => {
    render(<Tag label="Bad" href="javascript:alert(1)" />);
    expect(screen.getByRole("link", { name: "Bad" }).getAttribute("href")).toBe("#");
  });

  it("sets both at 13px", () => {
    expect(size(resolve(declared("Tag.module.css", ".tag", "font")))).toBe(13);
    expect(size(resolve(declared("Eyebrow.module.css", ".eyebrow", "font")))).toBe(13);
  });

  it("keeps every ink at 4.5:1 on its ground in both themes", () => {
    for (const theme of THEMES) {
      const tagGround = resolve(declared("Tag.module.css", ".tag", "background"), theme);
      const pairs: [string, string][] = [
        [declared("Tag.module.css", ".tag", "color"), tagGround],
        [declared("Tag.module.css", ".link", "color"), tagGround],
        [declared("Tag.module.css", ".link", "color"), resolve("var(--ward-color-accentTint)", theme)],
        [declared("Eyebrow.module.css", ".eyebrow", "color"), resolve("var(--ward-color-bg)", theme)],
        [declared("Eyebrow.module.css", ".eyebrow", "color"), resolve("var(--ward-color-surface)", theme)],
        [declared("Eyebrow.module.css", ".link", "color"), resolve("var(--ward-color-bg)", theme)],
      ];
      for (const [fg, bg] of pairs) expect(contrast(resolve(fg, theme), bg), `${theme} ${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("gives each link a focus ring and no underline", () => {
    for (const file of ["Tag.module.css", "Eyebrow.module.css"]) {
      expect(declared(file, ".link:focus-visible", "outline")).toBe("var(--ward-focus-ring) solid var(--ward-color-focus)");
      expect(declared(file, ".link", "text-decoration")).toBe("none");
    }
  });
});
