from django.contrib import admin

from .models import (
    Supplier,
    Category,
    Brand,
    UnitOfMeasure,
    Product,
    ProductSupplier,
    Customer
)


admin.site.register(Customer)
admin.site.register(Supplier)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(UnitOfMeasure)
admin.site.register(Product)
admin.site.register(ProductSupplier)
