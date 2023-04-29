interface ProxyCallbackOptions {
    path: string[];
    args: unknown[];
}
declare type ProxyCallback = (opts: ProxyCallbackOptions) => unknown;
/**
 * Creates a proxy that calls the callback with the path and arguments
 *
 * @internal
 */
export declare const createRecursiveProxy: (callback: ProxyCallback) => unknown;
/**
 * Used in place of `new Proxy` where each handler will map 1 level deep to another value.
 *
 * @internal
 */
export declare const createFlatProxy: <TFaux>(callback: (path: keyof TFaux & string) => any) => TFaux;
export {};
//# sourceMappingURL=index.d.ts.map