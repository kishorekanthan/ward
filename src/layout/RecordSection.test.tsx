import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RecordSection } from "./RecordSection";
import { SubjectRail } from "./SubjectRail";

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
});

describe("SubjectRail ruled", () => {
  it("marks the ruled grid only when asked", () => {
    const { container, rerender } = render(<SubjectRail rail={<p>r</p>}><p>s</p></SubjectRail>);
    expect((container.firstElementChild as HTMLElement).hasAttribute("data-ruled")).toBe(false);
    rerender(<SubjectRail rail={<p>r</p>} ruled><p>s</p></SubjectRail>);
    expect((container.firstElementChild as HTMLElement).getAttribute("data-ruled")).toBe("true");
  });
});
