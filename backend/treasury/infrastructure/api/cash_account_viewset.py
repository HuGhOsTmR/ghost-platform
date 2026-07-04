from rest_framework import viewsets

from treasury.models import (
    CashAccount
)

from treasury.infrastructure.serializers import (
    CashAccountSerializer
)


class CashAccountViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        CashAccount.objects.all()
    )

    serializer_class = (
        CashAccountSerializer
    )