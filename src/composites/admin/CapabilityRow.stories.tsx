import { bothThemes } from "../../../.storybook/bothThemes";
import { CapabilityRow, type Capability, type CapabilityCell } from "./CapabilityRow";
import s from "./CapabilityRow.module.css";

const capability: Capability = {
  name: "Card buttons respect role",
  consequence: "A viewer sees the button and is refused on click when this is off.",
  governedBy: "role matrix",
  ticket: "PLT-118",
};

const cells: CapabilityCell[] = [
  { streamStep: 1, stream: "Data engineering", value: "on" },
  { streamStep: 2, stream: "Finance", value: "off" },
  { streamStep: 3, stream: "Legal", value: "byRole" },
];

function Table({ rows }: { rows: { capability: Capability; cells: CapabilityCell[] }[] }) {
  return (
    <div className={s.frame} tabIndex={0} role="region" aria-label="Capabilities">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th scope="col">Capability</th>
            {cells.map((c) => (
              <th scope="col" key={c.streamStep}>
                {c.stream}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <CapabilityRow key={r.capability.name} capability={r.capability} cells={r.cells} onChange={() => {}} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default { title: "Admin/CapabilityRow", component: CapabilityRow, decorators: [bothThemes] };

export const Mixed = { render: () => <Table rows={[{ capability, cells }]} /> };
export const Piloted = {
  render: () => <Table rows={[{ capability, cells: cells.map((c) => (c.streamStep === 2 ? { ...c, value: "pilot" as const } : c)) }]} />,
};
export const ByRoleEverywhere = {
  render: () => <Table rows={[{ capability, cells: cells.map((c) => ({ ...c, value: "byRole" as const })) }]} />,
};
export const Sheet = {
  render: () => (
    <Table
      rows={[
        { capability, cells },
        {
          capability: { name: "Gate notifications", consequence: "Approvers stop hearing about waiting gates when this is off.", governedBy: "notification policy" },
          cells: cells.map((c) => ({ ...c, value: "on" as const })),
        },
      ]}
    />
  ),
};
