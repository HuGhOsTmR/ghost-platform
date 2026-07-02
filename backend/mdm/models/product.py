from django.db import models

from iam.models import Company

from .category import Category
from .brand import Brand
from .unit_of_measure import UnitOfMeasure


class Product(models.Model):

    PRODUCT_TYPE_CHOICES = [
        ('MEDICINE', 'Medicine'),
        ('MEDICAL_SUPPLY', 'Medical Supply'),
        ('COSMETIC', 'Cosmetic'),
        ('EQUIPMENT', 'Equipment'),
        ('SERVICE', 'Service'),
        ('RAW_MATERIAL', 'Raw Material'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='products'
    )

    sku = models.CharField(
        max_length=50
    )

    internal_code = models.CharField(
        max_length=50
    )

    barcode = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    name = models.CharField(
        max_length=255
    )

    description = models.TextField(
        blank=True
    )

    product_type = models.CharField(
        max_length=20,
        choices=PRODUCT_TYPE_CHOICES,
        default='MEDICINE'
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='products'
    )

    brand = models.ForeignKey(
        Brand,
        on_delete=models.PROTECT,
        related_name='products'
    )

    base_unit = models.ForeignKey(
        UnitOfMeasure,
        on_delete=models.PROTECT,
        related_name='base_products'
    )

    purchase_unit = models.ForeignKey(
        UnitOfMeasure,
        on_delete=models.PROTECT,
        related_name='purchase_products'
    )

    sales_unit = models.ForeignKey(
        UnitOfMeasure,
        on_delete=models.PROTECT,
        related_name='sales_products'
    )

    # Costos y precios

    cost_price = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    sale_price = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    # Información farmacéutica

    health_registration = models.CharField(
        max_length=100,
        blank=True
    )

    active_ingredient = models.CharField(
        max_length=255,
        blank=True
    )

    concentration = models.CharField(
        max_length=100,
        blank=True
    )

    presentation = models.CharField(
        max_length=255,
        blank=True
    )

    # Control de inventario

    requires_batch = models.BooleanField(
        default=False
    )

    requires_expiration = models.BooleanField(
        default=False
    )

    requires_serial = models.BooleanField(
        default=False
    )

    minimum_stock = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    maximum_stock = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    reorder_point = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    image = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True
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

        verbose_name = "Product"

        verbose_name_plural = "Products"

        ordering = [
            'name'
        ]

        constraints = [

            models.UniqueConstraint(
                fields=[
                    'company',
                    'sku'
                ],
                name='uq_product_sku'
            ),

            models.UniqueConstraint(
                fields=[
                    'company',
                    'internal_code'
                ],
                name='uq_product_internal_code'
            ),

            models.UniqueConstraint(
                fields=[
                    'company',
                    'barcode'
                ],
                condition=models.Q(
                    barcode__isnull=False
                ),
                name='uq_product_barcode'
            ),
        ]

    def __str__(self):

        return (
            f"{self.sku} - "
            f"{self.name}"
        )