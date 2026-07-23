/* ============================================================
 * PURCHASE RECEIPT
 * ============================================================ */

export interface EditableReceiptLine {

    /**
     * Línea de la Orden de Compra.
     */
    purchaseOrderLine: number;

    /**
     * Producto.
     */
    productId: number;

    productCode: string;

    productName: string;

    unitOfMeasure: string;

    /**
     * Cantidades.
     */
    orderedQuantity: number;

    previouslyReceived: number;

    pendingQuantity: number;

    /**
     * Cantidad que será recibida.
     */
    quantityReceived: number;

}

export interface ReceiptSummary {

    /**
     * Cantidad de productos.
     */
    products: number;

    /**
     * Cantidad total ordenada.
     */
    ordered: number;

    /**
     * Cantidad recibida previamente.
     */
    received: number;

    /**
     * Cantidad recibida en esta operación.
     */
    receiving: number;

    /**
     * Cantidad pendiente.
     */
    pending: number;

}