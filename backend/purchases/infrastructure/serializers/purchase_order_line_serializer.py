from rest_framework import serializers

from purchases.models import (
    PurchaseOrderLine
)


class PurchaseOrderLineSerializer(
    serializers.ModelSerializer
):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    class Meta:

        model = PurchaseOrderLine

        fields = [
            'id',
            'product',
            'product_name',
            'unit_of_measure',
            'quantity',
            'received_quantity',
            'unit_price',
            'tax_percentage',
            'line_total',
            'notes'
        ]

        read_only_fields = [
            'received_quantity',
            'line_total'
        ]