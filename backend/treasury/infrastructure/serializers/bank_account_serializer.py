from rest_framework import serializers

from treasury.models import (
    BankAccount
)


class BankAccountSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = BankAccount

        fields = '__all__'