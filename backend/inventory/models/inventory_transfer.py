from django.db import models

from django.contrib.auth.models import User

from iam.models import Company

from .warehouse import Warehouse


class InventoryTransfer(models.Model):


    STATUS_DRAFT = 'DRAFT'

    STATUS_APPROVED = 'APPROVED'

    STATUS_POSTED = 'POSTED'

    STATUS_CANCELLED = 'CANCELLED'

    STATUS_CHOICES = [

        (
            STATUS_DRAFT,
            'Draft'
        ),

        (
            STATUS_APPROVED,
            'Approved'
        ),

        (
            STATUS_POSTED,
            'Posted'
        ),

        (
            STATUS_CANCELLED,
            'Cancelled'
        )
    ]

    @property
    def is_editable(self):

        return (
            self.status ==
            self.STATUS_DRAFT
        )

    @property
    def is_approved(self):

        return (
            self.status ==
            self.STATUS_APPROVED
        )

    @property
    def is_posted(self):

        return (
            self.status ==
            self.STATUS_POSTED
        )

    @property
    def is_cancelled(self):

        return (
            self.status ==
            self.STATUS_CANCELLED
        )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='inventory_transfers'
    )

    transfer_number = models.CharField(
        max_length=50,
        unique=True
    )

    transfer_date = models.DateField()

    source_warehouse = models.ForeignKey(
        Warehouse,
        on_delete=models.PROTECT,
        related_name='outgoing_transfers'
    )

    destination_warehouse = models.ForeignKey(
        Warehouse,
        on_delete=models.PROTECT,
        related_name='incoming_transfers'
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
        related_name='inventory_transfers'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        ordering = [
            '-transfer_date',
            '-id'
        ]

    def __str__(self):

        return self.transfer_number