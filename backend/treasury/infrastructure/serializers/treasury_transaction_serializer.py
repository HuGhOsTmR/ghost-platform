from rest_framework import serializers

from treasury.models import (
    TreasuryTransaction
)


class TreasuryTransactionSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = TreasuryTransaction

        fields = '__all__'