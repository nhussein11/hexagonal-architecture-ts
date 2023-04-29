import { T as TRPCError } from './TRPCError-2b10c8d2.mjs';
import { i as invert, T as TRPC_ERROR_CODES_BY_KEY } from './codes-e5d244b6.mjs';
import { a as createRecursiveProxy } from './index-972002da.mjs';

/**
 * @public
 */ /**
 * @internal
 */ function getDataTransformer(transformer) {
    if ('input' in transformer) {
        return transformer;
    }
    return {
        input: transformer,
        output: transformer
    };
}
/**
 * @internal
 */ const defaultTransformer = {
    _default: true,
    input: {
        serialize: (obj)=>obj,
        deserialize: (obj)=>obj
    },
    output: {
        serialize: (obj)=>obj,
        deserialize: (obj)=>obj
    }
};

const defaultFormatter = ({ shape  })=>{
    return shape;
};

const TRPC_ERROR_CODES_BY_NUMBER = invert(TRPC_ERROR_CODES_BY_KEY);
const JSONRPC2_TO_HTTP_CODE = {
    PARSE_ERROR: 400,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    TIMEOUT: 408,
    CONFLICT: 409,
    CLIENT_CLOSED_REQUEST: 499,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    METHOD_NOT_SUPPORTED: 405,
    UNPROCESSABLE_CONTENT: 422,
    TOO_MANY_REQUESTS: 429
};
function getStatusCodeFromKey(code) {
    return JSONRPC2_TO_HTTP_CODE[code] ?? 500;
}
function getHTTPStatusCode(json) {
    const arr = Array.isArray(json) ? json : [
        json
    ];
    const httpStatuses = new Set(arr.map((res)=>{
        if ('error' in res) {
            const data = res.error.data;
            if (typeof data.httpStatus === 'number') {
                return data.httpStatus;
            }
            const code = TRPC_ERROR_CODES_BY_NUMBER[res.error.code];
            return getStatusCodeFromKey(code);
        }
        return 200;
    }));
    if (httpStatuses.size !== 1) {
        return 207;
    }
    const httpStatus = httpStatuses.values().next().value;
    return httpStatus;
}
function getHTTPStatusCodeFromError(error) {
    const { code  } = error;
    return getStatusCodeFromKey(code);
}

/**
 * Create an object without inheriting anything from `Object.prototype`
 * @internal
 */ function omitPrototype(obj) {
    return Object.assign(Object.create(null), obj);
}

const procedureTypes = [
    'query',
    'mutation',
    'subscription'
];

function isRouter(procedureOrRouter) {
    return 'router' in procedureOrRouter._def;
}
function isNestedRouter(procedureOrRouter) {
    return !('_def' in procedureOrRouter);
}
const emptyRouter = {
    _ctx: null,
    _errorShape: null,
    _meta: null,
    queries: {},
    mutations: {},
    subscriptions: {},
    errorFormatter: defaultFormatter,
    transformer: defaultTransformer
};
/**
 * Reserved words that can't be used as router or procedure names
 */ const reservedWords = [
    /**
   * Then is a reserved word because otherwise we can't return a promise that returns a Proxy
   * since JS will think that `.then` is something that exists
   */ 'then',
    /**
   * `_def` is a reserved word because it's used internally a lot
   */ '_def'
];
/**
 * @internal
 */ function createRouterFactory(config) {
    return function createRouterInner(procedures) {
        const reservedWordsUsed = new Set(Object.keys(procedures).filter((v)=>reservedWords.includes(v)));
        if (reservedWordsUsed.size > 0) {
            throw new Error('Reserved words used in `router({})` call: ' + Array.from(reservedWordsUsed).join(', '));
        }
        const newProcedures = {};
        for (const [key, procedureOrRouter] of Object.entries(procedures ?? {})){
            const value = procedures[key] ?? {};
            if (isNestedRouter(value)) {
                newProcedures[key] = createRouterInner(value);
                continue;
            }
            if (isRouter(value)) {
                newProcedures[key] = procedureOrRouter;
                continue;
            }
            newProcedures[key] = procedureOrRouter;
        }
        const routerProcedures = omitPrototype({});
        function recursiveGetPaths(procedures, path = '') {
            for (const [key, procedureOrRouter] of Object.entries(procedures ?? {})){
                const newPath = `${path}${key}`;
                if (isNestedRouter(procedureOrRouter)) {
                    recursiveGetPaths(procedureOrRouter, `${newPath}.`);
                    continue;
                }
                if (isRouter(procedureOrRouter)) {
                    recursiveGetPaths(procedureOrRouter._def.procedures, `${newPath}.`);
                    continue;
                }
                if (routerProcedures[newPath]) {
                    throw new Error(`Duplicate key: ${newPath}`);
                }
                routerProcedures[newPath] = procedureOrRouter;
            }
        }
        recursiveGetPaths(newProcedures);
        const _def = {
            _config: config,
            router: true,
            procedures: routerProcedures,
            ...emptyRouter,
            record: newProcedures,
            queries: Object.entries(routerProcedures).filter((pair)=>pair[1]._def.query).reduce((acc, [key, val])=>({
                    ...acc,
                    [key]: val
                }), {}),
            mutations: Object.entries(routerProcedures).filter((pair)=>pair[1]._def.mutation).reduce((acc, [key, val])=>({
                    ...acc,
                    [key]: val
                }), {}),
            subscriptions: Object.entries(routerProcedures).filter((pair)=>pair[1]._def.subscription).reduce((acc, [key, val])=>({
                    ...acc,
                    [key]: val
                }), {})
        };
        const router = {
            ...newProcedures,
            _def,
            createCaller (ctx) {
                const proxy = createRecursiveProxy(({ path , args  })=>{
                    // interop mode
                    if (path.length === 1 && procedureTypes.includes(path[0])) {
                        return callProcedure({
                            procedures: _def.procedures,
                            path: args[0],
                            rawInput: args[1],
                            ctx,
                            type: path[0]
                        });
                    }
                    const fullPath = path.join('.');
                    const procedure = _def.procedures[fullPath];
                    let type = 'query';
                    if (procedure._def.mutation) {
                        type = 'mutation';
                    } else if (procedure._def.subscription) {
                        type = 'subscription';
                    }
                    return procedure({
                        path: fullPath,
                        rawInput: args[0],
                        ctx,
                        type
                    });
                });
                return proxy;
            },
            getErrorShape (opts) {
                const { path , error  } = opts;
                const { code  } = opts.error;
                const shape = {
                    message: error.message,
                    code: TRPC_ERROR_CODES_BY_KEY[code],
                    data: {
                        code,
                        httpStatus: getHTTPStatusCodeFromError(error)
                    }
                };
                if (config.isDev && typeof opts.error.stack === 'string') {
                    shape.data.stack = opts.error.stack;
                }
                if (typeof path === 'string') {
                    shape.data.path = path;
                }
                return this._def._config.errorFormatter({
                    ...opts,
                    shape
                });
            }
        };
        return router;
    };
}
/**
 * @internal
 */ function callProcedure(opts) {
    const { type , path  } = opts;
    if (!(path in opts.procedures) || !opts.procedures[path]?._def[type]) {
        throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No "${type}"-procedure on path "${path}"`
        });
    }
    const procedure = opts.procedures[path];
    return procedure(opts);
}

/**
 * The default check to see if we're in a server
 */ const isServerDefault = typeof window === 'undefined' || 'Deno' in window || globalThis.process?.env?.NODE_ENV === 'test' || !!globalThis.process?.env?.JEST_WORKER_ID || !!globalThis.process?.env?.VITEST_WORKER_ID;

export { TRPC_ERROR_CODES_BY_NUMBER as T, defaultTransformer as a, getDataTransformer as b, createRouterFactory as c, defaultFormatter as d, callProcedure as e, getHTTPStatusCode as f, getHTTPStatusCodeFromError as g, isServerDefault as i, procedureTypes as p };
