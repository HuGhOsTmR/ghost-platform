from rest_framework import serializers

from treasury.models import (
    CashAccount
)


class CashAccountSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = CashAccount

        fields = '__all__'