import { useId, type ReactElement } from "react";
import { Btn } from "../../primitives/Btn";
import { Chip } from "../../primitives/Chip";
import { count } from "../../fmt/count";
import type { ChipRole } from "../../tokens";
import s from "./ComponentRow.module.css";

export type ComponentState = "ready" | "drainFirst" | "restartDue";

export type DeployComponent = {
  name: string;
  pods: number;
  note: string;
  state: ComponentState;
};

export type ComponentRowProps = {
  component: DeployComponent;
  onRestart: (name: string) => void;
};

export type WebDeployComponent = {
  name: string;
  pods: string;
  note: string;
  state: ComponentState;
};

export type WebComponentRowProps = {
  presentation: "web";
  component: WebDeployComponent;
  onRestart?: (name: string) => void;
};

const STATE: Record<ComponentState, { role: ChipRole; label: string }> = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" },
};

export function restartLabel(state: ComponentState): string {
  return state === "drainFirst" ? "Drain & restart" : "Restart";
}

function CompactComponentRow({ component, onRestart }: ComponentRowProps): ReactElement {
  const noteId = useId();
  const state = STATE[component.state];
  const blocked = component.state === "drainFirst";
  return (
    <tr className={s.row}>
      <td className={s.cell}>
        <span className={s.name}>{component.name}</span>
      </td>
      <td className={s.cell} data-mono="true">
        {count(component.pods)} pods
      </td>
      <td className={s.cell}>
        <Chip role={state.role} label={state.label} />
      </td>
      <td className={s.cell}>
        <span id={noteId} className={s.note}>
          {component.note}
        </span>
      </td>
      <td className={s.cell} data-align="end">
        {blocked ? (
          <Btn size="sm" disabled describedBy={noteId}>
            Restart
          </Btn>
        ) : (
          <Btn size="sm" onClick={() => onRestart(component.name)}>
            Restart
          </Btn>
        )}
      </td>
    </tr>
  );
}

// The web row drains inside the restart itself, so drainFirst stays actionable; no handler means a read-only page.
function WebRestart({ component, onRestart }: Omit<WebComponentRowProps, "presentation">): ReactElement | null {
  if (onRestart === undefined) return null;
  return (
    <Btn size="sm" onClick={() => onRestart(component.name)}>
      {restartLabel(component.state)}
    </Btn>
  );
}

function WebComponentRow({ component, onRestart }: WebComponentRowProps): ReactElement {
  return (
    <tr className={s.row}>
      <td className={s.cell}>
        <span className={`${s.webName} ward-toolname`}>{component.name}</span>
      </td>
      <td className={s.cell}>
        <span className={`${s.webMeta} ward-cellmeta ward-truncate`} title={component.note}>
          {`${component.pods} · ${component.note}`}
        </span>
      </td>
      <td className={s.cell}>
        <Chip {...STATE[component.state]} />
      </td>
      <td className={s.cell}>
        <WebRestart component={component} onRestart={onRestart} />
      </td>
    </tr>
  );
}

export function ComponentRow(props: ComponentRowProps | WebComponentRowProps): ReactElement {
  return "presentation" in props ? <WebComponentRow {...props} /> : <CompactComponentRow {...props} />;
}
