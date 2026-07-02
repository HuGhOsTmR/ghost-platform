from decimal import Decimal

from inventory.models import (
    StockBalance
)

class StockService:

    @staticmethod
    def increase_stock(
        *,
        company,
        warehouse,
        product,
        quantity,
        unit_cost
    ):

        stock, created = (
            StockBalance.objects.get_or_create(
                company=company,
                warehouse=warehouse,
                product=product,
                defaults={
                    'quantity_on_hand': Decimal('0'),
                    'average_cost': Decimal('0')
                }
            )
        )

        current_qty = (
            stock.quantity_on_hand
        )

        current_cost = (
            stock.average_cost
        )

        new_qty = (
            current_qty + quantity
        )

        if new_qty > 0:

            new_cost = (
                (
                    current_qty * current_cost
                ) +
                (
                    quantity * unit_cost
                )
            ) / new_qty

        else:

            new_cost = unit_cost

        stock.quantity_on_hand = (
            new_qty
        )

        stock.average_cost = (
            new_cost
        )

        stock.save()

        return stock

    @staticmethod
    def decrease_stock(
        *,
        company,
        warehouse,
        product,
        quantity
    ):

        stock = (
            StockBalance.objects
            .filter(
                company=company,
                warehouse=warehouse,
                product=product
            )
            .first()
        )

        if not stock:

            raise ValueError(
                f"No stock exists for "
                f"{product.name}"
            )

        if stock.quantity_on_hand < quantity:

            raise ValueError(
                f"Insufficient stock for "
                f"{product.name}"
            )

        stock.quantity_on_hand -= quantity

        stock.save()

        return stock
