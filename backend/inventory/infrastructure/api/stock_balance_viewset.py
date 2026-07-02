from rest_framework import (
    viewsets
)

from inventory.models import (
    StockBalance
)

from inventory.infrastructure.serializers import (
    StockBalanceSerializer
)


class StockBalanceViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = (
        StockBalance.objects
        .all()
        .order_by(
            'product__name'
        )
    )

    serializer_class = (
        StockBalanceSerializer
    )