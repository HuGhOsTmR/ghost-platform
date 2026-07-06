from rest_framework.routers import (
    DefaultRouter
)

from mdm.infrastructure.api import (
    CustomerViewSet,
    SupplierViewSet,
    CategoryViewSet,
    BrandViewSet,
    UnitOfMeasureViewSet,
    ProductViewSet
)

router = DefaultRouter()

router.register(
    r'customers',
    CustomerViewSet,
    basename='customer'
)

router.register(
    r'suppliers',
    SupplierViewSet,
    basename='supplier'
)

router.register(
    r'categories',
    CategoryViewSet,
    basename='category'
)

router.register(
    r'brands',
    BrandViewSet,
    basename='brand'
)

router.register(
    r'units',
    UnitOfMeasureViewSet,
    basename='unit'
)

router.register(
    r'products',
    ProductViewSet,
    basename='product'
)

urlpatterns = router.urls