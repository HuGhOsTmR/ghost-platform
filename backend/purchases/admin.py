from django.contrib import admin

from .models import (
    PurchaseOrder,
    PurchaseOrderLine,
    PurchaseReceipt,
    PurchaseReceiptLine
)


admin.site.register(PurchaseOrder)
admin.site.register(PurchaseOrderLine)
admin.site.register(PurchaseReceipt)
admin.site.register(PurchaseReceiptLine)
