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

describe("Field secret", () => {
  it("masks the input and keeps it out of autofill and spell check", () => {
    render(<Field kind="input" label="Provider key" value="sk-typed" onChange={() => {}} secret />);
    const control = screen.getByLabelText("Provider key");
    expect(control.tagName).toBe("INPUT");
    expect(control.getAttribute("type")).toBe("password");
    expect(control.getAttribute("autocomplete")).toBe("off");
    expect(control.getAttribute("spellcheck")).toBe("false");
  });

  it("leaves a plain input as text with no autocomplete or spellcheck override", () => {
    render(<Field kind="input" label="Model name" value="" onChange={() => {}} />);
    const control = screen.getByLabelText("Model name");
    expect(control.getAttribute("type")).toBeNull();
    expect(control.hasAttribute("autocomplete")).toBe(false);
    expect(control.hasAttribute("spellcheck")).toBe(false);
  });

  it("has no effect on a textarea or a select", () => {
    render(<Field kind="textarea" label="Notes" value="" onChange={() => {}} secret />);
    render(<Field kind="select" label="Store" value="a" options={[{ value: "a", label: "A" }]} onChange={() => {}} secret />);
    for (const label of ["Notes", "Store"]) {
      const control = screen.getByLabelText(label);
      expect(control.hasAttribute("type")).toBe(false);
      expect(control.hasAttribute("autocomplete")).toBe(false);
    }
  });
});
