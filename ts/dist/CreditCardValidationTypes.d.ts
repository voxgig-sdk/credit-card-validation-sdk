export interface Validation {
    cardNumber?: string;
    cardType?: string;
    expirationValid?: boolean;
    luhnCheck?: boolean;
    message?: string;
    valid?: boolean;
}
export interface ValidationLoadMatch {
    cc: string;
    cvv?: string;
    exp?: string;
}
