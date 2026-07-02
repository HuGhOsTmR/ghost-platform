from django.db import models

from iam.models import Company


class Brand(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='brands'
    )

    code = models.CharField(
        max_length=30
    )

    name = models.CharField(
        max_length=255
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

        verbose_name = "Brand"

        verbose_name_plural = "Brands"

        ordering = [
            'name'
        ]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'company',
                    'code'
                ],
                name='uq_brand_code'
            )
        ]

    def __str__(self):

        return self.name