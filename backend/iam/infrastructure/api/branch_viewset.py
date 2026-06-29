from rest_framework import viewsets

from iam.models import Branch

from iam.infrastructure.serializers import BranchSerializer
from rest_framework.permissions import IsAuthenticated

class BranchViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    queryset = Branch.objects.all()

    serializer_class = BranchSerializer