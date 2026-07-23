from rest_framework.routers import (
    DefaultRouter
)

from django.urls import (
    path
)

from finance.infrastructure.api import (
    AccountsReceivableViewSet,
    AccountsPayableViewSet,
    CustomerPaymentViewSet,
    SupplierPaymentViewSet,
    FinanceDashboardAPIView,
    CustomerStatementAPIView,
    SupplierStatementAPIView,
    AgingReportAPIView
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

router.register(
    r'accounts-payable',
    AccountsPayableViewSet,
    basename='accounts-payable'
)

router.register(
    r'supplier-payments',
    SupplierPaymentViewSet,
    basename='supplier-payment'
)

urlpatterns = router.urls + [

    path(
        'dashboard/',
        FinanceDashboardAPIView.as_view(),
        name='finance-dashboard'
    ),

    path(
        'aging-report/',
        AgingReportAPIView.as_view(),
        name='aging-report'
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