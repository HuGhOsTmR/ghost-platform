from decimal import Decimal

from django.db import transaction

from sales.models import (
    SalesOrder,
    SalesOrderLine,
    SalesInvoice,
    SalesInvoiceLine
)

from inventory.models import (
    Warehouse
)

from inventory.application.services import (
    StockService
)

from inventory.models import (
    InventoryTransaction
)

from core.application.services.numeration_service import (
    NumerationService
)

from finance.application.services import (
    AccountsReceivableService
)

class SalesInvoiceService:

    @staticmethod
    @transaction.atomic
    def create_invoice(
        *,
        sales_order,
        invoice_date,
        created_by,
        lines
    ):

        if not lines:

            raise ValueError(
                "Sales Invoice requires at least one line."
            )

        invoice_number = (
            NumerationService.get_next_number(
                company=sales_order.company,
                document_type='SALES_INVOICE',
                fiscal_year=sales_order.fiscal_year
            )
        )

        invoice = (
            SalesInvoice.objects.create(
                company=sales_order.company,

                sales_order=sales_order,

                customer=sales_order.customer,

                invoice_number=invoice_number,

                fiscal_year=sales_order.fiscal_year,

                invoice_date=invoice_date,

                currency=sales_order.currency,

                exchange_rate=sales_order.exchange_rate,

                created_by=created_by
            )
        )

        subtotal = Decimal('0')

        tax_amount = Decimal('0')

        warehouse = (
            Warehouse.objects.filter(
                company=sales_order.company
            ).first()
        )

        if not warehouse:

            raise ValueError(
                "No warehouse configured."
            )

        for item in lines:

            order_line = (
                SalesOrderLine.objects.get(
                    pk=item[
                        'sales_order_line'
                    ]
                )
            )

            quantity = Decimal(
                str(
                    item['quantity']
                )
            )

            if quantity <= 0:

                raise ValueError(
                    "Quantity must be greater than zero."
                )

            pending_quantity = (
                order_line.pending_quantity
            )

            if quantity > pending_quantity:

                raise ValueError(
                    f"Quantity exceeds pending quantity "
                    f"for product "
                    f"{order_line.product.name}"
                )

            line_total = (
                quantity *
                order_line.unit_price
            )

            SalesInvoiceLine.objects.create(
                sales_invoice=invoice,

                sales_order_line=order_line,

                product=order_line.product,

                unit_of_measure=order_line.unit_of_measure,

                quantity=quantity,

                unit_price=order_line.unit_price,

                tax_percentage=order_line.tax_percentage,

                line_total=line_total
            )

            StockService.decrease_stock(
                company=sales_order.company,

                warehouse=warehouse,

                product=order_line.product,

                quantity=quantity
            )

            InventoryTransaction.objects.create(
                company=sales_order.company,

                warehouse=warehouse,

                product=order_line.product,

                transaction_type=(
                    InventoryTransaction
                    .TRANSACTION_OUT
                ),

                document_type='SALES_INVOICE',

                document_number=invoice_number,

                quantity=quantity,

                unit_cost=(
                    order_line.unit_price
                ),

                created_by=created_by
            )

            order_line.invoiced_quantity += (
                quantity
            )

            order_line.save()

            subtotal += line_total

            tax_amount += (
                line_total *
                order_line.tax_percentage /
                Decimal('100')
            )

        invoice.subtotal = subtotal

        invoice.tax_amount = tax_amount

        invoice.total_amount = (
            subtotal +
            tax_amount
        )

        invoice.status = (
            SalesInvoice.STATUS_POSTED
        )

        invoice.save()

        AccountsReceivableService.create_receivable(
            sales_invoice=invoice
        )

        fully_invoiced = True

        for line in (
            sales_order.lines.all()
        ):

            if not line.is_fully_invoiced:

                fully_invoiced = False

                break

        if fully_invoiced:

            sales_order.status = (
                SalesOrder.STATUS_INVOICED
            )

            sales_order.save()

        return invoice