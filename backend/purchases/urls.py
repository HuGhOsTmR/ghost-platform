from rest_framework.routers import DefaultRouter

from purchases.infrastructure.api import (
    PurchaseOrderViewSet,
    PurchaseReceiptViewSet
)

router = DefaultRouter()

router.register(
    r'orders',
    PurchaseOrderViewSet,
    basename='purchase-order'
)

router.register(
    r'receipts',
    PurchaseReceiptViewSet,
    basename='purchase-receipt'
)

urlpatterns = router.urls