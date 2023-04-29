import { QueryClient } from '@tanstack/react-query';

/**
 * @internal
 */ const getQueryClient = (config)=>config.queryClient ?? new QueryClient(config.queryClientConfig);

export { getQueryClient as g };
