from rest_framework.routers import (
    DefaultRouter
)

from sales.infrastructure.api import (
    SalesOrderViewSet,
    SalesInvoiceViewSet
)

router = DefaultRouter()

router.register(
    r'orders',
    SalesOrderViewSet,
    basename='sales-order'
)

router.register(
    r'invoices',
    SalesInvoiceViewSet,
    basename='sales-invoice'
)

urlpatterns = router.urls