import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
/**
 * @internal
 */
export declare type CreateTRPCReactQueryClientConfig = {
    queryClient?: QueryClient;
    queryClientConfig?: never;
} | {
    queryClientConfig?: QueryClientConfig;
    queryClient?: never;
};
/**
 * @internal
 */
export declare const getQueryClient: (config: CreateTRPCReactQueryClientConfig) => QueryClient;
//# sourceMappingURL=queryClient.d.ts.map