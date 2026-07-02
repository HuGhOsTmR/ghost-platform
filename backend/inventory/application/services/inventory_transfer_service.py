from decimal import Decimal

from django.db import transaction

from inventory.models import (
    InventoryTransfer,
    InventoryTransferLine
)

from inventory.application.services import (
    StockQueryService
)

from core.application.services.numeration_service import (
    NumerationService
)


class InventoryTransferService:

    @staticmethod
    @transaction.atomic
    def create_transfer(
        *,
        company,
        source_warehouse,
        destination_warehouse,
        transfer_date,
        created_by,
        lines,
        notes=''
    ):

        if not lines:

            raise ValueError(
                "Transfer requires at least one line."
            )

        if (
            source_warehouse ==
            destination_warehouse
        ):

            raise ValueError(
                "Source and destination warehouse cannot be the same."
            )

        transfer_number = (
            NumerationService.get_next_number(
                company=company,
                document_type='INVENTORY_TRANSFER',
                fiscal_year=transfer_date.year
            )
        )

        transfer = (
            InventoryTransfer.objects.create(
                company=company,

                transfer_number=transfer_number,

                transfer_date=transfer_date,

                source_warehouse=source_warehouse,

                destination_warehouse=destination_warehouse,

                notes=notes,

                created_by=created_by,

                status=(
                    InventoryTransfer
                    .STATUS_DRAFT
                )
            )
        )

        for item in lines:

            product = item['product']

            quantity = Decimal(
                str(
                    item['quantity']
                )
            )

            if quantity <= 0:

                raise ValueError(
                    "Quantity must be greater than zero."
                )

            # Validamos disponibilidad
            if not (
                StockQueryService
                .has_stock(
                    company=company,

                    warehouse=source_warehouse,

                    product=product,

                    quantity=quantity
                )
            ):

                raise ValueError(
                    f"Insufficient stock for "
                    f"{product.name}"
                )

            stock = (
                StockQueryService
                .get_stock_by_warehouse(
                    company=company,

                    warehouse=source_warehouse,

                    product=product
                )
            )

            unit_cost = (
                stock.average_cost
            )

            line_total = (
                quantity *
                unit_cost
            )

            InventoryTransferLine.objects.create(
                inventory_transfer=transfer,

                product=product,

                quantity=quantity,

                unit_cost=unit_cost,

                line_total=line_total
            )

        return transfer