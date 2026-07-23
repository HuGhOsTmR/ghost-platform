import type {
    PurchaseOrderDetail,
    PurchaseOrderLine,
    EditableReceiptLine,
} from "../../types";

/* ============================================================
 * Helpers
 * ============================================================ */

function toNumber(value: unknown): number {

    if (value === null || value === undefined) {
        return 0;
    }

    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : 0;

}

/* ============================================================
 * Purchase Order Line
 * ============================================================ */

export function mapPurchaseOrderLine(
    line: PurchaseOrderLine
): EditableReceiptLine {

    const orderedQuantity = toNumber(line.quantity);

    const previouslyReceived = toNumber(line.receivedQuantity);

    const pendingQuantity = Math.max(
        0,
        orderedQuantity - previouslyReceived
    );

    return {

        purchaseOrderLine: line.id,

        productId: line.product,

        productCode: line.productCode,

        productName: line.productName,

        unitOfMeasure: line.unitOfMeasure,

        orderedQuantity,

        previouslyReceived,

        pendingQuantity,

        quantityReceived: 0,

    };

}

/* ============================================================
 * Purchase Order
 * ============================================================ */

export function mapPurchaseOrderToEditableReceiptLines(
    purchaseOrder: PurchaseOrderDetail
): EditableReceiptLine[] {

    return purchaseOrder.lines.map(
        mapPurchaseOrderLine
    );

}