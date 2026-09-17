import { ChipProps } from './Chip';
export type CrumbPath = {
    label: string;
    href?: string;
};
export type CrumbProps = {
    path: CrumbPath[];
    chips?: ChipProps[];
};
export declare function Crumb({ path, chips }: CrumbProps): import("react").JSX.Element;
