from decimal import Decimal

from django.db import transaction

from finance.models import (
    CustomerPayment,
    PaymentAllocation,
    AccountsReceivable
)

from core.application.services.numeration_service import (
    NumerationService
)

from treasury.application.services import (
    TreasuryTransactionService
)

from treasury.models import (
    TreasuryTransaction
)

class CustomerPaymentService:

    @staticmethod
    @transaction.atomic
    def create_payment(
        *,
        company,
        customer,
        currency,
        bank_account=None,
        payment_date,
        amount,
        created_by,
        allocations,
        reference='',
        notes=''
    ):

        amount = Decimal(
            str(amount)
        )

        if amount <= 0:

            raise ValueError(
                "Payment amount must be greater than zero."
            )

        payment_number = (
            NumerationService.get_next_number(
                company=company,
                document_type='CUSTOMER_PAYMENT',
                fiscal_year=payment_date.year
            )
        )

        payment = (
            CustomerPayment.objects.create(
                company=company,

                customer=customer,

                payment_number=payment_number,

                payment_date=payment_date,

                currency=currency,

                amount=amount,

                reference=reference,

                notes=notes,

                bank_account=bank_account,

                status=(
                    CustomerPayment.STATUS_POSTED
                ),

                created_by=created_by
            )
        )

        total_allocated = Decimal('0')

        for item in allocations:

            receivable = (
                AccountsReceivable.objects.get(
                    pk=item[
                        'accounts_receivable'
                    ]
                )
            )

            allocation_amount = Decimal(
                str(
                    item['amount']
                )
            )

            if (
                allocation_amount >
                receivable.balance_amount
            ):

                raise ValueError(
                    f"Allocation exceeds balance "
                    f"for "
                    f"{receivable.document_number}"
                )

            PaymentAllocation.objects.create(
                payment=payment,

                accounts_receivable=receivable,

                amount=allocation_amount
            )

            receivable.paid_amount += (
                allocation_amount
            )

            receivable.balance_amount -= (
                allocation_amount
            )

            if (
                receivable.balance_amount <= 0
            ):

                receivable.status = (
                    AccountsReceivable
                    .STATUS_PAID
                )

            elif (
                receivable.paid_amount > 0
            ):

                receivable.status = (
                    AccountsReceivable
                    .STATUS_PARTIAL
                )

            receivable.save()

            total_allocated += (
                allocation_amount
            )

        if total_allocated != amount:

            raise ValueError(
                "Payment amount must equal "
                "allocated amount."
            )

        if payment.bank_account:

            TreasuryTransactionService.create_transaction(
                company=company,

                transaction_date=payment_date,

                transaction_type=(
                    TreasuryTransaction.TYPE_IN
                ),

                amount=amount,

                created_by=created_by,

                bank_account=payment.bank_account,

                reference=payment.payment_number,

                notes=(
                    f'Customer payment '
                    f'{payment.payment_number}'
                )
            )
        return payment