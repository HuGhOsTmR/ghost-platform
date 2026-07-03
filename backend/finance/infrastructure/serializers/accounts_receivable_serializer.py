from rest_framework import serializers

from finance.models import (
    AccountsReceivable
)


class AccountsReceivableSerializer(
    serializers.ModelSerializer
):

    customer_name = serializers.CharField(
        source='customer.name',
        read_only=True
    )

    invoice_number = serializers.CharField(
        source='sales_invoice.invoice_number',
        read_only=True
    )

    class Meta:

        model = AccountsReceivable

        fields = '__all__'