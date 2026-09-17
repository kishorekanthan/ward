import { bothThemes } from "../../../.storybook/bothThemes";
import { ComponentRow, type DeployComponent } from "./ComponentRow";

const base: DeployComponent = {
  name: "relay-worker",
  pods: 6,
  note: "Rolling restart picks the new credential up on boot.",
  state: "ready",
};

function Table({ rows }: { rows: DeployComponent[] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        {rows.map((r) => (
          <ComponentRow key={r.name} component={r} onRestart={() => {}} />
        ))}
      </tbody>
    </table>
  );
}

export default { title: "Admin/ComponentRow", component: ComponentRow, decorators: [bothThemes] };

export const Ready = { render: () => <Table rows={[base]} /> };
export const DrainFirst = {
  render: () => (
    <Table rows={[{ ...base, name: "intake-consumer", note: "Drain the queue before restarting; in-flight deliveries are lost otherwise.", state: "drainFirst" as const }]} />
  ),
};
export const RestartDue = { render: () => <Table rows={[{ ...base, name: "api", note: "Running a credential rotated 6 days ago.", state: "restartDue" as const }]} /> };
export const Fleet = {
  render: () => (
    <Table
      rows={[
        base,
        { ...base, name: "intake-consumer", pods: 3, note: "Drain the queue before restarting.", state: "drainFirst" as const },
        { ...base, name: "api", pods: 12, note: "Running a credential rotated 6 days ago.", state: "restartDue" as const },
      ]}
    />
  ),
};
