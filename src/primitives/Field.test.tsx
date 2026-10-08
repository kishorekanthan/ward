import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { Field, type FieldVariant } from "./Field";
import s from "./Field.module.css";

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
    expect(control.getAttribute("autocomplete")).toBe("new-password");
    expect(control.getAttribute("spellcheck")).toBe("false");
    expect(control.hasAttribute("data-1p-ignore")).toBe(true);
    expect(control.getAttribute("data-lpignore")).toBe("true");
  });

  it("leaves a plain input as text with no autocomplete or spellcheck override", () => {
    render(<Field kind="input" label="Model name" value="" onChange={() => {}} />);
    const control = screen.getByLabelText("Model name");
    expect(control.getAttribute("type")).toBeNull();
    expect(control.hasAttribute("autocomplete")).toBe(false);
    expect(control.hasAttribute("spellcheck")).toBe(false);
    expect(control.hasAttribute("data-1p-ignore")).toBe(false);
    expect(control.hasAttribute("data-lpignore")).toBe(false);
  });

  it("has no effect on a textarea or a select", () => {
    render(<Field kind="textarea" label="Notes" value="" onChange={() => {}} secret />);
    render(<Field kind="select" label="Store" value="a" options={[{ value: "a", label: "A" }]} onChange={() => {}} secret />);
    for (const [label, type] of [["Notes", null], ["Store", "button"]]) {
      const control = screen.getByLabelText(label as string);
      expect(control.getAttribute("type")).toBe(type);
      expect(control.hasAttribute("autocomplete")).toBe(false);
      expect(control.hasAttribute("data-1p-ignore")).toBe(false);
      expect(control.hasAttribute("data-lpignore")).toBe(false);
    }
  });
});

const here = dirname(fileURLToPath(import.meta.url));
const classNames = s as Record<string, string>;

// Field.module.css with its class names hashed as rendered, after Ward's global sheet.
function loadWardSheets(): void {
  const module = readFileSync(join(here, "Field.module.css"), "utf8").replace(/\.([A-Za-z]+)\b/g, (whole, name: string) =>
    classNames[name] ? "." + classNames[name] : whole,
  );
  const style = document.createElement("style");
  style.textContent = readFileSync(join(here, "..", "ward.css"), "utf8") + "\n" + module;
  document.head.append(style);
}

function focusedField(variant?: FieldVariant): HTMLElement {
  render(<Field kind="input" label="Version" value="" onChange={() => {}} variant={variant} />);
  const control = screen.getByLabelText("Version");
  control.focus();
  return control;
}

function hasOutline(el: Element): boolean {
  const outline = getComputedStyle(el).outline.trim();
  return outline !== "" && !/\b(none|transparent)\b/.test(outline);
}

describe("Field focus mark", () => {
  beforeAll(loadWardSheets);
  afterEach(cleanup);

  // Every control shows the same keyboard ring; a bordered variant also turns its border blue.
  it.each([undefined, "form", "inline"] as const)("draws the focus ring and a blue border when focused (%s)", (variant) => {
    const control = focusedField(variant);
    expect(control.matches(":focus-visible")).toBe(true);
    expect(hasOutline(control)).toBe(true);
    expect(getComputedStyle(control).boxShadow).toContain("--ward-color-blue");
  });

  it.each(["reply", "tag", "tagGate"] as const)("keeps the focus ring on a variant with no focus border (%s)", (variant) => {
    expect(hasOutline(focusedField(variant))).toBe(true);
  });

  it("leaves the global focus ring for buttons and links unscoped", () => {
    const global = readFileSync(join(here, "..", "ward.css"), "utf8").match(/(^|\})\s*:focus-visible\s*\{([^}]*)\}/);
    expect(global?.[2]).toMatch(/outline:\s*var\(--ward-border\) solid var\(--ward-color-blue\)/);
  });
});
