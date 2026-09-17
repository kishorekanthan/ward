import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Btn } from "./Btn";

describe("Btn", () => {
  it("refuses a disabled action that does not state its condition", () => {
    // @ts-expect-error describedBy is type-required when disabled; this proves the runtime guard too
    expect(() => render(<Btn disabled>Publish</Btn>)).toThrow(/must name its reason/);
  });

  it("points a disabled action at its reason and keeps its label", () => {
    render(
      <>
        <Btn disabled describedBy="why">Publish</Btn>
        <p id="why">dry run in progress</p>
      </>,
    );
    const btn = screen.getByRole("button", { name: "Publish" });
    expect((btn as HTMLButtonElement).disabled).toBe(true);
    expect(btn.getAttribute("aria-describedby")).toBe("why");
    expect(btn.textContent).toBe("Publish");
  });

  it("names the overflow button and declares its menu", () => {
    render(<Btn variant="overflow">···</Btn>);
    const btn = screen.getByRole("button", { name: "More actions" });
    expect(btn.getAttribute("aria-haspopup")).toBe("menu");
  });

  it("does not fire when disabled", () => {
    const onClick = vi.fn();
    render(<Btn disabled describedBy="why" onClick={onClick}>Publish</Btn>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
