import { AnyRouter } from '../core/router';
import { TRPCResponse, TRPCResponseMessage } from '../rpc';
/**
 * Takes a unserialized `TRPCResponse` and serializes it with the router's transformers
 **/
export declare function transformTRPCResponse<TResponse extends TRPCResponse | TRPCResponse[] | TRPCResponseMessage | TRPCResponseMessage[]>(router: AnyRouter, itemOrItems: TResponse): import("../rpc").TRPCSuccessResponse<unknown> | import("../rpc").TRPCErrorResponse<import("../rpc").TRPCErrorShape<import("../rpc").TRPC_ERROR_CODE_NUMBER, Record<string, unknown>>> | ({
    id: import("../rpc").JSONRPC2.RequestId;
} & import("../rpc").TRPCResultMessage<unknown>) | (TRPCResponse<unknown, import("../rpc").TRPCErrorShape<import("../rpc").TRPC_ERROR_CODE_NUMBER, Record<string, unknown>>> | TRPCResponseMessage<unknown, import("../rpc").TRPCErrorShape<import("../rpc").TRPC_ERROR_CODE_NUMBER, Record<string, unknown>>>)[];
//# sourceMappingURL=transformTRPCResponse.d.ts.map