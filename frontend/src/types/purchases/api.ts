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

export interface PurchaseOrderApiLine {

    id: number;

    product: number;

    product_code: string;

    product_name: string;

    unit_of_measure: number;

    unit_of_measure_name: string;

    quantity: number;

    received_quantity: number;

    pending_quantity: number;

    unit_price: number;

    tax_percentage: number;

    line_total: number;

    notes: string;
}

export interface PurchaseOrderApi {

    id: number;

    document_number: string;

    supplier: number;

    supplier_name: string;

    currency: number;

    currency_code: string;

    document_date: string;

    subtotal: number;

    tax_amount: number;

    total_amount: number;

    status: string;

    notes: string;

    lines: PurchaseOrderApiLine[];
}