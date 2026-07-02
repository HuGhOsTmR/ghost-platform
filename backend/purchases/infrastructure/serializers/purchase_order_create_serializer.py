from rest_framework import serializers

class PurchaseOrderCreateLineSerializer(
    serializers.Serializer
):

    product = serializers.IntegerField()

    unit_of_measure = (
        serializers.IntegerField()
    )

    quantity = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    unit_price = serializers.DecimalField(
        max_digits=18,
        decimal_places=6
    )

    tax_percentage = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0
    )

class PurchaseOrderCreateSerializer(
    serializers.Serializer
):

    supplier = serializers.IntegerField()

    currency = serializers.IntegerField()

    document_date = (
        serializers.DateField()
    )

    expected_delivery_date = (
        serializers.DateField(
            required=False,
            allow_null=True
        )
    )

    notes = serializers.CharField(
        required=False,
        allow_blank=True
    )

    lines = (
        PurchaseOrderCreateLineSerializer(
            many=True
        )
    )