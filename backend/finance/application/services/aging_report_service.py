from decimal import Decimal

from django.utils import timezone

from finance.models import (
    AccountsReceivable
)


class AgingReportService:

    @staticmethod
    def get_aging_report():

        today = timezone.now().date()

        report = {

            'current': Decimal('0'),

            'days_1_30': Decimal('0'),

            'days_31_60': Decimal('0'),

            'days_61_90': Decimal('0'),

            'days_90_plus': Decimal('0')
        }

        receivables = (
            AccountsReceivable.objects
            .filter(
                balance_amount__gt=0
            )
        )

        for receivable in receivables:

            days_overdue = (
                today -
                receivable.due_date
            ).days

            balance = (
                receivable.balance_amount
            )

            if days_overdue <= 0:

                report[
                    'current'
                ] += balance

            elif days_overdue <= 30:

                report[
                    'days_1_30'
                ] += balance

            elif days_overdue <= 60:

                report[
                    'days_31_60'
                ] += balance

            elif days_overdue <= 90:

                report[
                    'days_61_90'
                ] += balance

            else:

                report[
                    'days_90_plus'
                ] += balance

        return report