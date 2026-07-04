from rest_framework import viewsets

from treasury.models import (
    BankAccount
)

from treasury.infrastructure.serializers import (
    BankAccountSerializer
)


class BankAccountViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        BankAccount.objects.all()
    )

    serializer_class = (
        BankAccountSerializer
    )