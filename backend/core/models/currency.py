from django.db import models


class Currency(models.Model):

    code = models.CharField(
        max_length=10,
        unique=True
    )

    name = models.CharField(
        max_length=100
    )

    symbol = models.CharField(
        max_length=10
    )

    decimal_places = models.IntegerField(
        default=2
    )

    is_base_currency = models.BooleanField(
        default=False
    )

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
        verbose_name = "Currency"
        verbose_name_plural = "Currencies"
        ordering = ['name']

    def __str__(self):
        return f"{self.code} - {self.name}"