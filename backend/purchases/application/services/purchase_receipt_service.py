from decimal import Decimal

from django.db import transaction

from purchases.models import (
    PurchaseOrder,
    PurchaseReceipt,
    PurchaseReceiptLine,
    PurchaseOrderLine
)

from finance.application.services import (
    AccountsPayableService
)

from core.application.services.numeration_service import (
    NumerationService
)

from inventory.application.services import (
    InventoryService
)

from inventory.models import (
    Warehouse
)


class PurchaseReceiptService:

    @staticmethod
    @transaction.atomic
    def create_receipt(
        *,
        purchase_order,
        receipt_date,
        created_by,
        lines
    ):

        if not lines:

            raise ValueError(
                "Purchase Receipt requires at least one line."
            )

        receipt_number = (
            NumerationService.get_next_number(
                company=purchase_order.company,
                document_type='PURCHASE_RECEIPT',
                fiscal_year=purchase_order.fiscal_year
            )
        )

        receipt = (
            PurchaseReceipt.objects.create(
                company=purchase_order.company,
                purchase_order=purchase_order,
                supplier=purchase_order.supplier,
                receipt_number=receipt_number,
                fiscal_year=purchase_order.fiscal_year,
                receipt_date=receipt_date,
                currency=purchase_order.currency,
                exchange_rate=purchase_order.exchange_rate,
                created_by=created_by
            )
        )

        subtotal = Decimal('0')

        tax_amount = Decimal('0')

        for item in lines:

            po_line = (
                PurchaseOrderLine.objects.get(
                    pk=item[
                        'purchase_order_line'
                    ]
                )
            )

            quantity_received = Decimal(
                str(
                    item[
                        'quantity_received'
                    ]
                )
            )

            if quantity_received <= 0:

                raise ValueError(
                    "Received quantity must be greater than zero."
                )

            pending_quantity = (
                po_line.pending_quantity
            )

            if (
                quantity_received >
                pending_quantity
            ):

                raise ValueError(
                    f"Quantity exceeds pending quantity "
                    f"for product "
                    f"{po_line.product.name}"
                )

            line_total = (
                quantity_received *
                po_line.unit_price
            )

            PurchaseReceiptLine.objects.create(
                purchase_receipt=receipt,
                purchase_order_line=po_line,
                product=po_line.product,
                unit_of_measure=po_line.unit_of_measure,
                quantity_received=quantity_received,
                unit_cost=po_line.unit_price,
                tax_percentage=po_line.tax_percentage,
                line_total=line_total
            )

            warehouse = (
                Warehouse.objects.filter(
                    company=purchase_order.company
                ).first()
            )

            if warehouse:

                InventoryService.receive_stock(
                    company=purchase_order.company,

                    warehouse=warehouse,

                    product=po_line.product,

                    quantity=quantity_received,

                    unit_cost=po_line.unit_price,

                    document_number=(
                        receipt.receipt_number
                    ),

                    created_by=created_by
                )
            
            po_line.received_quantity += (
                quantity_received
            )

            po_line.save()

            subtotal += line_total

            tax_amount += (
                line_total *
                po_line.tax_percentage /
                Decimal('100')
            )

        receipt.subtotal = subtotal

        receipt.tax_amount = tax_amount

        receipt.total_amount = (
            subtotal +
            tax_amount
        )

        receipt.status = (
            PurchaseReceipt.STATUS_POSTED
        )

        receipt.save()

        if not hasattr(
            receipt,
            'accountspayable'
        ):

            AccountsPayableService.create_payable(
                purchase_receipt=receipt
            )

        all_received = True

        for line in (
            purchase_order.lines.all()
        ):

            if not line.is_fully_received:

                all_received = False

                break

        if all_received:

            purchase_order.status = (
                PurchaseOrder.STATUS_RECEIVED
                if hasattr(
                    PurchaseOrder,
                    'STATUS_RECEIVED'
                )
                else 'RECEIVED'
            )

        else:

            purchase_order.status = (
                PurchaseOrder.STATUS_PARTIAL
                if hasattr(
                    PurchaseOrder,
                    'STATUS_PARTIAL'
                )
                else 'PARTIAL'
            )

        purchase_order.save()

        return receipt