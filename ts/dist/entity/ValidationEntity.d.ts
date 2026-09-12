import { CreditCardValidationEntityBase } from '../CreditCardValidationEntityBase';
import type { CreditCardValidationSDK } from '../CreditCardValidationSDK';
import type { Control } from '../types';
import type { Validation, ValidationLoadMatch } from '../CreditCardValidationTypes';
declare class ValidationEntity extends CreditCardValidationEntityBase<Validation> {
    constructor(client: CreditCardValidationSDK, entopts: any);
    make(this: ValidationEntity): ValidationEntity;
    load(this: any, reqmatch?: ValidationLoadMatch, ctrl?: Control): Promise<ValidationEntity>;
}
export { ValidationEntity };
