/* ============================================================
 * PURCHASE ORDER
 * API MODELS
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
 * PURCHASE RECEIPT
 * API MODELS
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