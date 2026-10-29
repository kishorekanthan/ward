import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatWorking, Conversation } from "./ChatMessage";

const wardCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../../ward.css"), "utf8");

function working(props: Parameters<typeof ChatWorking>[0]) {
  return render(
    <Conversation>
      <ChatWorking {...props} />
    </Conversation>,
  );
}

describe("ChatWorking", () => {
  it("shows the author, the dots and the step while no text has come", () => {
    const { container } = working({ author: "intake v3", step: "Thinking" });
    const turn = screen.getByRole("listitem");
    expect(turn.getAttribute("data-turn")).toBe("agent");
    expect(turn.querySelector(".ward-chat-who")?.textContent).toBe("intake v3");
    expect(container.querySelectorAll("[data-dots] > span")).toHaveLength(3);
    expect(screen.getByRole("status").textContent).toBe("Thinking");
    expect(turn.querySelector(".ward-chat-body")).toBeNull();
  });

  it("drops the dots once text comes and keeps the step only while it is set", () => {
    const { container, rerender } = working({ author: "Advisor", step: "Looking in Palantir Foundry", body: "The daily" });
    expect(container.querySelector("[data-dots]")).toBeNull();
    expect(container.querySelector(".ward-chat-body")?.textContent).toBe("The daily");
    expect(screen.getByRole("status").textContent).toBe("Looking in Palantir Foundry");
    rerender(
      <Conversation>
        <ChatWorking author="Advisor" step="" body="The daily counts" />
      </Conversation>,
    );
    expect(screen.getByRole("status").children).toHaveLength(0);
    expect(container.querySelector(".ward-chat-body")?.textContent).toBe("The daily counts");
  });

  it("keeps one live region for the step and the note, with the text outside it", () => {
    const { container } = working({ author: "Advisor", step: "Thinking", note: "Still working", body: "Late" });
    const live = screen.getAllByRole("status");
    expect(live).toHaveLength(1);
    expect([...live[0].children].map((part) => part.textContent)).toEqual(["Thinking", "Still working"]);
    expect(live[0].contains(container.querySelector(".ward-chat-body"))).toBe(false);
    expect(container.querySelectorAll("[aria-live], [role=status], [role=log], [aria-busy]")).toHaveLength(1);
  });

  it("names no note when none is given", () => {
    working({ author: "Advisor", step: "Thinking", note: "" });
    expect(screen.getByRole("status").children).toHaveLength(1);
  });

  it("pulses each dot with the running animation, which reduced motion stops", () => {
    const { container } = working({ author: "Advisor", step: "Thinking" });
    const dots = [...container.querySelectorAll("[data-dots] > span")];
    expect(dots.every((dot) => dot.classList.contains("ward-running"))).toBe(true);
    const reduced = wardCss.slice(wardCss.indexOf("@media (prefers-reduced-motion: reduce)"));
    expect(reduced).toContain(".ward-running { animation: none; }");
  });

  it("refuses to render outside a Conversation", () => {
    expect(() => render(<ChatWorking author="Advisor" step="Thinking" />)).toThrow(
      "ChatWorking: must be rendered inside a Conversation",
    );
  });
});
