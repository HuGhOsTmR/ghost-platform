from rest_framework import serializers


class SalesOrderCreateSerializer(
    serializers.Serializer
):

    customer = serializers.IntegerField()

    currency = serializers.IntegerField()

    document_date = serializers.DateField()

    notes = serializers.CharField(
        required=False,
        allow_blank=True
    )

    lines = serializers.ListField()