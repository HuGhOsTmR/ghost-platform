from rest_framework import serializers


class AgingReportSerializer(
    serializers.Serializer
):

    id = serializers.IntegerField()

    customer = serializers.CharField()

    document_number = serializers.CharField()

    due_date = serializers.DateField()

    balance_amount = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    days_overdue = serializers.IntegerField()

    bucket = serializers.CharField()