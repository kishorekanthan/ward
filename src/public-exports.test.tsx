import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as Ward from "./index";
import {
  Btn,
  BoardColumn,
  BoardScroller,
  CapabilityRow,
  ChatMessage,
  EmptyState,
  Field,
  GateLadder,
  Loading,
  Menu,
  MenuButton,
  PageFrame,
  SectionBand,
  SegmentedControl,
  Sidebar,
  StageColumn,
  SubjectRail,
  Tabs,
  Visible,
  VisibilityProvider,
  WorkCard,
  money,
} from "./index";

describe("public Ward exports", () => {
  it("renders the controls and states from the package root", () => {
    const onChange = vi.fn();
    render(
      <>
        <Btn>Save</Btn>
        <Field label="Name" value="Ada" />
        <Tabs tabs={[{ id: "one", label: "One", count: 2 }]} active="one" onChange={onChange} />
        <SegmentedControl options={[{ value: "a", label: "A" }, { value: "b", label: "B" }]} value="a" onChange={onChange} />
        <Sidebar items={[{ id: "home", label: "Home", href: "/" }]} active="home" />
        <Loading label="Loading" />
        <EmptyState sentence="No records." />
      </>,
    );
    expect(screen.getByRole("button", { name: "Save" })).toBeDefined();
    expect(screen.getByLabelText("Name").getAttribute("value")).toBe("Ada");
    expect(screen.getByRole("tab", { name: "One · 2" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("radio", { name: "A" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByText("No records.").closest("[role='status']")).not.toBeNull();
  });

  it("publishes the show/hide wrapper and sub-cent money from the root", () => {
    render(
      <VisibilityProvider hidden={["usage.tokens"]}>
        <Visible id="usage.costs"><span>{money(0.0004)}</span></Visible>
        <Visible id="usage.tokens"><span>120,000 tokens</span></Visible>
      </VisibilityProvider>,
    );
    expect(screen.getByText("<$0.01")).toBeDefined();
    expect(screen.queryByText("120,000 tokens")).toBeNull();
  });

  it("keeps interaction on the public controls", () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={[{ value: "a", label: "A" }, { value: "b", label: "B" }]} value="a" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "B" }));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("publishes the menu button and its menu from the root", () => {
    const onSelect = vi.fn();
    render(
      <MenuButton label="New request">
        <Menu entries={[{ label: "Story", onSelect }]} />
      </MenuButton>,
    );
    fireEvent.click(screen.getByRole("button", { name: "New request" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Story" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("keeps the root export contract for layouts and every domain family", () => {
    const exports = [PageFrame, SubjectRail, SectionBand, BoardScroller, BoardColumn, WorkCard, StageColumn, CapabilityRow, GateLadder, ChatMessage];
    expect(exports.every((value) => typeof value === "function")).toBe(true);
  });

  it("publishes every promoted composite from the package root", () => {
    const expected = [
      "AppShell", "PageFrame", "SubjectRail", "RecordSection", "FormStack", "SectionBand", "BoardScroller",
      "BoardColumn", "BoardHeader", "ConfigRow", "ItemDrawer", "OverCapNote", "PreviewRail", "WorkCard",
      "ActivityConsole", "ConsoleAnnounceProvider", "ClarificationRow", "Composer", "CriteriaList", "GateLadder", "RequeueSheet", "ResolveBlock", "StageHistory",
      "ChatMessage", "DeliveryHealth", "ReadyChecklist", "ResolvedFieldRow", "RoutingTable", "SessionRow", "TypedInputBlock",
      "AgentCard", "ColourLadder", "DryRunRail", "GateChecklist", "NewStreamModal", "RuleRow", "StageColumn", "StageListEditor", "StreamRow", "ToolRow",
      "AppearanceStrip", "CapabilityRow", "ComponentRow", "CredentialRow", "EnvCard", "KeyPanel", "MarkUpload", "McpServerRow", "PolicyRow", "RoleMatrixRow", "RunbookSteps", "ValidationList",
    ] as const;
    expect(expected.every((name) => typeof Ward[name] === "function")).toBe(true);
  });

  it("publishes the theme provider and the accent and density choices a consumer's menu lists", () => {
    expect(typeof Ward.ThemeProvider).toBe("function");
    expect(Ward.ACCENT_PRESETS.map(({ name, label }) => `${name}: ${label}`)).toEqual(["green: Trellis green", "blue: Blue", "violet: Violet", "orange: Orange", "rose: Rose"]);
    expect(Ward.DENSITIES.map(({ name, label }) => `${name}: ${label}`)).toEqual(["comfortable: Comfortable", "compact: Compact"]);
  });
});
