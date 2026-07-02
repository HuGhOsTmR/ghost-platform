from rest_framework import serializers

from inventory.models import (
    InventoryTransfer
)

from .inventory_transfer_line_serializer import (
    InventoryTransferLineSerializer
)


class InventoryTransferSerializer(
    serializers.ModelSerializer
):

    source_warehouse_name = (
        serializers.CharField(
            source='source_warehouse.name',
            read_only=True
        )
    )

    destination_warehouse_name = (
        serializers.CharField(
            source='destination_warehouse.name',
            read_only=True
        )
    )

    lines = (
        InventoryTransferLineSerializer(
            many=True,
            read_only=True
        )
    )

    class Meta:

        model = InventoryTransfer

        fields = [
            'id',

            'transfer_number',

            'transfer_date',

            'source_warehouse',
            'source_warehouse_name',

            'destination_warehouse',
            'destination_warehouse_name',

            'status',

            'notes',

            'lines'
        ]