from decimal import Decimal

from django.db import transaction

from treasury.models import (
    TreasuryTransaction
)


class TreasuryTransactionService:

    @staticmethod
    @transaction.atomic
    def create_transaction(
        *,
        company,
        transaction_date,
        transaction_type,
        amount,
        created_by,
        bank_account=None,
        cash_account=None,
        reference='',
        notes=''
    ):

        if not bank_account and not cash_account:

            raise ValueError(
                'Bank account or cash account is required.'
            )

        amount = Decimal(
            str(amount)
        )

        treasury_transaction = (
            TreasuryTransaction.objects.create(
                company=company,

                transaction_date=transaction_date,

                transaction_type=transaction_type,

                bank_account=bank_account,

                cash_account=cash_account,

                amount=amount,

                reference=reference,

                notes=notes,

                created_by=created_by
            )
        )

        account = (
            bank_account
            if bank_account
            else cash_account
        )

        if (
            transaction_type ==
            TreasuryTransaction.TYPE_IN
        ):

            account.current_balance += (
                amount
            )

        elif (
            transaction_type ==
            TreasuryTransaction.TYPE_OUT
        ):

            account.current_balance -= (
                amount
            )

        else:

            raise ValueError(
                'Invalid transaction type.'
            )

        account.save()

        return treasury_transaction