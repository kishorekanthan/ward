import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./SegmentedControl";

const sort = [
  { value: "oldest", label: "Oldest first" },
  { value: "newest", label: "Newest first" },
];

describe("SegmentedControl", () => {
  it("refuses a set outside two or three options", () => {
    expect(() => render(<SegmentedControl label="Sort" options={sort.slice(0, 1)} value="oldest" onChange={() => {}} />)).toThrow(
      /takes 2 or 3/,
    );
  });

  it("does not report a change while disabled", () => {
    const onChange = vi.fn();
    render(<SegmentedControl label="Sort" options={sort} value="oldest" onChange={onChange} disabled />);
    fireEvent.click(screen.getByRole("radio", { name: "Newest first" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("checks exactly one segment", () => {
    render(<SegmentedControl label="Sort" options={sort} value="newest" onChange={() => {}} />);
    const checked = screen.getAllByRole("radio").filter((r) => r.getAttribute("aria-checked") === "true");
    expect(checked.map((r) => r.textContent)).toEqual(["Newest first"]);
  });

  it("reports the chosen segment", () => {
    const onChange = vi.fn();
    render(<SegmentedControl label="Sort" options={sort} value="oldest" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "Newest first" }));
    expect(onChange).toHaveBeenCalledWith("newest");
  });
});
