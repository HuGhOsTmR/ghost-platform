from django.db import models

from iam.models import Company

from mdm.models import Customer

from sales.models import SalesInvoice


class AccountsReceivable(models.Model):

    STATUS_OPEN = 'OPEN'

    STATUS_PARTIAL = 'PARTIAL'

    STATUS_PAID = 'PAID'

    STATUS_CANCELLED = 'CANCELLED'

    STATUS_CHOICES = [

        (STATUS_OPEN, 'Open'),

        (STATUS_PARTIAL, 'Partial'),

        (STATUS_PAID, 'Paid'),

        (STATUS_CANCELLED, 'Cancelled')
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='accounts_receivable'
    )

    customer = models.ForeignKey(
        Customer,
        on_delete=models.PROTECT,
        related_name='accounts_receivable'
    )

    sales_invoice = models.OneToOneField(
        SalesInvoice,
        on_delete=models.PROTECT,
        related_name='accounts_receivable'
    )

    document_number = models.CharField(
        max_length=50,
        unique=True
    )

    document_date = models.DateField()

    due_date = models.DateField()

    original_amount = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    paid_amount = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    balance_amount = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_OPEN
    )

    notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    @property
    def is_paid(self):

        return (
            self.balance_amount <= 0
        )

    class Meta:

        ordering = [
            '-document_date',
            '-id'
        ]

    def __str__(self):

        return self.document_number