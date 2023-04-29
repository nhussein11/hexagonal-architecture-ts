import { Parser } from '../parser';
export declare type ParseFn<TType> = (value: unknown) => TType | Promise<TType>;
export declare function getParseFn<TType>(procedureParser: Parser): ParseFn<TType>;
/**
 * @deprecated only for backwards compat
 * @internal
 */
export declare function getParseFnOrPassThrough<TType>(procedureParser: Parser | undefined): ParseFn<TType>;
//# sourceMappingURL=getParseFn.d.ts.map