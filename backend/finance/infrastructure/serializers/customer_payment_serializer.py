from rest_framework import serializers

from finance.models import (
    CustomerPayment
)

from .payment_allocation_serializer import (
    PaymentAllocationSerializer
)


class CustomerPaymentSerializer(
    serializers.ModelSerializer
):

    customer_name = serializers.CharField(
        source='customer.name',
        read_only=True
    )

    allocations = (
        PaymentAllocationSerializer(
            many=True,
            read_only=True
        )
    )

    class Meta:

        model = CustomerPayment

        fields = '__all__'