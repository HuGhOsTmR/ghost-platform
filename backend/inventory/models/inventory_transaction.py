from django.db import models

from django.contrib.auth.models import User

from iam.models import Company

from mdm.models import Product

from .warehouse import Warehouse


class InventoryTransaction(models.Model):

    TRANSACTION_IN = 'IN'

    TRANSACTION_OUT = 'OUT'

    TRANSACTION_TRANSFER = 'TRANSFER'

    TRANSACTION_ADJUSTMENT = 'ADJUSTMENT'

    TRANSACTION_TYPES = [

        (TRANSACTION_IN, 'In'),

        (TRANSACTION_OUT, 'Out'),

        (
            TRANSACTION_TRANSFER,
            'Transfer'
        ),

        (
            TRANSACTION_ADJUSTMENT,
            'Adjustment'
        )
    ]

    DOCUMENT_PURCHASE_RECEIPT = (
        'PURCHASE_RECEIPT'
    )

    DOCUMENT_SALES_INVOICE = (
        'SALES_INVOICE'
    )

    DOCUMENT_TRANSFER = (
        'TRANSFER'
    )

    DOCUMENT_ADJUSTMENT = (
        'ADJUSTMENT'
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='inventory_transactions'
    )

    warehouse = models.ForeignKey(
        Warehouse,
        on_delete=models.PROTECT,
        related_name='inventory_transactions'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name='inventory_transactions'
    )

    transaction_type = models.CharField(
        max_length=20,
        choices=TRANSACTION_TYPES
    )

    document_type = models.CharField(
        max_length=50
    )

    document_number = models.CharField(
        max_length=50
    )

    quantity = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    unit_cost = models.DecimalField(
        max_digits=18,
        decimal_places=6,
        default=0
    )

    reference = models.CharField(
        max_length=255,
        blank=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='inventory_transactions'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        verbose_name = (
            "Inventory Transaction"
        )

        verbose_name_plural = (
            "Inventory Transactions"
        )

        ordering = [
            '-created_at',
            '-id'
        ]

    def __str__(self):

        return (
            f"{self.document_number}"
            f" - "
            f"{self.product.name}"
        )