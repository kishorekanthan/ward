import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CostMeter } from "./CostMeter";

describe("CostMeter", () => {
  it("states spend against the ceiling in the formatter's words", () => {
    render(<CostMeter spent={3.55} ceiling={25} />);
    expect(screen.getByRole("meter").getAttribute("aria-valuetext")).toBe("$3.55 of $25");
  });

  it("exposes the real numbers to assistive tech, not a percentage", () => {
    render(<CostMeter spent={3.55} ceiling={25} />);
    const meter = screen.getByRole("meter");
    expect(meter.getAttribute("value")).toBe("3.55");
    expect(meter.getAttribute("max")).toBe("25");
  });

  it("holds the bar at the ceiling when spend passes it", () => {
    const { container } = render(<CostMeter spent={30} ceiling={25} />);
    expect((container.querySelector("meter") as HTMLElement).style.getPropertyValue("--share")).toBe("100%");
  });

  it("lists each agent's spend through the money formatter", () => {
    render(<CostMeter spent={3.55} ceiling={25} breakdown={[{ label: "triage v2", amount: 0.34 }]} />);
    expect(screen.getByText("$0.34")).not.toBeNull();
  });
});
