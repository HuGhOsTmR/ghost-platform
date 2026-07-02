from rest_framework import (
    viewsets
)

from inventory.models import (
    Warehouse
)

from inventory.infrastructure.serializers import (
    WarehouseSerializer
)


class WarehouseViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        Warehouse.objects
        .all()
        .order_by('name')
    )

    serializer_class = (
        WarehouseSerializer
    )