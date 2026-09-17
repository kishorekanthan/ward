import { bothThemes } from "../../../.storybook/bothThemes";
import { BoardHeader } from "./BoardHeader";

const owners = [
  { value: "all", label: "Everyone" },
  { value: "j.rao", label: "J. Rao" },
  { value: "a.whyte", label: "A. Whyte" },
  { value: "m.chen", label: "M. Chen" },
];

const base = {
  stream: { name: "data-eng", key: "FL", streamStep: 1 },
  rollups: { inFlight: 14, loadedThisWeek: 31, agentsWorking: 4, p50: 5_400_000, p90: 219_600_000 },
  connection: "live",
  lastEventAt: new Date(Date.now() - 22_000).toISOString(),
  owners,
  owner: "all",
  onOwnerChange: () => {},
  onConfigure: () => {},
};

export default {
  title: "Board/BoardHeader",
  component: BoardHeader,
  decorators: [bothThemes],
};

export const Live = { args: base };

export const Reconnecting = { args: { ...base, connection: "reconnecting" } };

export const Stale = {
  args: { ...base, connection: "stale", lastEventAt: "2026-09-06T02:14:00Z" },
};

export const NoPercentiles = {
  args: { ...base, rollups: { inFlight: 14, loadedThisWeek: 31, agentsWorking: 4 } },
};

export const OwnerFiltered = { args: { ...base, owner: "m.chen" } };

export const QuietBoard = {
  args: { ...base, rollups: { inFlight: 0, loadedThisWeek: 0, agentsWorking: 0 } },
};

export const OtherStream = {
  args: { ...base, stream: { name: "integration", key: "IN", streamStep: 3 } },
};
