import type { ComponentType } from "react";
import { bothThemes } from "../../../.storybook/bothThemes";
import { ChatMessage, Conversation, type Turn } from "./ChatMessage";

export default {
  title: "Intake/ChatMessage",
  component: ChatMessage,
  decorators: [bothThemes],
};

const requester: Turn = {
  author: "M. Chen",
  at: "2026-09-06T02:10:00Z",
  role: "requester",
  body: "We keep missing late shipments in the daily counts.",
};

const agent: Turn = {
  author: "intake v3",
  at: "2026-09-06T02:11:00Z",
  role: "agent",
  body: "Which window counts as late — 24h after the promised date, or the agreed SLA?",
};

/* ChatMessage needs its Conversation <ol>; a decorator keeps the turn an arg, and it is
   per-story because Thread and EmptyThread bring their own list. */
const inConversation = (Story: ComponentType) => (
  <Conversation>
    <Story />
  </Conversation>
);

export const Requester = { args: { turn: requester }, decorators: [inConversation] };
export const Agent = { args: { turn: agent }, decorators: [inConversation] };
export const Thread = {
  render: () => (
    <Conversation>
      <ChatMessage turn={requester} />
      <ChatMessage turn={agent} />
      <ChatMessage turn={{ ...requester, at: "2026-09-06T02:12:00Z", body: "The agreed SLA." }} />
    </Conversation>
  ),
};
export const EmptyThread = { render: () => <Conversation>{null}</Conversation> };
