import type {

    PurchaseOrderApi,
    PurchaseOrderApiLine,

} from "../types/purchases/api";

import type {

    PurchaseOrderDetail,
    PurchaseOrderLine,

} from "../types/purchases";

export function mapPurchaseOrderLineApi(
    line: PurchaseOrderApiLine
): PurchaseOrderLine {

    return {

        id: line.id,

        productId: line.product,

        productCode: line.product_code,

        productName: line.product_name,

        unitOfMeasureId: line.unit_of_measure,

        unitOfMeasureName: line.unit_of_measure_name,

        quantity: line.quantity,

        receivedQuantity: line.received_quantity,

        pendingQuantity: line.pending_quantity,

        unitPrice: line.unit_price,

        taxPercentage: line.tax_percentage,

        lineTotal: line.line_total,

        notes: line.notes,
    };
}

export function mapPurchaseOrderApi(
    api: PurchaseOrderApi
): PurchaseOrderDetail {

    return {

        id: api.id,

        documentNumber: api.document_number,

        supplierId: api.supplier,

        supplierName: api.supplier_name,

        currencyId: api.currency,

        currencyCode: api.currency_code,

        documentDate: api.document_date,

        subtotal: api.subtotal,

        taxAmount: api.tax_amount,

        totalAmount: api.total_amount,

        status: api.status,

        notes: api.notes,

        lines: api.lines.map(
            mapPurchaseOrderLineApi
        ),
    };
}