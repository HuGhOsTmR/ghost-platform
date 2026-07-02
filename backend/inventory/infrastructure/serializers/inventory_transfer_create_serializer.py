from rest_framework import serializers


class InventoryTransferCreateLineSerializer(
    serializers.Serializer
):

    product = serializers.IntegerField()

    quantity = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )


class InventoryTransferCreateSerializer(
    serializers.Serializer
):

    source_warehouse = (
        serializers.IntegerField()
    )

    destination_warehouse = (
        serializers.IntegerField()
    )

    transfer_date = (
        serializers.DateField()
    )

    notes = serializers.CharField(
        required=False,
        allow_blank=True
    )

    lines = (
        InventoryTransferCreateLineSerializer(
            many=True
        )
    )