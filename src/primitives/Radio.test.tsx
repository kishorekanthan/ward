import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Radio } from "./Radio";

const options = [
  { value: "inherit", label: "Inherit platform policy", consequence: "Changes at platform level reach this stream." },
  { value: "override", label: "Override for this stream", consequence: "This stream stops tracking the platform default." },
];

describe("Radio", () => {
  it("carries each consequence as body text, tied to its own option", () => {
    render(<Radio legend="Loop policy" options={options} value="inherit" onChange={() => {}} />);
    const chosen = screen.getByLabelText("Override for this stream");
    expect(chosen.getAttribute("aria-describedby")).toBe(
      screen.getByText("This stream stops tracking the platform default.").id,
    );
  });

  it("groups the options under one legend", () => {
    render(<Radio legend="Loop policy" options={options} value="inherit" onChange={() => {}} />);
    expect(screen.getByRole("group", { name: "Loop policy" })).not.toBeNull();
  });

  it("reports the chosen value", () => {
    const onChange = vi.fn();
    render(<Radio legend="Loop policy" options={options} value="inherit" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("Override for this stream"));
    expect(onChange).toHaveBeenCalledWith("override");
  });
});
