
from django.urls import path
from rest_framework.routers import (
    DefaultRouter
)

from core.infrastructure.api import CurrencyViewSet


router = DefaultRouter()

router.register(
    r'currencies',
    CurrencyViewSet,
    basename='currency'
)

urlpatterns = router.urls