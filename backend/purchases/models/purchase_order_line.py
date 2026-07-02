from django.db import models

from mdm.models import (
    Product,
    UnitOfMeasure
)


class PurchaseOrderLine(models.Model):

    purchase_order = models.ForeignKey(
        'PurchaseOrder',
        on_delete=models.CASCADE,
        related_name='lines'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name='purchase_order_lines'
    )

    unit_of_measure = models.ForeignKey(
        UnitOfMeasure,
        on_delete=models.PROTECT
    )

    quantity = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    received_quantity = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
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

    class Meta:

        verbose_name = "Purchase Order Line"

        verbose_name_plural = (
            "Purchase Order Lines"
        )
        ordering = [
            'purchase_order',
            'id'
        ]

    def __str__(self):

        return (
            f"{self.purchase_order.document_number}"
            f" - "
            f"{self.product.name}"
        )

    @property
    def pending_quantity(self):

        return (
            self.quantity -
            self.received_quantity
        )

    @property
    def is_fully_received(self):

        return (
            self.received_quantity >=
            self.quantity
        )

    @property
    def receipt_percentage(self):

        if self.quantity == 0:

            return 0

        return round(
            (
                self.received_quantity /
                self.quantity
            ) * 100,
            2
        )