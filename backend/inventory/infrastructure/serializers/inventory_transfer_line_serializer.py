from rest_framework import serializers

from inventory.models import (
    InventoryTransferLine
)


class InventoryTransferLineSerializer(
    serializers.ModelSerializer
):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    class Meta:

        model = InventoryTransferLine

        fields = [
            'id',

            'product',
            'product_name',

            'quantity',

            'unit_cost',

            'line_total'
        ]