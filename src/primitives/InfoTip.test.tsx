import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ruleBody } from "../test-css";
import { InfoTip, edgeShift } from "./InfoTip";

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

  afterEach(() => vi.restoreAllMocks());

  it("is a 44 px target that keeps the 20 px mark's line and gap (#332)", () => {
    const tipRule = ruleBody("src/primitives/InfoTip.module.css", ".tip");
    expect(tipRule).toContain("--ward-tip-overhang: calc((var(--ward-height-touch) - var(--ward-space-5)) / 2);");
    expect(tipRule).toContain("width: var(--ward-height-touch);\nheight: var(--ward-height-touch);");
    expect(tipRule).toContain("margin-block: calc(0px - var(--ward-tip-overhang));");
    expect(tipRule).toContain("margin-inline: calc(var(--ward-space-1) - var(--ward-tip-overhang)) calc(0px - var(--ward-tip-overhang));");
    expect(ruleBody("src/primitives/InfoTip.module.css", ".bubble")).toContain("transform: translateX(calc(-50% + var(--ward-tip-shift, 0px)));");
  });

  it("moves a bubble 16 px inside either edge of a 375 px window, and leaves one inside alone (#332)", () => {
    expect(edgeShift(-63, 137, 375)).toBe(79);
    expect(edgeShift(16, 216, 375)).toBe(0);
    expect(edgeShift(200, 400, 375)).toBe(-41);
    expect(edgeShift(159, 359, 375)).toBe(0);
    expect(edgeShift(20, 400, 375)).toBe(-4);
  });

  it("shifts the open bubble on screen and drops the shift when it shuts (#332)", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ left: -63, right: 137 } as DOMRect);
    vi.stubGlobal("innerWidth", 375);
    render(<InfoTip label="Open" text="x" />);
    const bubble = () => screen.getByRole("tooltip", { hidden: true }).style.getPropertyValue("--ward-tip-shift");
    expect(bubble()).toBe("0px");
    fireEvent.mouseEnter(tip());
    expect(bubble()).toBe("79px");
    fireEvent.mouseLeave(tip());
    expect(bubble()).toBe("0px");
    vi.unstubAllGlobals();
  });
});
