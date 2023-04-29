import { r as resolveHTTPResponse } from '../../resolveHTTPResponse-e1286cb3.mjs';
import { applyWSSHandler } from '../ws.mjs';
import '../../config-f0387de5.mjs';
import '../../TRPCError-2b10c8d2.mjs';
import '../../codes-e5d244b6.mjs';
import '../../index-972002da.mjs';
import '../../transformTRPCResponse-0ea8c0ca.mjs';
import '../../contentType-acc3be52.mjs';
import '../../observable-ade1bad8.mjs';

async function fastifyRequestHandler(opts) {
    const createContext = async function _createContext() {
        return opts.createContext?.(opts);
    };
    const query = opts.req.query ? new URLSearchParams(opts.req.query) : new URLSearchParams(opts.req.url.split('?')[1]);
    const req = {
        query,
        method: opts.req.method,
        headers: opts.req.headers,
        body: opts.req.body ?? 'null'
    };
    const result = await resolveHTTPResponse({
        req,
        createContext,
        path: opts.path,
        router: opts.router,
        batching: opts.batching,
        responseMeta: opts.responseMeta,
        onError (o) {
            opts?.onError?.({
                ...o,
                req: opts.req
            });
        }
    });
    const { res  } = opts;
    if ('status' in result && (!res.statusCode || res.statusCode === 200)) {
        res.statusCode = result.status;
    }
    for (const [key, value] of Object.entries(result.headers ?? {})){
        /* istanbul ignore if -- @preserve */ if (typeof value === 'undefined') {
            continue;
        }
        void res.header(key, value);
    }
    await res.send(result.body);
}

/// <reference types="@fastify/websocket" />
function fastifyTRPCPlugin(fastify, opts, done) {
    fastify.addContentTypeParser('application/json', {
        parseAs: 'string'
    }, function(_, body, _done) {
        _done(null, body);
    });
    let prefix = opts.prefix ?? '';
    // https://github.com/fastify/fastify-plugin/blob/fe079bef6557a83794bf437e14b9b9edb8a74104/plugin.js#L11
    // @ts-expect-error property 'default' does not exists on type ...
    if (typeof fastifyTRPCPlugin.default !== 'function') {
        prefix = ''; // handled by fastify internally
    }
    fastify.all(`${prefix}/:path`, async (req, res)=>{
        const path = req.params.path;
        await fastifyRequestHandler({
            ...opts.trpcOptions,
            req,
            res,
            path
        });
    });
    if (opts.useWSS) {
        applyWSSHandler({
            ...opts.trpcOptions,
            wss: fastify.websocketServer
        });
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        fastify.get(prefix ?? '/', {
            websocket: true
        }, ()=>{});
    }
    done();
}

export { fastifyRequestHandler, fastifyTRPCPlugin };
