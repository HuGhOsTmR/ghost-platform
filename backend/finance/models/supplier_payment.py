from django.db import models

from django.contrib.auth.models import User

from iam.models import Company

from mdm.models import Supplier

from core.models import Currency

from treasury.models import BankAccount

class SupplierPayment(models.Model):

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
        on_delete=models.CASCADE
    )

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.PROTECT
    )

    payment_number = models.CharField(
        max_length=50,
        unique=True
    )

    payment_date = models.DateField()

    currency = models.ForeignKey(
        Currency,
        on_delete=models.PROTECT
    )

    bank_account = models.ForeignKey(
        BankAccount,
        on_delete=models.PROTECT,
        null=True,
        blank=True
    )

    amount = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    reference = models.CharField(
        max_length=100,
        blank=True
    )

    notes = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_POSTED
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )