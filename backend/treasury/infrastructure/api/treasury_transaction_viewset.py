from rest_framework import viewsets

from treasury.models import (
    TreasuryTransaction
)

from treasury.infrastructure.serializers import (
    TreasuryTransactionSerializer
)


class TreasuryTransactionViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        TreasuryTransaction.objects.all()
    )

    serializer_class = (
        TreasuryTransactionSerializer
    )