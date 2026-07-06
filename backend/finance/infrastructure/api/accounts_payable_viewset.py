from rest_framework import viewsets

from finance.models import (
    AccountsPayable
)

from finance.infrastructure.serializers import (
    AccountsPayableSerializer
)


class AccountsPayableViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        AccountsPayable.objects
        .all()
        .order_by('-id')
    )

    serializer_class = (
        AccountsPayableSerializer
    )