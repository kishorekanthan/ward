import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  it("is a heading carrying its index and title", () => {
    render(<SectionHeader index="01" title="Role and instructions" />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("01·Role and instructions");
  });

  it("speaks the counter once, inside the heading, and hides the visible copy", () => {
    render(<SectionHeader index="01" title="Role and instructions" counter="4 / 7" />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("01·Role and instructions · 4 / 7");
    const visible = screen.getAllByText("4 / 7").find((el) => el.tagName === "SPAN" && el.parentElement?.tagName === "DIV");
    expect(visible?.getAttribute("aria-hidden")).toBe("true");
  });

  it("puts the note on the label's row, not in the heading", () => {
    render(<SectionHeader index="02" title="Tools" note="only in the other case" />);
    const note = screen.getByText("only in the other case");
    expect(note.tagName).toBe("SPAN");
    expect(note.parentElement).toBe(screen.getByRole("heading", { level: 2 }).parentElement);
    cleanup();
    render(<SectionHeader index="02" title="Tools" />);
    expect(screen.queryByText("only in the other case")).toBeNull();
  });

  it("works with no index, which is the comp's plain section label", () => {
    render(<SectionHeader title="Description" note="from Jira · never edited here" />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Description");
  });
});

describe("SectionHeader key label", () => {
  it("marks the Board Item key label and keeps the default Studio head", () => {
    render(<SectionHeader kind="key" title="Live activity" />);
    expect(screen.getByRole("heading", { level: 2 }).parentElement?.getAttribute("data-kind")).toBe("key");
    cleanup();
    render(<SectionHeader title="Tools" />);
    expect(screen.getByRole("heading", { level: 2 }).parentElement?.getAttribute("data-kind")).toBe("micro");
  });

  it("puts a trailing marker after the heading on the label's row", () => {
    render(<SectionHeader kind="key" title="Live activity" trailing={<b>SSE connected</b>} />);
    const heading = screen.getByRole("heading", { level: 2 });
    const marker = screen.getByText("SSE connected");
    expect(heading.textContent).toBe("Live activity");
    expect(marker.parentElement?.parentElement).toBe(heading.parentElement);
    expect(heading.parentElement?.lastElementChild).toBe(marker.parentElement);
  });
});
