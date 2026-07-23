/* ============================================================
 * PURCHASE RECEIPT
 * UI MODELS
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
     * Cantidades
     */
    orderedQuantity: number;

    previouslyReceived: number;

    pendingQuantity: number;

    /**
     * Cantidad que el usuario desea recibir.
     */
    quantityReceived: number;

}

export interface ReceiptSummary {

    /**
     * Cantidad de productos.
     */
    products: number;

    /**
     * Cantidad total solicitada.
     */
    ordered: number;

    /**
     * Cantidad recibida anteriormente.
     */
    received: number;

    /**
     * Cantidad que se recibe en esta operación.
     */
    receiving: number;

    /**
     * Cantidad pendiente luego de esta recepción.
     */
    pending: number;

}