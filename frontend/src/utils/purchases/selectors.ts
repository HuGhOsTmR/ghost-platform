import type {

    EditableReceiptLine,

    PurchaseOrder,

    ReceiptSummary,

    ValidationResult,

} from "../../types";

import {

    calculateReceiptSummary,

} from "./summary";

/**
 * Obtiene el resumen de la recepción.
 */
export function getReceiptSummary(

    lines: ReadonlyArray<EditableReceiptLine>,

): ReceiptSummary {

    return calculateReceiptSummary(

        lines,

    );

}

/**
 * Indica si existen productos para recibir.
 */
export function hasReceivingProducts(

    lines: ReadonlyArray<EditableReceiptLine>,

): boolean {

    return lines.some(

        line => line.quantityReceived > 0,

    );

}

/**
 * Indica si existen cantidades pendientes.
 */
export function hasPendingQuantities(

    lines: ReadonlyArray<EditableReceiptLine>,

): boolean {

    return lines.some(

        line => line.pendingQuantity > 0,

    );

}

/**
 * Indica si la recepción puede guardarse.
 */
export function canSaveReceipt(

    params: {

        purchaseOrder: PurchaseOrder | null;

        receiptDate: string;

        saving: boolean;

        validation: ValidationResult;

    },

): boolean {

    const {

        purchaseOrder,

        receiptDate,

        saving,

        validation,

    } = params;

    return (

        purchaseOrder !== null &&

        receiptDate.trim().length > 0 &&

        validation.valid &&

        !saving

    );

}