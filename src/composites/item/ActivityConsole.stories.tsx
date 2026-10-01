import { bothThemes } from "../../../.storybook/bothThemes";
import { ActivityConsole, ConsoleAnnounceProvider, type ConsoleLine } from "./ActivityConsole";

export default {
  title: "Item/ActivityConsole",
  component: ActivityConsole,
  decorators: [bothThemes],
  tags: ["autodocs"],
};

const lines: ConsoleLine[] = [
  { at: "2026-09-06T02:10:00Z", kind: "dim", text: "run.started · triage v2 · turn 1/8" },
  { at: "2026-09-06T02:12:00Z", kind: "tool", text: "foundry.query dataset:shipments · 1.2s" },
  { at: "2026-09-06T02:13:00Z", kind: "warn", text: "late rows outside the agreed window" },
  { at: "2026-09-06T02:14:00Z", kind: "ok", text: "draft written to FL-229" },
];

export const Live = { args: { lines, connection: "live", idleSince: "2026-09-06T02:14:00Z" } };
export const Reconnecting = { args: { lines, connection: "reconnecting", idleSince: "2026-09-06T02:14:00Z" } };
export const Stale = { args: { lines, connection: "stale", idleSince: "2026-09-06T02:14:00Z" } };
export const Idle = { args: { lines: lines.slice(0, 1), connection: "live", idleSince: "2026-09-06T02:10:00Z" } };
export const Empty = { args: { lines: [], connection: "live", idleSince: "2026-09-06T02:10:00Z" } };
// A run longer than the console, so a reader can scroll up and bring back Jump to latest.
export const History = { args: { lines: Array.from({ length: 8 }, () => lines).flat(), connection: "live", idleSince: "2026-09-06T02:14:00Z" } };
// Two consoles under one provider: 'Read new events' on either turns both on.
export const SharedAnnounce = {
  render: () => (
    <ConsoleAnnounceProvider>
      <ActivityConsole lines={lines} connection="live" label="Run activity" />
      <ActivityConsole lines={lines.slice(0, 2)} connection="stale" label="Console run" idleSince="2026-09-06T02:12:00Z" />
    </ConsoleAnnounceProvider>
  ),
  parameters: {
    docs: { description: { story: "To restore a persisted preference, pass `announce` with the stored value and update it from `onAnnounceChange`: `announce` is controlled, so a value you never update stops the toggle, and `onAnnounceChange` alone only reports changes." } },
  },
};
