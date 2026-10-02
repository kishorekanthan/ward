import { fireEvent, render, screen } from "@testing-library/react";
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

describe("Switch label click", () => {
  it("toggles the switch when its visible label is clicked", () => {
    const seen: boolean[] = [];
    render(<Switch label="Gate notifications" checked={false} onChange={(next) => seen.push(next)} />);
    fireEvent.click(screen.getByText("Gate notifications"));
    expect(seen).toEqual([true]);
  });

  it("leaves a disabled or locked switch alone when its label is clicked", () => {
    const seen: boolean[] = [];
    render(
      <>
        <Switch label="Paused lane" checked={false} disabled onChange={(next) => seen.push(next)} />
        <Switch label="Gate lane" checked locked onChange={(next) => seen.push(next)} />
      </>,
    );
    fireEvent.click(screen.getByText("Paused lane"));
    fireEvent.click(screen.getByText("Gate lane"));
    expect(seen).toEqual([]);
  });
});
