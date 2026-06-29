from rest_framework import viewsets

from iam.models import Company

from iam.infrastructure.serializers import CompanySerializer
from rest_framework.permissions import IsAuthenticated

class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Company.objects.all()

    serializer_class = CompanySerializer