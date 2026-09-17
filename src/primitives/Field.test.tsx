import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";

describe("Field labelHidden", () => {
  it("keeps the label tied to the control while hiding it visually", () => {
    render(<Field kind="input" label="Search agents" value="" onChange={() => {}} labelHidden />);
    const control = screen.getByLabelText("Search agents");
    expect(control.tagName).toBe("INPUT");
    expect(screen.getByText("Search agents").className).toMatch(/labelHidden/);
  });

  it("shows the label by default and keeps the legacy hook either way", () => {
    render(<Field kind="input" label="Stream name" value="" onChange={() => {}} />);
    const label = screen.getByText("Stream name");
    expect(label.className).not.toMatch(/labelHidden/);
    expect(label.classList.contains("ward-field-label")).toBe(true);
  });
});
