from django.db import models

from .country import Country


class State(models.Model):

    country = models.ForeignKey(
        Country,
        on_delete=models.CASCADE,
        related_name='states'
    )

    code = models.CharField(
        max_length=20
    )

    name = models.CharField(
        max_length=100
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
        verbose_name = "State"
        verbose_name_plural = "States"
        ordering = ['name']

    def __str__(self):
        return self.name