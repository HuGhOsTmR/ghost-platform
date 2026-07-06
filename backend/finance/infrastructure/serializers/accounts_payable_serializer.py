from rest_framework import serializers

from finance.models import (
    AccountsPayable
)


class AccountsPayableSerializer(
    serializers.ModelSerializer
):

    supplier_name = serializers.CharField(
        source='supplier.name',
        read_only=True
    )

    receipt_number = serializers.CharField(
        source='purchase_receipt.receipt_number',
        read_only=True
    )

    class Meta:

        model = AccountsPayable

        fields = '__all__'