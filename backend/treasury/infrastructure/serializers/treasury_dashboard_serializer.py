from rest_framework import serializers


class TreasuryDashboardSerializer(
    serializers.Serializer
):

    bank_balance = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    cash_balance = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    today_inflows = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    today_outflows = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )

    net_position = serializers.DecimalField(
        max_digits=18,
        decimal_places=2
    )