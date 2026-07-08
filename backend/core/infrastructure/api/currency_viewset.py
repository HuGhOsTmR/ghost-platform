from rest_framework import viewsets

from core.models import Currency

from core.infrastructure.serializers import (
    CurrencySerializer
)

class CurrencyViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        Currency.objects
        .filter(
            is_active=True
        )
        .order_by('code')
    )

    serializer_class = (
        CurrencySerializer
    )