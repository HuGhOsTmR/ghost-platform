from django.urls import (
    path,
    include
)
path(
    'api/purchases/',
    include('purchases.urls')
),