import { useId } from "react";
import { Btn } from "../../primitives/Btn";
import { Chip } from "../../primitives/Chip";
import s from "./ResolveBlock.module.css";

export type ResolveKind = "clarify" | "requeue" | "override";

export type ResolvePath = {
  kind: ResolveKind;
  title?: string;
  consequence: string;
  requiredRole: string;
  allowed: boolean;
  askInstead?: string;
};

const LABEL: Record<ResolveKind, string> = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance",
};

// 10a: a Member path carries an outlined tag, an Approver path a filled write tag on a warm card.
function roleChip(requiredRole: string): "write" | "meta" {
  return requiredRole === "APPROVER" ? "write" : "meta";
}

type PathProps = { path: ResolvePath; primary: boolean; onChoose: (kind: ResolveKind) => void };

// A path you cannot take stays visible but disabled, and names who to ask instead.
function PathAction({ path, primary, onChoose }: PathProps) {
  const askId = useId();
  if (!path.allowed) {
    return (
      <>
        <Btn variant="primary" size="sm" disabled describedBy={askId}>
          {LABEL[path.kind]}
        </Btn>
        <span className={s.ask} id={askId}>
          {path.askInstead}
        </span>
      </>
    );
  }
  return (
    <Btn variant={primary ? "primary" : "secondary"} size="sm" onClick={() => onChoose(path.kind)}>
      {LABEL[path.kind]}
    </Btn>
  );
}

function Path({ path, primary, onChoose }: PathProps) {
  if (!path.allowed && !path.askInstead)
    throw new Error(`ResolveBlock: the ${path.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return (
    <li className={s.path} data-allowed={path.allowed} data-role={roleChip(path.requiredRole)}>
      <span className={s.head}>
        <span className={s.label}>{path.title ?? LABEL[path.kind]}</span>
        <Chip role={roleChip(path.requiredRole)} label={path.requiredRole} />
      </span>
      <span className={s.consequence}>{path.consequence}</span>
      <PathAction path={path} primary={primary} onChoose={onChoose} />
    </li>
  );
}

export function ResolveBlock({ paths, onChoose }: { paths: ResolvePath[]; onChoose: (kind: ResolveKind) => void }) {
  return (
    <ul className={s.list}>
      {paths.map((p, index) => (
        <Path path={p} primary={index === 0} onChoose={onChoose} key={p.kind} />
      ))}
    </ul>
  );
}

