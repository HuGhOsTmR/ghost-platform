from rest_framework import serializers


class SupplierStatementDocumentSerializer(
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


class SupplierStatementSerializer(
    serializers.Serializer
):

    supplier = serializers.CharField()

    total_balance = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    documents = (
        SupplierStatementDocumentSerializer(
            many=True
        )
    )