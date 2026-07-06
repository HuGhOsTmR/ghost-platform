from rest_framework import viewsets

from mdm.models import Category

from mdm.infrastructure.serializers import (
    CategorySerializer
)


class CategoryViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        Category.objects
        .all()
        .order_by('name')
    )

    serializer_class = (
        CategorySerializer
    )