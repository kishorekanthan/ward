import { overlayThemes } from "../../../.storybook/overlayThemes";
import { Btn } from "../../primitives/Btn";
import { ItemDrawer, type ItemDetail } from "./ItemDrawer";
import type { WorkCardFeed } from "./WorkCard";
import type { LiveConnection } from "../../live/types";

const stubFeed = (connection: LiveConnection): WorkCardFeed => ({
  connection,
  subscribe: () => () => {},
});

const item: ItemDetail = {
  key: "FL-229",
  title: "Late-arriving shipments view",
  stage: "review",
  timeInStage: 93_600_000,
  waitsOn: "A. Whyte",
  streamStep: 1,
  changedAt: "2026-09-06T02:14:00Z",
  summary: "Shipments arriving after the agreed window are not visible to Ops.",
  workflow: "data-eng intake",
  stateLabel: "Needs a human",
  state: { role: "attention", label: "NEEDS A HUMAN" },
};

const withRun: ItemDetail = {
  ...item,
  stateLabel: "Agent working",
  agentSentence: "triage v2 is drafting a clarification for the carrier reference.",
  run: {
    agent: "triage v2",
    startedAt: new Date(Date.now() - 94_000).toISOString(),
    turn: [3, 8],
    lastStep: { label: "foundry.query", at: new Date(Date.now() - 12_000).toISOString() },
  },
};

const actions = [
  <Btn key="requeue" onClick={() => {}}>
    Requeue
  </Btn>,
  <Btn key="resolve" variant="primary" onClick={() => {}}>
    Resolve
  </Btn>,
];

const base = { actions, onClose: () => {}, returnFocusTo: null };

export default {
  title: "Board/ItemDrawer",
  component: ItemDrawer,
  decorators: [overlayThemes],
};

export const WaitingOnAHuman = { args: { ...base, item } };

export const AgentWorking = { args: { ...base, item: withRun } };

export const Stale = { args: { ...base, item: withRun, feed: stubFeed("stale") } };

export const Flagged = {
  args: { ...base, item: { ...item, flagged: true, finding: "Late rows fall outside the agreed window." } },
};

export const NoActions = { args: { ...base, item, actions: [] } };
