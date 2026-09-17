import { bothThemes } from "../../.storybook/bothThemes";
import { DeniedState, EmptyState, FilteredEmpty, LoadFailed, StaleStrip, WriteUnavailableStrip } from "./States";

export default {
  title: "States",
  decorators: [bothThemes],
};

export const Empty = {
  name: "EmptyState",
  render: () => <EmptyState sentence="No items in data-eng yet." />,
};

export const EmptyWithAction = {
  name: "EmptyState — with an action",
  render: () => <EmptyState sentence="No items in data-eng yet." action={{ label: "Load an item", onClick: () => {} }} />,
};

export const Filtered = {
  name: "FilteredEmpty",
  render: () => (
    <FilteredEmpty sentence="No items match this filter." total={14} action={{ label: "Clear the filter", onClick: () => {} }} />
  ),
};

export const Denied = {
  name: "DeniedState",
  render: () => (
    <DeniedState sentence="You cannot see the integration stream." action={{ label: "Ask S. Rao for access", onClick: () => {} }} />
  ),
};

export const Failed = {
  name: "LoadFailed",
  render: () => <LoadFailed sentence="The board could not be loaded." at="2026-09-06T02:14:00Z" onRetry={() => {}} />,
};

export const Stale = {
  name: "StaleStrip",
  render: () => <StaleStrip lastReachableAt="2026-09-06T02:14:00Z" snapshotAt="2026-09-06T02:12:00Z" />,
};

export const WriteUnavailable = {
  name: "WriteUnavailableStrip",
  render: () => <WriteUnavailableStrip queued={3} since="2026-09-06T02:14:00Z" />,
};

export const WriteUnavailableSingle = {
  name: "WriteUnavailableStrip — one change",
  render: () => <WriteUnavailableStrip queued={1} since="2026-09-06T02:14:00Z" />,
};
