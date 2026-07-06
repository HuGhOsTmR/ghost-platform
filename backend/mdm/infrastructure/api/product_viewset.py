from rest_framework import viewsets

from mdm.models import Product

from mdm.infrastructure.serializers import (
    ProductSerializer
)


class ProductViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        Product.objects
        .all()
        .order_by('name')
    )

    serializer_class = (
        ProductSerializer
    )