from django.urls import path
from rest_framework.routers import (
    DefaultRouter
)

from treasury.infrastructure.api import (
    BankAccountViewSet,
    CashAccountViewSet,
    TreasuryTransactionViewSet,
    TreasuryDashboardAPIView
)

router = DefaultRouter()

router.register(
    r'bank-accounts',
    BankAccountViewSet,
    basename='bank-account'
)

router.register(
    r'cash-accounts',
    CashAccountViewSet,
    basename='cash-account'
)

router.register(
    r'transactions',
    TreasuryTransactionViewSet,
    basename='treasury-transaction'
)

urlpatterns = router.urls + [

    path(
        'dashboard/',
        TreasuryDashboardAPIView.as_view(),
        name='treasury-dashboard'
    )
]