from rest_framework import serializers

from purchases.models import (
    PurchaseReceipt
)

from .purchase_receipt_line_serializer import (
    PurchaseReceiptLineSerializer
)


class PurchaseReceiptSerializer(
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

    lines = (
        PurchaseReceiptLineSerializer(
            many=True
        )
    )

    class Meta:

        model = PurchaseReceipt

        fields = [
            'id',

            'receipt_number',

            'purchase_order',

            'supplier',
            'supplier_name',

            'receipt_date',

            'currency',
            'currency_code',

            'subtotal',
            'tax_amount',
            'total_amount',

            'status',

            'notes',

            'lines'
        ]