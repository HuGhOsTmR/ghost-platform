from django.db import transaction

from inventory.models import (
    InventoryTransfer,
    InventoryTransaction
)

from inventory.application.services import (
    StockService,
    StockQueryService
)


class InventoryTransferPostingService:

    @staticmethod
    @transaction.atomic
    def post_transfer(
        transfer,
        posted_by
    ):

        if (
            transfer.status ==
            InventoryTransfer.STATUS_POSTED
        ):

            raise ValueError(
                "Transfer already posted."
            )

        if (
            transfer.status !=
            InventoryTransfer.STATUS_APPROVED
        ):

            raise ValueError(
                "Transfer must be approved first."
            )

        for line in transfer.lines.all():

            if not (
                StockQueryService
                .has_stock(
                    company=transfer.company,

                    warehouse=(
                        transfer
                        .source_warehouse
                    ),

                    product=line.product,

                    quantity=line.quantity
                )
            ):

                raise ValueError(
                    f"Insufficient stock for "
                    f"{line.product.name}"
                )

            StockService.decrease_stock(
                company=transfer.company,

                warehouse=(
                    transfer
                    .source_warehouse
                ),

                product=line.product,

                quantity=line.quantity
            )

            StockService.increase_stock(
                company=transfer.company,

                warehouse=(
                    transfer
                    .destination_warehouse
                ),

                product=line.product,

                quantity=line.quantity,

                unit_cost=line.unit_cost
            )

            InventoryTransaction.objects.create(
                company=transfer.company,

                warehouse=(
                    transfer
                    .source_warehouse
                ),

                product=line.product,

                transaction_type=(
                    InventoryTransaction
                    .TRANSACTION_OUT
                ),

                document_type='TRANSFER',

                document_number=(
                    transfer.transfer_number
                ),

                quantity=line.quantity,

                unit_cost=line.unit_cost,

                created_by=posted_by
            )

            InventoryTransaction.objects.create(
                company=transfer.company,

                warehouse=(
                    transfer
                    .destination_warehouse
                ),

                product=line.product,

                transaction_type=(
                    InventoryTransaction
                    .TRANSACTION_IN
                ),

                document_type='TRANSFER',

                document_number=(
                    transfer.transfer_number
                ),

                quantity=line.quantity,

                unit_cost=line.unit_cost,

                created_by=posted_by
            )

        transfer.status = (
            InventoryTransfer
            .STATUS_POSTED
        )

        transfer.save(
            update_fields=[
                'status',
                'updated_at'
            ]
        )

        return transfer