from rest_framework import serializers

from iam.models import Role


class RoleSerializer(serializers.ModelSerializer):

    class Meta:

        model = Role

        fields = [
            'id',
            'code',
            'name',
            'description',
            'is_system',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'created_at'
        ]