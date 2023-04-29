import { AnyProcedure, AnyRouter, DefaultErrorShape, Maybe, inferRouterError } from '@trpc/server';
import { TRPCErrorResponse } from '@trpc/server/rpc';
declare type RouterOrProcedure = AnyRouter | AnyProcedure;
declare type inferErrorShape<TRouterOrProcedure extends RouterOrProcedure> = TRouterOrProcedure extends AnyRouter ? inferRouterError<TRouterOrProcedure> : TRouterOrProcedure['_def']['_config']['$types']['errorShape'];
export interface TRPCClientErrorBase<TShape extends DefaultErrorShape> {
    readonly message: string;
    readonly shape: Maybe<TShape>;
    readonly data: Maybe<TShape['data']>;
}
export declare type TRPCClientErrorLike<TRouterOrProcedure extends RouterOrProcedure> = TRPCClientErrorBase<inferErrorShape<TRouterOrProcedure>>;
export declare class TRPCClientError<TRouterOrProcedure extends RouterOrProcedure> extends Error implements TRPCClientErrorBase<inferErrorShape<TRouterOrProcedure>> {
    readonly cause: Error | undefined;
    readonly shape: Maybe<inferErrorShape<TRouterOrProcedure>>;
    readonly data: Maybe<inferErrorShape<TRouterOrProcedure>['data']>;
    readonly meta: Record<string, unknown> | undefined;
    constructor(message: string, opts?: {
        result?: Maybe<inferErrorShape<TRouterOrProcedure>>;
        cause?: Error;
        meta?: Record<string, unknown>;
    });
    static from<TRouterOrProcedure extends RouterOrProcedure>(cause: Error | TRPCErrorResponse<any>, opts?: {
        meta?: Record<string, unknown>;
    }): TRPCClientError<TRouterOrProcedure>;
}
export {};
//# sourceMappingURL=TRPCClientError.d.ts.map