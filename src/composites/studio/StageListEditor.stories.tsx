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

function Editable({ initial }: { initial: StageListRow[] }) {
  const [stages, setStages] = useState(initial);
  return <StageListEditor stages={stages} onChange={setStages} />;
}

export const Workflow = { render: () => <Editable initial={STAGES} /> };

export const SingleStage = { render: () => <Editable initial={[STAGES[0]]} /> };
