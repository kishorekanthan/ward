import type { ReactElement, ReactNode } from "react";
import { Chip } from "../../primitives/Chip";
import type { GridColumn } from "../../primitives/Grid";
import { Tree, TreeRow } from "../../primitives/Tree";
import { count } from "../../fmt/count";
import type { ChipRole } from "../../tokens";
import s from "./RoleMatrixRow.module.css";

export type MatrixRole = "platformAdmin" | "approver" | "streamAdmin" | "member" | "viewer";

const ROLE: Record<MatrixRole, { role: ChipRole; label: string }> = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" },
};

export type MatrixNode = {
  name: string;
  matrixRole?: MatrixRole;
  adGroup?: string;
  people?: number;
  requestedVia?: string;
  unresolved?: boolean;
  inherited?: boolean;
  floor?: boolean;
};

export type WebRoleMatrixRowSpec = {
  depth: 0 | 1 | 2;
  label: string;
  role?: { role: "gate" | "running" | "meta" | "warn"; label: string };
  group?: string;
  people?: string;
  requestedVia?: string;
  state?: "normal" | "inherited" | "unresolved" | "floor";
  leaf?: boolean;
  expanded?: boolean;
};

export type WebRoleMatrixRowProps = {
  presentation: "web";
  rows: WebRoleMatrixRowSpec[];
  label?: string;
};

type CompactRoleMatrixRowProps = {
  index: number;
  depth: 0 | 1 | 2;
  node: MatrixNode;
  expanded?: boolean;
  leaf?: boolean;
  onToggle?: () => void;
  children?: ReactNode;
};

export const ROLE_MATRIX_COLUMNS: GridColumn[] = [
  { key: "adGroup", header: "AD group", width: 228, mono: true },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: true, dropPriority: 1 },
];

function Column({ column, children }: { column: GridColumn; children: ReactNode }) {
  return (
    <span
      className={s.column}
      style={{ width: column.width }}
      data-drop={column.dropPriority}
      data-mono={column.mono}
      data-align={column.align}
    >
      {children}
    </span>
  );
}

function roleOf(node: MatrixNode): { role: ChipRole; label: string } | undefined {
  if (!node.matrixRole) return undefined;
  const role = ROLE[node.matrixRole];
  if (!role) throw new Error(`RoleMatrixRow: '${node.matrixRole}' is not a Trellis role`);
  return role;
}

function Label({ node }: { node: MatrixNode }) {
  const role = roleOf(node);
  return (
    <span className={s.label}>
      <span className={s.name}>{node.name}</span>
      <RoleChips role={role} node={node} />
      <Column column={ROLE_MATRIX_COLUMNS[0]}>{node.adGroup ?? ""}</Column>
      <Column column={ROLE_MATRIX_COLUMNS[1]}>{node.people === undefined ? "" : count(node.people)}</Column>
      <Column column={ROLE_MATRIX_COLUMNS[2]}>{node.requestedVia ?? ""}</Column>
    </span>
  );
}

function RoleChips({ role, node }: { role?: { role: ChipRole; label: string }; node: MatrixNode }) {
  return (
    <>
      {role && <Chip role={role.role} label={role.label} />}
      {node.floor && <Chip role="soft" label="FLOOR" />}
      {node.unresolved && <Chip role="warn" label="UNRESOLVED" />}
    </>
  );
}

function CompactRoleMatrixRow({ index, depth, node, expanded, leaf, onToggle, children }: CompactRoleMatrixRowProps): ReactElement {
  return (
    <TreeRow
      index={index}
      depth={depth}
      leaf={leaf}
      expanded={expanded}
      onToggle={onToggle}
      unresolved={node.unresolved}
      inherited={node.inherited}
      label={<Label node={node} />}
    >
      {children}
    </TreeRow>
  );
}

function WebCell({ className, text }: { className: string; text: string }): ReactElement {
  return (
    <span className={className} title={text}>
      {text}
    </span>
  );
}

function WebDetail({ row }: { row: WebRoleMatrixRowSpec }): ReactElement {
  return (
    <span className={`${s.webColumns} ward-rolecols`}>
      <WebCell className={`${s.webMeta} ${s.webGroup} ward-cellmeta ward-truncate`} text={row.group ?? "—"} />
      <WebCell className={`${s.webPeople} ward-rolepeople ward-truncate`} text={row.people ?? ""} />
      <WebCell className={`${s.webMeta} ${s.webVia} ward-cellmeta ward-truncate`} text={row.requestedVia ?? ""} />
    </span>
  );
}

// The head is drawn for sighted readers; each tree item already speaks its own cells in order.
function WebHead(): ReactElement {
  return (
    <div className={s.webHead} aria-hidden="true">
      <span className={s.webHeadLabel}>Scope → role → person</span>
      <span className={s.webColumns}>
        <span className={s.webGroup}>AD group</span>
        <span className={s.webPeople}>People</span>
        <span className={s.webVia}>Requested via</span>
      </span>
    </div>
  );
}

function WebLabel({ row }: { row: WebRoleMatrixRowSpec }): ReactElement {
  return (
    <span className={`${s.webLabel} ward-envrow`}>
      <span>{row.label}</span>
      {row.role !== undefined ? <Chip role={row.role.role} label={row.role.label} /> : null}
      {row.state === "floor" ? <Chip role="meta" label="implicit floor" /> : null}
    </span>
  );
}

// Branches default to collapsed; leaves carry no expanded state at all.
function webExpanded(row: WebRoleMatrixRowSpec): boolean | undefined {
  return row.expanded ?? (row.leaf === true ? undefined : false);
}

function WebRoleMatrixRow({ rows, label }: WebRoleMatrixRowProps): ReactElement {
  return (
    <div className={s.webFrame} data-ward-rolematrix="">
      <WebHead />
      <Tree label={label ?? "Role matrix"}>
        {rows.map((row, index) => (
          <TreeRow
            key={row.label + String(index)}
            depth={row.depth}
            label={<WebLabel row={row} />}
            detail={<WebDetail row={row} />}
            expanded={webExpanded(row)}
            leaf={row.leaf === true}
            unresolved={row.state === "unresolved"}
            inherited={row.state === "inherited"}
            index={index}
          />
        ))}
      </Tree>
    </div>
  );
}

export function RoleMatrixRow(props: CompactRoleMatrixRowProps | WebRoleMatrixRowProps): ReactElement {
  return "presentation" in props ? <WebRoleMatrixRow {...props} /> : <CompactRoleMatrixRow {...props} />;
}
