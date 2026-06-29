from rest_framework import viewsets
from iam.models import Role
from iam.infrastructure.serializers import RoleSerializer
from rest_framework.permissions import IsAuthenticated


class RoleViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Role.objects.all()

    serializer_class = RoleSerializer