import { ChipProps } from './Chip';
export type CrumbPath = {
    label: string;
    href?: string;
};
export type CrumbProps = {
    path: CrumbPath[];
    chips?: ChipProps[];
    /** false: the path stops at the page's parent, so its last step links back and no step is the current page. */
    current?: boolean;
};
export declare function Crumb({ path, chips, current }: CrumbProps): import("react").JSX.Element;
