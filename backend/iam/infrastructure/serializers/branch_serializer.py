from rest_framework import serializers

from iam.models import Branch


class BranchSerializer(serializers.ModelSerializer):

    company_name = serializers.CharField(
        source='company.name',
        read_only=True
    )

    class Meta:

        model = Branch

        fields = [
            'id',
            'company',
            'company_name',
            'code',
            'name',
            'address',
            'phone',
            'is_active',
            'created_at',
            'updated_at'
        ]

        read_only_fields = [
            'id',
            'created_at',
            'updated_at'
        ]