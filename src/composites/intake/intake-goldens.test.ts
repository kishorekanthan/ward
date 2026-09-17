import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const read = (...parts: string[]) => readFileSync(join(here, ...parts), "utf8");
const golden = JSON.parse(read("..", "..", "goldens", "intake.json")) as Record<string, Record<string, string>>;
const wardCss = read("..", "..", "ward.css");
const rootBlock = wardCss.slice(wardCss.indexOf(":root {"), wardCss.indexOf("}", wardCss.indexOf(":root {")));
const rootVars = new Map(Array.from(rootBlock.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2]]));

// Tokens are substituted so the stylesheet is compared against the comp's literal values.
function value(file: string, selector: string, property: string): string {
  const source = read(...file.split("/"));
  const block = source.match(new RegExp(`(?:^|\\n)${selector}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
  const raw = block.match(new RegExp(`(?:^|[;\\s])${property}\\s*:\\s*([^;]+)`))?.[1].trim() ?? "";
  return raw.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => rootVars.get(name) ?? whole);
}

const font = (literal: string) => new RegExp(`^${literal},`);
const CHAT = "ChatMessage.module.css";
const INTAKE = '\\.thread\\[data-density="intake"\\]';
const COMPOSER = "../item/Composer.module.css";
const LAYOUT = "../../layout/layout.module.css";
const POLICY = "../admin/PolicyRow.module.css";

describe("intake conversation geometry against Intake 12c", () => {
  it("splits the record and rail 1.4 : 1", () => {
    expect(value(LAYOUT, '\\.subjectRail\\[data-ward-subject-rail="split"\\]', "grid-template-columns")).toBe(golden.split.columns);
  });

  it("spaces turns and puts the speaker above the bubble", () => {
    const { thread } = golden;
    expect(value(CHAT, INTAKE, "gap")).toBe(thread.gap);
    expect(value(CHAT, `${INTAKE} \\.turn\\[data-turn\\]`, "gap")).toBe(thread.turnGap);
    expect(value(CHAT, `${INTAKE} \\.who`, "font")).toMatch(font(thread.who));
  });

  it("rings the agent bubble and grounds the requester bubble in soft blue", () => {
    const { bubble } = golden;
    expect(value(CHAT, `${INTAKE} \\.body`, "padding")).toBe(bubble.padding);
    expect(value(CHAT, `${INTAKE} \\.body`, "color")).toBe(bubble.ink);
    expect(value(CHAT, `${INTAKE} \\.body`, "max-width")).toBe(bubble.agentWidth);
    expect(value(CHAT, `${INTAKE} \\.body`, "box-shadow")).toBe(bubble.agentRing);
    expect(value(CHAT, `${INTAKE} \\.turn\\[data-turn="requester"\\] \\.body`, "max-width")).toBe(bubble.requesterWidth);
    expect(value(CHAT, `${INTAKE} \\.turn\\[data-turn="requester"\\] \\.body`, "background")).toBe(bubble.requesterGround);
  });

  it("draws the reply row inside a stronger ring", () => {
    const { reply } = golden;
    expect(value(COMPOSER, "\\.replyRow", "padding")).toBe(reply.padding);
    expect(value(COMPOSER, "\\.replyRow", "gap")).toBe(reply.gap);
    expect(value(COMPOSER, "\\.replyRow", "box-shadow")).toBe(reply.ring);
  });
});

describe("loop policy rows against Intake 11d", () => {
  it("pads each row and holds the value column", () => {
    const { policy } = golden;
    expect(value(POLICY, "\\.webRow", "padding")).toBe(policy.padding);
    expect(value(POLICY, "\\.webRow", "gap")).toBe(policy.gap);
    expect(value(POLICY, "\\.webName", "font")).toMatch(font(policy.name));
    expect(value(POLICY, "\\.webConsequence", "font")).toMatch(font(policy.note));
    expect(value(POLICY, "\\.webControl", "flex")).toBe(`0 0 ${policy.valueColumn}`);
  });
});
