from django.db import models

from iam.models import Company


class Numeration(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='numerations'
    )

    document_type = models.CharField(
        max_length=50
    )

    fiscal_year = models.IntegerField()

    prefix = models.CharField(
        max_length=20
    )

    current_number = models.IntegerField(
        default=0
    )

    padding = models.IntegerField(
        default=6
    )

    separator = models.CharField(
        max_length=5,
        default='-'
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

        verbose_name = "Numeration"

        verbose_name_plural = "Numerations"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'company',
                    'document_type',
                    'fiscal_year'
                ],
                name='uq_company_document_year'
            )
        ]

    def __str__(self):

        return (
            f"{self.company.name} - "
            f"{self.document_type} - "
            f"{self.fiscal_year}"
        )