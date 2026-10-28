import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";
import { DisabledScope } from "./DisabledScope";

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

  it("lets the locked, ticked box speak for itself, with no note beside its label", () => {
    render(<Checkbox label="Waits on" checked onChange={() => {}} locked />);
    expect(screen.queryByText("always shown")).toBeNull();
    expect(screen.getByText("Waits on").textContent).toBe("Waits on");
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

  it("keeps a hidden label as the box's name but not on screen", () => {
    render(<Checkbox label="Approver sees it" labelHidden checked onChange={() => {}} />);
    const label = screen.getByText("Approver sees it");
    expect(screen.getByRole("checkbox", { name: "Approver sees it" })).not.toBeNull();
    expect(label.className).toMatch(/labelHidden/);
    expect(label.className).not.toMatch(/(^|\s)_?label(_|\s|$)/);
  });
});

describe("Checkbox disabledReason", () => {
  const described = (el: HTMLElement) =>
    (el.getAttribute("aria-describedby") ?? "").split(" ").filter(Boolean).map((id) => document.getElementById(id)?.textContent).join(" | ");

  it("describes a locked or disabled box by its reason, after its consequence", () => {
    render(
      <>
        <Checkbox label="Waits on" checked locked disabledReason="Every card shows its wait." />
        <Checkbox label="Show cost" checked={false} disabled consequence="Viewers never see cost." disabledReason="Cost is off for this stream." />
      </>,
    );
    const waits = screen.getByRole("checkbox", { name: /^Waits on/ });
    expect(described(waits)).toBe("Every card shows its wait.");
    expect(waits.title).toBe("Every card shows its wait.");
    expect(described(screen.getByRole("checkbox", { name: "Show cost" }))).toBe("Viewers never see cost. | Cost is off for this stream.");
  });

  it("says nothing of a reason while the box can change", () => {
    render(<Checkbox label="Show cost" checked={false} disabledReason="Cost is off for this stream." onChange={() => {}} />);
    const box = screen.getByRole("checkbox", { name: "Show cost" });
    expect(box.getAttribute("aria-describedby")).toBeNull();
    expect(box.title).toBe("");
    expect(screen.queryByText("Cost is off for this stream.")).toBeNull();
  });

  it("keeps only the scope's reason inside a disabled scope", () => {
    render(
      <DisabledScope reason="Read only for viewers.">
        <Checkbox label="Waits on" checked locked disabledReason="Every card shows its wait." />
      </DisabledScope>,
    );
    const waits = screen.getByRole("checkbox", { name: /^Waits on/ });
    expect(described(waits)).toBe("Read only for viewers.");
    expect(waits.title).toBe("Read only for viewers.");
  });
});
