from django.db import transaction

from inventory.models import (
    InventoryTransfer
)


class InventoryTransferApprovalService:

    @staticmethod
    @transaction.atomic
    def approve_transfer(
        transfer
    ):

        if (
            transfer.status !=
            InventoryTransfer.STATUS_DRAFT
        ):

            raise ValueError(
                "Only draft transfers can be approved."
            )

        transfer.status = (
            InventoryTransfer
            .STATUS_APPROVED
        )

        transfer.save(
            update_fields=[
                'status',
                'updated_at'
            ]
        )

        return transfer