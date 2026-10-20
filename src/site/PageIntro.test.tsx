import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageIntro } from "./PageIntro";
import { Section } from "./Section";
import { declared, resolve } from "../test-site";

describe("PageIntro (#312)", () => {
  it("renders the title as an h1 by default, with eyebrow and lead", () => {
    render(<PageIntro eyebrow="Case study" title="Batch loads" lead="How it went." />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Batch loads");
    expect(screen.getByText("Case study").tagName).toBe("P");
    expect(screen.getByText("How it went.").tagName).toBe("P");
  });

  it("follows headingLevel", () => {
    render(<PageIntro title="Batch loads" headingLevel={2} />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Batch loads");
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
  });
});

describe("Section (#312)", () => {
  it("is a region named by its h2", () => {
    render(
      <Section title="Selected work">
        <p>Body</p>
      </Section>,
    );
    const region = screen.getByRole("region", { name: "Selected work" });
    expect(region.tagName).toBe("SECTION");
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Selected work");
  });

  it("follows headingLevel and keeps a given id", () => {
    render(
      <Section title="Writing" headingLevel={3} id="writing">
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByRole("heading", { level: 3 }).id).toBe("writing-title");
    expect(screen.getByRole("region", { name: "Writing" }).id).toBe("writing");
  });

  it("renders a trailing link", () => {
    render(
      <Section title="Work" link={{ href: "/work", label: "All work" }}>
        <p>Body</p>
      </Section>,
    );
    expect(screen.getByRole("link", { name: "All work" }).getAttribute("href")).toBe("/work");
  });

  it("takes its padding from the space token chosen", () => {
    const { container } = render(
      <Section title="Work" space="9">
        <p>Body</p>
      </Section>,
    );
    expect(container.querySelector("section")?.getAttribute("data-space")).toBe("9");
    const expected: [string, string][] = [["6", "24px"], ["7", "32px"], ["8", "48px"], ["9", "64px"]];
    for (const [step, px] of expected) {
      const value = declared("Section.module.css", `.section[data-space="${step}"]`, "padding-block");
      expect(value).toBe(`var(--ward-space-${step})`);
      expect(resolve(value)).toBe(px);
    }
  });
});
