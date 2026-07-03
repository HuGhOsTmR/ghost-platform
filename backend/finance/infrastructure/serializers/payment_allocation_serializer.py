from rest_framework import serializers

from finance.models import (
    PaymentAllocation
)


class PaymentAllocationSerializer(
    serializers.ModelSerializer
):

    receivable_number = serializers.CharField(
        source=(
            'accounts_receivable'
            '.document_number'
        ),
        read_only=True
    )

    class Meta:

        model = PaymentAllocation

        fields = '__all__'