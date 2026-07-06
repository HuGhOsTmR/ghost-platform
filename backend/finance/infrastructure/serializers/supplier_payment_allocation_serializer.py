from rest_framework import serializers

from finance.models import (
    SupplierPaymentAllocation
)


class SupplierPaymentAllocationSerializer(
    serializers.ModelSerializer
):

    payable_document = serializers.CharField(
        source='accounts_payable.document_number',
        read_only=True
    )

    class Meta:

        model = SupplierPaymentAllocation

        fields = '__all__'