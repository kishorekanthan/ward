import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Callout } from "./Callout";

describe("Callout", () => {
  it("refuses a callout with no ticket behind it", () => {
    expect(() => render(<Callout variant="info" ticket="">Cards never drag.</Callout>)).toThrow(/must cite the ticket/);
  });

  it("shows the ticket beside the sentence", () => {
    render(<Callout variant="warn" ticket="FL-231">Cards never drag.</Callout>);
    const note = screen.getByRole("note");
    expect(note.textContent).toContain("FL-231");
    expect(note.textContent).toContain("Cards never drag.");
  });

  it("distinguishes warn from info without relying on the words", () => {
    const { rerender } = render(<Callout variant="info" ticket="FL-1">x</Callout>);
    expect(screen.getByRole("note").dataset.variant).toBe("info");
    rerender(<Callout variant="warn" ticket="FL-1">x</Callout>);
    expect(screen.getByRole("note").dataset.variant).toBe("warn");
  });
});
