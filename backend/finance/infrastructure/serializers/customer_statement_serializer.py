from rest_framework import serializers


class CustomerStatementDocumentSerializer(
    serializers.Serializer
):

    document_number = serializers.CharField()

    document_date = serializers.DateField()

    original_amount = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    paid_amount = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    balance_amount = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    status = serializers.CharField()


class CustomerStatementSerializer(
    serializers.Serializer
):

    customer = serializers.CharField()

    total_balance = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    documents = (
        CustomerStatementDocumentSerializer(
            many=True
        )
    )