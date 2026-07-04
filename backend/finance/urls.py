from rest_framework.routers import (
    DefaultRouter
)

from django.urls import (
    path
)

from finance.infrastructure.api import (
    AccountsReceivableViewSet,
    CustomerPaymentViewSet,
    FinanceDashboardAPIView,
    CustomerStatementAPIView,
    SupplierStatementAPIView
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

urlpatterns = router.urls + [

    path(
        'dashboard/',
        FinanceDashboardAPIView.as_view(),
        name='finance-dashboard'
    ),

    path(
        'customers/<int:customer_id>/statement/',
        CustomerStatementAPIView.as_view(),
        name='customer-statement'
    ),

    path(
        'suppliers/<int:supplier_id>/statement/',
        SupplierStatementAPIView.as_view(),
        name='supplier-statement'
    )
]