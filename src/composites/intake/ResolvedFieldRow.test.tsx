import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResolvedFieldRow, type ResolvedField } from "./ResolvedFieldRow";

const field: ResolvedField = { key: "Stream", value: "Data Engineering", evidence: "sess:8f21c4", state: "resolved" };

describe("ResolvedFieldRow", () => {
  it("asks for confirmation with a warn chip, not with a tick", () => {
    render(<ResolvedFieldRow field={{ ...field, state: "confirm" }} />);
    const chip = screen.getByText("CONFIRM");
    expect(chip.getAttribute("data-ward-chip")).toBe("warn");
    expect(screen.queryByLabelText("Resolved")).toBeNull();
  });

  // The comp's `.no` is a hollow 14x14, which is what Mark's unmet state draws.
  it("marks a resolved field met and an unresolved one as an empty box", () => {
    const { rerender } = render(<ResolvedFieldRow field={field} />);
    expect(screen.getByLabelText("Resolved").getAttribute("data-state")).toBe("met");
    rerender(<ResolvedFieldRow field={{ ...field, state: "unresolved" }} />);
    expect(screen.getByLabelText("Unresolved").getAttribute("data-state")).toBe("unmet");
    expect(screen.queryByText("CONFIRM")).toBeNull();
  });

  it("keeps evidence on one line, readable in full on hover", () => {
    render(<ResolvedFieldRow field={field} />);
    expect(screen.getByText("sess:8f21c4").getAttribute("title")).toBe("sess:8f21c4");
  });

  // jsdom computes no layout, so the structural claim is the testable one.
  it("stacks the evidence under its value rather than beside it", () => {
    render(<ResolvedFieldRow field={field} />);
    expect(screen.getByText("sess:8f21c4").parentElement).toBe(screen.getByText("Data Engineering").parentElement);
  });

  it("renders no evidence element when there is no evidence", () => {
    const { container } = render(<ResolvedFieldRow field={{ key: "Due", value: "—", state: "unresolved" }} />);
    const stack = screen.getByText("—").parentElement;
    expect(stack?.childElementCount).toBe(1);
    expect(container.querySelector("[title]")).toBeNull();
  });

  it("edits nothing", () => {
    const { container } = render(<ResolvedFieldRow field={field} />);
    expect(container.querySelector("input, button, textarea, select")).toBeNull();
  });

  it("keeps the row a list item with its web class hooks", () => {
    const { container } = render(<ResolvedFieldRow field={field} />);
    const row = container.querySelector(".ward-resfield") as HTMLElement;
    expect(row.tagName).toBe("LI");
    expect(row.getAttribute("data-state")).toBe("resolved");
    expect(row.querySelector(".ward-resfield-key")?.textContent).toBe("Stream");
    expect(row.querySelector(".ward-resfield-value")?.textContent).toBe("Data Engineering");
    expect(row.querySelector(".ward-resfield-evidence")?.textContent).toBe("sess:8f21c4");
    expect(row.querySelector(".ward-resfield-mark")).not.toBeNull();
  });
});
