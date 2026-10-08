import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { BoardFootnote } from "./composites/board/BoardFootnote";
import { SessionRow, type Session } from "./composites/intake/SessionRow";
import { AgentCard } from "./composites/studio/AgentCard";
import { StreamRow, type Stream } from "./composites/studio/StreamRow";
import { AppShell } from "./layout/AppShell";
import { Sidebar } from "./layout/Sidebar";
import { Crumb } from "./primitives/Crumb";
import { Menu, MenuButton } from "./primitives/Menu";
import { StatStrip } from "./primitives/StatStrip";
import { TopBar } from "./primitives/TopBar";

const BAD = "data:text/html,x";

const stream: Stream = {
  name: "Data Engineering",
  key: "DE",
  streamStep: 2,
  owner: "Priya Nayar",
  members: 12,
  stages: [],
  agents: { live: 1, draft: 0, paused: 0 },
  policy: { id: "DE-04", summary: "no direct writes" },
  inFlight: 3,
  p50: 3600000,
};

const session: Session = {
  title: "Shipments missing after nightly cut",
  turns: 4,
  resolved: ["product"],
  cost: 0.06,
  lastActivity: "2026-09-06T09:04:00Z",
  state: "draft",
  link: { key: "DATAENG-4388", href: BAD },
};

const row = (el: ReactElement) => <table><tbody>{el}</tbody></table>;

const cases: [string, ReactElement, number][] = [
  [
    "Sidebar agent column",
    <Sidebar
      brand="Trellis"
      nav={[{ label: "Board", href: BAD }]}
      agentsHeading="Agents"
      agents={[{ label: "Extractor", href: BAD, meta: "v7 draft", streamStep: 1 }]}
      newAction={{ label: "New", href: BAD }}
      shared={{ heading: "Shared", links: [{ label: "Run history", href: BAD }] }}
    />,
    4,
  ],
  ["Sidebar destinations", <Sidebar destinations={[{ id: "home", label: "Home", href: BAD }]} active="home" />, 1],
  ["AppShell top bar", <AppShell destinations={[{ id: "board", label: "Board", href: BAD }]} active="board">page</AppShell>, 1],
  ["Crumb", <Crumb path={[{ label: "Studio", href: BAD }, { label: "Streams" }]} />, 1],
  ["StatStrip", <StatStrip cells={[{ value: "14", label: "In flight", href: BAD }, { value: "3", label: "Blocked", href: BAD }]} />, 2],
  ["TopBar", <TopBar wordmark="TRELLIS" destinations={[{ id: "board", label: "Board", href: BAD }, { id: "studio", label: "Studio", href: BAD }]} active="board" />, 2],
  ["AgentCard", <AgentCard agent={{ id: "x", name: "Extractor", streamStep: 1, versions: [{ v: "V1", status: "live" }] }} href={BAD} />, 1],
  ["StreamRow", row(<StreamRow stream={stream} href={BAD} />), 1],
  ["StreamRow compact", row(<StreamRow stream={{ name: "DE", key: "DE", streamStep: 2, owner: "Priya Nayar", members: 3, stages: [] }} href={BAD} presentation={{ columns: 5 }} />), 1],
  ["SessionRow table", row(<SessionRow session={session} presentation="table" href={BAD} />), 2],
  ["SessionRow card", <SessionRow session={session} />, 1],
  ["BoardFootnote", <BoardFootnote configureHref={BAD} />, 1],
  ["Menu link item", <MenuButton label="Help" defaultOpen><Menu entries={[{ label: "Guides", href: BAD }]} /></MenuButton>, 1],
];

describe("link components refuse unsafe href schemes", () => {
  it.each(cases)("%s renders # in place of a data: href", (_name, element, links) => {
    const { container } = render(element);
    const hrefs = Array.from(container.querySelectorAll("a"), (a) => a.getAttribute("href"));
    expect(hrefs.filter((href) => href === "#")).toHaveLength(links);
    expect(hrefs.filter((href) => href?.startsWith("data:"))).toEqual([]);
  });
});
