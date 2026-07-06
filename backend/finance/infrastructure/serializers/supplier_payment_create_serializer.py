from rest_framework import serializers


class SupplierPaymentCreateSerializer(
    serializers.Serializer
):

    supplier = serializers.IntegerField()

    currency = serializers.IntegerField()

    bank_account = serializers.IntegerField(
        required=False
    )

    payment_date = serializers.DateField()

    amount = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    reference = serializers.CharField(
        required=False,
        allow_blank=True
    )

    notes = serializers.CharField(
        required=False,
        allow_blank=True
    )

    allocations = serializers.ListField()