import { ReactNode } from 'react';
import { LiveConnection } from '../live/types';
import { ChipProps } from './Chip';
import { CrumbPath } from './Crumb';
export type PageHeaderProps = {
    crumb: CrumbPath[];
    chips?: ChipProps[];
    title: string;
    consequence?: string;
    actions?: ReactNode[];
    connection?: {
        connection: LiveConnection;
        since: string;
    };
    onOverflow?: () => void;
    /** "record" is Board Item 8b's case head: 16px 20px 13px with a 19px title. */
    density?: "page" | "record";
};
export declare function PageHeader({ crumb, chips, title, consequence, actions, connection, onOverflow, density }: PageHeaderProps): import("react").JSX.Element;
