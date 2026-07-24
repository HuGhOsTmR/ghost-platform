export interface PurchaseOrderLine {

    id: number;

    productId: number;

    productCode: string;

    productName: string;

    unitOfMeasureId: number;

    unitOfMeasureName: string;

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

    supplierId: number;

    supplierName: string;

    currencyId: number;

    currencyCode: string;

    documentDate: string;

    subtotal: number;

    taxAmount: number;

    totalAmount: number;

    status: string;

    notes: string;

    lines: PurchaseOrderLine[];
}