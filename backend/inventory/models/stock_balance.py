from django.db import models

from iam.models import Company
from mdm.models import Product

from .warehouse import Warehouse


class StockBalance(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='stock_balances'
    )

    warehouse = models.ForeignKey(
        Warehouse,
        on_delete=models.CASCADE,
        related_name='stock_balances'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='stock_balances'
    )

    quantity_on_hand = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    average_cost = models.DecimalField(
        max_digits=18,
        decimal_places=6,
        default=0
    )

    last_updated = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'company',
                    'warehouse',
                    'product'
                ],
                name='uq_stock_balance'
            )
        ]

    def __str__(self):

        return (
            f"{self.product.name}"
            f" - "
            f"{self.quantity_on_hand}"
        )