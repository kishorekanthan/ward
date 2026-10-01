import { bothThemes } from "../../.storybook/bothThemes";
import { Btn } from "./Btn";
import { ActionStack } from "./ActionStack";

export default {
  title: "Primitives/ActionStack",
  component: ActionStack,
  decorators: [bothThemes],
};

export const UnavailableWithReason = {
  render: () => (
    <ActionStack>
      <Btn variant="secondary" label="Open in Jira" disabled describedBy="jira-note" />
      <span id="jira-note">No Jira issue yet</span>
    </ActionStack>
  ),
};
