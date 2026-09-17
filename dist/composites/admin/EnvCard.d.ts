import { ReactElement } from 'react';
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
export declare function EnvCard(props: {
    env: Env;
} | WebEnvCardProps): ReactElement;
