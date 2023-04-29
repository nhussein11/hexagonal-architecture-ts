import { ProcedureType } from '../core';
import { TRPCErrorShape, TRPC_ERROR_CODE_KEY, TRPC_ERROR_CODE_NUMBER } from '../rpc';
import { TRPCError } from './TRPCError';
/**
 * @internal
 */
export declare type ErrorFormatter<TContext, TShape extends TRPCErrorShape<number>> = ({ error, }: {
    error: TRPCError;
    type: ProcedureType | 'unknown';
    path: string | undefined;
    input: unknown;
    ctx: undefined | TContext;
    shape: DefaultErrorShape;
}) => TShape;
export declare type ErrorFormatterShape<TType> = TType extends ErrorFormatter<any, infer TShape> ? TShape : DefaultErrorShape;
/**
 * @internal
 */
export declare type DefaultErrorData = {
    code: TRPC_ERROR_CODE_KEY;
    httpStatus: number;
    path?: string;
    stack?: string;
};
/**
 * @internal
 */
export interface DefaultErrorShape extends TRPCErrorShape<TRPC_ERROR_CODE_NUMBER, DefaultErrorData> {
    message: string;
    code: TRPC_ERROR_CODE_NUMBER;
}
export declare const defaultFormatter: ErrorFormatter<any, any>;
//# sourceMappingURL=formatter.d.ts.map