import { r as resolveHTTPResponse } from '../../resolveHTTPResponse-e1286cb3.mjs';
import '../../config-f0387de5.mjs';
import '../../TRPCError-2b10c8d2.mjs';
import '../../codes-e5d244b6.mjs';
import '../../index-972002da.mjs';
import '../../transformTRPCResponse-0ea8c0ca.mjs';
import '../../contentType-acc3be52.mjs';

async function fetchRequestHandler(opts) {
    const resHeaders = new Headers();
    const createContext = async ()=>{
        return opts.createContext?.({
            req: opts.req,
            resHeaders
        });
    };
    const url = new URL(opts.req.url);
    const path = url.pathname.slice(opts.endpoint.length + 1);
    const req = {
        query: url.searchParams,
        method: opts.req.method,
        headers: Object.fromEntries(opts.req.headers),
        body: opts.req.headers.get('content-type') === 'application/json' ? await opts.req.text() : ''
    };
    const result = await resolveHTTPResponse({
        req,
        createContext,
        path,
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
    for (const [key, value] of Object.entries(result.headers ?? {})){
        /* istanbul ignore if -- @preserve */ if (typeof value === 'undefined') {
            continue;
        }
        if (typeof value === 'string') {
            resHeaders.set(key, value);
            continue;
        }
        for (const v of value){
            resHeaders.append(key, v);
        }
    }
    const res = new Response(result.body, {
        status: result.status,
        headers: resHeaders
    });
    return res;
}

export { fetchRequestHandler };
