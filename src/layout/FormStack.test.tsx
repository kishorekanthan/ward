import { fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { Btn } from "../primitives/Btn";
import { Field } from "../primitives/Field";
import { FormStack } from "./FormStack";

const root = dirname(fileURLToPath(import.meta.url));
const golden = JSON.parse(readFileSync(join(root, "..", "goldens", "form.json"), "utf8")) as Record<string, string>;
const formCss = readFileSync(join(root, "FormStack.module.css"), "utf8");
const wardCss = readFileSync(join(root, "..", "ward.css"), "utf8");
const fieldCss = readFileSync(join(root, "..", "primitives", "Field.module.css"), "utf8");

function ruleBlock(css: string, selector: string): string {
  return css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
}

function declaration(selector: string, property: string, css = formCss): string {
  const block = ruleBlock(css, selector);
  return block.match(new RegExp(`(?:^|;|\\s)${property}\\s*:\\s*([^;]+)`))?.[1].trim() ?? "";
}

// Follows var(--x) to its value in ward.css, so the golden holds the comp's px, not a token name.
function resolved(selector: string, property: string): string {
  const value = declaration(selector, property);
  const name = value.match(/^var\((--[\w-]+)\)$/)?.[1];
  if (!name) return value;
  return wardCss.match(new RegExp(`${name}\\s*:\\s*([^;]+);`))?.[1].trim() ?? "";
}

describe("FormStack geometry (comp 3b)", () => {
  it("stacks fields 11px apart with each label 6px above its control", () => {
    expect([declaration("\\.fields", "display"), declaration("\\.fields", "flex-direction")]).toEqual(["flex", "column"]);
    // The label gap only lands while Field's root is itself a flex column.
    expect([declaration("\\.field", "display", fieldCss), declaration("\\.field", "flex-direction", fieldCss)]).toEqual(["flex", "column"]);
    expect(resolved("\\.fields", "gap")).toBe(golden.fieldGap);
    expect(resolved("\\.fields > \\[data-ward-field\\]", "gap")).toBe(golden.labelGap);
  });

  it("sets the action row 16px below the fields, 8px apart, at the end", () => {
    expect(declaration("\\.actions", "display")).toBe("flex");
    expect(resolved("\\.actions", "padding-top")).toBe(golden.actionsTop);
    expect(resolved("\\.actions", "gap")).toBe(golden.actionsGap);
    expect(resolved("\\.actions", "justify-content")).toBe(golden.actionsJustify);
    expect(resolved("\\.actions", "flex-wrap")).toBe("wrap");
  });

  it("caps the form at 624px and lets it shrink below that", () => {
    expect(resolved("\\.form", "max-width")).toBe(golden.maxWidth);
    expect(resolved("\\.form", "width")).toBe("100%");
  });
});

function renderForm(onSubmit?: () => void) {
  return render(
    <FormStack label="New agent" onSubmit={onSubmit} actions={<><Btn label="Cancel" /><Btn type="submit" label="Save draft" /></>}>
      <Field label="Agent name" value="" />
      <Field kind="select" label="Copy from" value="a" options={[{ value: "a", label: "a" }]} />
    </FormStack>,
  );
}

describe("FormStack", () => {
  it("renders one named form: its fields in order, then the actions in their own group", () => {
    renderForm();
    const form = screen.getByRole("form", { name: "New agent" });
    const [fields, actions] = Array.from(form.children);
    expect(form.children).toHaveLength(2);
    expect(Array.from(fields.querySelectorAll("label")).map((label) => label.textContent)).toEqual(["Agent name", "Copy from"]);
    expect(Array.from(fields.children).every((field) => field.matches("[data-ward-field]"))).toBe(true);
    expect(actions).toBe(screen.getByRole("group", { name: "New agent actions" }));
    expect(Array.from(actions.querySelectorAll("button")).map((button) => button.textContent)).toEqual(["Cancel", "Save draft"]);
  });

  it("calls onSubmit on submit and stops the browser navigating", () => {
    const onSubmit = vi.fn();
    renderForm(onSubmit);
    const event = new Event("submit", { bubbles: true, cancelable: true });
    fireEvent(screen.getByRole("form", { name: "New agent" }), event);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it("stops navigation even with no onSubmit", () => {
    render(<FormStack label="Filter"><Field label="Name" value="" /></FormStack>);
    const event = new Event("submit", { bubbles: true, cancelable: true });
    fireEvent(screen.getByRole("form", { name: "Filter" }), event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("renders no action row without actions", () => {
    render(<FormStack label="Filter"><Field label="Name" value="" /></FormStack>);
    expect(screen.getByRole("form", { name: "Filter" }).children).toHaveLength(1);
    expect(screen.queryByRole("group")).toBeNull();
  });
});
