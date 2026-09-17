import type { ReactElement, ReactNode } from "react";
import { Btn } from "../../primitives/Btn";
import { Chip } from "../../primitives/Chip";
import type { GridColumn } from "../../primitives/Grid";
import s from "./McpServerRow.module.css";

export type McpConnection = "healthy" | "degraded" | "failed" | "unknown";

export type McpServer = {
  name: string;
  transport: string;
  credentialId: string;
  tools: string[];
  cls: "read" | "write";
  pinned?: string;
  connection: McpConnection;
};

export type McpConnectionChip = { role: "done" | "attention" | "failed" | "pending"; label: string };

export type WebMcpServer = {
  name: string;
  transport?: string;
  credential_id?: string;
  pinned_version?: string | null;
  connection?: string;
  tools?: Array<{ tool: string; write_class?: boolean }>;
  write_tools?: string[];
  restart?: { implemented: boolean };
};

export type WebMcpServerRowProps = {
  presentation: "web";
  server: WebMcpServer;
  onRestart?: (name: string) => void;
  onPin?: (name: string) => void;
};

const CONNECTION: Record<McpConnection, McpConnectionChip> = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" },
};

export const MCP_SERVER_COLUMNS: GridColumn[] = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: true },
  { key: "credentialId", header: "Credential", width: 108, mono: true, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: true, dropPriority: 1 },
];

const COL = Object.fromEntries(MCP_SERVER_COLUMNS.map((c) => [c.key, c])) as Record<string, GridColumn>;

export function mcpToolName(server: string, tool: string) {
  return `mcp.${server}.${tool}`;
}

function isConnection(connection: string): connection is McpConnection {
  return Object.keys(CONNECTION).includes(connection);
}

// Server records carry free-form connection strings; anything unrecognised reads as unknown.
export function mcpConnectionChip(connection: string | undefined): McpConnectionChip {
  return CONNECTION[connection !== undefined && isConnection(connection) ? connection : "unknown"];
}

function Cell({ column, children }: { column: string; children: ReactNode }) {
  const c = COL[column];
  return (
    <td
      className={s.cell}
      style={c.width ? { width: c.width } : undefined}
      data-drop={c.dropPriority}
      data-mono={c.mono}
    >
      {children}
    </td>
  );
}

export function McpServerRowHead(): ReactElement {
  return (
    <tr>
      {MCP_SERVER_COLUMNS.map((c) => (
        <th
          key={c.key}
          scope="col"
          className={s.headCell}
          style={c.width ? { width: c.width } : undefined}
          data-drop={c.dropPriority}
          data-align={c.align}
        >
          {c.header}
        </th>
      ))}
    </tr>
  );
}

function CompactMcpServerRow({ server }: { server: McpServer }): ReactElement {
  const connection = CONNECTION[server.connection];
  return (
    <tr className={s.row}>
      <Cell column="name">
        <span className={s.head}>
          <span className={s.name}>{server.name}</span>
          <Chip role={server.cls === "write" ? "write" : "meta"} label={server.cls.toUpperCase()} />
        </span>
        {server.pinned && <span className={s.pinned}>pinned {server.pinned}</span>}
      </Cell>
      <Cell column="connection">
        <Chip role={connection.role} label={connection.label} />
      </Cell>
      <Cell column="transport">{server.transport}</Cell>
      <Cell column="credentialId">{server.credentialId}</Cell>
      <Cell column="tools">{server.tools.map((t) => mcpToolName(server.name, t)).join(" · ")}</Cell>
    </tr>
  );
}

function transportLine(server: WebMcpServer): string {
  return `${server.transport ?? ""} · ${server.credential_id ?? ""}`;
}

type McpClassChip = { role: "write" | "meta"; label: string };

// Write class follows the server's declared write_tools, not per-tool flags.
function webClassChip(server: WebMcpServer): McpClassChip {
  return (server.write_tools?.length ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}

function WebPinned({ pinned }: { pinned: string | null }): ReactElement {
  if (pinned === null) return <span className={`${s.webWarn} ward-warnink`}>unpinned</span>;
  return <span className={`${s.webMeta} ward-cellmeta`}>{pinned}</span>;
}

function WebRestart({ server, onRestart }: Pick<WebMcpServerRowProps, "server" | "onRestart">): ReactElement | null {
  if (onRestart === undefined) return null;
  if (server.restart?.implemented !== true) {
    return <span className={`${s.webMeta} ward-cellmeta`}>Restart unavailable — no supervisor configured</span>;
  }
  return (
    <Btn size="sm" onClick={() => onRestart(server.name)}>
      Restart server
    </Btn>
  );
}

function WebPin({ name, pinned, onPin }: { name: string; pinned: string | null; onPin?: (name: string) => void }): ReactElement | null {
  if (pinned !== null || onPin === undefined) return null;
  return (
    <Btn size="sm" onClick={() => onPin(name)}>
      Pin version
    </Btn>
  );
}

function WebMcpServerRow({ server, onRestart, onPin }: WebMcpServerRowProps): ReactElement {
  const pinned = server.pinned_version ?? null;
  const tools = server.tools ?? [];
  return (
    <tr className={s.row}>
      <td className={s.cell}>
        <span className={`${s.webName} ward-toolname`}>{server.name}</span>
        <span className={`${s.webMeta} ward-cellmeta`}>{transportLine(server)}</span>
      </td>
      <td className={s.cell}>
        <span className={`${s.webMeta} ward-cellmeta ward-truncate`} title={tools.map((tool) => tool.tool).join(", ")}>
          {`${tools.length} discovered`}
        </span>
      </td>
      <td className={s.cell}>
        <Chip {...webClassChip(server)} />
      </td>
      <td className={s.cell}>
        <WebPinned pinned={pinned} />
      </td>
      <td className={s.cell}>
        <Chip {...mcpConnectionChip(server.connection)} />
      </td>
      <td className={s.cell}>
        <WebRestart server={server} onRestart={onRestart} />
        <WebPin name={server.name} pinned={pinned} onPin={onPin} />
      </td>
    </tr>
  );
}

export function McpServerRow(props: { server: McpServer } | WebMcpServerRowProps): ReactElement {
  return "presentation" in props ? <WebMcpServerRow {...props} /> : <CompactMcpServerRow {...props} />;
}
