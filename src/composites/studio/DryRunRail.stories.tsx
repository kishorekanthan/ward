import { bothThemes } from "../../../.storybook/bothThemes";
import { DryRunRail, type DryRun } from "./DryRunRail";

const wait = { kind: "notSimulated" as const, title: "Reviewer sign-off", detail: "A human wait is never simulated." };

const steps: DryRun["steps"] = [
  { kind: "ok", title: "foundry.query", detail: "1.2s · 84 rows" },
  { kind: "action", title: "jira.comment", detail: "Draft written, not sent." },
  { kind: "finding", title: "Missing carrier reference", detail: "Held for clarification." },
  wait,
];

const sample = { key: "T-024", title: "Late shipment — carrier unknown", replayedFrom: "06 Sep 02:14" };

const complete = [
  { met: true, text: "Two reviewers named." },
  { met: true, text: "Dry run replayed on a real item." },
];

const incomplete = [complete[0], { met: false, text: "Dry run replayed on a real item." }];

const NOTE = "Publishing mounts the agent on the live stream.";

export default {
  title: "Studio/DryRunRail",
  component: DryRunRail,
  decorators: [bothThemes],
};

const base = { publishNote: NOTE, onPublish: () => {} };

export const NotRunYet = {
  args: { ...base, run: { status: "notRun", steps: [] }, checklist: [] },
};

export const Running = {
  args: {
    ...base,
    run: {
      status: "running",
      startedAt: new Date(Date.now() - 22_000).toISOString(),
      sample,
      steps: [...steps, { kind: "running", title: "policy.check", detail: "open" }],
      cost: 0.21,
      turns: [3, 8],
    },
    checklist: complete,
  },
};

export const Passed = {
  args: { ...base, run: { status: "passed", sample, steps, cost: 0.34, turns: [6, 8] }, checklist: complete },
};

export const Failed = {
  args: { ...base, run: { status: "failed", sample, steps, cost: 0.12, turns: [2, 8] }, checklist: complete },
};

export const BlockedByChecklist = {
  args: { ...base, run: { status: "passed", sample, steps, cost: 0.34, turns: [6, 8] }, checklist: incomplete },
};

export const Stale = {
  args: {
    ...base,
    run: {
      status: "running",
      startedAt: new Date(Date.now() - 400_000).toISOString(),
      sample,
      steps: [...steps, { kind: "running", title: "policy.check", detail: "open" }],
      turns: [3, 8],
    },
    checklist: complete,
    feed: { connection: "stale" },
  },
};

/* The comp's own dry run, verbatim from design/Trellis Studio.dc.html, so trace-token
   drift shows against a fixed reference rather than invented data. */
const compSteps: DryRun["steps"] = [
  { kind: "ok", title: "Read manifest", detail: "foundry.query · 1.2s" },
  { kind: "ok", title: "Count rows, both sides", detail: "4,182,004 vs 4,182,004 · 6.4s" },
  { kind: "finding", title: "Type change found", detail: "paid_amt: decimal → string" },
  { kind: "ok", title: "Drafted 62-word summary", detail: "within 80-word limit" },
  { kind: "action", title: "Matched rule 02 → request review", detail: "relay.enqueue · dry · 0.3s" },
  { kind: "notSimulated", title: "Waiting on human — not simulated", detail: "median wait for this rule: 2d 4h" },
];

export const CompBlock = {
  args: {
    publishNote: "Publish stays disabled until sign-off lands. v6 keeps running in the meantime.",
    onPublish: () => {},
    run: {
      status: "passed",
      sample: { key: "T-012", title: "Backfill claims extract to Foundry", replayedFrom: "4 Sep 02:14" },
      steps: compSteps,
      cost: 0.11,
      turns: [5, 8] as [number, number],
      durationMs: 38_000,
    },
    checklist: [
      { met: true, text: "Dry run passed on 1 item" },
      { met: true, text: "Write tools scoped and deduped" },
      { met: false, text: "Owner sign-off — Priya N. not yet asked" },
    ],
  },
};
