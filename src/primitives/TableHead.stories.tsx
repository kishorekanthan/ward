import { bothThemes } from "../../.storybook/bothThemes";
import { TableHead } from "./TableHead";

export default {
  title: "Primitives/TableHead",
  component: TableHead,
  decorators: [bothThemes],
};

export const OwnRows = {
  render: () => (
    <table style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed" }}>
      <TableHead columns={[{ key: "server", header: "Server", width: "120px" }, { key: "tools", header: "Tools given to agents on this stream", width: "90px" }, { key: "state", header: "State" }]} />
      <tbody>
        <tr><td>jira</td><td>4</td><td>connected</td></tr>
        <tr><td>github</td><td>7</td><td>restarting</td></tr>
      </tbody>
    </table>
  ),
};
