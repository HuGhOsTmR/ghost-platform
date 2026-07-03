from django.db import models

from .customer_payment import (
    CustomerPayment
)

from .accounts_receivable import (
    AccountsReceivable
)


class PaymentAllocation(models.Model):

    payment = models.ForeignKey(
        CustomerPayment,
        on_delete=models.CASCADE,
        related_name='allocations'
    )

    accounts_receivable = models.ForeignKey(
        AccountsReceivable,
        on_delete=models.PROTECT,
        related_name='allocations'
    )

    amount = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    class Meta:

        verbose_name = (
            'Payment Allocation'
        )

        verbose_name_plural = (
            'Payment Allocations'
        )