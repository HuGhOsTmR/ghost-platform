from django.db import models


class Company(models.Model):

    name = models.CharField(
        max_length=255
    )

    trade_name = models.CharField(
        max_length=255,
        blank=True
    )

    tax_id = models.CharField(
        max_length=50,
        unique=True
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

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name