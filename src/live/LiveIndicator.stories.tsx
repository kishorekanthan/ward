import { bothThemes } from "../../.storybook/bothThemes";
import { LiveIndicator } from "./LiveIndicator";

const startedAt = new Date(Date.now() - 94_000).toISOString();
const lastEvent = { label: "foundry.query", at: new Date(Date.now() - 12_000).toISOString() };

export default {
  title: "Live/LiveIndicator",
  component: LiveIndicator,
  decorators: [bothThemes],
};

export const Live = {
  args: { startedAt, connection: "live" },
};

export const WithTurn = {
  args: { startedAt, connection: "live", turn: [3, 8] },
};

export const WithLastEvent = {
  args: { startedAt, connection: "live", turn: [3, 8], lastEvent },
};

export const Reconnecting = {
  args: { startedAt, connection: "reconnecting", turn: [3, 8], lastEvent },
};

export const Stale = {
  args: {
    startedAt: "2026-09-06T02:10:00Z",
    connection: "stale",
    turn: [3, 8],
    lastEvent: { label: "foundry.query", at: "2026-09-06T02:14:00Z" },
  },
};
