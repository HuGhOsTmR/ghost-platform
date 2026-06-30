from django.db import models

from iam.models import Company


class Parameter(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='parameters',
        null=False,
        blank=False
    )

    category = models.CharField(
        max_length=50
    )

    key = models.CharField(
        max_length=100
    )

    value = models.TextField()

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

        verbose_name = "Parameter"

        verbose_name_plural = "Parameters"

        ordering = [
            'category',
            'key'
        ]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'company',
                    'key'
                ],
                name='uq_company_parameter'
            )
        ]

    def __str__(self):

        company_name = (
            self.company.name
            if self.company
            else "GLOBAL"
        )

        return f"{company_name} - {self.key}"