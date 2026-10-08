import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { edge, injectModuleCss, leftBorders, ruleBody } from "../test-css";
import { Callout } from "./Callout";
import s from "./Callout.module.css";

describe("Callout", () => {
  it("refuses a callout with no ticket behind it", () => {
    expect(() => render(<Callout variant="info" ticket="">Cards never drag.</Callout>)).toThrow(/must cite the ticket/);
  });

  it("keeps the ticket off the screen and on data-ticket", () => {
    render(<Callout variant="warn" ticket="FL-231">Cards never drag.</Callout>);
    const note = screen.getByRole("note");
    expect(note.textContent).toBe("Cards never drag.");
    expect(note.dataset.ticket).toBe("FL-231");
  });

  it("distinguishes warn from info without relying on the words", () => {
    const { rerender } = render(<Callout variant="info" ticket="FL-1">x</Callout>);
    expect(screen.getByRole("note").dataset.variant).toBe("info");
    rerender(<Callout variant="warn" ticket="FL-1">x</Callout>);
    expect(screen.getByRole("note").dataset.variant).toBe("warn");
  });
});

const calloutCss = "src/primitives/Callout.module.css";

describe("Callout surface", () => {
  it("is a tinted card with a hairline on all four sides, never a left stripe", () => {
    expect(ruleBody(calloutCss, ".root")).toBe(
      "display: grid;\ngap: var(--ward-space-1);\npadding: var(--ward-space-3);\nborder-radius: var(--ward-radius-card);\nbackground: var(--ward-color-surface2);\nbox-shadow: inset 0 0 0 var(--ward-border) var(--ward-color-line2)",
    );
    expect(ruleBody(calloutCss, '.root[data-variant="warn"]')).toBe(
      "background: var(--ward-color-waitingTint);\nbox-shadow: inset 0 0 0 var(--ward-border) var(--ward-color-waitingLine)",
    );
  });

  it("keeps every stripe and the ticket off the rendered callout, whatever rule draws them", () => {
    const removeCss = injectModuleCss(calloutCss, s);
    render(<><Callout variant="info" ticket="FL-118">Info.</Callout><Callout variant="warn" ticket="FL-229">Warn.</Callout></>);
    const [info, warn] = screen.getAllByRole("note").map(edge);
    removeCss();
    expect(info).toEqual({ shadow: "inset 0 0 0 var(--ward-border) var(--ward-color-line2)", ground: "var(--ward-color-surface2)" });
    expect(warn).toEqual({ shadow: "inset 0 0 0 var(--ward-border) var(--ward-color-waitingline)", ground: "var(--ward-color-waitingtint)" });
    expect(leftBorders(calloutCss)).toEqual([]);
    expect(readFileSync(calloutCss, "utf8")).not.toMatch(/content\s*:/);
  });
});
