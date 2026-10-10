import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { stubMatchMedia } from "../test-setup";
import { useBorderFlash, type FlashColour } from "./useBorderFlash";

function Card({ colour }: { colour: FlashColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const flash = useBorderFlash(ref, colour);
  return (
    <div ref={ref} data-testid="card">
      <button type="button" onClick={flash}>
        trigger
      </button>
    </div>
  );
}

function VariableCard({ colour }: { colour: FlashColour }) {
  const ref = useRef<HTMLDivElement>(null);
  const flash = useBorderFlash(ref);
  return (
    <div ref={ref} data-testid="card">
      <button type="button" onClick={() => flash(colour)}>
        trigger
      </button>
    </div>
  );
}

const card = () => screen.getByTestId("card");
const colours = [
  { colour: "blue", token: "var(--ward-color-running)" },
  { colour: "orange", token: "var(--ward-color-waiting)" },
  { colour: "green", token: "var(--ward-color-done)" },
] as const;

beforeEach(() => {
  stubMatchMedia(false);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe.each([{ signature: "fixed", Card }, { signature: "variable", Card: VariableCard }])("useBorderFlash $signature calls", ({ Card }) => {
  it.each(colours)("maps $colour to its role token without the legacy property", ({ colour, token }) => {
    render(<Card colour={colour} />);
    act(() => screen.getByText("trigger").click());
    expect(card().classList.contains("ward-border-flash")).toBe(true);
    expect(card().getAttribute("data-flash")).toBe("true");
    expect(card().style.getPropertyValue("--ward-flash-colour")).toBe(token);
    expect(card().style.getPropertyValue("--flash")).toBe("");
  });

  it("never fires on mount", () => {
    render(<Card colour="blue" />);
    expect(card().classList.contains("ward-border-flash")).toBe(false);
    expect(card().hasAttribute("data-flash")).toBe(false);
    expect(card().style.length).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("is a no-op under reduced motion", () => {
    stubMatchMedia(true);
    render(<Card colour="green" />);
    act(() => screen.getByText("trigger").click());
    expect(card().classList.contains("ward-border-flash")).toBe(false);
    expect(card().hasAttribute("data-flash")).toBe(false);
    expect(card().style.length).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("clears the one-shot class and data attribute when the animation ends", () => {
    render(<Card colour="orange" />);
    act(() => screen.getByText("trigger").click());
    fireEvent.animationEnd(card());
    expect(card().classList.contains("ward-border-flash")).toBe(false);
    expect(card().hasAttribute("data-flash")).toBe(false);
  });

  it("updates the role and restarts the 300ms fallback on a repeated flash", () => {
    const { rerender } = render(<Card colour="blue" />);
    act(() => screen.getByText("trigger").click());
    act(() => vi.advanceTimersByTime(150));
    rerender(<Card colour="orange" />);
    act(() => screen.getByText("trigger").click());
    expect(card().style.getPropertyValue("--ward-flash-colour")).toBe("var(--ward-color-waiting)");
    expect(card().style.getPropertyValue("--flash")).toBe("");
    expect(vi.getTimerCount()).toBe(1);
    act(() => vi.advanceTimersByTime(299));
    expect(card().classList.contains("ward-border-flash")).toBe(true);
    expect(card().getAttribute("data-flash")).toBe("true");
    act(() => vi.advanceTimersByTime(1));
    expect(card().classList.contains("ward-border-flash")).toBe(false);
    expect(card().hasAttribute("data-flash")).toBe(false);
  });
});
