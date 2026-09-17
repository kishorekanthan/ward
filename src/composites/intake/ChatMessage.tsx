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
  const inConversation = useContext(InConversation);
  if (!inConversation) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return (
    <li className={`${s.turn} ward-chatmsg`} data-side={turn.role} data-turn={turn.role}>
      <span className={`${s.who} ward-chat-who`}>
        {turn.author} · {stamp(turn.at)}
      </span>
      <p className={`${s.body} ward-chat-body`}>{turn.body}</p>
    </li>
  );
}
