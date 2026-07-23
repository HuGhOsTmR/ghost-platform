from rest_framework import serializers

from purchases.models import (
    PurchaseOrder
)

from .purchase_order_line_serializer import (
    PurchaseOrderLineSerializer
)
class PurchaseOrderSerializer(
    serializers.ModelSerializer
):

    supplier_name = serializers.CharField(
        source='supplier.name',
        read_only=True
    )

    currency_code = serializers.CharField(
        source='currency.code',
        read_only=True
    )

    warehouse_name = serializers.CharField(
        source="warehouse.name",
        read_only=True
    )

    lines = PurchaseOrderLineSerializer(
        many=True
    )

    class Meta:

        model = PurchaseOrder

        fields = [
            'id',

            'document_number',
            'fiscal_year',

            'supplier',
            'supplier_name',

            'document_date',
            'expected_delivery_date',

            'currency',
            'currency_code',

            'warehouse',
            'warehouse_name',

            'subtotal',
            'tax_amount',
            'total_amount',

            'status',

            'notes',

            'lines'
        ]

        read_only_fields = [
            'document_number',
            'subtotal',
            'tax_amount',
            'total_amount',
            'status'
        ]