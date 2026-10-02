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

// No onOverflow: Ward's own panel lists the actions; narrow the viewport to see it.
export const OverflowPanel = {
  args: { crumb, title: "intake-advisor v3", actions },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// Comp 3c: secondary actions sit behind ··· at every width.
export const WithMore = {
  args: {
    crumb,
    title: "Data Engineering",
    actions,
    more: [
      <Btn key="rules" variant="ghost" onClick={() => {}}>
        Rule builder
      </Btn>,
      <Btn key="intake" variant="ghost" onClick={() => {}}>
        Intake
      </Btn>,
    ],
  },
};

// Below 768px the chips take their own line under the breadcrumb, whole, and wrap among themselves.
export const PhoneWidth = {
  args: {
    crumb,
    title: "intake-advisor v3",
    chips: [
      { role: "stream", label: "data-eng", streamStep: 1 },
      { role: "running", label: "DRAFT" },
      { role: "gate", label: "AWAITING REVIEW" },
      { role: "attention", label: "2 GATES OVERDUE" },
      { role: "meta", label: "OWNER PLATFORM" },
    ],
    actions,
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// One chip would fit beside a short crumb; below 768px it still takes its own line.
export const PhoneWidthOneChip = {
  args: {
    crumb: [{ label: "Studio", href: "/studio" }, { label: "data-eng" }],
    title: "intake-advisor v3",
    chips: [{ role: "running", label: "DRAFT" }],
    actions,
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// Actions wider than a phone: they collapse, and the hidden measure copy must not widen the page.
export const PhoneWidthWideActions = {
  args: {
    crumb,
    title: "intake-advisor v3",
    actions: [
      <Btn key="promote" variant="primary" disabled disabledReason="Nothing to promote: this item is not waiting at a gate.">
        Promote to the next stage
      </Btn>,
      <Btn key="changes" onClick={() => {}}>
        Request changes from the owner
      </Btn>,
      <Btn key="jira" onClick={() => {}}>
        Open in Jira
      </Btn>,
    ],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// One link would fold into a menu of one, so at 375px it stays in the strip (#138).
export const PhoneWidthLoneLink = {
  args: {
    crumb: [{ label: "data-eng", href: "/streams/data-eng" }, { label: "New request" }],
    title: "New request",
    actions: [<a key="advisor" className="ward-rowlink" href="#advisor">Ask the advisor first</a>],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// Two links still fold behind ··· at 375px.
export const PhoneWidthTwoLinks = {
  args: {
    crumb: [{ label: "data-eng", href: "/streams/data-eng" }, { label: "Intake" }],
    title: "Intake",
    actions: [
      <a key="advisor" className="ward-rowlink" href="#advisor">Ask the advisor first</a>,
      <a key="raise" className="ward-rowlink" href="#raise">Write the request yourself</a>,
    ],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
