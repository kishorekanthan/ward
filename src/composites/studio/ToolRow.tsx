import { useId, type ReactElement } from "react";
import { Chip } from "../../primitives/Chip";
import s from "./ToolRow.module.css";

export type Tool = {
  name: string;
  scope: string;
  classification: "read" | "write";
  grant: "granted" | "available" | "locked";
  reason?: string;
};

export type ToolRowPresentation = {
  as?: "div" | "li";
  className?: string;
  lockedReasonFallback?: string;
};

export type ToolRowProps = {
  tool: Tool;
  onChange: (granted: boolean) => void;
  presentation?: ToolRowPresentation;
};

function rowClassName(className: string | undefined): string {
  return className === undefined ? `${s.row} ward-toolrow` : `${s.row} ward-toolrow ${className}`;
}

type ToolState = { locked: boolean; reason?: string };

function toolState(tool: Tool, presentation: ToolRowPresentation | undefined): ToolState {
  if (tool.grant !== "locked") return { locked: false };
  return { locked: true, reason: tool.reason ?? presentation?.lockedReasonFallback ?? "locked by stream policy" };
}

function ToolInput({ id, reasonId, tool, state, onChange }: { id: string; reasonId: string; tool: Tool; state: ToolState; onChange: ToolRowProps["onChange"] }): ReactElement {
  return (
    <input
      id={id}
      type="checkbox"
      className="ward-field-option"
      checked={tool.grant === "granted"}
      disabled={state.locked}
      aria-describedby={state.locked ? reasonId : undefined}
      onChange={(event) => {
        if (!state.locked) onChange(event.target.checked);
      }}
    />
  );
}

function Classification({ classification }: Pick<Tool, "classification">): ReactElement {
  return <Chip role={classification === "write" ? "write" : "meta"} label={classification.toUpperCase()} />;
}

// A locked row shows why in the scope slot, as the comp does; the id keeps the checkbox described.
function Detail({ tool, state, reasonId }: { tool: Tool; state: ToolState; reasonId: string }): ReactElement {
  const text = state.reason ?? tool.scope;
  return (
    <span id={state.locked ? reasonId : undefined} className={`${s.scope} ward-tooldetail ward-truncate`} title={text}>
      {text}
    </span>
  );
}

function rowElement(presentation: ToolRowPresentation | undefined): "div" | "li" {
  return presentation?.as === "li" ? "li" : "div";
}

export function ToolRow({ tool, onChange, presentation }: ToolRowProps): ReactElement {
  const id = useId();
  const reasonId = useId();
  const state = toolState(tool, presentation);
  const Row = rowElement(presentation);
  return (
    <Row className={rowClassName(presentation?.className)} data-locked={state.locked ? "true" : undefined}>
      <ToolInput id={id} reasonId={reasonId} tool={tool} state={state} onChange={onChange} />
      <label htmlFor={id} className={`${s.name} ward-toolname`}>
        {tool.name}
      </label>
      <Detail tool={tool} state={state} reasonId={reasonId} />
      <Classification classification={tool.classification} />
      {state.locked ? <Chip role="meta" label="LOCKED" /> : null}
    </Row>
  );
}
