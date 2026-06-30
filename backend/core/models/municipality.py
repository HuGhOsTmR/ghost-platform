from django.db import models

from .state import State


class Municipality(models.Model):

    state = models.ForeignKey(
        State,
        on_delete=models.CASCADE,
        related_name='municipalities'
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
        verbose_name = "Municipality"
        verbose_name_plural = "Municipalities"
        ordering = ['name']

    def __str__(self):
        return self.name