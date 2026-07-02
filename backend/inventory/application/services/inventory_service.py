from inventory.models import (
    InventoryTransaction
)

from inventory.application.services.stock_service import (
    StockService
)


class InventoryService:

    @staticmethod
    def receive_stock(
        *,
        company,
        warehouse,
        product,
        quantity,
        unit_cost,
        document_number,
        created_by
    ):

        transaction = (
            InventoryTransaction.objects.create(
                company=company,

                warehouse=warehouse,

                product=product,

                transaction_type=(
                    InventoryTransaction
                    .TRANSACTION_IN
                ),

                document_type=(
                    InventoryTransaction
                    .DOCUMENT_PURCHASE_RECEIPT
                ),

                document_number=(
                    document_number
                ),

                quantity=quantity,

                unit_cost=unit_cost,

                created_by=created_by
            )
        )

        StockService.increase_stock(
            company=company,
            warehouse=warehouse,
            product=product,
            quantity=quantity,
            unit_cost=unit_cost
        )

        return transaction