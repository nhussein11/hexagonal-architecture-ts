/**
 * @internal
 */ function isObject(value) {
    // check that value is object
    return !!value && !Array.isArray(value) && typeof value === 'object';
}
/**
 * @internal
 */ function getMessageFromUnknownError(err, fallback) {
    if (typeof err === 'string') {
        return err;
    }
    if (isObject(err) && typeof err.message === 'string') {
        return err.message;
    }
    return fallback;
}
function getCauseFromUnknown(cause) {
    if (cause instanceof Error) {
        return cause;
    }
    return undefined;
}

function getTRPCErrorFromUnknown(cause) {
    if (cause instanceof TRPCError) {
        return cause;
    }
    const trpcError = new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause
    });
    // Inherit stack from error
    if (cause instanceof Error && cause.stack) {
        trpcError.stack = cause.stack;
    }
    return trpcError;
}
class TRPCError extends Error {
    constructor(opts){
        const message = opts.message ?? getMessageFromUnknownError(opts.cause, opts.code);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/tc39/proposal-error-cause
        super(message, {
            cause: opts.cause
        });
        this.code = opts.code;
        this.name = this.constructor.name;
    }
}

export { TRPCError as T, getTRPCErrorFromUnknown as a, getCauseFromUnknown as g };
