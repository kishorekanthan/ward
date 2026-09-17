import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Mark } from "./Mark";

describe("Mark", () => {
  it("carries a glyph when met or failed and none when unmet", () => {
    const { container, rerender } = render(<Mark state="met" />);
    const mark = () => container.querySelector("[data-testid='mark']") as HTMLElement;
    expect(mark().textContent).toBe("✓");
    rerender(<Mark state="failed" />);
    expect(mark().textContent).toBe("✕");
    // A glyph on an unmet box would read as met at a glance.
    rerender(<Mark state="unmet" />);
    expect(mark().textContent).toBe("");
  });

  it("announces itself only when it is the thing carrying the state", () => {
    const { container } = render(<Mark state="met" label="passed" />);
    const labelled = screen.getByRole("img", { name: "passed" });
    expect(labelled).not.toBeNull();
    expect(labelled.getAttribute("aria-hidden")).toBeNull();
    // Unlabelled it must be hidden, not an unnamed img, because its ancestor already announces the state.
    const bare = render(<Mark state="met" />).container.querySelector("[data-testid='mark']") as HTMLElement;
    expect(bare.getAttribute("aria-hidden")).toBe("true");
    expect(bare.getAttribute("role")).toBeNull();
    expect(container).toBeDefined();
  });

  it("distinguishes the three states in the DOM, not only by colour", () => {
    for (const state of ["met", "unmet", "failed"] as const) {
      const { container } = render(<Mark state={state} />);
      expect(container.querySelector(`[data-state='${state}']`)).not.toBeNull();
    }
  });
});
