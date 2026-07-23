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

    pending_quantity = (
        serializers.SerializerMethodField()
    )

    def get_pending_quantity(
        self,
        obj
    ):

        return (

            obj.quantity

            -

            obj.invoiced_quantity

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

            'pending_quantity',

            'unit_price',

            'tax_percentage',

            'line_total',

            'notes'

        ]