/* ============================================================
 * PURCHASE RECEIPT
 * VALIDATION
 * ============================================================ */

export enum ReceiptValidationError {

    EMPTY_LINES = "EMPTY_LINES",

    EMPTY_QUANTITY = "EMPTY_QUANTITY",

    INVALID_QUANTITY = "INVALID_QUANTITY",

}

export interface ValidationResult {

    valid: boolean;

    errors: ReceiptValidationError[];

}