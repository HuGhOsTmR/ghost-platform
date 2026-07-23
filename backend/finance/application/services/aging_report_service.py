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

    @staticmethod
    def get_detailed_aging_report():

        today = (
            timezone.now().date()
        )

        report = []

        receivables = (

            AccountsReceivable.objects

            .filter(
                balance_amount__gt=0
            )

            .select_related(
                'customer'
            )

            .order_by(
                'due_date'
            )

        )

        for receivable in receivables:

            days_overdue = (

                today -
                receivable.due_date

            ).days

            display_days_overdue = (
                max(
                    days_overdue,
                    0
                )
            )

            if days_overdue <= 0:

                bucket = 'CURRENT'

            elif days_overdue <= 30:

                bucket = '1-30'

            elif days_overdue <= 60:

                bucket = '31-60'

            elif days_overdue <= 90:

                bucket = '61-90'

            else:

                bucket = '90+'

            report.append({

                'id':
                    receivable.id,

                'customer':
                    receivable.customer.name,

                'document_number':
                    receivable.document_number,

                'due_date':
                    receivable.due_date,

                'balance_amount':
                    receivable.balance_amount,

                'days_overdue':
                    display_days_overdue,

                'bucket':
                    bucket

            })

        return report