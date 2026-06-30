from django.db import models


class Country(models.Model):

    code = models.CharField(
        max_length=10,
        unique=True
    )

    name = models.CharField(
        max_length=100
    )

    iso_code = models.CharField(
        max_length=10,
        unique=True
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
        verbose_name = "Country"
        verbose_name_plural = "Countries"
        ordering = ['name']

    def __str__(self):
        return self.name