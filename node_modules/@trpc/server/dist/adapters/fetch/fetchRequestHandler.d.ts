import { AnyRouter } from '../../core';
import { FetchHandlerOptions } from './types';
export declare type FetchHandlerRequestOptions<TRouter extends AnyRouter> = {
    req: Request;
    endpoint: string;
} & FetchHandlerOptions<TRouter>;
export declare function fetchRequestHandler<TRouter extends AnyRouter>(opts: FetchHandlerRequestOptions<TRouter>): Promise<Response>;
//# sourceMappingURL=fetchRequestHandler.d.ts.map