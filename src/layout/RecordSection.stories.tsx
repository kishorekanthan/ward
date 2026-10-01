import { bothThemes } from "../../.storybook/bothThemes";
import { RecordSection } from "./RecordSection";

export default {
  title: "Layout/RecordSection",
  component: RecordSection,
  decorators: [bothThemes],
};

export const Block = {
  args: { title: "Description", note: "from Jira · never edited here", children: <p>Shipments that land after the 01:00 cut are absent from the daily view.</p> },
};

export const RailList = {
  args: { title: "Live activity", pad: "rail", trailing: <span>SSE connected</span>, children: <p>waiting for the next event…</p> },
};

export const Kicker = {
  args: { title: "Ways out of this hold", note: "pick one to release the item", children: <p>Override and advance, or send it back to intake.</p> },
};
