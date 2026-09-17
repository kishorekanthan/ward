import { ReactNode } from 'react';
export interface VisibilityProviderProps {
    /** Component ids the viewer may not see; anything not listed renders. */
    hidden: readonly string[];
    children?: ReactNode;
}
export declare function VisibilityProvider({ hidden, children }: VisibilityProviderProps): import("react").JSX.Element;
export declare function useVisible(id: string): boolean;
export interface VisibleProps {
    id: string;
    children?: ReactNode;
    /** Rendered in place of the children when the id is hidden. */
    fallback?: ReactNode;
}
export declare function Visible({ id, children, fallback }: VisibleProps): import("react").JSX.Element;
