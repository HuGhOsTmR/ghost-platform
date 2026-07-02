from rest_framework import serializers

from sales.models import (
    SalesOrder
)

from .sales_order_line_serializer import (
    SalesOrderLineSerializer
)


class SalesOrderSerializer(
    serializers.ModelSerializer
):

    customer_name = serializers.CharField(
        source='customer.name',
        read_only=True
    )

    currency_code = serializers.CharField(
        source='currency.code',
        read_only=True
    )

    lines = SalesOrderLineSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = SalesOrder

        fields = '__all__'