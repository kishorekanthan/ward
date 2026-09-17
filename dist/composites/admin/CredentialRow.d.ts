import { ReactElement } from 'react';
import { GridColumn } from '../../primitives/Grid';
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
export declare const CREDENTIAL_COLUMNS: GridColumn[];
export declare function CredentialRowHead(): ReactElement;
export declare function CredentialRow(props: {
    cred: Credential;
} | WebCredentialRowProps): ReactElement;
