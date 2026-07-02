from django.contrib import admin

from inventory.models import (
    Warehouse,
    InventoryTransaction,
    StockBalance
)

admin.site.register(Warehouse)

admin.site.register(InventoryTransaction)

admin.site.register(StockBalance)