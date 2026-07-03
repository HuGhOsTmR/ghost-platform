from rest_framework.routers import (
    DefaultRouter
)

from finance.infrastructure.api import (
    AccountsReceivableViewSet,
    CustomerPaymentViewSet
)

router = DefaultRouter()

router.register(
    r'accounts-receivable',
    AccountsReceivableViewSet,
    basename='accounts-receivable'
)

router.register(
    r'customer-payments',
    CustomerPaymentViewSet,
    basename='customer-payment'
)

urlpatterns = router.urls