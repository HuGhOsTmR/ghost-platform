from rest_framework import viewsets

from finance.models import (
    AccountsReceivable
)

from finance.infrastructure.serializers import (
    AccountsReceivableSerializer
)


class AccountsReceivableViewSet(
    viewsets.ReadOnlyModelViewSet
):

    queryset = (
        AccountsReceivable.objects
        .all()
        .order_by('-id')
    )

    serializer_class = (
        AccountsReceivableSerializer
    )