import { bothThemes } from "../../.storybook/bothThemes";
import { PlainList } from "./PlainList";

export default {
  title: "Primitives/PlainList",
  component: PlainList,
  decorators: [bothThemes],
};

export const Rows = {
  args: {
    label: "MCP servers",
    children: ["jira · connected", "github · connected", "slack · restarting"].map((row) => <li key={row}>{row}</li>),
  },
};
