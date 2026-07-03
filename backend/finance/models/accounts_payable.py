from django.db import models

from iam.models import Company

from mdm.models import Supplier

from purchases.models import PurchaseReceipt


class AccountsPayable(models.Model):

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
        on_delete=models.CASCADE
    )

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.PROTECT
    )

    purchase_receipt = models.OneToOneField(
        PurchaseReceipt,
        on_delete=models.PROTECT
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

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):

        return self.document_number