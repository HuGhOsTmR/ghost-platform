from django.db import models

from iam.models import Company

from django.contrib.auth.models import User

from .bank_account import BankAccount

from .cash_account import CashAccount


class TreasuryTransaction(models.Model):

    TYPE_IN = 'IN'

    TYPE_OUT = 'OUT'

    TYPE_CHOICES = [

        (TYPE_IN, 'In'),

        (TYPE_OUT, 'Out')
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    transaction_date = models.DateField()

    transaction_type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES
    )

    bank_account = models.ForeignKey(
        BankAccount,
        null=True,
        blank=True,
        on_delete=models.PROTECT
    )

    cash_account = models.ForeignKey(
        CashAccount,
        null=True,
        blank=True,
        on_delete=models.PROTECT
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

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )