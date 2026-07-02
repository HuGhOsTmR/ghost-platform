from rest_framework import serializers


class PurchaseReceiptCreateLineSerializer(
    serializers.Serializer
):

    purchase_order_line = (
        serializers.IntegerField()
    )

    quantity_received = (
        serializers.DecimalField(
            max_digits=18,
            decimal_places=2
        )
    )


class PurchaseReceiptCreateSerializer(
    serializers.Serializer
):

    purchase_order = (
        serializers.IntegerField()
    )

    receipt_date = (
        serializers.DateField()
    )

    lines = (
        PurchaseReceiptCreateLineSerializer(
            many=True
        )
    )