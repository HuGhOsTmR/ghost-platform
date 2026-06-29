from django.db import models

from .company import Company


class Branch(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='branches'
    )

    code = models.CharField(
        max_length=20
    )

    name = models.CharField(
        max_length=255
    )

    address = models.TextField(
        blank=True
    )

    phone = models.CharField(
        max_length=50,
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