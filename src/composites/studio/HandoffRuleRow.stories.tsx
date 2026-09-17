import type { ComponentType } from "react";
import { bothThemes } from "../../../.storybook/bothThemes";
import { HandoffRuleRow, HandoffRules, type HandoffRule } from "./HandoffRuleRow";

export default {
  title: "Studio/HandoffRuleRow",
  component: HandoffRuleRow,
  decorators: [bothThemes],
};

/* The three rules the comp actually shows, verbatim, so the story is the thing to
   compare a screenshot against. */
const COMP_RULES: HandoffRule[] = [
  { when: "row count delta > 0.5%", then: "escalate to Priya N. · block item" },
  { when: "a column type changed", then: "attach findings · request review" },
  { when: "clean", then: "advance to Ready for load" },
];

/* A decorator keeps the rule an arg; per-story because CompBlock brings its own
   HandoffRules and a nested <ol> would be invalid. */
const inHandoffRules = (Story: ComponentType) => (
  <HandoffRules>
    <Story />
  </HandoffRules>
);

export const Single = { args: { rule: COMP_RULES[0] }, decorators: [inHandoffRules] };

export const ShortCondition = { args: { rule: COMP_RULES[2] }, decorators: [inHandoffRules] };

export const CompBlock = {
  render: () => (
    <HandoffRules>
      {COMP_RULES.map((rule) => (
        <HandoffRuleRow key={rule.when} rule={rule} />
      ))}
    </HandoffRules>
  ),
};

// The comp has no empty state for this block, so an empty list stays an empty <ol>.
export const EmptyList = { render: () => <HandoffRules>{null}</HandoffRules> };
