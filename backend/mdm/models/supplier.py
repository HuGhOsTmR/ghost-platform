from django.db import models

from iam.models import Company

from core.models import (
    Country,
    State,
    Municipality
)


class Supplier(models.Model):

    SUPPLIER_TYPE_CHOICES = [
        ('LABORATORY', 'Laboratory'),
        ('IMPORTER', 'Importer'),
        ('DISTRIBUTOR', 'Distributor'),
        ('MANUFACTURER', 'Manufacturer'),
        ('SERVICE', 'Service'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='suppliers'
    )

    code = models.CharField(
        max_length=30
    )

    name = models.CharField(
        max_length=255
    )

    trade_name = models.CharField(
        max_length=255,
        blank=True
    )

    supplier_type = models.CharField(
        max_length=20,
        choices=SUPPLIER_TYPE_CHOICES,
        default='DISTRIBUTOR'
    )

    tax_id = models.CharField(
        max_length=50,
        blank=True
    )

    email = models.EmailField(
        blank=True
    )

    phone = models.CharField(
        max_length=50,
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    country = models.ForeignKey(
        Country,
        on_delete=models.PROTECT,
        null=True,
        blank=True
    )

    state = models.ForeignKey(
        State,
        on_delete=models.PROTECT,
        null=True,
        blank=True
    )

    municipality = models.ForeignKey(
        Municipality,
        on_delete=models.PROTECT,
        null=True,
        blank=True
    )

    contact_name = models.CharField(
        max_length=255,
        blank=True
    )

    contact_phone = models.CharField(
        max_length=50,
        blank=True
    )

    contact_email = models.EmailField(
        blank=True
    )

    credit_days = models.PositiveIntegerField(
        default=0
    )

    notes = models.TextField(
        blank=True
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

        verbose_name = "Supplier"

        verbose_name_plural = "Suppliers"

        ordering = [
            'name'
        ]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'company',
                    'code'
                ],
                name='uq_supplier_code'
            )
        ]

    def __str__(self):

        return f"{self.code} - {self.name}"