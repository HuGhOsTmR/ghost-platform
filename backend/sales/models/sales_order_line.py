from django.db import models

from mdm.models import (
    Product,
    UnitOfMeasure
)


class SalesOrderLine(models.Model):

    sales_order = models.ForeignKey(
        'SalesOrder',
        on_delete=models.CASCADE,
        related_name='lines'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name='sales_order_lines'
    )

    unit_of_measure = models.ForeignKey(
        UnitOfMeasure,
        on_delete=models.PROTECT
    )

    quantity = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    invoiced_quantity = models.DecimalField(
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

    @property
    def pending_quantity(self):

        return (
            self.quantity -
            self.invoiced_quantity
        )

    @property
    def is_fully_invoiced(self):

        return (
            self.invoiced_quantity >=
            self.quantity
        )

    @property
    def invoice_percentage(self):

        if self.quantity == 0:

            return 0

        return round(
            (
                self.invoiced_quantity /
                self.quantity
            ) * 100,
            2
        )

    class Meta:

        verbose_name = (
            "Sales Order Line"
        )

        verbose_name_plural = (
            "Sales Order Lines"
        )

    def __str__(self):

        return (
            f"{self.sales_order.document_number}"
            f" - "
            f"{self.product.name}"
        )