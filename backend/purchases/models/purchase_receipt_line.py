from django.db import models

from mdm.models import (
    Product,
    UnitOfMeasure
)

from .purchase_receipt import (
    PurchaseReceipt
)

from .purchase_order_line import (
    PurchaseOrderLine
)


class PurchaseReceiptLine(
    models.Model
):

    purchase_receipt = models.ForeignKey(
        PurchaseReceipt,
        on_delete=models.CASCADE,
        related_name='lines'
    )

    purchase_order_line = models.ForeignKey(
        PurchaseOrderLine,
        on_delete=models.PROTECT,
        related_name='receipt_lines'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT
    )

    unit_of_measure = models.ForeignKey(
        UnitOfMeasure,
        on_delete=models.PROTECT
    )

    quantity_received = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    unit_cost = models.DecimalField(
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

    class Meta:

        verbose_name = (
            "Purchase Receipt Line"
        )

        verbose_name_plural = (
            "Purchase Receipt Lines"
        )

    def __str__(self):

        return (
            f"{self.purchase_receipt.receipt_number}"
            f" - "
            f"{self.product.name}"
        )