from django.contrib import admin

from .models import (
    Company,
    Branch,
    Role,
    UserProfile
)

admin.site.register(Company)
admin.site.register(Branch)
admin.site.register(Role)
admin.site.register(UserProfile)