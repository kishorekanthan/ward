import { Btn } from "../../primitives/Btn";
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
  clarify: "Ask a question",
  requeue: "Run again",
  override: "Override and advance",
};

// 10a: an Approver path sits on a warm card; the button alone names the action.
function roleChip(requiredRole: string): "write" | "meta" {
  return requiredRole === "APPROVER" ? "write" : "meta";
}

// Only the first path is primary, whether or not it is yours to take.
function variant(primary: boolean): "primary" | "secondary" {
  return primary ? "primary" : "secondary";
}

type PathProps = { path: ResolvePath; primary: boolean; onChoose: (kind: ResolveKind) => void };

// A path you cannot take stays visible but disabled, and names who to ask instead in the Btn reason line.
function PathAction({ path, primary, onChoose }: PathProps) {
  if (!path.allowed) {
    return (
      <Btn variant={variant(primary)} size="sm" disabled disabledReason={path.askInstead ?? ""}>
        {LABEL[path.kind]}
      </Btn>
    );
  }
  return (
    <Btn variant={variant(primary)} size="sm" onClick={() => onChoose(path.kind)}>
      {LABEL[path.kind]}
    </Btn>
  );
}

function Path({ path, primary, onChoose }: PathProps) {
  if (!path.allowed && !path.askInstead)
    throw new Error(`ResolveBlock: the ${path.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return (
    <li className={s.path} data-allowed={path.allowed} data-role={roleChip(path.requiredRole)}>
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

