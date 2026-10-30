import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ruleBody } from "../test-css";
import { PeriodPicker, type Period } from "./PeriodPicker";

const TODAY = "2026-10-28";
const trigger = () => screen.getByRole("button", { name: /Period/ });

function choose(label: string) {
  fireEvent.click(trigger());
  fireEvent.click(within(screen.getByRole("listbox")).getByRole("option", { name: label }));
}

function setDay(label: string, day: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value: day } });
}

function picker(value: Period = { preset: "8w" }) {
  const onChange = vi.fn();
  render(<PeriodPicker value={value} onChange={onChange} today={TODAY} />);
  return onChange;
}

describe("PeriodPicker", () => {
  it("offers the four windows and Custom range, in a Ward dropdown, with the current one shown", () => {
    picker({ preset: "4w" });
    expect(trigger().textContent).toContain("Last 4 weeks");
    expect(document.querySelector("select")).toBeNull();
    fireEvent.click(trigger());
    expect(within(screen.getByRole("listbox")).getAllByRole("option").map((option) => option.textContent)).toEqual(["Last 7 days", "Last 4 weeks", "Last 8 weeks", "This quarter", "Custom range"]);
  });

  it("sends a preset once when it is chosen", () => {
    const onChange = picker();
    choose("This quarter");
    expect(onChange.mock.calls).toEqual([[{ preset: "q" }]]);
  });

  it("shows From and To for Custom range, and sends nothing until both days are set in order", () => {
    const onChange = picker();
    choose("Custom range");
    expect(trigger().textContent).toContain("Custom range");
    expect(onChange).not.toHaveBeenCalled();
    setDay("From", "2026-09-01");
    expect(onChange).not.toHaveBeenCalled();
    setDay("To", "2026-09-30");
    expect(onChange.mock.calls).toEqual([[{ from: "2026-09-01", to: "2026-09-30" }]]);
  });

  it("refuses a start after the end with a message, and sends nothing", () => {
    const onChange = picker({ from: "2026-09-01", to: "2026-09-30" });
    expect(screen.queryByText("The start is after the end.")).toBeNull();
    setDay("From", "2026-10-05");
    expect(screen.getByText("The start is after the end.")).toBeTruthy();
    expect(screen.getByLabelText("From").getAttribute("aria-invalid")).toBe("true");
    expect(onChange).not.toHaveBeenCalled();
    setDay("From", "2026-09-30");
    expect(screen.queryByText("The start is after the end.")).toBeNull();
    expect(onChange.mock.calls).toEqual([[{ from: "2026-09-30", to: "2026-09-30" }]]);
  });

  it("keeps each date inside the range and today", () => {
    picker({ from: "2026-09-01", to: "2026-09-30" });
    const [from, to] = [screen.getByLabelText("From"), screen.getByLabelText("To")];
    expect([from.getAttribute("type"), from.getAttribute("max"), to.getAttribute("min"), to.getAttribute("max")]).toEqual(["date", "2026-09-30", "2026-09-01", TODAY]);
  });

  it("drops the range when a preset is chosen again", () => {
    const onChange = picker({ from: "2026-09-01", to: "2026-09-30" });
    choose("Last 7 days");
    expect(screen.queryByLabelText("From")).toBeNull();
    expect(onChange.mock.calls).toEqual([[{ preset: "7d" }]]);
  });

  it("gives the trigger a 44 px tap, centred, through the listbox trigger the rule names (#336)", () => {
    const css = "src/primitives/PeriodPicker.module.css";
    const { container } = render(<PeriodPicker value={{ preset: "4w" }} onChange={() => {}} today={TODAY} />);
    expect(Array.from(container.querySelectorAll('.ward-period button[aria-haspopup="listbox"]'))).toEqual([trigger()]);
    expect(ruleBody(css, '.row button[aria-haspopup="listbox"]')).toBe("position: relative");
    expect(ruleBody(css, '.row button[aria-haspopup="listbox"]::after')).toBe(
      'content: "";\nposition: absolute;\ninset-inline: 0;\ninset-block-start: 50%;\nblock-size: var(--ward-height-touch);\ntranslate: 0 -50%',
    );
  });
});
