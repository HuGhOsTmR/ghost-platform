from django.contrib import admin

from .models import (
    Country,
    State,
    Municipality,
    Currency,
    ExchangeRate,
    Parameter,
    Numeration
)

admin.site.register(Country)
admin.site.register(State)
admin.site.register(Municipality)
admin.site.register(Currency)
admin.site.register(ExchangeRate)
admin.site.register(Parameter)
admin.site.register(Numeration)
