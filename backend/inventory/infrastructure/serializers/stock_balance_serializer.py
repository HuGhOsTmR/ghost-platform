from rest_framework import serializers

from inventory.models import (
    StockBalance
)


class StockBalanceSerializer(
    serializers.ModelSerializer
):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    warehouse_name = serializers.CharField(
        source='warehouse.name',
        read_only=True
    )

    class Meta:

        model = StockBalance

        fields = [
            'id',

            'product',
            'product_name',

            'warehouse',
            'warehouse_name',

            'quantity_on_hand',

            'average_cost'
        ]