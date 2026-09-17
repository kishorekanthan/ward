import { ReactElement } from 'react';
import { GridColumn } from '../../primitives/Grid';
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
export type McpConnectionChip = {
    role: "done" | "attention" | "failed" | "pending";
    label: string;
};
export type WebMcpServer = {
    name: string;
    transport?: string;
    credential_id?: string;
    pinned_version?: string | null;
    connection?: string;
    tools?: Array<{
        tool: string;
        write_class?: boolean;
    }>;
    write_tools?: string[];
    restart?: {
        implemented: boolean;
    };
};
export type WebMcpServerRowProps = {
    presentation: "web";
    server: WebMcpServer;
    onRestart?: (name: string) => void;
    onPin?: (name: string) => void;
};
export declare const MCP_SERVER_COLUMNS: GridColumn[];
export declare function mcpToolName(server: string, tool: string): string;
export declare function mcpConnectionChip(connection: string | undefined): McpConnectionChip;
export declare function McpServerRowHead(): ReactElement;
export declare function McpServerRow(props: {
    server: McpServer;
} | WebMcpServerRowProps): ReactElement;
