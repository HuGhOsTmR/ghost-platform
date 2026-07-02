from django.db import models

from mdm.models import (
    Product,
    UnitOfMeasure
)

from .sales_invoice import (
    SalesInvoice
)

from .sales_order_line import (
    SalesOrderLine
)


class SalesInvoiceLine(models.Model):

    sales_invoice = models.ForeignKey(
        SalesInvoice,
        on_delete=models.CASCADE,
        related_name='lines'
    )

    sales_order_line = models.ForeignKey(
        SalesOrderLine,
        on_delete=models.PROTECT,
        related_name='invoice_lines'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT
    )

    unit_of_measure = models.ForeignKey(
        UnitOfMeasure,
        on_delete=models.PROTECT
    )

    quantity = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    unit_price = models.DecimalField(
        max_digits=18,
        decimal_places=6
    )

    tax_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0
    )

    line_total = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    notes = models.TextField(
        blank=True
    )

    def __str__(self):

        return (
            f"{self.sales_invoice.invoice_number}"
            f" - "
            f"{self.product.name}"
        )