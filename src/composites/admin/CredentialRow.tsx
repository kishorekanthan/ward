import type { ReactElement, ReactNode } from "react";
import { Chip } from "../../primitives/Chip";
import type { GridColumn } from "../../primitives/Grid";
import type { ChipRole } from "../../tokens";
import s from "./CredentialRow.module.css";

export type CredentialClass = "read" | "write" | "model" | "data" | "identity";
export type CredentialState = "healthy" | "rotateSoon" | "rotateNow" | "idpOwned";

export type Credential = {
  id: string;
  purpose: string;
  cls: CredentialClass;
  tier: string;
  next: string;
  state: CredentialState;
};

export type WebCredentialState = CredentialState | "configured";

export type WebCredential = {
  id: string;
  purpose: string;
  cls: string;
  tier: string;
  next: string;
  state: WebCredentialState;
};

export type WebCredentialRowProps = {
  presentation: "web";
  cred: WebCredential;
};

const STATE: Record<CredentialState, { role: ChipRole; label: string }> = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" },
};

const WEB_STATE: Record<WebCredentialState, { role: ChipRole; label: string }> = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" },
};

export const CREDENTIAL_COLUMNS: GridColumn[] = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: true },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: true, dropPriority: 1 },
];

const COL = Object.fromEntries(CREDENTIAL_COLUMNS.map((c) => [c.key, c])) as Record<string, GridColumn>;

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

export function CredentialRowHead(): ReactElement {
  return (
    <tr>
      {CREDENTIAL_COLUMNS.map((c) => (
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

function CompactCredentialRow({ cred }: { cred: Credential }): ReactElement {
  const state = STATE[cred.state];
  return (
    <tr className={s.row}>
      <Cell column="purpose">{cred.purpose}</Cell>
      <Cell column="id">{cred.id}</Cell>
      <Cell column="state">
        <Chip role={state.role} label={state.label} />
      </Cell>
      <Cell column="cls">
        <Chip role={cred.cls === "write" ? "write" : "meta"} label={cred.cls.toUpperCase()} />
      </Cell>
      <Cell column="tier">{cred.tier}</Cell>
      <Cell column="next">
        <span className={s.next} data-urgent={cred.state === "rotateNow" ? true : undefined}>
          {cred.next}
        </span>
      </Cell>
    </tr>
  );
}

// The web page carries red ink inline so the overdue window survives without the Ward stylesheet.
function WebNext({ cred }: { cred: WebCredential }): ReactElement {
  if (cred.state !== "rotateNow") return <span className={`${s.webMeta} ward-cellmeta`}>{cred.next}</span>;
  return (
    <span className={`${s.webMeta} ${s.webUrgent} ward-cellmeta ward-redink`} style={{ color: "var(--ward-color-red)" }}>
      {cred.next}
    </span>
  );
}

function WebCredentialRow({ cred }: WebCredentialRowProps): ReactElement {
  return (
    <tr className={s.row}>
      <td className={s.cell}>
        <span className={`${s.webId} ward-toolname`}>{cred.id}</span>
      </td>
      <td className={s.cell}>
        <span className={`${s.webPurpose} ward-resfield-value ward-truncate`} title={cred.purpose}>
          {cred.purpose}
        </span>
      </td>
      <td className={s.cell}>
        <Chip role={cred.cls.includes("WRITE") ? "write" : "meta"} label={cred.cls} />
      </td>
      <td className={s.cell}>
        <span className={`${s.webMeta} ward-cellmeta`}>{cred.tier}</span>
      </td>
      <td className={s.cell}>
        <WebNext cred={cred} />
      </td>
      <td className={s.cell}>
        <Chip {...WEB_STATE[cred.state]} />
      </td>
    </tr>
  );
}

export function CredentialRow(props: { cred: Credential } | WebCredentialRowProps): ReactElement {
  return "presentation" in props ? <WebCredentialRow {...props} /> : <CompactCredentialRow {...props} />;
}
