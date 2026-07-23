import type {
    EditableReceiptLine,
    ValidationResult,
} from "../../types";

import {
    ReceiptValidationError,
} from "../../types";

/* ============================================================
 * Validation
 * ============================================================ */

export function hasReceiptLines(
    lines: ReadonlyArray<EditableReceiptLine>
): boolean {

    return lines.length > 0;

}

export function hasReceiptQuantity(
    lines: ReadonlyArray<EditableReceiptLine>
): boolean {

    return lines.some(
        line => line.quantityReceived > 0
    );

}

export function hasValidReceiptQuantities(
    lines: ReadonlyArray<EditableReceiptLine>
): boolean {

    return lines.every(line =>

        line.quantityReceived >= 0 &&
        line.quantityReceived <= line.pendingQuantity

    );

}

export function validateReceipt(
    lines: ReadonlyArray<EditableReceiptLine>
): ValidationResult {

    const errors: ReceiptValidationError[] = [];

    if (!hasReceiptLines(lines)) {

        errors.push(
            ReceiptValidationError.EMPTY_LINES
        );

    }

    if (!hasReceiptQuantity(lines)) {

        errors.push(
            ReceiptValidationError.EMPTY_QUANTITY
        );

    }

    if (!hasValidReceiptQuantities(lines)) {

        errors.push(
            ReceiptValidationError.INVALID_QUANTITY
        );

    }

    return {

        valid: errors.length === 0,

        errors,

    };

}