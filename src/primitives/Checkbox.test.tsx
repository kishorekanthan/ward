import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a locked field as its real value, never off", () => {
    const onChange = vi.fn();
    render(<Checkbox label="Time in stage" checked={false} locked onChange={onChange} />);
    const box = screen.getByRole("checkbox") as HTMLInputElement;
    expect(box.checked).toBe(true);
    expect(box.disabled).toBe(true);
    fireEvent.click(box);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("says why a locked field cannot be unticked", () => {
    render(<Checkbox label="Waits on" checked onChange={() => {}} locked />);
    expect(screen.getByText("always shown")).not.toBeNull();
  });

  it("ties the consequence to the control for a screen reader", () => {
    render(<Checkbox label="Show cost" checked onChange={() => {}} consequence="Viewers never see cost." />);
    const box = screen.getByRole("checkbox");
    expect(box.getAttribute("aria-describedby")).toBe(screen.getByText("Viewers never see cost.").id);
  });

  it("reports the new value on change", () => {
    const onChange = vi.fn();
    render(<Checkbox label="Show cost" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("trails a cell's sample value without naming the control by it", () => {
    render(<Checkbox label="Item key" checked onChange={() => {}} variant="cell" sample="T-012" />);
    expect(screen.getByText("T-012")).not.toBeNull();
    expect(screen.getByRole("checkbox", { name: "Item key" })).not.toBeNull();
  });
});
