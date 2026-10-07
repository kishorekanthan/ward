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
      { role: "running", label: "Draft" },
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
      { role: "running", label: "Draft" },
      { role: "gate", label: "Awaiting review" },
      { role: "attention", label: "2 gates overdue" },
      { role: "meta", label: "Owner platform" },
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
    chips: [{ role: "running", label: "Draft" }],
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

// Web styles its header links itself; the story does the same with the text token.
// One link would fold into a menu of one, so at 375px it stays in the strip (#138).
export const PhoneWidthLoneLink = {
  args: {
    crumb: [{ label: "data-eng", href: "/streams/data-eng" }, { label: "New request" }],
    title: "New request",
    actions: [<a key="advisor" href="#advisor">Ask the advisor first</a>],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// A lone link too long for one line wraps inside the strip rather than overflowing it (#158).
export const PhoneWidthLongLoneLink = {
  args: {
    crumb: [{ label: "data-eng", href: "/streams/data-eng" }, { label: "New request" }],
    title: "New request",
    actions: [<a key="advisor" href="#advisor">Ask the advisor to shape this request before you write it yourself</a>],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// Two links too wide for their own line still fold behind ··· at 375px.
export const PhoneWidthTwoLinks = {
  args: {
    crumb: [{ label: "data-eng", href: "/streams/data-eng" }, { label: "Intake" }],
    title: "Intake",
    actions: [
      <a key="advisor" href="#advisor">Ask the advisor to shape it first</a>,
      <a key="raise" href="#raise">Write the request yourself</a>,
    ],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// A signal draft's title is its asset id: unbroken, it wraps at any character rather than widening the page (#190).
export const PhoneWidthLongTitle = {
  args: {
    crumb: [{ label: "Signals", href: "/signals" }, { label: "Draft" }],
    title: "warehouse.analytics.customer_lifetime_value_daily_rollup_v2",
    actions: [<Btn key="publish" variant="primary" onClick={() => {}}>Publish</Btn>],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// The case file header: a 120-character title wraps to two lines and cuts, and a 40-character owner wraps (#199).
const longCase = {
  crumb: [{ label: "data-eng", href: "/streams/data-eng" }, { label: "FL-229" }],
  chips: [{ role: "gate", label: "Awaiting review" }],
  title: "Reconcile late-arriving inbound shipments against the carrier's manifest before the nightly warehouse cut-off has closed",
  consequence: "Owner Alexandra Whitfield-Montgomery Okafor-Li",
  actions: [<Btn key="open" onClick={() => {}}>Open in Jira</Btn>],
  density: "record",
};

export const RecordLongTitle = { args: longCase };
