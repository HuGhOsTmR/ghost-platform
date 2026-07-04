from rest_framework import serializers


class AgingBucketSerializer(
    serializers.Serializer
):

    current = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    days_1_30 = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    days_31_60 = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    days_61_90 = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    days_90_plus = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )


class DashboardSectionSerializer(
    serializers.Serializer
):

    total_balance = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    aging = AgingBucketSerializer()


class FinanceDashboardSerializer(
    serializers.Serializer
):

    receivables = (
        DashboardSectionSerializer()
    )

    payables = (
        DashboardSectionSerializer()
    )

    working_capital = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )