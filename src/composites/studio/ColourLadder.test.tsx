// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ColourLadder, type LadderStep } from "./ColourLadder";

const steps = [
  { step: 1 as const, name: "Data" },
  { step: 2 as const, name: "Design" },
  { step: 3 as const, name: "Reserved", reserved: true },
];

const SIX_AND_RESERVED = [{ step: 1 }, { step: 2 }, { step: 3 }, { step: 4 }, { step: 5 }, { step: 6 }, { step: 7, reserved: true }];

describe("ColourLadder", () => {
  it("keeps the named Ward API and sends a free validated step", () => {
    const onChange = vi.fn();
    render(<ColourLadder label="Stream colour" steps={steps} value={1} onChange={onChange} takenBy={{ 2: "Design" }} />);
    expect(screen.getByRole("radiogroup", { name: "Stream colour" })).toBeDefined();
    expect(screen.getByRole("radio", { name: "Data — free" }).getAttribute("data-checked")).toBe("true");
    fireEvent.click(screen.getByRole("radio", { name: "Data — free" }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("marks taken and reserved radios unavailable through the attribute, not inline opacity", () => {
    render(<ColourLadder label="Stream colour" steps={steps} value={1} onChange={() => undefined} takenBy={{ 2: "Design" }} />);
    const taken = screen.getByRole("radio", { name: "Design — taken by Design" });
    const reserved = screen.getByRole("radio", { name: "Reserved — reserved" });
    expect([taken, reserved].map((cell) => cell.getAttribute("aria-disabled"))).toEqual(["true", "true"]);
    expect([taken, reserved].map((cell) => cell.getAttribute("data-unavailable"))).toEqual(["true", "true"]);
    expect([taken.style.opacity, reserved.style.opacity]).toEqual(["", ""]);
    expect(reserved.querySelector(".ward-ladder-swatch--empty")).not.toBeNull();
    expect(taken.querySelector(".ward-ladder-swatch--empty")).toBeNull();
  });

  it("shows six colour steps with truthful validation, then the reserved and request cells", () => {
    const onChange = vi.fn();
    const { container } = render(<ColourLadder steps={SIX_AND_RESERVED} value={null} onChange={onChange} takenBy={{ 2: "UI / UX" }} />);
    const radios = screen.getAllByRole("radio");
    expect(radios.map((radio) => radio.getAttribute("aria-label"))).toEqual([
      "Step 1 — free",
      "Step 2 — taken by UI / UX",
      "Step 3 — free",
      "Step 4 — not validated",
      "Step 5 — not validated",
      "Step 6 — not validated",
      "Step 7 — reserved",
    ]);
    expect(radios.map((radio) => radio.getAttribute("aria-disabled"))).toEqual([null, "true", null, "true", "true", "true", "true"]);
    expect(radios[4].style.getPropertyValue("--stream")).toBe("var(--ward-stream-5-id)");
    fireEvent.click(radios[3]);
    expect(onChange).not.toHaveBeenCalled();
    expect(container.querySelector("[data-validation='request']")?.textContent).toBe("requestAsk design for a new step");
  });

  it("rejects steps that have no stream token and are not reserved", () => {
    expect(() => render(<ColourLadder label="Stream colour" steps={[{ step: 9 as 1, name: "Future" }]} value={1} onChange={() => undefined} />)).toThrow(
      /token steps only/,
    );
  });
});

const specSteps: LadderStep[] = [
  { step: 1, name: "Step 1" },
  { step: 2, name: "Step 2" },
  { step: 3, name: "Step 3" },
  { step: 4, name: "Step 4" },
];

describe("ColourLadder (spec)", () => {
  it("offers no free colour input — only ladder steps", () => {
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={() => {}} />);
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
  });

  it("refuses an unvalidated step rather than offering it", () => {
    const onChange = vi.fn();
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={onChange} />);
    const four = screen.getByRole("radio", { name: "Step 4 — not validated" });
    expect(four.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(four);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("names who holds a taken step instead of only dimming it", () => {
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={() => {}} takenBy={{ 2: "front-end" }} />);
    expect(screen.getByRole("radio", { name: "Step 2 — taken by front-end" })).not.toBeNull();
  });

  it("takes a free validated step", () => {
    const onChange = vi.fn();
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "Step 3 — free" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("keeps unavailable cells out of the tab order", () => {
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={() => {}} takenBy={{ 2: "front-end" }} />);
    expect(screen.getAllByRole("radio").map((r) => r.getAttribute("tabindex"))).toEqual(["0", "-1", "0", "-1"]);
  });

  it("selects a free step from the keyboard, not by pointer alone", () => {
    const onChange = vi.fn();
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("radio", { name: "Step 3 — free" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("stays inert on the keyboard for a step nobody may take", () => {
    const onChange = vi.fn();
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={onChange} takenBy={{ 2: "front-end" }} />);
    fireEvent.keyDown(screen.getByRole("radio", { name: "Step 2 — taken by front-end" }), { key: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
  });
});
