import { e as callProcedure } from '../config-f0387de5.mjs';
import { T as TRPCError, g as getCauseFromUnknown, a as getTRPCErrorFromUnknown } from '../TRPCError-2b10c8d2.mjs';
import { t as transformTRPCResponse } from '../transformTRPCResponse-0ea8c0ca.mjs';
import { i as isObservable } from '../observable-ade1bad8.mjs';
import '../codes-e5d244b6.mjs';
import '../index-972002da.mjs';

/* istanbul ignore next -- @preserve */ function assertIsObject(obj) {
    if (typeof obj !== 'object' || Array.isArray(obj) || !obj) {
        throw new Error('Not an object');
    }
}
/* istanbul ignore next -- @preserve */ function assertIsProcedureType(obj) {
    if (obj !== 'query' && obj !== 'subscription' && obj !== 'mutation') {
        throw new Error('Invalid procedure type');
    }
}
/* istanbul ignore next -- @preserve */ function assertIsRequestId(obj) {
    if (obj !== null && typeof obj === 'number' && isNaN(obj) && typeof obj !== 'string') {
        throw new Error('Invalid request id');
    }
}
/* istanbul ignore next -- @preserve */ function assertIsString(obj) {
    if (typeof obj !== 'string') {
        throw new Error('Invalid string');
    }
}
/* istanbul ignore next -- @preserve */ function assertIsJSONRPC2OrUndefined(obj) {
    if (typeof obj !== 'undefined' && obj !== '2.0') {
        throw new Error('Must be JSONRPC 2.0');
    }
}
function parseMessage(obj, transformer) {
    assertIsObject(obj);
    const { method , params , id , jsonrpc  } = obj;
    assertIsRequestId(id);
    assertIsJSONRPC2OrUndefined(jsonrpc);
    if (method === 'subscription.stop') {
        return {
            id,
            jsonrpc,
            method
        };
    }
    assertIsProcedureType(method);
    assertIsObject(params);
    const { input: rawInput , path  } = params;
    assertIsString(path);
    const input = transformer.input.deserialize(rawInput);
    return {
        id,
        jsonrpc,
        method,
        params: {
            input,
            path
        }
    };
}
function applyWSSHandler(opts) {
    const { wss , createContext , router  } = opts;
    const { transformer  } = router._def._config;
    wss.on('connection', async (client, req)=>{
        const clientSubscriptions = new Map();
        function respond(untransformedJSON) {
            client.send(JSON.stringify(transformTRPCResponse(router, untransformedJSON)));
        }
        function stopSubscription(subscription, { id , jsonrpc  }) {
            subscription.unsubscribe();
            respond({
                id,
                jsonrpc,
                result: {
                    type: 'stopped'
                }
            });
        }
        const ctxPromise = createContext?.({
            req,
            res: client
        });
        let ctx = undefined;
        async function handleRequest(msg) {
            const { id , jsonrpc  } = msg;
            /* istanbul ignore next -- @preserve */ if (id === null) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: '`id` is required'
                });
            }
            if (msg.method === 'subscription.stop') {
                const sub = clientSubscriptions.get(id);
                if (sub) {
                    stopSubscription(sub, {
                        id,
                        jsonrpc
                    });
                }
                clientSubscriptions.delete(id);
                return;
            }
            const { path , input  } = msg.params;
            const type = msg.method;
            try {
                await ctxPromise; // asserts context has been set
                const result = await callProcedure({
                    procedures: router._def.procedures,
                    path,
                    rawInput: input,
                    ctx,
                    type
                });
                if (type === 'subscription') {
                    if (!isObservable(result)) {
                        throw new TRPCError({
                            message: `Subscription ${path} did not return an observable`,
                            code: 'INTERNAL_SERVER_ERROR'
                        });
                    }
                } else {
                    // send the value as data if the method is not a subscription
                    respond({
                        id,
                        jsonrpc,
                        result: {
                            type: 'data',
                            data: result
                        }
                    });
                    return;
                }
                const observable = result;
                const sub1 = observable.subscribe({
                    next (data) {
                        respond({
                            id,
                            jsonrpc,
                            result: {
                                type: 'data',
                                data
                            }
                        });
                    },
                    error (err) {
                        const error = getTRPCErrorFromUnknown(err);
                        opts.onError?.({
                            error,
                            path,
                            type,
                            ctx,
                            req,
                            input
                        });
                        respond({
                            id,
                            jsonrpc,
                            error: router.getErrorShape({
                                error,
                                type,
                                path,
                                input,
                                ctx
                            })
                        });
                    },
                    complete () {
                        respond({
                            id,
                            jsonrpc,
                            result: {
                                type: 'stopped'
                            }
                        });
                    }
                });
                /* istanbul ignore next -- @preserve */ if (client.readyState !== client.OPEN) {
                    // if the client got disconnected whilst initializing the subscription
                    // no need to send stopped message if the client is disconnected
                    sub1.unsubscribe();
                    return;
                }
                /* istanbul ignore next -- @preserve */ if (clientSubscriptions.has(id)) {
                    // duplicate request ids for client
                    stopSubscription(sub1, {
                        id,
                        jsonrpc
                    });
                    throw new TRPCError({
                        message: `Duplicate id ${id}`,
                        code: 'BAD_REQUEST'
                    });
                }
                clientSubscriptions.set(id, sub1);
                respond({
                    id,
                    jsonrpc,
                    result: {
                        type: 'started'
                    }
                });
            } catch (cause) /* istanbul ignore next -- @preserve */ {
                // procedure threw an error
                const error = getTRPCErrorFromUnknown(cause);
                opts.onError?.({
                    error,
                    path,
                    type,
                    ctx,
                    req,
                    input
                });
                respond({
                    id,
                    jsonrpc,
                    error: router.getErrorShape({
                        error,
                        type,
                        path,
                        input,
                        ctx
                    })
                });
            }
        }
        client.on('message', async (message)=>{
            try {
                const msgJSON = JSON.parse(message.toString());
                const msgs = Array.isArray(msgJSON) ? msgJSON : [
                    msgJSON
                ];
                const promises = msgs.map((raw)=>parseMessage(raw, transformer)).map(handleRequest);
                await Promise.all(promises);
            } catch (cause) {
                const error = new TRPCError({
                    code: 'PARSE_ERROR',
                    cause: getCauseFromUnknown(cause)
                });
                respond({
                    id: null,
                    error: router.getErrorShape({
                        error,
                        type: 'unknown',
                        path: undefined,
                        input: undefined,
                        ctx: undefined
                    })
                });
            }
        });
        // WebSocket errors should be handled, as otherwise unhandled exceptions will crash Node.js.
        // This line was introduced after the following error brought down production systems:
        // "RangeError: Invalid WebSocket frame: RSV2 and RSV3 must be clear"
        // Here is the relevant discussion: https://github.com/websockets/ws/issues/1354#issuecomment-774616962
        client.on('error', (cause)=>{
            opts.onError?.({
                ctx,
                error: getTRPCErrorFromUnknown(cause),
                input: undefined,
                path: undefined,
                type: 'unknown',
                req
            });
        });
        client.once('close', ()=>{
            for (const sub of clientSubscriptions.values()){
                sub.unsubscribe();
            }
            clientSubscriptions.clear();
        });
        async function createContextAsync() {
            try {
                ctx = await ctxPromise;
            } catch (cause) {
                const error = getTRPCErrorFromUnknown(cause);
                opts.onError?.({
                    error,
                    path: undefined,
                    type: 'unknown',
                    ctx,
                    req,
                    input: undefined
                });
                respond({
                    id: null,
                    error: router.getErrorShape({
                        error,
                        type: 'unknown',
                        path: undefined,
                        input: undefined,
                        ctx
                    })
                });
                // close in next tick
                (global.setImmediate ?? global.setTimeout)(()=>{
                    client.close();
                });
            }
        }
        await createContextAsync();
    });
    return {
        broadcastReconnectNotification: ()=>{
            const response = {
                id: null,
                method: 'reconnect'
            };
            const data = JSON.stringify(response);
            for (const client of wss.clients){
                if (client.readyState === 1 /* ws.OPEN */ ) {
                    client.send(data);
                }
            }
        }
    };
}

export { applyWSSHandler, parseMessage };
