from django.db import models

from django.contrib.auth.models import User

from iam.models import Company

from mdm.models import Customer

from core.models import Currency

from .sales_order import SalesOrder


class SalesInvoice(models.Model):

    STATUS_DRAFT = 'DRAFT'

    STATUS_POSTED = 'POSTED'

    STATUS_CANCELLED = 'CANCELLED'

    STATUS_CHOICES = [

        (STATUS_DRAFT, 'Draft'),

        (STATUS_POSTED, 'Posted'),

        (STATUS_CANCELLED, 'Cancelled')
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='sales_invoices'
    )

    sales_order = models.ForeignKey(
        SalesOrder,
        on_delete=models.PROTECT,
        related_name='invoices'
    )

    customer = models.ForeignKey(
        Customer,
        on_delete=models.PROTECT,
        related_name='sales_invoices'
    )

    invoice_number = models.CharField(
        max_length=50,
        unique=True
    )

    fiscal_year = models.IntegerField()

    invoice_date = models.DateField()

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
        related_name='sales_invoices'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        ordering = [
            '-invoice_date',
            '-id'
        ]

    def __str__(self):

        return self.invoice_number