from rest_framework import serializers

from sales.models import (
    SalesInvoice
)

from .sales_invoice_line_serializer import (
    SalesInvoiceLineSerializer
)


class SalesInvoiceSerializer(
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

    lines = (
        SalesInvoiceLineSerializer(
            many=True,
            read_only=True
        )
    )

    class Meta:

        model = SalesInvoice

        fields = '__all__'