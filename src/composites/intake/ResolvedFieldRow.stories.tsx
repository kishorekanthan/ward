import { bothThemes } from "../../../.storybook/bothThemes";
import { ResolvedFieldRow } from "./ResolvedFieldRow";

export default {
  title: "Intake/ResolvedFieldRow",
  component: ResolvedFieldRow,
  decorators: [bothThemes],
};

export const Resolved = {
  args: { field: { key: "Stream", value: "Data Engineering", evidence: "sess:8f21c4", state: "resolved" } },
};
export const NeedsConfirmation = {
  args: { field: { key: "Owner", value: "J. Rao", evidence: "2 candidates", state: "confirm" } },
};
export const Unresolved = { args: { field: { key: "Due", value: "—", state: "unresolved" } } };
export const NoEvidence = { args: { field: { key: "Stream", value: "Data Engineering", state: "resolved" } } };
