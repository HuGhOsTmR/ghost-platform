from django.urls import path, include

from iam.infrastructure.api.router import urlpatterns

urlpatterns = [
    path('', include(urlpatterns)),
]