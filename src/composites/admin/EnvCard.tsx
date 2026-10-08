import type { ReactElement } from "react";
import { Chip } from "../../primitives/Chip";
import { stamp } from "../../fmt/stamp";
import type { ChipRole } from "../../tokens";
import s from "./EnvCard.module.css";

export type EnvName = "dev" | "uat" | "prod";
export type EnvState = "current" | "soaking" | "live";

export type Env = {
  env: EnvName;
  version: string;
  deployedAt: string;
  by?: string;
  ticket?: string;
  state: EnvState;
};

export type WebEnvCardProps = Env & {
  presentation: "web";
};

// Sentence case, except UAT, which is an acronym (#199).
const ENV_LABEL: Record<EnvName, string> = { dev: "Dev", uat: "UAT", prod: "Prod" };

const STATE: Record<EnvState, { role: ChipRole; label: string }> = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" },
};

function CompactEnvCard({ env }: { env: Env }): ReactElement {
  const state = STATE[env.state];
  const by = [env.by, env.ticket].filter(Boolean).join(" · ");
  return (
    <section className={s.card} aria-label={ENV_LABEL[env.env]}>
      <div className={s.head}>
        <span className={s.env}>{ENV_LABEL[env.env]}</span>
        <Chip role={state.role} label={state.label} />
      </div>
      <p className={s.version}>{env.version}</p>
      <p className={s.meta}>deployed {stamp(env.deployedAt)}</p>
      {by && <p className={s.meta}>{by}</p>}
    </section>
  );
}

// Only an absent promoter is dropped; an absent ticket still joins, keeping the web page's trailing separator.
function webMeta(env: Env): string {
  const promoter = env.by !== undefined ? `promoted by ${env.by}` : null;
  return [stamp(env.deployedAt), promoter, env.ticket].filter((part) => part !== null).join(" · ");
}

function WebEnvCard(props: WebEnvCardProps): ReactElement {
  return (
    <article className={`${s.webCard} ward-envcard`}>
      <span className={`${s.webRow} ward-envrow`}>
        <span className={`${s.webTitle} ward-stagecol-title`}>{props.env}</span>
        <Chip {...STATE[props.state]} />
      </span>
      <span className={`${s.version} ${s.webVersion} ${s.webLine} ward-envmeta`}>{props.version}</span>
      <span className={`${s.meta} ${s.webMeta} ${s.webLine} ward-cellmeta`}>{webMeta(props)}</span>
    </article>
  );
}

export function EnvCard(props: { env: Env } | WebEnvCardProps): ReactElement {
  return "presentation" in props ? <WebEnvCard {...props} /> : <CompactEnvCard {...props} />;
}
