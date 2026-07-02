from django.db import models

from django.contrib.auth.models import User

from iam.models import Company

from mdm.models import Customer

from core.models import Currency


class SalesOrder(models.Model):

    STATUS_DRAFT = 'DRAFT'

    STATUS_APPROVED = 'APPROVED'

    STATUS_INVOICED = 'INVOICED'

    STATUS_CANCELLED = 'CANCELLED'

    STATUS_CHOICES = [
        (STATUS_DRAFT, 'Draft'),
        (STATUS_APPROVED, 'Approved'),
        (STATUS_INVOICED, 'Invoiced'),
        (STATUS_CANCELLED, 'Cancelled'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='sales_orders'
    )

    customer = models.ForeignKey(
        Customer,
        on_delete=models.PROTECT,
        related_name='sales_orders'
    )

    document_number = models.CharField(
        max_length=50,
        unique=True
    )

    fiscal_year = models.IntegerField()

    document_date = models.DateField()

    currency = models.ForeignKey(
        Currency,
        on_delete=models.PROTECT
    )

    exchange_rate = models.DecimalField(
        max_digits=18,
        decimal_places=6,
        default=1
    )

    subtotal = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    tax_amount = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    total_amount = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_DRAFT
    )

    notes = models.TextField(
        blank=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='sales_orders'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    @property
    def is_closed(self):

        return (
            self.status in [
                self.STATUS_INVOICED,
                self.STATUS_CANCELLED
            ]
        )

    @property
    def total_lines(self):

        return self.lines.count()

    @property
    def total_invoiced_lines(self):

        return sum(
            1
            for line in self.lines.all()
            if line.is_fully_invoiced
        )

    class Meta:

        verbose_name = "Sales Order"

        verbose_name_plural = (
            "Sales Orders"
        )

        ordering = [
            '-document_date',
            '-id'
        ]

    def __str__(self):

        return self.document_number