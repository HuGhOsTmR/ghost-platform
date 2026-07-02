from inventory.models import (
    StockBalance
)


class StockQueryService:

    @staticmethod
    def get_stock(
        *,
        company,
        product
    ):

        return (
            StockBalance.objects
            .filter(
                company=company,
                product=product
            )
        )

    @staticmethod
    def get_total_stock(
        *,
        company,
        product
    ):

        balances = (
            StockBalance.objects
            .filter(
                company=company,
                product=product
            )
        )

        return sum(
            balance.quantity_on_hand
            for balance in balances
        )

    @staticmethod
    def get_stock_by_warehouse(
        *,
        company,
        warehouse,
        product
    ):

        return (
            StockBalance.objects
            .filter(
                company=company,
                warehouse=warehouse,
                product=product
            )
            .first()
        )

    @staticmethod
    def has_stock(
        *,
        company,
        warehouse,
        product,
        quantity
    ):

        stock = (
            StockQueryService
            .get_stock_by_warehouse(
                company=company,
                warehouse=warehouse,
                product=product
            )
        )

        if not stock:

            return False

        return (
            stock.quantity_on_hand >=
            quantity
        )