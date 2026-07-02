from django.db import models

from iam.models import Company


class Customer(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='customers'
    )

    code = models.CharField(
        max_length=20
    )

    name = models.CharField(
        max_length=255
    )

    tax_id = models.CharField(
        max_length=50,
        blank=True
    )

    phone = models.CharField(
        max_length=50,
        blank=True
    )

    email = models.EmailField(
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    credit_limit = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
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

        verbose_name = 'Customer'

        verbose_name_plural = 'Customers'

        unique_together = (
            'company',
            'code'
        )

        ordering = [
            'name'
        ]

    def __str__(self):

        return (
            f"{self.code} - {self.name}"
        )