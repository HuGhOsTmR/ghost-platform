from django.db.models import Sum

from finance.models import (
    AccountsPayable
)


class AccountsPayableQueryService:

    @staticmethod
    def get_total_payables():

        result = (
            AccountsPayable.objects
            .exclude(
                status=AccountsPayable.STATUS_CANCELLED
            )
            .aggregate(
                total=Sum(
                    'balance_amount'
                )
            )
        )

        return (
            result['total']
            or 0
        )

    @staticmethod
    def get_supplier_balance(
        supplier
    ):

        result = (
            AccountsPayable.objects
            .filter(
                supplier=supplier
            )
            .aggregate(
                total=Sum(
                    'balance_amount'
                )
            )
        )

        return (
            result['total']
            or 0
        )

    @staticmethod
    def get_open_payables():

        return (
            AccountsPayable.objects
            .exclude(
                status=AccountsPayable.STATUS_PAID
            )
            .order_by(
                'due_date'
            )
        )

    @staticmethod
    def get_overdue_payables():

        from django.utils import timezone

        today = (
            timezone.now()
            .date()
        )

        return (
            AccountsPayable.objects
            .filter(
                balance_amount__gt=0,
                due_date__lt=today
            )
        )