from rest_framework import viewsets

from mdm.models import Supplier

from mdm.infrastructure.serializers import (
    SupplierSerializer
)


class SupplierViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        Supplier.objects
        .all()
        .order_by('name')
    )

    serializer_class = (
        SupplierSerializer
    )