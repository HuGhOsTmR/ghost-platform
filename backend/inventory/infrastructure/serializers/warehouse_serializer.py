from rest_framework import serializers

from inventory.models import (
    Warehouse
)


class WarehouseSerializer(
    serializers.ModelSerializer
):

    company_name = serializers.CharField(
        source='company.name',
        read_only=True
    )

    class Meta:

        model = Warehouse

        fields = [
            'id',

            'company',
            'company_name',

            'code',

            'name',

            'description',

            'is_active'
        ]