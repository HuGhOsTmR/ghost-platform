from rest_framework import serializers

from finance.models import (
    SupplierPayment
)

from .supplier_payment_allocation_serializer import (
    SupplierPaymentAllocationSerializer
)


class SupplierPaymentSerializer(
    serializers.ModelSerializer
):

    supplier_name = serializers.CharField(
        source='supplier.name',
        read_only=True
    )

    allocations = (
        SupplierPaymentAllocationSerializer(
            many=True,
            read_only=True
        )
    )

    class Meta:

        model = SupplierPayment

        fields = '__all__'