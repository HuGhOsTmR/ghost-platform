from django.db import models

from iam.models import Company


class Category(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='categories'
    )

    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children'
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

        verbose_name = "Category"

        verbose_name_plural = "Categories"

        ordering = [
            'name'
        ]

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'company',
                    'code'
                ],
                name='uq_category_code'
            )
        ]

    def __str__(self):

        return self.name