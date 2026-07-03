from django.db.models import Sum

from finance.models import (
    AccountsReceivable
)


class AccountsReceivableQueryService:

    @staticmethod
    def get_open_receivables():

        return (
            AccountsReceivable.objects
            .exclude(
                status=AccountsReceivable.STATUS_PAID
            )
            .order_by(
                'due_date'
            )
        )

    @staticmethod
    def get_customer_balance(
        customer
    ):

        result = (
            AccountsReceivable.objects
            .filter(
                customer=customer
            )
            .aggregate(
                balance=Sum(
                    'balance_amount'
                )
            )
        )

        return (
            result['balance']
            or 0
        )

    @staticmethod
    def get_total_receivables():

        result = (
            AccountsReceivable.objects
            .exclude(
                status=AccountsReceivable.STATUS_CANCELLED
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
    def get_overdue_receivables():

        from django.utils import timezone

        today = (
            timezone.now()
            .date()
        )

        return (
            AccountsReceivable.objects
            .filter(
                balance_amount__gt=0,
                due_date__lt=today
            )
            .order_by(
                'due_date'
            )
        )