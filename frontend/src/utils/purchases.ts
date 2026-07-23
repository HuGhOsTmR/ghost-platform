import type {
    EditableReceiptLine, 
    PurchaseOrderDetail, 
    PurchaseReceiptCreate,
    PurchaseReceiptCreateLine,
} from "../types";

/* ============================================================
 * RECEIPT SUMMARY
 * ============================================================ */

export interface ReceiptSummary {

    totalProducts: number;

    orderedQuantity: number;

    previouslyReceived: number;

    receivingNow: number;

    pendingQuantity: number;

}

/* ============================================================
 * MAP PURCHASE ORDER
 * ============================================================ */

export function mapPurchaseOrderToEditableReceiptLines(
    order: PurchaseOrderDetail
): EditableReceiptLine[] {

    return order.lines.map((line) => ({

        purchaseOrderLine: line.id,

        product: line.product,

        productCode: line.productCode,

        sku: line.sku,

        barcode: line.barcode,

        productName: line.productName,

        unitOfMeasure: line.unitOfMeasure,

        orderedQuantity: line.quantity,

        previouslyReceived: line.quantityReceived,

        pendingQuantity: line.quantityPending,

        quantityReceived: 0,

    }));

}

/* ============================================================
 * UPDATE LINE
 * ============================================================ */

export function updateReceiptLine(
    lines: EditableReceiptLine[],
    purchaseOrderLine: number,
    quantity: number
): EditableReceiptLine[] {

    return lines.map((line) => {

        if (line.purchaseOrderLine !== purchaseOrderLine) {
            return line;
        }

        return {
            ...line,
            quantityReceived: Math.max(
                0,
                Math.min(quantity, line.pendingQuantity)
            ),
        };

    });

}
/* ============================================================
 * SUMMARY
 * ============================================================ */

export function calculateReceiptSummary(
    lines: EditableReceiptLine[]
): ReceiptSummary {

    return {

        totalProducts: lines.length,

        orderedQuantity: lines.reduce(
            (sum, line) => sum + (line.orderedQuantity ?? 0),
            0
        ),

        previouslyReceived: lines.reduce(
            (sum, line) => sum + (line.previouslyReceived ?? 0),
            0
        ),

        receivingNow: lines.reduce(
            (sum, line) => sum + (line.quantityReceived ?? 0),
            0
        ),

        pendingQuantity: lines.reduce(
            (sum, line) =>
                sum + ((line.pendingQuantity ?? 0) - (line.quantityReceived ?? 0)),
            0
        ),

    };

}

/* ============================================================
 * BUILD PAYLOAD
 * ============================================================ */

export function buildPurchaseReceiptPayload(
    purchaseOrderId: number,
    receiptDate: string,
    lines: EditableReceiptLine[]
): PurchaseReceiptCreate {

    const payloadLines: PurchaseReceiptCreateLine[] = lines
        .filter((line) => line.quantityReceived > 0)
        .map((line) => ({

            purchaseOrderLine: line.purchaseOrderLine,

            quantityReceived: line.quantityReceived,

        }));

    return {

        purchaseOrder: purchaseOrderId,

        receiptDate: receiptDate,

        lines: payloadLines,

    };

}

/* ============================================================
 * VALIDATION
 * ============================================================ */

export function canCreateReceipt(
    lines: EditableReceiptLine[]
): boolean {

    return lines.some(
        (line) => line.quantityReceived > 0
    );

}

export function hasReceiptChanges(
    lines: EditableReceiptLine[]
): boolean {

    return lines.some(
        (line) => line.quantityReceived > 0
    );

}

export function getToday(): string {

    return new Date()
        .toISOString()
        .split("T")[0];

}

