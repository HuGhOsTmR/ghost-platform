from django.db import models

from django.contrib.auth.models import User

from iam.models import Company

from mdm.models import Supplier

from core.models import Currency

from .purchase_order import PurchaseOrder


class PurchaseReceipt(models.Model):

    STATUS_DRAFT = 'DRAFT'
    STATUS_POSTED = 'POSTED'
    STATUS_CANCELLED = 'CANCELLED'

    STATUS_CHOICES = [
        (STATUS_DRAFT, 'Draft'),
        (STATUS_POSTED, 'Posted'),
        (STATUS_CANCELLED, 'Cancelled'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.PROTECT,
        related_name='purchase_receipts'
    )

    purchase_order = models.ForeignKey(
        PurchaseOrder,
        on_delete=models.PROTECT,
        related_name='receipts'
    )

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.PROTECT,
        related_name='purchase_receipts'
    )

    receipt_number = models.CharField(
        max_length=50
    )

    fiscal_year = models.IntegerField()

    receipt_date = models.DateField()

    currency = models.ForeignKey(
        Currency,
        on_delete=models.PROTECT
    )

    exchange_rate = models.DecimalField(
        max_digits=18,
        decimal_places=6,
        default=1
    )

    subtotal = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    tax_amount = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    total_amount = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_DRAFT
    )

    notes = models.TextField(
        blank=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='purchase_receipts'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        verbose_name = "Purchase Receipt"

        verbose_name_plural = (
            "Purchase Receipts"
        )

        ordering = [
            '-receipt_date',
            '-id'
        ]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'company',
                    'receipt_number'
                ],
                name='uq_receipt_number'
            )
        ]

    def __str__(self):

        return self.receipt_number