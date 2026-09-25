import { useState } from "react";
import { bothThemes } from "../../../.storybook/bothThemes";
import { StageListEditor, type StageListRow } from "./StageListEditor";

export default {
  title: "Studio/StageListEditor",
  component: StageListEditor,
  decorators: [bothThemes],
};

const STAGES: StageListRow[] = [
  { name: "Intake", kind: "entry" },
  { name: "Extract", kind: "agent" },
  { name: "Review", kind: "gate" },
  { name: "Done", kind: "terminal" },
];

function Editable({ initial, catalogue }: { initial: StageListRow[]; catalogue?: string[] }) {
  const [stages, setStages] = useState(initial);
  return <StageListEditor stages={stages} onChange={setStages} catalogue={catalogue} />;
}

// A code-host target's catalogue: only these names may be picked.
const CODE_STAGES = ["triage", "implement", "freshness", "qa", "pr-gate", "comment"];
const CODE_LANE: StageListRow[] = [
  { name: "triage", kind: "entry" },
  { name: "implement", kind: "agent" },
  { name: "pr-gate", kind: "gate" },
  { name: "comment", kind: "terminal" },
];

export const Workflow = { render: () => <Editable initial={STAGES} /> };

export const SingleStage = { render: () => <Editable initial={[STAGES[0]]} /> };

export const FromCatalogue = { render: () => <Editable initial={CODE_LANE} catalogue={CODE_STAGES} /> };

export const OutsideCatalogue = { render: () => <Editable initial={[CODE_LANE[0], { name: "apply_config", kind: "agent" }]} catalogue={CODE_STAGES} /> };
