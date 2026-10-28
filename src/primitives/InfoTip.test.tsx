import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InfoTip } from "./InfoTip";

const tip = () => screen.getByRole("button", { name: "What Open counts" });
const isOpen = () => tip().hasAttribute("data-open");

describe("InfoTip", () => {
  it("names the button after its label and describes it with the text", () => {
    render(<InfoTip label="Open" text="Requests in any stage that are not done or cancelled." />);
    expect(tip().getAttribute("type")).toBe("button");
    expect(document.getElementById(tip().getAttribute("aria-describedby") ?? "")?.textContent).toBe("Requests in any stage that are not done or cancelled.");
    expect(screen.getByRole("tooltip", { hidden: true }).id).toBe(tip().getAttribute("aria-describedby"));
  });

  it("shows on hover and hides when the pointer leaves", () => {
    render(<InfoTip label="Open" text="x" />);
    expect(isOpen()).toBe(false);
    fireEvent.mouseEnter(tip());
    expect(isOpen()).toBe(true);
    fireEvent.mouseLeave(tip());
    expect(isOpen()).toBe(false);
  });

  it("shows on keyboard focus, shuts on Escape without closing what holds it, and hides on blur", () => {
    const outer = vi.fn();
    render(
      <div onKeyDown={outer}>
        <InfoTip label="Open" text="x" />
      </div>,
    );
    fireEvent.focus(tip());
    expect(isOpen()).toBe(true);
    fireEvent.keyDown(tip(), { key: "Escape" });
    expect(isOpen()).toBe(false);
    expect(outer).not.toHaveBeenCalled();
    fireEvent.keyDown(tip(), { key: "Escape" });
    expect(outer).toHaveBeenCalledTimes(1);
    fireEvent.focus(tip());
    fireEvent.keyDown(tip(), { key: "Enter" });
    expect(isOpen()).toBe(true);
    fireEvent.blur(tip());
    expect(isOpen()).toBe(false);
  });

  it("keeps the bubble inside a right-hand column when asked", () => {
    render(<InfoTip label="Open" text="x" align="end" />);
    expect(tip().dataset.align).toBe("end");
  });
});
