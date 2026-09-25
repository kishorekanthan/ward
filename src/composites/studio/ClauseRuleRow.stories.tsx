import { useState } from "react";
import { bothThemes } from "../../../.storybook/bothThemes";
import { ClauseRuleRow, ClauseRules, type ClauseRule } from "./ClauseRuleRow";

export default {
  title: "Studio/ClauseRuleRow",
  component: ClauseRuleRow,
  decorators: [bothThemes],
};

const APPROVERS = [
  { value: "dpm", label: "DPM" },
  { value: "tech_lead", label: "Tech lead" },
  { value: "po", label: "Product owner" },
];

const OWN: ClauseRule = {
  id: "kpi-in-inventory",
  clauses: [
    { key: "when", label: "When", value: "adds kpi" },
    { key: "require", label: "Requires", value: "inventory: kpi_id, calculation, owner" },
    { key: "evidence", label: "Proven by", value: "platform.read_back" },
    { key: "approver", label: "Approved by", value: "dpm", options: APPROVERS },
  ],
};

const LOCKED: ClauseRule = {
  id: "dictionary-on-pipeline-change",
  locked: true,
  lockedReason: "Set by the platform; every stream inherits it",
  clauses: [
    { key: "when", label: "When", value: "changes column.add, column.logic" },
    { key: "require", label: "Requires", value: "dictionary: column, definition, logic, owner" },
    { key: "evidence", label: "Proven by", value: "platform.read_back" },
    { key: "approver", label: "Approved by", value: "DPM" },
  ],
};

function Editable({ initial }: { initial: ClauseRule }) {
  const [rule, setRule] = useState(initial);
  const change = (key: string, value: string) => setRule({ ...rule, clauses: rule.clauses.map((c) => (c.key === key ? { ...c, value } : c)) });
  return <ClauseRuleRow rule={rule} onChange={change} onRemove={() => undefined} />;
}

export const EditableRule = { render: () => <ClauseRules><Editable initial={OWN} /></ClauseRules> };

export const LockedRule = { render: () => <ClauseRules><ClauseRuleRow rule={LOCKED} /></ClauseRules> };

export const InvalidClause = {
  render: () => (
    <ClauseRules>
      <Editable initial={{ ...OWN, clauses: [{ ...OWN.clauses[0], value: "", invalid: "Names no change and no addition, so it never fires" }, ...OWN.clauses.slice(1)] }} />
    </ClauseRules>
  ),
};

export const StreamRules = {
  render: () => (
    <ClauseRules label="Stream rules">
      <ClauseRuleRow rule={LOCKED} />
      <Editable initial={OWN} />
    </ClauseRules>
  ),
};

export const EmptyList = { render: () => <ClauseRules>{null}</ClauseRules> };
