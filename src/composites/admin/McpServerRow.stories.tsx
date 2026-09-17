import { bothThemes } from "../../../.storybook/bothThemes";
import { MCP_SERVER_COLUMNS, McpServerRow, type McpServer } from "./McpServerRow";

const base: McpServer = {
  name: "foundry",
  transport: "streamable-http",
  credentialId: "sp-foundry-read",
  tools: ["query", "listDatasets"],
  cls: "read",
  pinned: "v2.4.1",
  connection: "healthy",
};

function Table({ rows }: { rows: McpServer[] }) {
  return (
    <div tabIndex={0} role="region" aria-label="MCP servers">
      <table style={{ tableLayout: "fixed", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {MCP_SERVER_COLUMNS.map((c) => (
              <th key={c.key} scope="col" style={c.width ? { width: c.width } : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <McpServerRow key={r.name} server={r} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default { title: "Admin/McpServerRow", component: McpServerRow, decorators: [bothThemes] };

export const Healthy = { render: () => <Table rows={[base]} /> };
export const Degraded = { render: () => <Table rows={[{ ...base, name: "relay", connection: "degraded" as const }]} /> };
export const Failed = { render: () => <Table rows={[{ ...base, name: "jira", cls: "write" as const, connection: "failed" as const }]} /> };
export const Unknown = { render: () => <Table rows={[{ ...base, name: "sharepoint", connection: "unknown" as const }]} /> };
export const Hub = {
  render: () => (
    <Table
      rows={[
        base,
        { ...base, name: "relay", cls: "write" as const, connection: "degraded" as const },
        { ...base, name: "jira", cls: "write" as const, connection: "failed" as const },
      ]}
    />
  ),
};
