/* ============================================================
 * PURCHASE RECEIPT
 * REQUEST PAYLOADS
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