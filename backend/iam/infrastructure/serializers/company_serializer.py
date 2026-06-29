from rest_framework import serializers

from iam.models import Company


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company

        fields = [
            'id',
            'name',
            'trade_name',
            'tax_id',
            'email',
            'phone',
            'address',
            'is_active',
            'created_at',
            'updated_at'
        ]

        read_only_fields = [
            'id',
            'created_at',
            'updated_at'
        ]