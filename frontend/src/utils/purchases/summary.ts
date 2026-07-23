import type {
    EditableReceiptLine,
    ReceiptSummary,
} from "../../types";

/* ============================================================
 * Summary
 * ============================================================ */

/**
 * Calcula el resumen de la recepción.
 */
export function calculateReceiptSummary(
    lines: ReadonlyArray<EditableReceiptLine>
): ReceiptSummary {

    return lines.reduce<ReceiptSummary>(
        (summary, line) => ({

            products: summary.products + 1,

            ordered:
                summary.ordered +
                line.orderedQuantity,

            received:
                summary.received +
                line.previouslyReceived,

            receiving:
                summary.receiving +
                line.quantityReceived,

            pending:
                summary.pending +
                (line.pendingQuantity - line.quantityReceived),

        }),
        {
            products: 0,
            ordered: 0,
            received: 0,
            receiving: 0,
            pending: 0,
        }
    );

}