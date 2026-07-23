import type {
    EditableReceiptLine,
} from "../../types";

/* ============================================================
 * Helpers privados
 * ============================================================ */

/**
 * Actualiza una línea de recepción de forma inmutable.
 */
function updateLine(
    lines: ReadonlyArray<EditableReceiptLine>,
    purchaseOrderLine: number,
    changes: Partial<EditableReceiptLine>
): EditableReceiptLine[] {

    return lines.map(line =>

        line.purchaseOrderLine === purchaseOrderLine
            ? {
                ...line,
                ...changes,
            }
            : line

    );

}

/* ============================================================
 * Receipt
 * ============================================================ */

/**
 * Establece la cantidad recibida de una línea.
 */
export function setReceiptQuantity(
    lines: ReadonlyArray<EditableReceiptLine>,
    purchaseOrderLine: number,
    quantityReceived: number
): EditableReceiptLine[] {

    return updateLine(
        lines,
        purchaseOrderLine,
        {
            quantityReceived,
        }
    );

}

/**
 * Reinicia una línea de recepción.
 */
export function resetReceiptLine(
    lines: ReadonlyArray<EditableReceiptLine>,
    purchaseOrderLine: number
): EditableReceiptLine[] {

    return updateLine(
        lines,
        purchaseOrderLine,
        {
            quantityReceived: 0,
        }
    );

}

/**
 * Reinicia todas las líneas de la recepción.
 */
export function clearReceipt(
    lines: ReadonlyArray<EditableReceiptLine>
): EditableReceiptLine[] {

    return lines.map(line => ({

        ...line,

        quantityReceived: 0,

    }));

}