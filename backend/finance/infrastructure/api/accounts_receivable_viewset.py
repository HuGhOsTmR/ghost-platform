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

    serializer_class = (
        AccountsReceivableSerializer
    )

    def get_queryset(
        self
    ):

        queryset = (
            AccountsReceivable.objects
            .all()
            .order_by('-id')
        )

        customer = (
            self.request.query_params.get(
                'customer'
            )
        )

        status = (
            self.request.query_params.get(
                'status'
            )
        )

        if customer:

            queryset = (
                queryset.filter(
                    customer_id=customer
                )
            )

        if status:

            queryset = (
                queryset.filter(
                    status=status
                )
            )

        return queryset