import { bothThemes } from "../../.storybook/bothThemes";
import { Btn } from "./Btn";
import { PageHeader } from "./PageHeader";

const crumb = [
  { label: "Studio", href: "/studio" },
  { label: "data-eng", href: "/studio/data-eng" },
  { label: "intake-advisor" },
];

const actions = [
  <Btn key="dry" onClick={() => {}}>
    Dry run
  </Btn>,
  <Btn key="publish" variant="primary" onClick={() => {}}>
    Publish v3
  </Btn>,
];

const since = new Date(Date.now() - 22_000).toISOString();

export default {
  title: "Primitives/PageHeader",
  component: PageHeader,
  decorators: [bothThemes],
};

export const Default = {
  args: { crumb, title: "intake-advisor v3", actions },
};

export const WithChips = {
  args: {
    crumb,
    title: "intake-advisor v3",
    chips: [
      { role: "stream", label: "data-eng", streamStep: 1 },
      { role: "running", label: "DRAFT" },
    ],
    actions,
  },
};

export const WithConsequence = {
  args: {
    crumb,
    title: "intake-advisor v3",
    consequence: "Publishing mounts the agent on the live stream.",
    actions,
  },
};

export const Live = {
  args: {
    crumb,
    title: "data-eng board",
    actions,
    connection: { connection: "live", since },
  },
};

export const Reconnecting = {
  args: {
    crumb,
    title: "data-eng board",
    actions,
    connection: { connection: "reconnecting", since },
  },
};

export const Stale = {
  args: {
    crumb,
    title: "data-eng board",
    actions,
    connection: { connection: "stale", since: "2026-09-06T02:14:00Z" },
  },
};

export const NoActions = {
  args: { crumb, title: "intake-advisor v3", actions: [] },
};

export const Overflow = {
  args: { crumb, title: "intake-advisor v3", actions, onOverflow: () => {} },
};
