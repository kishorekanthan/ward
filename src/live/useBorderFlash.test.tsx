import { act, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { stubMatchMedia } from "../test-setup";
import { useBorderFlash } from "./useBorderFlash";

function Card({ colour }: { colour: "blue" | "orange" | "green" }) {
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

const card = () => screen.getByTestId("card");

describe("useBorderFlash", () => {
  it("adds a one-shot flash class and flash colour on demand", () => {
    render(<Card colour="orange" />);
    act(() => screen.getByText("trigger").click());
    expect(card().classList.contains("ward-border-flash")).toBe(true);
    expect(card().style.getPropertyValue("--ward-flash-colour")).toBe("var(--ward-color-orange)");
    act(() => card().dispatchEvent(new Event("animationend")));
    expect(card().classList.contains("ward-border-flash")).toBe(false);
  });

  it("never fires on mount", () => {
    render(<Card colour="blue" />);
    expect(card().classList.contains("ward-border-flash")).toBe(false);
  });

  it("is a no-op under reduced motion", () => {
    stubMatchMedia(true);
    render(<Card colour="green" />);
    const spy = vi.fn();
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: spy,
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
    act(() => screen.getByText("trigger").click());
    expect(card().classList.contains("ward-border-flash")).toBe(false);
  });
});
