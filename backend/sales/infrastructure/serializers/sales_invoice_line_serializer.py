from rest_framework import serializers

from sales.models import (
    SalesInvoiceLine
)


class SalesInvoiceLineSerializer(
    serializers.ModelSerializer
):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    class Meta:

        model = SalesInvoiceLine

        fields = [
            'id',
            'sales_order_line',
            'product',
            'product_name',
            'unit_of_measure',
            'quantity',
            'unit_price',
            'tax_percentage',
            'line_total',
            'notes'
        ]