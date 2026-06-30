from django.db import models

from .currency import Currency


class ExchangeRate(models.Model):

    from_currency = models.ForeignKey(
        Currency,
        on_delete=models.CASCADE,
        related_name='exchange_rates_from'
    )

    to_currency = models.ForeignKey(
        Currency,
        on_delete=models.CASCADE,
        related_name='exchange_rates_to'
    )

    rate = models.DecimalField(
        max_digits=18,
        decimal_places=6
    )

    effective_date = models.DateField()

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        verbose_name = "Exchange Rate"

        verbose_name_plural = "Exchange Rates"

        ordering = [
            '-effective_date'
        ]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'from_currency',
                    'to_currency',
                    'effective_date'
                ],
                name='uq_exchange_rate_date'
            )
        ]

    def __str__(self):
        return (
            f"{self.from_currency.code} → "
            f"{self.to_currency.code} "
            f"({self.rate})"
        )