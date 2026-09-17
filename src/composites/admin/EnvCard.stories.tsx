import { bothThemes } from "../../../.storybook/bothThemes";
import { EnvCard, type Env } from "./EnvCard";

const base: Env = {
  env: "dev",
  version: "2026.9.4",
  deployedAt: "2026-09-06T01:14:00Z",
  by: "M. Chen",
  ticket: "CHG-4120",
  state: "current",
};

export default { title: "Admin/EnvCard", component: EnvCard, decorators: [bothThemes] };

export const Dev = { render: () => <EnvCard env={base} /> };
export const Uat = { render: () => <EnvCard env={{ ...base, env: "uat" as const, version: "2026.9.4-rc2", state: "soaking" as const }} /> };
export const Prod = { render: () => <EnvCard env={{ ...base, env: "prod" as const, version: "2026.9.3", state: "live" as const }} /> };
export const Unattributed = { render: () => <EnvCard env={{ env: "dev", version: "2026.9.4", deployedAt: base.deployedAt, state: "current" }} /> };
