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

  it("keeps the root export contract for layouts and every domain family", () => {
    const exports = [PageFrame, SubjectRail, SectionBand, BoardScroller, BoardColumn, WorkCard, StageColumn, CapabilityRow, GateLadder, ChatMessage];
    expect(exports.every((value) => typeof value === "function")).toBe(true);
  });

  it("publishes every promoted composite from the package root", () => {
    const expected = [
      "AppShell", "PageFrame", "SubjectRail", "RecordSection", "FormStack", "SectionBand", "BoardScroller",
      "BoardColumn", "BoardHeader", "ConfigRow", "ItemDrawer", "OverCapNote", "PreviewRail", "WorkCard",
      "ActivityConsole", "ClarificationRow", "Composer", "CriteriaList", "GateLadder", "RequeueSheet", "ResolveBlock", "StageHistory",
      "ChatMessage", "DeliveryHealth", "ReadyChecklist", "ResolvedFieldRow", "RoutingTable", "SessionRow", "TypedInputBlock",
      "AgentCard", "ColourLadder", "DryRunRail", "GateChecklist", "NewStreamModal", "RuleRow", "StageColumn", "StageListEditor", "StreamRow", "ToolRow",
      "AppearanceStrip", "CapabilityRow", "ComponentRow", "CredentialRow", "EnvCard", "MarkUpload", "McpServerRow", "PolicyRow", "RoleMatrixRow", "RunbookSteps", "ValidationList",
    ] as const;
    expect(expected.every((name) => typeof Ward[name] === "function")).toBe(true);
  });
});
