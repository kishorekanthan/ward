import { bothThemes } from "../../.storybook/bothThemes";
import { Btn } from "./Btn";
import { OwedCard } from "./OwedCard";

export default {
  title: "Primitives/OwedCard",
  component: OwedCard,
  decorators: [bothThemes],
};

export const Approval = {
  args: {
    title: "Your approval is needed",
    sentence: "The build is done. Check the new table and approve it so it can ship.",
    actions: <Btn variant="primary" label="Approve" onClick={() => undefined} />,
  },
};

export const SentenceOnly = { args: { title: "Your answer is needed", sentence: "The planner asked which source holds the customers." } };
