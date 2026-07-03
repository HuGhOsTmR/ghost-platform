from datetime import timedelta

from finance.models import (
    AccountsPayable
)

from core.application.services.numeration_service import (
    NumerationService
)


class AccountsPayableService:

    @staticmethod
    def create_payable(
        *,
        purchase_receipt,
        payment_term_days=30
    ):

        document_number = (
            NumerationService.get_next_number(
                company=purchase_receipt.company,
                document_type='ACCOUNTS_PAYABLE',
                fiscal_year=(
                    purchase_receipt.fiscal_year
                )
            )
        )

        due_date = (
            purchase_receipt.receipt_date +
            timedelta(
                days=payment_term_days
            )
        )

        payable = (
            AccountsPayable.objects.create(
                company=(
                    purchase_receipt.company
                ),

                supplier=(
                    purchase_receipt.supplier
                ),

                purchase_receipt=(
                    purchase_receipt
                ),

                document_number=(
                    document_number
                ),

                document_date=(
                    purchase_receipt.receipt_date
                ),

                due_date=due_date,

                original_amount=(
                    purchase_receipt.total_amount
                ),

                paid_amount=0,

                balance_amount=(
                    purchase_receipt.total_amount
                ),

                status=(
                    AccountsPayable
                    .STATUS_OPEN
                )
            )
        )

        return payable