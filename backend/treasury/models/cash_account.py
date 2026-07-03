from django.db import models

from iam.models import Company

from core.models import Currency


class CashAccount(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    code = models.CharField(
        max_length=20
    )

    name = models.CharField(
        max_length=100
    )

    currency = models.ForeignKey(
        Currency,
        on_delete=models.PROTECT
    )

    current_balance = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    def __str__(self):

        return self.name