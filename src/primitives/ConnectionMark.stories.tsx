import { bothThemes } from "../../.storybook/bothThemes";
import { ConnectionMark } from "./ConnectionMark";

const since = new Date(Date.now() - 22_000).toISOString();

export default {
  title: "Primitives/ConnectionMark",
  component: ConnectionMark,
  decorators: [bothThemes],
};

export const Live = {
  args: { connection: "live", since },
};

export const Reconnecting = {
  args: { connection: "reconnecting", since },
};

export const Stale = {
  args: { connection: "stale", since: "2026-09-06T02:14:00Z" },
};
