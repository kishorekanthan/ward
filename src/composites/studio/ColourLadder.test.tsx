// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ColourLadder, type LadderStep } from "./ColourLadder";
import { streamHex } from "../../tokens";

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
    expect(screen.getByRole("radio", { name: "Data · free" }).getAttribute("data-checked")).toBe("true");
    fireEvent.click(screen.getByRole("radio", { name: "Data · free" }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("marks taken and reserved radios unavailable through the attribute, not inline opacity", () => {
    render(<ColourLadder label="Stream colour" steps={steps} value={1} onChange={() => undefined} takenBy={{ 2: "Design" }} />);
    const taken = screen.getByRole("radio", { name: "Design · taken by Design" });
    const reserved = screen.getByRole("radio", { name: "Reserved · reserved" });
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
      "Step 1 · free",
      "Step 2 · taken by UI / UX",
      "Step 3 · free",
      "Step 4 · not validated",
      "Step 5 · not validated",
      "Step 6 · not validated",
      "Step 7 · reserved",
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
    const four = screen.getByRole("radio", { name: "Step 4 · not validated" });
    expect(four.getAttribute("aria-disabled")).toBe("true");
    fireEvent.click(four);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("names who holds a taken step instead of only dimming it", () => {
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={() => {}} takenBy={{ 2: "front-end" }} />);
    expect(screen.getByRole("radio", { name: "Step 2 · taken by front-end" })).not.toBeNull();
  });

  it("takes a free validated step", () => {
    const onChange = vi.fn();
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "Step 3 · free" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("keeps unavailable cells out of the tab order", () => {
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={() => {}} takenBy={{ 2: "front-end" }} />);
    expect(screen.getAllByRole("radio").map((r) => r.getAttribute("tabindex"))).toEqual(["0", "-1", "0", "-1"]);
  });

  it("selects a free step from the keyboard, not by pointer alone", () => {
    const onChange = vi.fn();
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("radio", { name: "Step 3 · free" }), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("stays inert on the keyboard for a step nobody may take", () => {
    const onChange = vi.fn();
    render(<ColourLadder label="Stream colour" steps={specSteps} value={1} onChange={onChange} takenBy={{ 2: "front-end" }} />);
    fireEvent.keyDown(screen.getByRole("radio", { name: "Step 2 · taken by front-end" }), { key: "Enter" });
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("ColourLadder tiles (Studio 9a)", () => {
  const tiles = (value: number | null, onChange = vi.fn()) =>
    render(<ColourLadder presentation="tiles" steps={SIX_AND_RESERVED} value={value} onChange={onChange} takenBy={{ 2: "UI / UX", 3: "Integration" }} />);
  const texts = (container: HTMLElement, cls: string) => Array.from(container.querySelectorAll(`.ward-ladder-${cls}`), (node) => node.textContent);

  it("shows each step's hex and holder in order, then the request tile", () => {
    const { container } = tiles(1);
    expect(texts(container, "hex")).toEqual(["#00897B", "#7038C8", "#BF5310", "#1C6FB8", "#8A6A00", "#A02C6B", "step 07", "request"]);
    expect(texts(container, "note")).toEqual([
      "Step 01 · yours",
      "Step 02 · UI / UX",
      "Step 03 · Integration",
      "Step 04 · not validated",
      "Step 05 · not validated",
      "Step 06 · not validated",
      "Reserved until revalidated",
      "Ask design for a new step",
    ]);
  });

  it("names the picked step yours and a free one free, for sight and for screen readers", () => {
    tiles(null);
    expect(screen.getByRole("radio", { name: "Step 1 · free" }).querySelector(".ward-ladder-note")?.textContent).toBe("Step 01 · free");
    expect(screen.getByRole("radio", { name: "Step 2 · taken by UI / UX" })).toBeDefined();
  });

  it("labels the picked tile yours and marks it checked", () => {
    tiles(1);
    expect(screen.getByRole("radio", { name: "Step 1 · yours" }).getAttribute("aria-checked")).toBe("true");
  });

  it("picks a free tile by click or key, never a taken, partial or reserved one", () => {
    const onChange = vi.fn();
    tiles(null, onChange);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[0]);
    fireEvent.keyDown(radios[0], { key: "Enter" });
    fireEvent.keyDown(radios[0], { key: " " });
    for (const index of [1, 3, 6]) fireEvent.click(radios[index]);
    expect(onChange.mock.calls).toEqual([[1], [1], [1]]);
    expect(radios.map((radio) => radio.getAttribute("aria-disabled"))).toEqual([null, "true", "true", "true", "true", "true", "true"]);
  });

  it("gives every tile a colour bar and sets the grid inside the group it reflows against", () => {
    const { container } = tiles(1);
    const group = screen.getByRole("radiogroup");
    expect(container.querySelectorAll(".ward-ladder-cell > .ward-ladder-bar")).toHaveLength(8);
    expect(group.className).toMatch(/tilesFrame/);
    expect(group.children).toHaveLength(1);
    expect(group.firstElementChild?.className).toMatch(/tiles(?!Frame)/);
    expect(group.firstElementChild?.querySelectorAll("[role='radio']")).toHaveLength(7);
  });

  it("paints each bar from its stream token", () => {
    tiles(null);
    expect(screen.getByRole("radio", { name: "Step 3 · taken by Integration" }).style.getPropertyValue("--stream")).toBe("var(--ward-stream-3-id)");
  });
});

describe("ColourLadder disabled", () => {
  it.each(["list", "swatches", "tiles"] as const)("blocks every %s step and keeps the picked one checked and undimmed", (presentation) => {
    const onChange = vi.fn();
    const props = { steps: SIX_AND_RESERVED, value: 1, onChange, disabled: true };
    if (presentation === "list") render(<ColourLadder {...props} />);
    else render(<ColourLadder {...props} presentation={presentation} />);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[1]);
    fireEvent.keyDown(radios[2], { key: "Enter" });
    fireEvent.keyDown(radios[2], { key: " " });
    expect(onChange).not.toHaveBeenCalled();
    expect(radios.map((radio) => [radio.getAttribute("aria-disabled"), radio.tabIndex])).toEqual(Array(7).fill(["true", -1]));
    expect([radios[0].getAttribute("aria-checked"), radios[0].getAttribute("data-unavailable")]).toEqual(["true", null]);
    expect(screen.getByRole("radiogroup").getAttribute("aria-disabled")).toBe("true");
  });

  it("leaves an enabled ladder's group without the disabled mark", () => {
    render(<ColourLadder steps={SIX_AND_RESERVED} value={1} onChange={() => undefined} />);
    expect(screen.getByRole("radiogroup").getAttribute("aria-disabled")).toBeNull();
  });
});

describe("streamHex", () => {
  it("returns each step's identity hex from the tokens", () => {
    expect([1, 2, 3, 4, 5, 6].map(streamHex)).toEqual(["#00897B", "#7038C8", "#BF5310", "#1C6FB8", "#8A6A00", "#A02C6B"]);
  });

  it("refuses a step with no token", () => {
    expect(() => streamHex(7)).toThrow(/unvalidated stream step/);
  });
});
