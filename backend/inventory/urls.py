from rest_framework.routers import (
    DefaultRouter
)

from inventory.infrastructure.api import (
    WarehouseViewSet,
    StockBalanceViewSet,
    InventoryTransferViewSet
)

router = DefaultRouter()

router.register(
    r'warehouses',
    WarehouseViewSet,
    basename='warehouse'
)

router.register(
    r'stock',
    StockBalanceViewSet,
    basename='stock'
)

router.register(
    r'transfers',
    InventoryTransferViewSet,
    basename='inventory-transfer'
)

urlpatterns = router.urls