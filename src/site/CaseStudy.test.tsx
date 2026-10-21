import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseStudy, factsFrom } from "./CaseStudy";

function terms(container: HTMLElement) {
  return Array.from(container.querySelectorAll("dl dt"), (dt) => [dt.textContent, dt.nextElementSibling?.textContent]);
}

describe("CaseStudy (#318)", () => {
  it("renders the title as the h1, the summary and the body", () => {
    render(
      <CaseStudy title="Small batches" summary="It stopped failing at night.">
        <p>Body text.</p>
      </CaseStudy>,
    );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Small batches");
    expect(screen.getByText("It stopped failing at night.").tagName).toBe("P");
    expect(screen.getByText("Body text.")).toBeTruthy();
  });

  it("shows role, period, focus and stack as facts and related links in a labelled nav", () => {
    const { container } = render(
      <CaseStudy
        title="T"
        summary="S"
        role="Lead"
        period="2024 to 2025"
        focus={["Cost"]}
        stack={["Python", "SQL"]}
        related={[{ href: "/w/a", label: "Article A" }]}
      >
        <p>B</p>
      </CaseStudy>,
    );
    expect(terms(container)).toEqual([
      ["Role", "Lead"],
      ["Period", "2024 to 2025"],
      ["Focus", "Cost"],
      ["Stack", "PythonSQL"],
    ]);
    const nav = screen.getByRole("navigation", { name: "Related" });
    expect(nav.querySelector("a")?.getAttribute("href")).toBe("/w/a");
    expect(screen.getByRole("complementary", { name: "Case study facts" })).toBeTruthy();
  });

  it("renders no fact list, nav or aside with only a title, summary and body", () => {
    const { container } = render(
      <CaseStudy title="T" summary="S" focus={[]} related={[]}>
        <p>B</p>
      </CaseStudy>,
    );
    expect(container.querySelector("dl")).toBeNull();
    expect(container.querySelector("nav")).toBeNull();
    expect(container.querySelector("aside")).toBeNull();
  });

  it("keeps facts in order and drops missing or empty ones", () => {
    const facts = factsFrom([
      ["A", "one"],
      ["B", undefined],
      ["C", ""],
      ["D", []],
      ["E", "five"],
    ]);
    expect(facts.map((f) => [f.term, f.value])).toEqual([
      ["A", "one"],
      ["E", "five"],
    ]);
  });
});
