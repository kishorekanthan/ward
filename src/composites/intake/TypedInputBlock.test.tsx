import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TypedInputBlock, type TypedLine } from "./TypedInputBlock";

const lines: TypedLine[] = [
  { kind: "dim", text: "// typed input required at rejection" },
  { kind: "tool", text: "reason: string" },
  { kind: "warn", text: "window: '24h' | 'sla'" },
];

describe("TypedInputBlock", () => {
  it("is static — nothing to press, nothing to type into", () => {
    const { container } = render(<TypedInputBlock lines={lines} />);
    expect(container.querySelector("button, input, textarea, select, a, [tabindex]")).toBeNull();
  });

  it("never announces itself", () => {
    const { container } = render(<TypedInputBlock lines={lines} />);
    expect(container.querySelector("[aria-live], [role='status'], [role='alert']")).toBeNull();
  });

  it("prints every line it is given, in order", () => {
    const { container } = render(<TypedInputBlock lines={lines} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect([...container.querySelectorAll("[data-typed-text]")].map((el) => el.textContent)).toEqual([
      "// typed input required at rejection",
      "reason: string",
      "window: '24h' | 'sla'",
    ]);
  });

  it("paints each line by kind and aliases the pre-canonical tool kind to field", () => {
    render(<TypedInputBlock lines={lines} />);
    expect(screen.getAllByRole("listitem").map((li) => li.getAttribute("data-kind"))).toEqual(["dim", "field", "warn"]);
  });

  it("speaks the kind of lines that differ only by ink", () => {
    const { container } = render(<TypedInputBlock lines={lines} />);
    expect([...container.querySelectorAll(".ward-visually-hidden")].map((el) => el.textContent)).toEqual(["warning"]);
  });

  it("names the list, and lets a consumer rename it", () => {
    const { rerender } = render(<TypedInputBlock lines={lines} />);
    expect(screen.getByRole("list", { name: "Typed input the agent receives" })).not.toBeNull();
    rerender(<TypedInputBlock lines={lines} label="Rejection payload" />);
    expect(screen.getByRole("list", { name: "Rejection payload" })).not.toBeNull();
  });
});
