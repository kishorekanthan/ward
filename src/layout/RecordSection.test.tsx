import { render, screen } from "@testing-library/react";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { injectModuleCss } from "../test-css";
import s from "./layout.module.css";
import { RecordSection } from "./RecordSection";
import { SubjectRail } from "./SubjectRail";

let removeCss = () => {};
afterEach(() => removeCss());

describe("RecordSection", () => {
  it("heads its block with a key band carrying the note", () => {
    render(<RecordSection title="Description" note="from Jira · never edited here"><p>body</p></RecordSection>);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toBe("Description");
    expect(heading.parentElement?.getAttribute("data-kind")).toBe("key");
    expect(heading.parentElement?.textContent).toBe("Descriptionfrom Jira · never edited here");
    expect(heading.closest("section")?.lastElementChild?.textContent).toBe("body");
  });

  it("names the block's padding so a criteria list and a rail block differ", () => {
    render(<RecordSection title="Acceptance criteria" pad="criteria"><p>rows</p></RecordSection>);
    expect(screen.getByText("rows").parentElement?.getAttribute("data-pad")).toBe("criteria");
  });

  it("is a labelled region only when a label is given", () => {
    const { rerender } = render(<RecordSection title="Cost"><p>x</p></RecordSection>);
    expect(screen.queryByRole("region")).toBeNull();
    rerender(<RecordSection title="Cost" label="Cost"><p>x</p></RecordSection>);
    expect(screen.getByRole("region", { name: "Cost" })).not.toBeNull();
  });

  it("sets an inline empty section as one row, title then sentence, with no empty-state card and no body", () => {
    const { container } = render(<RecordSection title="Clarifications" empty="inline">No questions asked on this item yet.</RecordSection>);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.parentElement?.textContent).toBe("ClarificationsNo questions asked on this item yet.");
    expect(container.querySelector("section")?.childElementCount).toBe(1);
    expect(container.querySelectorAll(".ward-emptystate")).toHaveLength(0);
    expect(container.querySelector("[data-pad]")).toBeNull();
  });

  it("caps a prose section's text at 72ch, which jsdom computes at 8px a ch, and leaves other sections unbounded", () => {
    removeCss = injectModuleCss(join(dirname(fileURLToPath(import.meta.url)), "layout.module.css"), s);
    render(<RecordSection title="Description" measure="prose"><p>prose</p></RecordSection>);
    render(<RecordSection title="History"><p>rows</p></RecordSection>);
    expect(getComputedStyle(screen.getByText("prose")).maxWidth).toBe("576px");
    expect(getComputedStyle(screen.getByText("rows")).maxWidth).toBe("none");
  });
});

describe("SubjectRail ruled", () => {
  it("marks the ruled grid only when asked", () => {
    const { container, rerender } = render(<SubjectRail rail={<p>r</p>}><p>s</p></SubjectRail>);
    expect((container.firstElementChild as HTMLElement).hasAttribute("data-ruled")).toBe(false);
    rerender(<SubjectRail rail={<p>r</p>} ruled><p>s</p></SubjectRail>);
    expect((container.firstElementChild as HTMLElement).getAttribute("data-ruled")).toBe("true");
  });
});
