from django.db import models

from .supplier_payment import (
    SupplierPayment
)

from .accounts_payable import (
    AccountsPayable
)


class SupplierPaymentAllocation(
    models.Model
):

    payment = models.ForeignKey(
        SupplierPayment,
        on_delete=models.CASCADE,
        related_name='allocations'
    )

    accounts_payable = models.ForeignKey(
        AccountsPayable,
        on_delete=models.PROTECT,
        related_name='allocations'
    )

    amount = models.DecimalField(
        max_digits=18,
        decimal_places=2
    )