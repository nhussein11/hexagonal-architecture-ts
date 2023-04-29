const noop = ()=>{
// noop
};
function createInnerProxy(callback, path) {
    const proxy = new Proxy(noop, {
        get (_obj, key) {
            if (typeof key !== 'string' || key === 'then') {
                // special case for if the proxy is accidentally treated
                // like a PromiseLike (like in `Promise.resolve(proxy)`)
                return undefined;
            }
            return createInnerProxy(callback, [
                ...path,
                key
            ]);
        },
        apply (_1, _2, args) {
            return callback({
                args,
                path
            });
        }
    });
    return proxy;
}
/**
 * Creates a proxy that calls the callback with the path and arguments
 *
 * @internal
 */ const createRecursiveProxy = (callback)=>createInnerProxy(callback, []);
/**
 * Used in place of `new Proxy` where each handler will map 1 level deep to another value.
 *
 * @internal
 */ const createFlatProxy = (callback)=>{
    return new Proxy(noop, {
        get (_obj, name) {
            if (typeof name !== 'string' || name === 'then') {
                // special case for if the proxy is accidentally treated
                // like a PromiseLike (like in `Promise.resolve(proxy)`)
                return undefined;
            }
            return callback(name);
        }
    });
};

export { createRecursiveProxy as a, createFlatProxy as c };
