from django.db import models

from iam.models import Company


class UnitOfMeasure(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='units_of_measure'
    )

    code = models.CharField(
        max_length=20
    )

    name = models.CharField(
        max_length=100
    )

    abbreviation = models.CharField(
        max_length=20
    )

    description = models.TextField(
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

        verbose_name = "Unit Of Measure"

        verbose_name_plural = "Units Of Measure"

        ordering = [
            'name'
        ]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'company',
                    'code'
                ],
                name='uq_uom_code'
            )
        ]

    def __str__(self):

        return (
            f"{self.abbreviation} - "
            f"{self.name}"
        )