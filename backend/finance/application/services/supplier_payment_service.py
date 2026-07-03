from decimal import Decimal

from django.db import transaction

from finance.models import (
    SupplierPayment,
    SupplierPaymentAllocation,
    AccountsPayable
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

class SupplierPaymentService:

    @staticmethod
    @transaction.atomic
    def create_payment(
        *,
        company,
        supplier,
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

        payment_number = (
            NumerationService.get_next_number(
                company=company,
                document_type='SUPPLIER_PAYMENT',
                fiscal_year=payment_date.year
            )
        )

        payment = (
            SupplierPayment.objects.create(
                company=company,

                supplier=supplier,

                payment_number=payment_number,

                payment_date=payment_date,

                currency=currency,

                amount=amount,

                reference=reference,

                notes=notes,

                bank_account=bank_account,
                
                status=(
                    SupplierPayment
                    .STATUS_POSTED
                ),

                created_by=created_by
            )
        )

        total_allocated = Decimal('0')

        for item in allocations:

            payable = (
                AccountsPayable.objects.get(
                    pk=item[
                        'accounts_payable'
                    ]
                )
            )

            allocation_amount = Decimal(
                str(
                    item['amount']
                )
            )

            SupplierPaymentAllocation.objects.create(
                payment=payment,

                accounts_payable=payable,

                amount=allocation_amount
            )

            payable.paid_amount += (
                allocation_amount
            )

            payable.balance_amount -= (
                allocation_amount
            )

            if (
                payable.balance_amount <= 0
            ):

                payable.status = (
                    AccountsPayable
                    .STATUS_PAID
                )

            elif (
                payable.paid_amount > 0
            ):

                payable.status = (
                    AccountsPayable
                    .STATUS_PARTIAL
                )

            payable.save()

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
                    TreasuryTransaction.TYPE_OUT
                ),

                amount=amount,

                created_by=created_by,

                bank_account=payment.bank_account,

                reference=payment.payment_number,

                notes=(
                    f'Supplier payment '
                    f'{payment.payment_number}'
                )
            )

        return payment