from rest_framework import serializers

from sales.models import (
    SalesOrderLine
)


class SalesOrderLineSerializer(
    serializers.ModelSerializer
):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    class Meta:

        model = SalesOrderLine

        fields = [
            'id',
            'product',
            'product_name',
            'unit_of_measure',
            'quantity',
            'invoiced_quantity',
            'unit_price',
            'tax_percentage',
            'line_total',
            'notes'
        ]