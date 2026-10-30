import { createContext, useContext, type ReactNode } from "react";
import { stamp } from "../../fmt/stamp";
import s from "./ChatMessage.module.css";

// ChatMessage is an <li>, so an orphan outside Conversation's <ol> is invalid HTML.
const InConversation = createContext(false);

export type Turn = {
  author: string;
  at: string;
  role: "requester" | "agent";
  body: string;
};

export type ChatTurn = Turn;

export interface ChatMessageProps {
  turn: Turn;
}

// intake: Trellis Intake 12c's tighter bubbles.
export function Conversation({ children, density }: { children: ReactNode; density?: "intake" }) {
  return (
    <InConversation.Provider value={true}>
      <ol className={`${s.thread} ward-chat`} aria-label="Conversation" data-density={density}>
        {children}
      </ol>
    </InConversation.Provider>
  );
}

export function ChatMessage({ turn }: ChatMessageProps) {
  if (!useContext(InConversation)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return (
    <li className={`${s.turn} ward-chatmsg`} data-side={turn.role} data-turn={turn.role}>
      <span className={`${s.who} ward-chat-who`}>
        {turn.author} · {stamp(turn.at)}
      </span>
      <p className={`${s.body} ward-chat-body`}>{turn.body}</p>
    </li>
  );
}

export interface ChatWorkingProps {
  author: string;
  // What the replier is doing now ("Thinking"); empty once the text speaks for itself.
  step: string;
  // The reply so far; the dots show only until its first word.
  body?: string;
  note?: string;
}

function Dots() {
  return (
    <span className={s.dots} aria-hidden="true" data-dots="true">
      <span className="ward-running" />
      <span className="ward-running" />
      <span className="ward-running" />
    </span>
  );
}

function StepLine({ step, note }: { step: string; note?: string }) {
  return (
    <span role="status" className={s.step}>
      {step === "" ? null : <span>{step}</span>}
      {note ? <span className={s.note}>{note}</span> : null}
    </span>
  );
}

// A reply on its way. Only the step line is live, so each change is heard once and the growing text is not.
export function ChatWorking({ author, step, body = "", note }: ChatWorkingProps) {
  if (!useContext(InConversation)) throw new Error("ChatWorking: must be rendered inside a Conversation");
  const started = body !== "";
  return (
    <li className={`${s.turn} ward-chatmsg`} data-side="agent" data-turn="agent" data-working="true">
      <span className={`${s.who} ward-chat-who`}>{author}</span>
      <p className={`${s.working} ward-chat-working`}>
        {started ? null : <Dots />}
        <StepLine step={step} note={note} />
      </p>
      {started ? <p className={`${s.body} ward-chat-body`}>{body}</p> : null}
    </li>
  );
}
