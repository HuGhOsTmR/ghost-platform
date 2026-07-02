from django.db import models

from .product import Product
from .supplier import Supplier


class ProductSupplier(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='suppliers'
    )

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.CASCADE,
        related_name='products'
    )

    supplier_code = models.CharField(
        max_length=100,
        blank=True
    )

    purchase_price = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    is_primary = models.BooleanField(
        default=False
    )

    lead_time_days = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:

        verbose_name = "Product Supplier"

        verbose_name_plural = "Product Suppliers"

        constraints = [
            models.UniqueConstraint(
                fields=[
                    'product',
                    'supplier'
                ],
                name='uq_product_supplier'
            )
        ]

    def __str__(self):

        return (
            f"{self.product.name} - "
            f"{self.supplier.name}"
        )