import { bothThemes } from "../../../.storybook/bothThemes";
import { CREDENTIAL_COLUMNS, CredentialRow, type Credential } from "./CredentialRow";

const base: Credential = {
  id: "sp-foundry-read",
  purpose: "Foundry dataset reads",
  cls: "read",
  tier: "Platform",
  next: "in 41d",
  state: "healthy",
};

function Table({ rows }: { rows: Credential[] }) {
  return (
    <div tabIndex={0} role="region" aria-label="Credentials">
      <table style={{ tableLayout: "fixed", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {CREDENTIAL_COLUMNS.map((c) => (
              <th key={c.key} scope="col" style={c.width ? { width: c.width } : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <CredentialRow key={r.id} cred={r} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default { title: "Admin/CredentialRow", component: CredentialRow, decorators: [bothThemes] };

export const Healthy = { render: () => <Table rows={[base]} /> };

export const RotateSoon = {
  render: () => <Table rows={[{ ...base, id: "sp-relay-write", cls: "write" as const, next: "in 9d", state: "rotateSoon" as const }]} />,
};

export const RotateNow = {
  render: () => <Table rows={[{ ...base, id: "sp-model-gpt", cls: "model" as const, next: "6d ago", state: "rotateNow" as const }]} />,
};

export const IdpOwned = {
  render: () => <Table rows={[{ ...base, id: "aad-app-trellis", cls: "identity" as const, next: "IdP", state: "idpOwned" as const }]} />,
};

export const Table6 = { render: () => <Table rows={[base, { ...base, id: "sp-relay-write", cls: "write" as const, state: "rotateSoon" as const, next: "in 9d" }]} /> };
