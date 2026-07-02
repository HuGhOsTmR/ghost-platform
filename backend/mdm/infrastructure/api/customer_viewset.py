from rest_framework import viewsets

from mdm.models import Customer

from mdm.infrastructure.serializers import (
    CustomerSerializer
)


class CustomerViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        Customer.objects
        .all()
        .order_by('name')
    )

    serializer_class = (
        CustomerSerializer
    )