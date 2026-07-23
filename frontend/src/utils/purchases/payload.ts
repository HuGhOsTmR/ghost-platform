import type {
    EditableReceiptLine,
    PurchaseReceiptCreate,
    PurchaseReceiptLinePayload,
} from "../../types";

/* ============================================================
 * Helpers privados
 * ============================================================ */

/**
 * Construye una línea del payload.
 */
function buildReceiptLine(
    line: EditableReceiptLine
): PurchaseReceiptLinePayload {

    return {

        purchase_order_line: line.purchaseOrderLine,

        quantity_received: line.quantityReceived,

    };

}

/* ============================================================
 * Payload
 * ============================================================ */

/**
 * Construye el payload para crear una recepción.
 */
interface BuildPurchaseReceiptPayloadOptions {

    purchaseOrder: number;

    receiptDate: string;

    notes: string;

    lines: ReadonlyArray<EditableReceiptLine>;

}

export function buildPurchaseReceiptPayload(
    options: BuildPurchaseReceiptPayloadOptions
): PurchaseReceiptCreate {

    const {

        purchaseOrder,

        receiptDate,

        notes,

        lines,

    } = options;

    return {

        purchase_order: purchaseOrder,

        receipt_date: receiptDate,

        notes,

        lines: lines
            .filter(line => line.quantityReceived > 0)
            .map(buildReceiptLine),

    };

}