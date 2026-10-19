import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StageSteps } from "./StageSteps";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "StageSteps.module.css"), "utf8");
const STEPS = [
  { label: "Triage", state: "done" },
  { label: "Plan", state: "done" },
  { label: "Build", state: "now" },
  { label: "Done", state: "next" },
] as const;

const dotOf = (name: string) => screen.getByText(name).closest("li")?.querySelector("[aria-hidden='true']");

describe("StageSteps", () => {
  it("lists the steps in order and marks only the now step as current", () => {
    render(<StageSteps steps={[...STEPS]} />);
    const items = screen.getAllByRole("listitem");
    expect(screen.getByRole("list", { name: "Progress" })).toBeTruthy();
    expect(items.map((item) => item.getAttribute("data-state"))).toEqual(["done", "done", "now", "next"]);
    expect(items.map((item) => item.getAttribute("aria-current"))).toEqual([null, null, "step", null]);
    expect(items.map((item) => item.textContent)).toEqual(["Triage, done", "Plan, done", "Build, current", "Done"]);
  });

  it("pulses the now step only while the work runs", () => {
    const { rerender } = render(<StageSteps steps={[...STEPS]} running />);
    expect(dotOf("Build")?.classList.contains("ward-running")).toBe(true);
    expect(dotOf("Plan")?.classList.contains("ward-running")).toBe(false);
    expect(dotOf("Done")?.classList.contains("ward-running")).toBe(false);
    rerender(<StageSteps steps={[...STEPS]} />);
    expect(dotOf("Build")?.classList.contains("ward-running")).toBe(false);
  });

  it("wraps on a narrow screen and draws the current step in sage", () => {
    expect(css).toMatch(/\.root \{[^}]*flex-wrap: wrap;/);
    expect(css).toMatch(/\.step\[data-state="now"\] \{[^}]*color: var\(--ward-color-sageInk\);[^}]*background: var\(--ward-color-sageTint\);/);
  });

  it("keeps a row gap from what follows it on the page head", () => {
    expect(css).toMatch(/\.root \{[^}]*margin: 0 0 var\(--ward-space-3\);/);
  });
});
