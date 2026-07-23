/* ============================================================
 * COMMON TYPES
 * Ghost ERP
 * ------------------------------------------------------------
 * Interfaces reutilizables por todos los módulos del sistema.
 * ============================================================ */

/* ============================================================
 * IDENTIFIERS
 * ============================================================ */

export interface EntityBase {

    id: number;

}

export interface NamedEntity extends EntityBase {

    name: string;

}

export interface CodeEntity extends EntityBase {

    code: string;

    name: string;

}

/* ============================================================
 * DOCUMENTS
 * ============================================================ */

export interface DocumentBase extends EntityBase {

    number: string;

}

export interface DatedDocument extends DocumentBase {

    date: string;

}

/* ============================================================
 * AUDIT
 * ============================================================ */

export interface AuditFields {

    created_at: string;

    updated_at: string;

}

export interface UserAuditFields extends AuditFields {

    created_by?: number;

    created_by_name?: string;

    updated_by?: number;

    updated_by_name?: string;

}

/* ============================================================
 * MONEY
 * ============================================================ */

export interface Amounts {

    subtotal: number;

    tax: number;

    total: number;

}

export interface DiscountAmounts extends Amounts {

    discount: number;

}

/* ============================================================
 * DOCUMENT LINES
 * ============================================================ */

export interface DocumentLineBase extends EntityBase {

    product: number;

    product_name: string;

    quantity: number;

    unit_cost: number;

    subtotal: number;

}

/* ============================================================
 * CATALOG REFERENCES
 * ============================================================ */

export interface SupplierReference {

    supplier: number;

    supplier_name: string;

}

export interface CustomerReference {

    customer: number;

    customer_name: string;

}

export interface WarehouseReference {

    warehouse: number;

    warehouse_name: string;

}

export interface CurrencyReference {

    currency: number;

    currency_code: string;

    currency_name: string;

}

/* ============================================================
 * PAGINATION
 * ============================================================ */

export interface PaginatedResponse<T> {

    count: number;

    next: string | null;

    previous: string | null;

    results: T[];

}

/* ============================================================
 * FILTERS
 * ============================================================ */

export interface DateRangeFilter {

    date_from?: string;

    date_to?: string;

}

export interface StatusFilter<T> {

    status?: T;

}