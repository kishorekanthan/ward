// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { chooseOption, optionLabels } from "../../test-setup";
import { RuleRow, type Rule } from "./RuleRow";

const rule: Rule = { when: { field: "total", op: ">", value: "0" }, then: "escalate" };

function table(child: React.JSX.Element) {
  return <table><tbody>{child}</tbody></table>;
}

describe("RuleRow", () => {
  it("keeps the structured rule and returns its complete next value", () => {
    const onChange = vi.fn();
    const { container } = render(table(<RuleRow rule={rule} onChange={onChange} />));
    chooseOption(screen.getByRole("button", { name: "Then" }), "Block");
    expect(container.querySelectorAll("td")).toHaveLength(2);
    expect(screen.getByText("total > 0")).not.toBeNull();
    expect(onChange).toHaveBeenCalledWith({ when: rule.when, then: "block" });
  });

  it("shows read-only as words and rejects unknown actions", () => {
    const { unmount } = render(table(<RuleRow rule={rule} readOnly />));
    expect(screen.queryByRole("button", { name: "Then" })).toBeNull();
    expect(screen.getByText("Escalate")).not.toBeNull();
    unmount();
    expect(() => render(table(<RuleRow rule={{ ...rule, then: "merge" as never }} />))).toThrow("not a contract action");
  });

  it("supports explicit four-cell condition presentation", () => {
    const { container } = render(table(<RuleRow rule={rule} presentation={{ cellLayout: "four", conditionText: "count delta > 0.5%" }} />));
    expect(container.querySelectorAll("td")).toHaveLength(4);
    expect(screen.getByText("count delta > 0.5%")).not.toBeNull();
    expect(container.querySelectorAll("td")[3]?.textContent).toBe("Escalate");
  });

  it("renders the contract layout as one list row whose action select keeps its name", () => {
    const onChange = vi.fn();
    const { container } = render(<ol><RuleRow rule={rule} onChange={onChange} presentation={{ cellLayout: "contract", conditionText: "row count delta > 0.5%" }} /></ol>);
    expect(container.querySelectorAll("ol > li")).toHaveLength(1);
    expect(container.querySelector("li")?.textContent).toContain("Whenrow count delta > 0.5%Then");
    chooseOption(screen.getByRole("button", { name: "Then" }), "Advance");
    expect(onChange).toHaveBeenCalledWith({ when: rule.when, then: "advance" });
  });
});

const specRule: Rule = { when: { field: "rows", op: "==", value: "0" }, then: "block" };

const wrap = (ui: React.ReactNode) =>
  render(
    <table>
      <tbody>{ui}</tbody>
    </table>,
  );

describe("RuleRow (spec)", () => {
  it("refuses an action outside the closed set", () => {
    expect(() => wrap(<RuleRow rule={{ ...specRule, then: "merge" as never }} />)).toThrow(/not a contract action/);
  });

  it("offers only the four contract actions", () => {
    wrap(<RuleRow rule={specRule} onChange={() => {}} />);
    expect(optionLabels(screen.getByRole("button", { name: "Then" }))).toEqual(["Advance", "Block", "Escalate", "Request review"]);
  });

  it("shows a read-only rule as words, with nothing to change", () => {
    wrap(<RuleRow rule={specRule} readOnly onChange={() => {}} />);
    expect(screen.queryByRole("button", { name: "Then" })).toBeNull();
    expect(screen.getByText("Block")).not.toBeNull();
  });

  it("reports the new action", () => {
    const onChange = vi.fn();
    wrap(<RuleRow rule={specRule} onChange={onChange} />);
    chooseOption(screen.getByLabelText("Then"), "Escalate");
    expect(onChange).toHaveBeenCalledWith({ ...specRule, then: "escalate" });
  });
});
