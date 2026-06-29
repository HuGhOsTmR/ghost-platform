from rest_framework import viewsets
from iam.models import UserProfile
from iam.infrastructure.serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated

class UserProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer