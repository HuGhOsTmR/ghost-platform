from rest_framework import serializers

from purchases.models import (
    PurchaseOrderLine
)


class PurchaseOrderLineSerializer(
    serializers.ModelSerializer
):

    product_code = serializers.CharField(
        source="product.code",
        read_only=True
    )

    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    unit_of_measure_name = serializers.CharField(
        source="unit_of_measure.name",
        read_only=True
    )

    pending_quantity = serializers.SerializerMethodField()

    def get_pending_quantity(self, obj):
        return obj.quantity - obj.received_quantity

    class Meta:

        model = PurchaseOrderLine

        fields = [
            "id",

            "product",

            "product_code",
            "product_name",

            "unit_of_measure",
            "unit_of_measure_name",

            "quantity",
            "received_quantity",
            "pending_quantity",

            "unit_price",

            "tax_percentage",

            "line_total",

            "notes",
        ]

        read_only_fields = [
            'received_quantity',
            'line_total'
        ]