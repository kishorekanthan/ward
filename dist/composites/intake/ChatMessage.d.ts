import { ReactNode } from 'react';
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
export declare function Conversation({ children, density }: {
    children: ReactNode;
    density?: "intake";
}): import("react").JSX.Element;
export declare function ChatMessage({ turn }: ChatMessageProps): import("react").JSX.Element;
