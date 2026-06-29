from rest_framework import serializers

from iam.models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    company_name = serializers.CharField(
        source='company.name',
        read_only=True
    )

    role_name = serializers.CharField(
        source='role.name',
        read_only=True
    )

    class Meta:

        model = UserProfile

        fields = [
            'id',
            'user',
            'username',
            'company',
            'company_name',
            'role',
            'role_name',
            'phone',
            'avatar',
            'is_active',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at'
        ]