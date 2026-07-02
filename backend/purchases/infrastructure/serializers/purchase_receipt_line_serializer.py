from rest_framework import serializers

from purchases.models import (
    PurchaseReceiptLine
)


class PurchaseReceiptLineSerializer(
    serializers.ModelSerializer
):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    class Meta:

        model = PurchaseReceiptLine

        fields = [
            'id',

            'purchase_order_line',

            'product',
            'product_name',

            'unit_of_measure',

            'quantity_received',

            'unit_cost',

            'tax_percentage',

            'line_total',

            'notes'
        ]