import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatMessage, Conversation, type Turn } from "./ChatMessage";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "ChatMessage.module.css"), "utf8");

const turns: Turn[] = [
  { author: "M. Chen", at: "2026-09-06T02:10:00Z", role: "requester", body: "We keep missing late shipments in the daily counts." },
  { author: "intake v3", at: "2026-09-06T02:11:00Z", role: "agent", body: "Which window counts as late?" },
];

describe("ChatMessage", () => {
  it("keeps the public message contract and London clock output", () => {
    render(
      <Conversation>
        <ChatMessage turn={{ author: "M. Chen", at: "2026-09-06T09:04:00Z", role: "requester", body: "Shipments are late." }} />
        <ChatMessage turn={{ author: "intake v2", at: "2026-09-06T09:04:30Z", role: "agent", body: "The daily view is missing." }} />
      </Conversation>,
    );

    const messages = screen.getAllByRole("listitem");
    expect(messages[0].getAttribute("data-side")).toBe("requester");
    expect(messages[0].querySelector(".ward-chat-who")?.textContent).toBe("M. Chen · 06 Sep 10:04");
    expect(messages[0].querySelector(".ward-chat-body")?.textContent).toBe("Shipments are late.");
    expect(messages[1].getAttribute("data-side")).toBe("agent");
    expect(messages[1].querySelector(".ward-chat-body")?.textContent).toBe("The daily view is missing.");
  });

  it("pins the requester and agent surface treatments in the shared stylesheet", () => {
    expect(css).toContain('.turn[data-turn="requester"]');
    expect(css).toContain("background: var(--ward-color-blueSoft)");
    expect(css).toContain('.turn[data-turn="agent"]');
    expect(css).toContain("box-shadow: inset 0 0 0 var(--ward-border) var(--ward-color-line)");
  });

  it("is a list item inside the named conversation list", () => {
    render(
      <Conversation>
        {turns.map((t) => (
          <ChatMessage turn={t} key={t.at} />
        ))}
      </Conversation>,
    );
    const list = screen.getByRole("list", { name: "Conversation" });
    expect(list.tagName).toBe("OL");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items.every((li) => li.tagName === "LI")).toBe(true);
  });

  it("takes its side from the turn, not from a visual prop", () => {
    render(
      <Conversation>
        {turns.map((t) => (
          <ChatMessage turn={t} key={t.at} />
        ))}
      </Conversation>,
    );
    const items = screen.getAllByRole("listitem");
    expect(items[0].getAttribute("data-turn")).toBe("requester");
    expect(items[1].getAttribute("data-turn")).toBe("agent");
  });

  it("names the author and the time of every turn", () => {
    render(
      <Conversation>
        <ChatMessage turn={turns[1]} />
      </Conversation>,
    );
    expect(screen.getByText("intake v3 · 06 Sep 03:11")).not.toBeNull();
  });

  it("refuses to render outside a Conversation", () => {
    expect(() => render(<ChatMessage turn={turns[0]} />)).toThrow("ChatMessage: must be rendered inside a Conversation");
  });
});
