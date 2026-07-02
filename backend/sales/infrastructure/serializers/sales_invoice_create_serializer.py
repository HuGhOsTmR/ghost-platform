from rest_framework import serializers


class SalesInvoiceCreateSerializer(
    serializers.Serializer
):

    sales_order = serializers.IntegerField()

    invoice_date = serializers.DateField()

    lines = serializers.ListField()