import { AnyRouter } from '@trpc/server';
import { TRPCClientError } from '..';
import { Operation, OperationResultEnvelope, TRPCLink } from './types';
declare type ConsoleEsque = {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
declare type EnableFnOptions<TRouter extends AnyRouter> = (Operation & {
    direction: 'up';
}) | {
    direction: 'down';
    result: OperationResultEnvelope<unknown> | TRPCClientError<TRouter>;
};
declare type EnabledFn<TRouter extends AnyRouter> = (opts: EnableFnOptions<TRouter>) => boolean;
declare type LoggerLinkFnOptions<TRouter extends AnyRouter> = Operation & ({
    /**
     * Request was just initialized
     */
    direction: 'up';
} | {
    /**
     * Request result
     */
    direction: 'down';
    result: OperationResultEnvelope<unknown> | TRPCClientError<TRouter>;
    elapsedMs: number;
});
declare type LoggerLinkFn<TRouter extends AnyRouter> = (opts: LoggerLinkFnOptions<TRouter>) => void;
export interface LoggerLinkOptions<TRouter extends AnyRouter> {
    logger?: LoggerLinkFn<TRouter>;
    enabled?: EnabledFn<TRouter>;
    /**
     * Used in the built-in defaultLogger
     */
    console?: ConsoleEsque;
}
export declare function loggerLink<TRouter extends AnyRouter = AnyRouter>(opts?: LoggerLinkOptions<TRouter>): TRPCLink<TRouter>;
export {};
//# sourceMappingURL=loggerLink.d.ts.map