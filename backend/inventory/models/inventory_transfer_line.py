from django.db import models

from mdm.models import Product


class InventoryTransferLine(models.Model):

    inventory_transfer = models.ForeignKey(
        'InventoryTransfer',
        on_delete=models.CASCADE,
        related_name='lines'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT
    )

    quantity = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    unit_cost = models.DecimalField(
        max_digits=18,
        decimal_places=6
    )

    line_total = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    class Meta:

        verbose_name = (
            "Inventory Transfer Line"
        )

        verbose_name_plural = (
            "Inventory Transfer Lines"
        )

    def __str__(self):

        return (
            f"{self.inventory_transfer.transfer_number}"
            f" - "
            f"{self.product.name}"
        )