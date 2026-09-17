import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Switch } from "./Switch";

describe("Switch labelHidden", () => {
  it("keeps the accessible name while hiding the visible label", () => {
    render(<Switch label="Gate notifications" checked onChange={() => {}} labelHidden />);
    const label = screen.getByText("Gate notifications");
    expect(screen.getByRole("switch", { name: "Gate notifications" })).not.toBeNull();
    expect(label.className).toMatch(/labelHidden/);
  });

  it("shows the label by default", () => {
    render(<Switch label="Gate notifications" checked onChange={() => {}} />);
    expect(screen.getByText("Gate notifications").className).not.toMatch(/labelHidden/);
  });
});
