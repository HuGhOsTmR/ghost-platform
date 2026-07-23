/* ============================================================
 * PURCHASE ORDER API MODELS
 * Modelos que representan la respuesta del Backend (Django)
 * ============================================================ */

export interface PurchaseOrderLine {

    id: number;

    product: number;

    productCode: string;

    productName: string;

    unitOfMeasure: string;

    quantity: number;

    receivedQuantity: number;

    pendingQuantity: number;

    unitPrice: number;

    taxPercentage: number;

    lineTotal: number;

    notes: string;

}

export interface PurchaseOrderDetail {

    id: number;

    documentNumber: string;

    fiscalYear: number;

    supplier: number;

    supplierName: string;

    documentDate: string;

    expectedDeliveryDate?: string | null;

    currency: number;

    currencyCode: string;

    subtotal: number;

    taxAmount: number;

    totalAmount: number;

    status: string;

    notes: string;

    lines: PurchaseOrderLine[];

}

/* ============================================================
 * PURCHASE RECEIPT UI MODELS
 * Modelo utilizado exclusivamente por la interfaz
 * ============================================================ */

export interface EditableReceiptLine {

    /**
     * PurchaseOrderLine.id
     */
    purchaseOrderLine: number;

    productId: number;

    productCode: string;

    productName: string;

    unitOfMeasure: string;

    /**
     * Cantidad originalmente solicitada
     */
    orderedQuantity: number;

    /**
     * Cantidad recibida anteriormente
     */
    previouslyReceived: number;

    /**
     * Cantidad pendiente de recibir
     */
    pendingQuantity: number;

    /**
     * Cantidad que el usuario registra
     * en esta recepción.
     */
    quantityReceived: number;

}

/* ============================================================
 * PURCHASE RECEIPT PAYLOAD
 * Modelos enviados al Backend
 * ============================================================ */

export interface PurchaseReceiptLinePayload {

    purchase_order_line: number;

    quantity_received: number;

}

export interface PurchaseReceiptCreate {

    purchase_order: number;

    receipt_date: string;

    lines: PurchaseReceiptLinePayload[];

}

/* ============================================================
 * PURCHASE RECEIPT API MODELS
 * (respuesta del Backend)
 * ============================================================ */

export interface PurchaseReceiptLine {

    id: number;

    purchaseOrderLine: number;

    product: number;

    productCode: string;

    productName: string;

    unitOfMeasure: string;

    quantityReceived: number;

    unitCost: number;

    taxPercentage: number;

    lineTotal: number;

    notes: string;

}

export interface PurchaseReceipt {

    id: number;

    receiptNumber: string;

    purchaseOrder: number;

    supplier: number;

    supplierName: string;

    receiptDate: string;

    currency: number;

    currencyCode: string;

    subtotal: number;

    taxAmount: number;

    totalAmount: number;

    status: string;

    notes: string;

    lines: PurchaseReceiptLine[];

}