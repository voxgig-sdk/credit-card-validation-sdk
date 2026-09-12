import { Context } from './Context';
declare class CreditCardValidationError extends Error {
    isCreditCardValidationError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CreditCardValidationError };
