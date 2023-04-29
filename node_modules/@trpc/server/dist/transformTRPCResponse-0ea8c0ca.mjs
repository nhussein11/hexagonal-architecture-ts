function transformTRPCResponseItem(router, item) {
    if ('error' in item) {
        return {
            ...item,
            error: router._def._config.transformer.output.serialize(item.error)
        };
    }
    if ('data' in item.result) {
        return {
            ...item,
            result: {
                ...item.result,
                data: router._def._config.transformer.output.serialize(item.result.data)
            }
        };
    }
    return item;
}
/**
 * Takes a unserialized `TRPCResponse` and serializes it with the router's transformers
 **/ function transformTRPCResponse(router, itemOrItems) {
    return Array.isArray(itemOrItems) ? itemOrItems.map((item)=>transformTRPCResponseItem(router, item)) : transformTRPCResponseItem(router, itemOrItems);
}

export { transformTRPCResponse as t };
