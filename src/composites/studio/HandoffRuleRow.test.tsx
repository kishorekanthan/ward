import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HandoffRuleRow, HandoffRules, type HandoffRule } from "./HandoffRuleRow";

const rule: HandoffRule = { when: "row count delta > 0.5%", then: "escalate to Priya N. · block item" };

const inList = (children: React.ReactNode) => render(<HandoffRules>{children}</HandoffRules>);

describe("HandoffRuleRow", () => {
  it("reads as when-this-then-that, in that order", () => {
    inList(<HandoffRuleRow rule={rule} />);
    const item = screen.getByRole("listitem");
    expect(item.textContent).toBe("WHENrow count delta > 0.5%THENescalate to Priya N. · block item");
  });

  it("uses the filled system chip for WHEN and the outlined meta chip for THEN", () => {
    inList(<HandoffRuleRow rule={rule} />);
    expect(screen.getByText("WHEN").getAttribute("data-ward-chip")).toBe("system");
    expect(screen.getByText("THEN").getAttribute("data-ward-chip")).toBe("meta");
  });

  // Order is the meaning (first match wins), so a <ul> would drop what a screen reader conveys.
  it("puts the rules in an ordered list, in the order given", () => {
    const rules: HandoffRule[] = [rule, { when: "clean", then: "advance to Ready for load" }];
    const { container } = inList(
      rules.map((r) => <HandoffRuleRow key={r.when} rule={r} />),
    );
    expect(container.querySelector("ol")).not.toBeNull();
    expect(container.querySelector("ul")).toBeNull();
    expect(screen.getAllByRole("listitem").map((li) => li.textContent?.startsWith("WHEN"))).toEqual([true, true]);
    expect(screen.getAllByRole("listitem")[0].textContent).toContain("row count delta");
  });

  /* The guard that keeps the <li> legal. Without it an orphan row renders as a
     listitem with no list parent, which is invalid HTML and reports that way. */
  it("refuses to render outside HandoffRules", () => {
    const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<HandoffRuleRow rule={rule} />)).toThrow(/must be rendered inside HandoffRules/);
    quiet.mockRestore();
  });

  it("displays a rule, and edits nothing", () => {
    const { container } = inList(<HandoffRuleRow rule={rule} />);
    expect(container.querySelector("input, button, textarea, select")).toBeNull();
  });
});
