type Keyed = {
    key: string;
    ctrlKey: boolean;
    metaKey: boolean;
    altKey: boolean;
};
export declare function printable(event: Keyed): boolean;
export declare function useTypeahead(): (key: string) => string;
export {};
