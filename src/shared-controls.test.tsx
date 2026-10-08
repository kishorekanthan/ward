import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./primitives/Checkbox";
import { Chip } from "./primitives/Chip";
import { Field } from "./primitives/Field";
import { Radio } from "./primitives/Radio";
import { SegmentedControl } from "./primitives/SegmentedControl";
import { Switch } from "./primitives/Switch";
import { Tree, TreeRow } from "./primitives/Tree";
import { PolicyRow } from "./composites/admin/PolicyRow";
import { LegacyPreviewRail, LegacyWorkCard } from "./composites/board/compat";
import { DeliveryHealth } from "./composites/intake/DeliveryHealth";
import { TypedInputBlock } from "./composites/intake/TypedInputBlock";
import { ActivityConsole } from "./composites/item/ActivityConsole";
import { RequeueSheet } from "./composites/item/RequeueSheet";
import { DryRunRail } from "./composites/studio/DryRunRail";

const SRC = dirname(fileURLToPath(import.meta.url));

function reasonOf(element: Element | null | undefined): string {
  const ids = (element?.getAttribute("aria-describedby") ?? "").split(" ").filter(Boolean);
  return ids.map((id) => document.getElementById(id)?.textContent ?? `<missing ${id}>`).join(" | ");
}

function texts(root: ParentNode, selector: string): Array<string | null> {
  return Array.from(root.querySelectorAll(selector)).map((element) => element.textContent);
}

function names(root: ParentNode, selector: string): Array<string | null> {
  return Array.from(root.querySelectorAll(selector)).map((element) => element.getAttribute("aria-label"));
}

describe("disabled controls reach the reason they are given", () => {
  it("describes a disabled switch by the supplied note", () => {
    const { container } = render(
      <>
        <p id="why">Only platform admins change this.</p>
        <Switch label="Agents may run" checked={false} disabled describedBy="why" />
      </>,
    );
    const control = container.querySelector("[role='switch']") as HTMLButtonElement;
    expect(control.disabled).toBe(true);
    expect(reasonOf(control)).toBe("Only platform admins change this.");
  });

  it("keeps a field's error and appends the supplied reason", () => {
    const { container } = render(
      <>
        <p id="cap-why">Gates are always uncapped.</p>
        <Field label="WIP cap" value="x" invalid="Cap must be a number" disabled describedBy="cap-why" />
      </>,
    );
    expect(reasonOf(container.querySelector("input"))).toBe("Cap must be a number | Gates are always uncapped.");
  });

  it("keeps a checkbox consequence and appends the supplied reason", () => {
    const { container } = render(
      <>
        <p id="lock-why">Locked by the stream owner.</p>
        <Checkbox label="Shown as a column" consequence="Shown on every board." checked disabled describedBy="lock-why" />
      </>,
    );
    expect(reasonOf(container.querySelector("input"))).toBe("Shown on every board. | Locked by the stream owner.");
  });

  it("gives every radio its own note plus the reason, even when two unnamed groups share values", () => {
    const { container } = render(
      <>
        <p id="policy-why">Policy is locked for this stream.</p>
        <Radio legend="First" value="a" options={[{ value: "a", label: "A", consequence: "first note" }]} />
        <Radio legend="Second" value="a" disabled describedBy="policy-why" options={[{ value: "a", label: "A", consequence: "second note" }, { value: "b", label: "B" }]} />
      </>,
    );
    expect(Array.from(container.querySelectorAll("input")).map(reasonOf)).toEqual([
      "first note",
      "second note | Policy is locked for this stream.",
      "Policy is locked for this stream.",
    ]);
  });

  it("describes every disabled segment by the supplied reason", () => {
    const { container } = render(
      <>
        <p id="seg-why">Set by platform policy.</p>
        <SegmentedControl label="Rerun entry" disabled describedBy="seg-why" value="a" onChange={() => undefined} options={[{ value: "a", label: "implement" }, { value: "b", label: "producing stage" }]} />
      </>,
    );
    expect(Array.from(container.querySelectorAll("[role='radio']")).map(reasonOf)).toEqual(["Set by platform policy.", "Set by platform policy."]);
  });

  it("ties a locked compact policy control to the row's reason, and leaves an editable one undescribed", () => {
    const segment = { kind: "segment" as const, options: [{ value: "a", label: "implement" }, { value: "b", label: "producing stage" }], value: "a", onChange: () => undefined };
    const { container } = render(
      <table>
        <tbody>
          <PolicyRow setting={{ name: "No-regression check", consequence: "Rejects regressions." }} control={{ kind: "switch", checked: true, onChange: () => undefined }} inheritance="locked" reason="platform-locked" />
          <PolicyRow setting={{ name: "Rerun entry", consequence: "Where reruns enter." }} control={segment} inheritance="locked" reason="set by platform" />
          <PolicyRow setting={{ name: "Epic placement", consequence: "Confirms epics." }} control={{ kind: "switch", checked: false, onChange: () => undefined }} inheritance="overridden" />
        </tbody>
      </table>,
    );
    const switches = container.querySelectorAll("[role='switch']");
    expect(reasonOf(switches[0])).toBe("platform-locked");
    expect(Array.from(container.querySelectorAll("[role='radio']")).map(reasonOf)).toEqual(["set by platform", "set by platform"]);
    expect(switches[1]?.hasAttribute("aria-describedby")).toBe(false);
  });

  it("ties a locked web policy switch to its consequence line, which carries the reason", () => {
    const { container } = render(
      <PolicyRow presentation="web" setting={{ name: "No-regression check", consequence: "An attempt that unmets a met criterion is rejected." }} control={{ kind: "switch", value: true }} inheritance="locked" reason="platform-locked" />,
    );
    expect(reasonOf(container.querySelector("[role='switch']"))).toBe("An attempt that unmets a met criterion is rejected. platform-locked");
  });

  it("never renders a disabled Requeue whose reason does not exist", () => {
    const base = { run: { agent: "Atlas", stage: "Implement" }, effects: ["Reruns the stage"], cost: { spent: 1, more: 0.5, itemTotal: 1.5, ceiling: 10 }, onClose: () => undefined };
    const empty = render(<RequeueSheet {...base} refusals={[]} />);
    expect(screen.queryByRole("button", { name: "Requeue" })).toBeNull();
    empty.unmount();
    render(<RequeueSheet {...base} refusals={[{ reason: "No runner is ready." }]} />);
    const requeue = screen.getByRole("button", { name: "Requeue" }) as HTMLButtonElement;
    expect(requeue.disabled).toBe(true);
    expect(reasonOf(requeue)).toBe("No runner is ready.");
  });
});

// #191: the current destination is a filled pill; a border, inset shadow or text decoration would bring back the underline bar.
const DESTINATION_CSS = ["primitives/TopBar.module.css", "primitives/Tabs.module.css", "layout/AppShell.module.css", "layout/Sidebar.module.css"];
const CURRENT = /\[aria-(current="page"|selected="true")\](::?(before|after))?$/;

function currentRules(): Array<[string, string]> {
  return DESTINATION_CSS.flatMap((file) => {
    const css = readFileSync(join(SRC, file), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
      .filter(([, selector]) => selector.split(",").some((part) => CURRENT.test(part.trim())))
      .map(([, selector, body]): [string, string] => [`${file} ${selector.trim().replace(/\s+/g, " ")}`, body]);
  });
}

describe("the current destination is a filled pill", () => {
  it("fills every current TopBar, Tabs, AppShell and Sidebar destination with the sage tint and draws no underline bar", () => {
    const rules = currentRules();
    expect(rules).toHaveLength(6);
    expect(rules.filter(([, body]) => !body.includes("background: var(--ward-color-sageTint)")).map(([where]) => where)).toEqual([]);
    expect(rules.filter(([, body]) => /box-shadow|border(?!-radius)|text-decoration/.test(body)).map(([where]) => where)).toEqual([]);
  });
});

describe("status keeps its meaning in words as well as colour", () => {
  it("refuses a chip with no words", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<Chip role="failed" label="" />)).toThrow("Chip: label is required");
    vi.restoreAllMocks();
  });

  it("names delivery health markers", () => {
    const { container } = render(<DeliveryHealth rows={[{ label: "Sent", n: 31 }, { label: "Failed after 5 retries", n: 2, failed: true, cause: "rate limited by Jira" }]} />);
    expect(names(container, "[data-testid='marker']")).toEqual(["ok", "failed"]);
  });

  it("names the hollow dry-run steps", () => {
    const run = { status: "running" as const, steps: [{ kind: "action" as const, title: "Read manifest", detail: "foundry.query" }, { kind: "notSimulated" as const, title: "Waiting on human", detail: "2d" }, { kind: "running" as const, title: "Open PR", detail: "git" }] };
    const { container } = render(<DryRunRail run={run} checklist={[{ met: false, text: "Dry run passed" }]} publishNote="Publish waits for the gate." onPublish={() => undefined} />);
    expect(names(container, "[data-hollow='true']")).toEqual(["not simulated", "running"]);
  });

  it("speaks the console and typed-input kinds that are otherwise ink only", () => {
    const lines = [{ at: "2026-09-04T02:06:11Z", kind: "tool" as const, text: "query" }, { at: "2026-09-04T02:06:24Z", kind: "warn" as const, text: "type drift" }, { at: "2026-09-04T02:14:03Z", kind: "ok" as const, text: "usage" }, { at: "2026-09-04T02:15:00Z", kind: "dim" as const, text: "idle" }];
    const consoleView = render(<ActivityConsole lines={lines} connection="live" />);
    expect(texts(consoleView.container, ".ward-consline .ward-visually-hidden")).toEqual(["warning", "ok"]);
    consoleView.unmount();
    const typed = render(<TypedInputBlock lines={[{ kind: "field", text: "attempt: 2" }, { kind: "warn", text: "must_address: 1" }, { kind: "ok", text: "criteria met" }, { kind: "dim", text: "triage reused" }]} />);
    expect(texts(typed.container, ".ward-typed .ward-visually-hidden")).toEqual(["warning", "ok"]);
  });

  it("speaks unresolved and inherited tree rows", () => {
    const { container } = render(
      <Tree label="Access">
        <TreeRow index={0} depth={0} leaf label="MEMBER?" unresolved />
        <TreeRow index={1} depth={0} leaf label="Priya Nayar" inherited />
        <TreeRow index={2} depth={0} leaf label="Owner" />
      </Tree>,
    );
    expect(Array.from(container.querySelectorAll("[role='treeitem']")).map((item) => item.querySelector(".ward-visually-hidden")?.textContent ?? null)).toEqual(["unresolved", "inherited", null]);
  });

  it("speaks a drift flag on a legacy card and names legacy preview effects", () => {
    const item = { key: "WL-42", title: "Backfill claims", streamStep: 1 as const, timeInStage: 60000, waitsOn: "Atlas", changedAt: "2026-09-04T02:00:00Z" };
    const flagged = render(<LegacyWorkCard item={{ ...item, flagged: true }} onOpen={() => undefined} feed={null} />);
    expect(texts(flagged.container, ".ward-visually-hidden")).toEqual(["WL-42", "drift flag"]);
    flagged.unmount();
    const plain = render(<LegacyWorkCard item={item} onOpen={() => undefined} feed={null} />);
    expect(texts(plain.container, ".ward-visually-hidden")).toEqual(["WL-42"]);
    plain.unmount();
    const rail = render(<LegacyPreviewRail sample={[]} columnLabel="Review" effects={[{ met: true, text: "Gate stays a column" }, { met: false, text: "Cap applies" }]} />);
    expect(names(rail.container, ".ward-effect .ward-marker")).toEqual(["met", "unmet"]);
  });
});
