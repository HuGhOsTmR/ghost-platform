from decimal import Decimal

from django.db.models import Sum

from treasury.models import (
    BankAccount,
    CashAccount,
    TreasuryTransaction
)


class TreasuryDashboardService:

    @staticmethod
    def get_bank_balance():

        result = (
            BankAccount.objects.aggregate(
                total=Sum(
                    'current_balance'
                )
            )
        )

        return (
            result['total']
            or Decimal('0')
        )

    @staticmethod
    def get_cash_balance():

        result = (
            CashAccount.objects.aggregate(
                total=Sum(
                    'current_balance'
                )
            )
        )

        return (
            result['total']
            or Decimal('0')
        )

    @staticmethod
    def get_today_inflows():

        result = (
            TreasuryTransaction.objects.filter(
                transaction_type=
                TreasuryTransaction.TYPE_IN
            ).aggregate(
                total=Sum('amount')
            )
        )

        return (
            result['total']
            or Decimal('0')
        )

    @staticmethod
    def get_today_outflows():

        result = (
            TreasuryTransaction.objects.filter(
                transaction_type=
                TreasuryTransaction.TYPE_OUT
            ).aggregate(
                total=Sum('amount')
            )
        )

        return (
            result['total']
            or Decimal('0')
        )

    @classmethod
    def get_dashboard(cls):

        bank_balance = (
            cls.get_bank_balance()
        )

        cash_balance = (
            cls.get_cash_balance()
        )

        inflows = (
            cls.get_today_inflows()
        )

        outflows = (
            cls.get_today_outflows()
        )

        return {

            'bank_balance':
                bank_balance,

            'cash_balance':
                cash_balance,

            'today_inflows':
                inflows,

            'today_outflows':
                outflows,

            'net_position':
                bank_balance +
                cash_balance
        }