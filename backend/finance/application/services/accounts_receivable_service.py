from datetime import timedelta

from finance.models import (
    AccountsReceivable
)

from core.application.services.numeration_service import (
    NumerationService
)


class AccountsReceivableService:

    @staticmethod
    def create_receivable(
        *,
        sales_invoice,
        payment_term_days=30
    ):

        document_number = (
            NumerationService.get_next_number(
                company=sales_invoice.company,
                document_type='ACCOUNTS_RECEIVABLE',
                fiscal_year=sales_invoice.fiscal_year
            )
        )

        due_date = (
            sales_invoice.invoice_date +
            timedelta(
                days=payment_term_days
            )
        )

        receivable = (
            AccountsReceivable.objects.create(
                company=sales_invoice.company,

                customer=sales_invoice.customer,

                sales_invoice=sales_invoice,

                document_number=document_number,

                document_date=(
                    sales_invoice.invoice_date
                ),

                due_date=due_date,

                original_amount=(
                    sales_invoice.total_amount
                ),

                paid_amount=0,

                balance_amount=(
                    sales_invoice.total_amount
                ),

                status=(
                    AccountsReceivable
                    .STATUS_OPEN
                )
            )
        )

        return receivable