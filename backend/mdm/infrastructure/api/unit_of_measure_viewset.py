from rest_framework import viewsets

from mdm.models import UnitOfMeasure

from mdm.infrastructure.serializers import (
    UnitOfMeasureSerializer
)


class UnitOfMeasureViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        UnitOfMeasure.objects
        .all()
        .order_by('name')
    )

    serializer_class = (
        UnitOfMeasureSerializer
    )